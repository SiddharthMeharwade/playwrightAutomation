import {test,expect} from '@playwright/test'
const { allure } = require('allure-playwright');


test('Challenge1',async ({page})=>{
    //Goto Page
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.screenshot({ path: 'screenshots/step0_navigate.png' });
    //allure.step('Navigated to TodoMVC');

    //Page Title
    const pageTitle= await page.title();
    console.log('Page title is:',pageTitle);
    await page.screenshot({ path: 'screenshots/step1_page_title.png' });

    //Page URl
    const pageURL=page.url();
    console.log('Page Url is:',pageURL);
    await page.screenshot({ path: 'screenshots/step2_validate_url.png' });

    //Validate Title and URL
    await expect(page).toHaveTitle('TodoMVC: React');
    await expect(page).toHaveURL('https://todomvc.com/examples/react/dist/');

    //Add TODO item with current date
    const today = new Date().toISOString().split('T')[0];
    const todo1 = `TODO 1 - ${today}`;
    await page.fill("//input[@id='todo-input']", todo1);
    await page.press("//input[@id='todo-input']", 'Enter');
    await page.screenshot({ path: 'screenshots/step3_add_todo1.png' });
    //allure.step(`Added TODO item: ${todo1}`);

    //Verify item appears in the list
    const listitems = await page.$$('.todo-list');
    var listarray=[];
    for(var item of listitems){
        var listtext=await item.textContent();
        listarray.push(listtext);
    }
    expect(listarray).toContain(todo1);
    await page.screenshot({ path: 'screenshots/step4_verify_todo1.png' });
    //allure.step('Verified TODO 1 appears in the list');

    //Add TODO item with tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todo2 = `TODO 2 - ${tomorrow.toISOString().split('T')[0]}`;
    await page.fill("//input[@id='todo-input']", todo2);
    await page.press("//input[@id='todo-input']", 'Enter');
    await page.screenshot({ path: 'screenshots/step5_add_todo2.png' });
    //allure.step(`Added TODO item: ${todo2}`);

    //Mark TODO 1 as completed
    await page.click(`.todo-list li:has-text("${todo1}") .toggle`);
    await page.screenshot({ path: 'screenshots/step6_mark_completed.png' });
    //allure.step('Marked TODO 1 as completed');
    
    //Verify item is displayed as completed
    const completedClass = await page.getAttribute(`.todo-list li:has-text("${todo1}")`, 'class');
    expect(completedClass).toContain('completed');
    await page.screenshot({ path: 'screenshots/step7_verify_completed.png' });
    //allure.step('Verified TODO 1 is displayed as completed');


    //Delete TODO 2 item
    await page.hover(`.todo-list li:has-text("${todo2}")`);
    await page.click(`.todo-list li:has-text("${todo2}") .destroy`, { force: true });
    await page.screenshot({ path: 'screenshots/step8_delete_todo2.png' });
    //allure.step('Deleted TODO 2');

    //Verify TODO 2 is removed from the list
    /*const updatedItems = await page.$$eval('.todo-list li', items => items.map(item => item.textContent));
    expect(updatedItems).not.toContain(todo2);
    */


    //Verify item appears in the list
    const updateditems = await page.$$('.todo-list');
    var listarray=[];
    for(var item of updateditems){
        var listtext=await item.textContent();
        listarray.push(listtext);
    }
    expect(listarray).not.toContain(todo2);
    await page.screenshot({ path: 'screenshots/step9_verify_removal.png' });
    //allure.step('Verified TODO 2 is removed from the list');

    await page.close();
})

