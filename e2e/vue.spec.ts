import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.greetings > h1')).toContainText('Bem vindo a Central de Links');
});

test('guest is redirected to the login page when opening a protected route', async ({ page }) => {
  await page.goto('/links');
  await expect(page).toHaveURL(/\/login/);
});
