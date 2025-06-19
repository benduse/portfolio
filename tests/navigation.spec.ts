import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Benjamin Niyodusenga/);
    await expect(page.locator('.name')).toContainText('Benjamin Niyodusenga');
  });

  test('should navigate to sections using nav links', async ({ page }) => {
    // Test Skills navigation
    await page.click('a[href="#skills"]');
    await expect(page.locator('#skills')).toBeVisible();
    
    // Test Certifications navigation
    await page.click('a[href="#certifications"]');
    await expect(page.locator('#certifications')).toBeVisible();
    
    // Test Experience page navigation
    await page.click('a[href="experience.html"]');
    await expect(page).toHaveURL(/.*experience.html/);
  });
});

test.describe('Skills Accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#skills"]');
  });

  test('should show skill preview on hover', async ({ page }) => {
    const webDevSkill = page.locator('.skill-category').first();
    await webDevSkill.hover();
    await expect(webDevSkill.locator('.skill-preview')).toBeVisible();
  });

  test('should expand/collapse skill sections', async ({ page }) => {
    const webDevButton = page.locator('.skill-header').first();
    
    // Test expansion
    await webDevButton.click();
    await expect(page.locator('#web-dev-content')).toBeVisible();
    
    // Test collapse
    await webDevButton.click();
    await expect(page.locator('#web-dev-content')).toBeHidden();
  });
});
