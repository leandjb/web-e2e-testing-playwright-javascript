const { test, expect} = require('@playwright/test')


test.describe('SeleniumBase Page - Test Suite', ()=> {


  test.beforeEach(async ({ page }) => {
    await page.goto('https://seleniumbase.io/demo_page/')
  })


  test('input text field test', async ({ page })=> {    
    await page.locator('#myTextInput').fill('wrote line')
    expect(page.locator('#myTextInput')).toHaveValue('wrote line')
  })


})
