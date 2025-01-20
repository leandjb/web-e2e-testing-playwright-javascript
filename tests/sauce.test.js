const { test, expect } = require('@playwright/test');

test.afterEach(async ({ page }) => {
    expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html')
    await page.screenshot({path: `screenshots/TC_001-StepAfter-${Date.now()}.png`, fullPage: true})

})

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    
    expect(await page.url()).toBe('https://www.saucedemo.com/')
    expect(await page.title()).toBe('Swag Labs')
    expect.soft(await page.locator('[data-test=username]').isVisible())
    expect.soft(await page.locator('[data-test=password]').isVisible())
    expect.soft(await page.locator('[data-test=login-button]').isVisible())
    expect(await page.locator('[data-test=login-button]').isEnabled())

    await page.screenshot({path: `screenshots/TC_001-StepBefore-${Date.now()}.png`, fullPage: true})
})


test('TC_001: login with a valid user test', async ({ page }) => {
    await page.locator('[data-test=username]').fill('standard_user')
    await page.locator('[data-test=password]').fill('secret_sauce') 
    await page.locator('[data-test=login-button]').click()

    expect.soft(await page.locator('.product_sort_container')).toBeVisible()
    expect(await page.locator('.product_sort_container')).toContainText('Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)')

    await page.screenshot({path: `screenshots/TC_001-${Date.now()}.png`, fullPage: true})

})