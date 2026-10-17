type Repo = { name: string; description: string | null; html_url: string; language: string | null; pushed_at: string; fork: boolean; archived: boolean };

const list = document.querySelector<HTMLUListElement>('[data-gh-list]');
const statusEl = document.querySelector<HTMLElement>('[data-gh-status]');
const cacheLifetime = 600000;

function ago(iso: string): string {
  const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86400000));
  const f = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  if (Math.abs(days) >= 30) return f.format(Math.round(days / 30), 'month');
  return f.format(days, 'day');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseRepos(value: unknown): Repo[] | null {
  if (!Array.isArray(value)) return null;

  const repos = value.filter((item): item is Repo => {
    if (!isRecord(item)) return false;
    return typeof item.name === 'string'
      && item.name.length > 0
      && typeof item.html_url === 'string'
      && /^https:\/\/github\.com\/[^/?#]+\/[^/?#]+\/?$/.test(item.html_url)
      && (item.description === null || typeof item.description === 'string')
      && (item.language === null || typeof item.language === 'string')
      && typeof item.pushed_at === 'string'
      && Number.isFinite(Date.parse(item.pushed_at))
      && typeof item.fork === 'boolean'
      && typeof item.archived === 'boolean';
  });

  return repos.length === value.length ? repos : null;
}

function readCache(key: string): Repo[] | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const cached: unknown = JSON.parse(raw);
    if (!isRecord(cached) || typeof cached.t !== 'number' || !Number.isFinite(cached.t)) {
      console.warn('Ignoring malformed GitHub activity cache.');
      return null;
    }
    const age = Date.now() - cached.t;
    const repos = parseRepos(cached.d);
    if (age >= 0 && age < cacheLifetime && repos) return repos;
    console.warn('Ignoring expired or invalid GitHub activity cache.');
  } catch {
    console.warn('GitHub activity cache is unavailable; loading without it.');
  }
  return null;
}

function render(repos: Repo[]) {
  if (!list) return;
  if (!repos.length) { if (statusEl) statusEl.textContent = 'No public repositories to show yet.'; return; }
  for (const r of repos) {
    if (!r.html_url.startsWith('https://github.com/')) continue;
    const li = document.createElement('li');
    const line = document.createElement('div'); line.className = 'line';
    const a = document.createElement('a'); a.href = r.html_url; a.textContent = `${r.name} \u2197`;
    const when = document.createElement('span'); when.className = 'when'; when.textContent = ago(r.pushed_at);
    line.append(a, when); li.append(line);
    const d = document.createElement('p'); d.className = 'desc';
    d.textContent = [r.description, r.language].filter(Boolean).join(' \u00b7 ') || 'No description yet.';
    li.append(d); list.append(li);
  }
}

async function load() {
  if (!list) return;
  const user = list.dataset.user ?? '';
  if (!user) {
    if (statusEl) statusEl.textContent = 'GitHub profile is unavailable. Use the link below.';
    return;
  }
  const key = `gh:${user}`;
  try {
    let data = readCache(key);
    if (!data) {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=pushed&per_page=12&type=owner`, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(8000),
      });
      if (res.status === 403 || res.status === 429) {
        if (statusEl) statusEl.textContent = 'GitHub is temporarily rate limited. Use the link below.';
        return;
      }
      if (!res.ok) throw new Error(`GitHub API returned ${res.status}.`);
      data = parseRepos(await res.json());
      if (!data) throw new Error('GitHub API returned invalid repository data.');
      try {
        sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data }));
      } catch {
        console.warn('GitHub activity cache could not be saved.');
      }
    }
    render(data.filter((r) => !r.fork && !r.archived).slice(0, 4));
  } catch {
    if (statusEl) statusEl.textContent = 'Could not load repositories right now. Use the link below.';
  }
}

if (list) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: '200px' });
    io.observe(statusEl ?? list);
  } else load();
}
