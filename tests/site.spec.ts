import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const base = '/shahbaz-portfolio';

const pages = [
  `${base}/`,
  `${base}/architecture`,
  `${base}/projects/incident-management`,
  `${base}/projects/menumint`,
  `${base}/projects/employee-management`,
  `${base}/experience/backend-intern`,
  `${base}/experience/software-trainee`,
  `${base}/research/model-drift-supcon`,
];

for (const path of pages) {
  for (const theme of ['light', 'dark'] as const) {
    test(`accessibility: ${path} (${theme})`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page }).analyze();
      const bad = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(bad.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });
  }
}

test('theme toggle switches and persists', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.evaluate(() => localStorage.setItem('theme', 'light'));
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.click('[data-theme-toggle]');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('theme toggle remains usable when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() { throw new DOMException('Storage is unavailable.', 'SecurityError'); },
    });
  });
  await page.goto(`${base}/`);
  const current = await page.locator('html').getAttribute('data-theme');
  await page.click('[data-theme-toggle]');
  await expect(page.locator('html')).toHaveAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});

test('GitHub activity gives a useful message when the API rate limit is reached', async ({ page }) => {
  await page.route('https://api.github.com/**', (route) => route.fulfill({
    status: 429,
    contentType: 'application/json',
    body: JSON.stringify({ message: 'API rate limit exceeded' }),
  }));
  await page.goto(`${base}/`);
  await page.locator('[data-gh-status]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-gh-status]')).toContainText('temporarily rate limited');
});

test('GitHub activity rejects an invalid API response safely', async ({ page }) => {
  await page.route('https://api.github.com/**', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ name: 'invalid repository', html_url: 'javascript:alert(1)' }]),
  }));
  await page.goto(`${base}/`);
  await page.locator('[data-gh-status]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-gh-status]')).toContainText('Could not load repositories');
  await expect(page.locator('[data-gh-list] li')).toHaveCount(0);
});

test('home has greeting, projects and dock', async ({ page }) => {
  await page.goto(`${base}/`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('here!');
  await expect(page.getByText('Open to internships & job opportunities')).toBeVisible();
  await expect(page.locator('#projects .card')).toHaveCount(3);
  await expect(page.locator('#research .card')).toHaveCount(1);
  await expect(page.locator('.dock a')).toHaveCount(4);
});

test('project card opens its case study', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.locator('.card').first().click();
  await expect(page).toHaveURL(/\/projects\/incident-management$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Incident Management System');
  await expect(page.getByRole('heading', { name: 'Key highlights' })).toBeVisible();
});

test('experience item opens its detail page', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.locator('.tl-body').first().click();
  await expect(page).toHaveURL(/\/experience\/backend-intern$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Backend Developer Intern');
});

test('research card opens the research page', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.locator('#research .card').first().click();
  await expect(page).toHaveURL(/\/research\/model-drift-supcon$/);
  await expect(page.getByRole('heading', { name: 'The math: how SupCon pulls and pushes' })).toBeVisible();
});

test('architecture page loads', async ({ page }) => {
  await page.goto(`${base}/architecture`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('How this site is built');
});

for (const width of [320, 390, 768, 1280, 1920]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    for (const path of pages) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
}

test.describe('motion', () => {
  test.use({ reducedMotion: 'no-preference' });
  test('cards reveal when scrolled into view', async ({ page }) => {
    await page.goto(`${base}/`);
    const card = page.locator('.card').first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveClass(/\bin\b/);
  });
});

test.describe('butterfly cursor', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('pauses all wing and hover animations while inactive and resumes on movement', async ({ page }) => {
    await page.goto(`${base}/`);
    const butterfly = page.locator('[data-bf-follower]');
    const wings = butterfly.locator('.bf-wing');
    await expect(wings).toHaveCount(4);
    await expect.poll(() => wings.evaluateAll((elements) =>
      elements.every((element) => getComputedStyle(element).animationPlayState === 'paused'),
    )).toBe(true);
    await expect(butterfly.locator('.bf-hover')).toHaveCSS('animation-play-state', 'paused');

    await page.mouse.move(140, 160);
    await expect(butterfly).toHaveAttribute('data-active', 'true');
    await expect.poll(() => wings.evaluateAll((elements) =>
      elements.every((element) => getComputedStyle(element).animationPlayState === 'running'),
    )).toBe(true);
    await expect(butterfly.locator('.bf-hover')).toHaveCSS('animation-play-state', 'running');

    await page.mouse.move(-1, -1);
    await expect(butterfly).not.toHaveAttribute('data-active', 'true');
    await expect.poll(() => wings.evaluateAll((elements) =>
      elements.every((element) => getComputedStyle(element).animationPlayState === 'paused'),
    )).toBe(true);
  });

  test('pauses while the document is hidden and resumes when visible', async ({ page }) => {
    await page.goto(`${base}/`);
    const butterfly = page.locator('[data-bf-follower]');
    const wings = butterfly.locator('.bf-wing');
    await page.mouse.move(140, 160);
    await expect(butterfly).toHaveAttribute('data-active', 'true');
    await expect.poll(() => wings.evaluateAll((elements) =>
      elements.every((element) => getComputedStyle(element).animationPlayState === 'running'),
    )).toBe(true);

    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await expect(butterfly).toHaveAttribute('data-page-visible', 'false');
    await expect.poll(() => wings.evaluateAll((elements) =>
      elements.every((element) => getComputedStyle(element).animationPlayState === 'paused'),
    )).toBe(true);
    const positionWhileHidden = await butterfly.evaluate((element) => element.style.transform);
    await page.mouse.move(240, 220);
    await page.waitForTimeout(100);
    await expect(butterfly).toHaveAttribute('data-active', 'true');
    expect(await butterfly.evaluate((element) => element.style.transform)).toBe(positionWhileHidden);

    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await expect(butterfly).toHaveAttribute('data-page-visible', 'true');
    await expect.poll(() => wings.evaluateAll((elements) =>
      elements.every((element) => getComputedStyle(element).animationPlayState === 'running'),
    )).toBe(true);
    await expect.poll(() => butterfly.evaluate((element) => element.style.transform)).not.toBe(positionWhileHidden);
  });

  test('follows the cursor, flaps naturally, and does not block clicks', async ({ page }) => {
    await page.goto(`${base}/`);
    const butterfly = page.locator('[data-bf-follower]');
    const wing = page.locator('.bf-fore-left');
    await expect(butterfly.locator('svg')).toHaveCSS('width', '28px');
    await expect(butterfly.locator('svg')).toHaveCSS('height', '23px');
    await page.mouse.move(140, 160);
    await expect(butterfly).toHaveAttribute('data-active', 'true');
    await expect.poll(() => wing.evaluate((element) => getComputedStyle(element).animationDuration)).toBe('0.19s');
    await expect.poll(() => butterfly.evaluate((element) => getComputedStyle(element).pointerEvents)).toBe('none');

    const before = await butterfly.evaluate((element) => element.style.transform);
    await page.mouse.move(240, 220);
    await expect.poll(() => butterfly.evaluate((element) => element.style.transform)).not.toBe(before);
    await page.waitForTimeout(100);
    const laggingX = await butterfly.evaluate((element) => Number(/translate3d\(([-\d.]+)px/.exec(element.style.transform)?.[1]));
    expect(laggingX).toBeLessThan(240 + 14 - 30);

    await page.mouse.move(0, 0);
    await page.setViewportSize({ width: 320, height: 240 });
    await expect.poll(() => butterfly.locator('svg').evaluate((svg) => {
      const bounds = svg.getBoundingClientRect();
      return bounds.left >= 0 && bounds.top >= 0 && bounds.right <= innerWidth && bounds.bottom <= innerHeight;
    })).toBe(true);

    const toggle = page.locator('[data-theme-toggle]');
    const themeBefore = await page.locator('html').getAttribute('data-theme');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', themeBefore === 'dark' ? 'light' : 'dark');
  });
});

test.describe('butterfly flight path', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('drifts in both horizontal and vertical directions around the cursor', async ({ page }) => {
    await page.goto(`${base}/`);
    const butterfly = page.locator('[data-bf-follower]');
    await page.mouse.move(160, 180);
    await expect(butterfly).toHaveAttribute('data-active', 'true');

    const positions: [number, number][] = [];
    for (let i = 0; i < 10; i++) {
      positions.push(await butterfly.evaluate((element) => {
        const match = /translate3d\(([-\d.]+)px, ([-\d.]+)px/.exec(element.style.transform);
        return [Number(match?.[1]), Number(match?.[2])];
      }));
      await page.waitForTimeout(100);
    }

    const xValues = positions.map(([x]) => x);
    const yValues = positions.map(([, y]) => y);
    expect(Math.max(...xValues) - Math.min(...xValues)).toBeGreaterThan(2);
    expect(Math.max(...yValues) - Math.min(...yValues)).toBeGreaterThan(1.5);
  });
});

test.describe('butterfly cursor with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('is hidden when reduced motion is requested', async ({ page }) => {
    await page.goto(`${base}/`);
    const butterfly = page.locator('[data-bf-follower]');
    await expect(butterfly).toBeHidden();
    await expect(butterfly.locator('.bf-wing')).toHaveCount(4);
    await expect.poll(() => butterfly.locator('.bf-wing').evaluateAll((elements) =>
      elements.every((element) => getComputedStyle(element).animationPlayState === 'paused'),
    )).toBe(true);
  });
});
