const { expect, test } = require('@playwright/test');
const path = require('path');

test.describe('Search Properties Test Suite', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.aptuno.com/');
    });
    

    test('TC_001: search a valid property test', async ({ page }) => {
        await page.screenshot({path: 'screenshots/TC_001_home_page.png', fullPage: true});
        
        let cityToSearch = 'Bogota';

        const citySearchBar = await page.locator('.form-width-icon');
        const searchButton = page.getByRole('button', { name: 'Encontrar mi hogar ideal' });
        
        
        await page.getByRole('button', { name: 'Aceptar' }).click();                                        //Accept cookies popup
        
        await citySearchBar.fill(cityToSearch);
        await citySearchBar.click();
        await searchButton.click();
        
        await page.screenshot({path: 'screenshots/TC_001_search_property_page.png', fullPage: true});

        const page1Promise = page.waitForEvent('popup');
        await page.locator('picture').first().click();
        const page1 = await page1Promise;


        await page1.waitForSelector('#details_section');                                                    //verify for details section structure                    
        await expect(page1.getByRole('button', { name: 'Compartir' })).toBeVisible();
        await expect(page1.getByRole('button', { name: 'Compartir' })).toContainText('Compartir');
        await expect(page1.getByRole('button', { name: 'Guardar' })).toBeVisible();
        await expect(page1.getByRole('button', { name: 'Guardar' })).toContainText('Guardar');
        await expect(page1.getByRole('heading', { name: 'Descripción del espacio' })).toBeVisible();
        await expect(page1.getByRole('heading', { name: 'Descripción del espacio' })).toContainText('Descripción del espacio');
        
        
        await page1.waitForSelector('.EstateDetailsstyled__MainActionsCard-sc-9oojuf-4');                   
        await expect(page1.getByRole('button', { name: 'Agendar una visita' })).toBeVisible();

    });

    test('TC_002: search an invalid city test', async ({ page }) => {

        let fakeCityToSearch = 'Tangamandapio';                                                                 //PASS: city that not exist                        
        // let fakeCityToSearch = 'Cali';                                                                       //FAIL: city that exist                       
        
        let citySearchBar = await page.locator('.form-width-icon');
        await citySearchBar.fill(fakeCityToSearch);
        await citySearchBar.press('Enter');

        await expect(page.locator('#root')).toContainText(`No se encontraron coincidencias para "${fakeCityToSearch}"`);

    });

    // test('TC_003: search a valid property with filters test', async ({ page }) => {

        
    //     let cityToSearch = 'Bogota';

    //     const citySearchBar = await page.locator('.form-width-icon');
    //     const searchButton = page.getByRole('button', { name: 'Encontrar mi hogar ideal' });
        
        
    //     await page.getByRole('button', { name: 'Aceptar' }).click();                                        //Accept cookies popup
        
    //     await citySearchBar.fill(cityToSearch);
    //     await citySearchBar.click();
    //     await searchButton.click();
        


    //     const page1Promise = page.waitForEvent('popup');
    //     await page.locator('picture').first().click();
    //     const page1 = await page1Promise;


    //     await page1.waitForSelector('#details_section');                                                    //verify for details section structure                    
    //     await expect(page1.getByRole('button', { name: 'Compartir' })).toBeVisible();
    //     await expect(page1.getByRole('button', { name: 'Compartir' })).toContainText('Compartir');
    //     await expect(page1.getByRole('button', { name: 'Guardar' })).toBeVisible();
    //     await expect(page1.getByRole('button', { name: 'Guardar' })).toContainText('Guardar');
    //     await expect(page1.getByRole('heading', { name: 'Descripción del espacio' })).toBeVisible();
    //     await expect(page1.getByRole('heading', { name: 'Descripción del espacio' })).toContainText('Descripción del espacio');
        
        
    //     await page1.waitForSelector('.EstateDetailsstyled__MainActionsCard-sc-9oojuf-4');                   
    //     await expect(page1.getByRole('button', { name: 'Agendar una visita' })).toBeVisible();

    // });

})

