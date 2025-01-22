const { expect, test } = require('@playwright/test');
const { request } = require('http');
const { use } = require('../playwright.config');

test('Post Auth to DummyJson API', async ({ playwright }) => {

    let apiContext = await playwright.request.newContext({
        baseURL: 'https://dummyjson.com/',
    });


    const requestBody = {
        data: {
            username: 'emilys',
            password: 'emilyspass',
        }
    }


    const authResponse = await apiContext.post('auth/login', requestBody)
    expect(authResponse.ok()).toBeTruthy();

    const responseBody = await authResponse.json();
    expect(responseBody).toHaveProperty('accessToken');
    expect(responseBody).toHaveProperty('email', 'emily.johnson@x.dummyjson.com');
    expect(authResponse.status()).toBe(200);

    console.log(JSON.stringify(responseBody, null, 2)); // Print JSON response in terminal
    

})
