const root = document.documentElement;

// Theme toggle
const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const isDark = () => root.dataset.theme === 'dark';
const sync = () => btn?.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
function getSavedTheme(): 'light' | 'dark' | null {
  try {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    console.warn('Theme preference is unavailable; using the system setting.');
    return null;
  }
}

btn?.addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    console.warn('Theme preference could not be saved.');
  }
  sync();
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!getSavedTheme()) { root.dataset.theme = e.matches ? 'dark' : 'light'; sync(); }
});
sync();

// Active section in dock
const links = [...document.querySelectorAll<HTMLAnchorElement>('.dock a[href*="#"]')];
if (links.length && 'IntersectionObserver' in window) {
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((l) => l.removeAttribute('aria-current'));
      byId.get(e.target.id)?.setAttribute('aria-current', 'true');
    }
  }, { rootMargin: '-40% 0px -55% 0px' });
  byId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

// Live clock (seconds)
const clocks = document.querySelectorAll<HTMLElement>('[data-clock]');
if (clocks.length) {
  const localClock = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' });
  const formatters = new Map<string, Intl.DateTimeFormat>();
  clocks.forEach((el) => {
    const timezone = el.dataset.clock ?? '';
    try {
      formatters.set(timezone, new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', timeZone: timezone }));
    } catch {
      console.warn('Invalid clock timezone; showing local time.');
      formatters.set(timezone, localClock);
    }
  });
  const tick = () => clocks.forEach((el) => {
    el.textContent = (formatters.get(el.dataset.clock ?? '') ?? localClock).format(new Date());
    el.closest('[data-clock-wrap]')?.setAttribute('data-ready', '');
  });
  let interval: number | undefined;
  const updateClock = () => {
    if (document.hidden) {
      if (interval !== undefined) window.clearInterval(interval);
      interval = undefined;
      return;
    }
    tick();
    if (interval === undefined) interval = window.setInterval(tick, 1000);
  };
  updateClock();
  document.addEventListener('visibilitychange', updateClock);
}

// Reveal on scroll
const reveals = [...document.querySelectorAll<HTMLElement>('.reveal')];
if (reveals.length) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
    root.classList.add('reveal-ready');
  } else reveals.forEach((el) => el.classList.add('in'));
}
