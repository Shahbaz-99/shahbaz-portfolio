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
      expect(bad.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
      }))).toEqual([]);
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

test('home has greeting, projects and primary navigation', async ({ page }) => {
  await page.goto(`${base}/`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('here!');
  await expect(page.getByText('Open to internships & job opportunities')).toBeVisible();
  await expect(page.locator('#projects .card')).toHaveCount(3);
  await expect(page.locator('#research .card')).toHaveCount(1);
  await expect(page.locator('.home-nav a')).toHaveCount(7);
  await expect(page.locator('.home-nav a[href$="#skills"]')).toHaveText('Skills');
  await expect(page.locator('.home-theme-toggle')).toBeVisible();
});

test('home keeps key sections and social contact links without a contact section or form', async ({ page }) => {
  await page.goto(`${base}/`);
  await expect(page.locator('.hero-stat')).toHaveCount(3);
  await expect(page.locator('#what-i-do .service-card')).toHaveCount(4);
  await expect(page.locator('#process .process-card')).toHaveCount(4);
  await expect(page.locator('#skills .skill-category')).toHaveCount(4);
  await expect(page.locator('#skills .skill-label')).toHaveText([
    'Backend engineering',
    'Data & databases',
    'DevOps & infrastructure',
    'Testing & tools',
  ]);
  await expect(page.locator('form, [data-contact-form], input, textarea, #contact, a[href$="#contact"]')).toHaveCount(0);
  for (const label of ['Email', 'LinkedIn', 'GitHub']) {
    await expect(page.locator(`.home-page .hero-cta-group .chips a[aria-label="${label}"]`)).toBeVisible();
    await expect(page.locator(`.home-page .home-footer-links a[aria-label="${label}"]`)).toBeVisible();
  }
});

test('home navigation reaches skills', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.locator('.home-nav a[href$="#skills"]').click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.locator('#skills')).toBeInViewport();
});

test('project card opens its case study', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.locator('.project-detail-link').first().click();
  await expect(page).toHaveURL(/\/projects\/incident-management$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Incident Management System');
  await expect(page.getByRole('heading', { name: 'Key highlights' })).toBeVisible();
});

test('project cards provide distinct case-study and repository links', async ({ page }) => {
  await page.goto(`${base}/`);
  await expect(page.locator('.project-detail-link')).toHaveCount(3);
  await expect(page.locator('.project-source-link')).toHaveCount(3);
  await expect(page.locator('.project-source-link').first()).toHaveAttribute('href', 'https://github.com/Shahbaz-99/IMS-Incident-Management-System-');
  await expect(page.locator('.project-source-link').first()).toHaveAttribute('rel', 'noopener noreferrer');
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

for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    for (const path of pages) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
      if (path === `${base}/`) {
        const navLinks = page.locator('.home-nav a');
        await expect(navLinks).toHaveCount(7);
        for (const link of await navLinks.all()) {
          await expect(link).toBeVisible();
          const right = await link.evaluate((element) => element.getBoundingClientRect().right);
          expect(right, `Navigation link at ${width}px`).toBeLessThanOrEqual(width);
        }
      }
    }
  });
}

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('keeps content visible and disables decorative animation', async ({ page }) => {
    await page.goto(`${base}/`);
    const motion = await page.locator('.status-dot').evaluate((dot) => ({
      animation: getComputedStyle(dot).animationName,
      revealOpacity: getComputedStyle(document.querySelector('.reveal')!).opacity,
    }));
    expect(motion.animation).toBe('none');
    expect(motion.revealOpacity).toBe('1');
  });
});

test.describe('motion', () => {
  test.use({ reducedMotion: 'no-preference' });
  test('cards reveal when scrolled into view', async ({ page }) => {
    await page.goto(`${base}/`);
    const card = page.locator('.card').first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveClass(/\bin\b/);
  });
});
