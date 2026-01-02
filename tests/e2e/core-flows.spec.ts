import { test, expect } from '@playwright/test';

test.describe('Vibe Wiki core flows', () => {
  test('home page renders hero CTA and resources', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Vibe Wiki' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Advanced Search' })).toBeVisible();

    await page.getByRole('heading', { name: 'Vibe Coding Resources' }).scrollIntoViewIfNeeded();

    const cheatSheetLink = page.getByRole('link', { name: 'Vibe Coding 2025 Cheat Sheet' });
    const builderLink = page.getByRole('link', { name: 'Ultimate Vibe Builder' });
    const guideLink = page.getByRole('link', { name: 'Building Web Pages & Apps Guide' });
    const markdownLink = page.getByRole('link', { name: 'Vibe Coding Websites Guide' });
    const referenceLink = page.getByRole('link', { name: 'Vibe Wiki Reference' });

    await expect(cheatSheetLink).toBeVisible();
    await expect(builderLink).toBeVisible();
    await expect(guideLink).toBeVisible();
    await expect(markdownLink).toBeVisible();
    await expect(referenceLink).toBeVisible();

    const hrefs = await Promise.all([
      cheatSheetLink.getAttribute('href'),
      builderLink.getAttribute('href'),
      guideLink.getAttribute('href'),
      markdownLink.getAttribute('href'),
      referenceLink.getAttribute('href'),
    ]);

    expect(hrefs[0]).toContain('/docs/vibe-coding-2025-cheat-sheet.pdf');
    expect(hrefs[1]).toContain('/website-vibe-coding.html');
    expect(hrefs[2]).toContain('/docs/building-web-pages-apps-guide.pdf');
    expect(hrefs[3]).toContain('/docs/Vibe-coding-websites.md');
    expect(hrefs[4]).toContain('/docs/vibe-wiki.txt');
  });

  test('resource files respond with 200', async ({ page, request }) => {
    await page.goto('/');
    await page.getByRole('heading', { name: 'Vibe Coding Resources' }).scrollIntoViewIfNeeded();

    const resourceLinks = [
      page.getByRole('link', { name: 'Ultimate Vibe Builder' }),
      page.getByRole('link', { name: 'Vibe Coding 2025 Cheat Sheet' }),
      page.getByRole('link', { name: 'Building Web Pages & Apps Guide' }),
      page.getByRole('link', { name: 'Vibe Coding Websites Guide' }),
      page.getByRole('link', { name: 'Vibe Wiki Reference' }),
    ];

    for (const link of resourceLinks) {
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();

      const response = await request.get(new URL(href ?? '', page.url()).toString());
      expect(response.ok()).toBeTruthy();
    }
  });

  test('search page shows results and empty state', async ({ page }) => {
    await page.goto('/search/');

    const searchInput = page.getByRole('searchbox');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('react');
    await expect(page.getByRole('listbox')).toBeVisible();
    await expect(page.getByRole('option').first()).toBeVisible();

    await searchInput.fill('zzzzzz');
    await expect(page.getByText(/No matches for/)).toBeVisible();
  });

  test('concept visualization toggle renders fallback preview', async ({ page }) => {
    await page.goto('/concept/vibe-coding/');

    const toggleButton = page.getByRole('button', { name: /Interactive Visualization/i });
    await toggleButton.scrollIntoViewIfNeeded();
    await toggleButton.click();

    await expect(page.getByText('Visual Concept Preview')).toBeVisible();
  });
});
