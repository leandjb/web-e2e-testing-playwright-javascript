const { test, expect } = require('@playwright/test');


test.describe(() => {
    test.use({ colorScheme: 'dark' });

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });


    test('TC_001: login with valid credentials', async ({ page }) => {

        await expect.soft(page.locator('#user-name')).toBeVisible();
        await page.locator('#user-name').fill('standard_user');

        await expect.soft(page.getByRole('textbox', { name: 'password' })).toBeVisible()
        await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce')

        await expect.soft(page.locator('.btn_action')).toBeVisible();
        await expect(page.locator('.btn_action')).toBeEnabled();
        await page.locator('.btn_action').click();

        await expect(page.getByText('Swag Labs')).toBeVisible();
        await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

    });

    test('TC_002: login with invalid credentials', async ({ page }) => {

        await expect.soft(page.locator('#user-name')).toBeVisible();
        await page.locator('#user-name').fill('fake_user');

        await expect.soft(page.getByRole('textbox', { name: 'password' })).toBeVisible();
        await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce');

        await expect.soft(page.locator('.btn_action')).toBeVisible();
        await expect(page.locator('.btn_action')).toBeEnabled();
        await page.locator('.btn_action').click();

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');

    });


});
