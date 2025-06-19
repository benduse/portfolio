import { test, expect } from '@playwright/test';

test.describe('Experience Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experience.html');
  });

  test('should display header content correctly', async ({ page }) => {
    await expect(page.locator('.page-title')).toBeVisible();
    await expect(page.locator('.page-subtitle')).toBeVisible();
  });

  test('should show timeline elements', async ({ page }) => {
    await expect(page.locator('.timeline')).toBeVisible();
    const timelineItems = page.locator('.timeline-item');
    await expect(timelineItems).toHaveCount(4); // Education, Skills, Experience, Conferences
  });

  test('should handle responsive layout', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.timeline-content')).toHaveCSS('width', /50%/);

    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page.locator('.timeline-content')).toHaveCSS('width', /100%/);
  });
});

test.describe('Certifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#certifications"]');
  });

  test('should expand certification details', async ({ page }) => {
    const webDevCert = page.locator('#web-dev-cert .cert-header');
    await webDevCert.click();
    await expect(page.locator('#web-dev-cert-content')).toBeVisible();
    await expect(page.locator('#web-dev-cert .cert-topics')).toBeVisible();
  });

  test('should show verification links', async ({ page }) => {
    const googleCert = page.locator('.cert-verify-link').first();
    await expect(googleCert).toHaveAttribute('href', /coursera.org/);
    await expect(googleCert).toHaveAttribute('target', '_blank');
  });
});
