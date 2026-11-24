import { test, expect, Locator, chromium } from '@playwright/test'
//Browser---Context----Pages

//Browser--- chromium, firefox,webkit
//Context-can create multiple Contexts from same Browser 
//Pages-Tab, Window, Pop up

/* page fixture
test("Browser Context", async({page})=>
{
await page.goto("https://testautomationpractice.blogspot.com/")

})*/

/*creating page from Context fixture 
test("Browser Context", async({context})=>
{
   const page =await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/")

}) */
// creating context from browser fixture and then a creating a page from Context
/*
test("Browser Context", async ({  }) => {

    //instead of using default broswer from config we can have own broswer
    const browser=await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/")

}) */

    test("Browser Context", async ({  }) => {

    //instead of using default broswer from config we can have own broswer
    const browser=await chromium.launch(); //create browser 
    const context = await browser.newContext(); //create context 
    const page1 = await context.newPage(); //create page 1
    const page2=await context.newPage(); //create page 2
    console.log("NO of pages created:", context.pages.length); //2

    await page1.goto("https://testautomationpractice.blogspot.com/");
    await expect(page1).toHaveTitle("Automation Testing Practice");
    await page1.waitForTimeout(5000)
 
    await page2.goto("https://www.w3schools.com/")
    await expect(page2).toHaveTitle("W3Schools Online Web Tutorials");
await page2.waitForTimeout(5000)

}) 