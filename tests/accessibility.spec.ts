import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Navigation
    await expect(page.locator('nav')).toHaveAttribute('role', 'navigation');
    await expect(page.locator('nav')).toHaveAttribute('aria-label', 'Main navigation');
    
    // Skip link
    await expect(page.locator('.skip-link')).toBeVisible();
    await expect(page.locator('.skip-link')).toHaveAttribute('href', '#main-content');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('a[href="#home"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('a[href="#skills"]')).toBeFocused();
    
    // Test skills accordion with keyboard
    await page.goto('#skills');
    const skillHeader = page.locator('.skill-header').first();
    await skillHeader.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#web-dev-content')).toBeVisible();
  });

  test('should maintain proper focus management', async ({ page }) => {
    // Test certification expansion focus handling
    await page.goto('#certifications');
    const certHeader = page.locator('.cert-header').first();
    await certHeader.click();
    await expect(page.locator('#web-dev-cert-content')).toBeVisible();
    
    // Ensure focus is trapped appropriately
    await page.keyboard.press('Tab');
    await expect(page.locator('.cert-verify-link')).toBeFocused();
  });
});
