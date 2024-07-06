import { test, expect } from '@playwright/test';

test('register', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.goto('http://localhost:5173/login');
    await page.getByRole('heading', { name: 'login' }).click();
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('abraham@email.com');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('heading', { name: 'Call for papers App' }).click();
    await page.getByRole('link', { name: 'Register' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill('Juan');
    await page.locator('input[name="name"]').press('Tab');
    await page.locator('input[name="email"]').fill('juan@email.com');
    await page.locator('input[name="email"]').press('Tab');
    await page.locator('input[name="password"]').fill('password');
    await page.getByRole('button', { name: 'Crear usuario' }).click();
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('juan@email.com');
    await page.locator('input[name="email"]').press('Tab');
    await page.locator('input[name="password"]').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
  });

test('login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/login');
  await page.getByRole('heading', { name: 'login' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('abraham@email.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('heading', { name: 'Call for papers App' }).click();
});

test('recover password', async ({ page }) => {
    await page.getByRole('link', { name: 'Forgot Password' }).click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('abraham@email.com');
    await page.getByRole('button', { name: 'Buscar usuario' }).click();
    await expect(page.getByRole('heading', { name: 'Cambiar contraseña' })).toBeVisible();
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('password2');
    await page.locator('input[name="password"]').press('Tab');
    await page.locator('input[name="confirm"]').fill('password2');
    await page.getByRole('button', { name: 'Cambiar' }).click();
    await expect(page.getByRole('heading', { name: 'login' })).toBeVisible();
  });

  test('show profile', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'login' })).toBeVisible();
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('abraham@email.com');
    await page.locator('input[name="email"]').press('Tab');
    await page.locator('input[name="password"]').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('password2');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Ver detalles' }).click();
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
  });