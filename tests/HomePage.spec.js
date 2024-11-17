const {test, expect} = require('@playwright/test');

test('Home Page',async({page})=>{

    await page.goto('https://demoblaze.com/index.html')

    const pageTitle= await page.title();
    console.log('Page title is:',pageTitle);

    const pageURL=page.url();
    console.log('Page Url is:',pageURL);

    await expect(page).toHaveTitle('STORE');
    await expect(page).toHaveURL('https://demoblaze.com/index.html');
    await page.close();

})