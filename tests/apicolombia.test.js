const { expect, test } = require('@playwright/test');

test('Get Info Colombia', async ({ playwright }) => {
        
    let apiContext = await playwright.request.newContext({});
    const infoColombia = await apiContext.get('https://api-colombia.com/api/v1/Country/Colombia')
    expect(infoColombia.ok()).toBeTruthy();
    
    const body = await infoColombia.json();
    expect.soft(body).toHaveProperty('id', 1);
    expect.soft(body).toHaveProperty('name', 'Colombia');
    expect(infoColombia.status()).toBe(200);

})
