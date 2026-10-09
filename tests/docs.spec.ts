import { test, expect } from '@playwright/test';

test.describe('playwright.dev', () => {
  // Test 1: home page title
  test('home page title contains Playwright', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  // Test 2: Get started opens the intro page
  test('Get started opens the intro docs', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(
      page.getByRole('heading', { name: 'Installation', exact: true })
    ).toBeVisible();
  });

  // Test 3: search finds "locators"
  test('search finds "locators"', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByPlaceholder('Search docs').fill('locators');
    await expect(page.getByRole('option').first()).toBeVisible();
  });

  // Test 4: page.route, block images
  test('page still works when images are blocked', async ({ page }) => {
    const blockedUrls: string[] = [];

    await page.route(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/, (route) => {
      blockedUrls.push(route.request().url());
      return route.abort();
    });

    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect.poll(() => blockedUrls.length).toBeGreaterThan(0);
  });
});