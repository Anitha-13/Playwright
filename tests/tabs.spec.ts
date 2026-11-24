import{test,expect, Locator,chromium } from '@playwright/test'

    test("Browser Context", async ({  }) => {

    const browser=await chromium.launch(); //create browser 
    const context = await browser.newContext();

// creating 1 page
const parentPage=await context.newPage();
parentPage.goto("https://testautomationpractice.blogspot.com/");

//2 statements should go parallely
//context.waitforEvent('page');  //pending,fulfilled,rejected
//parentPage.locator("button:has-text('New Tab)").click() //opens new tab, new page

//const childPage= await Promise.all([context.waitForEvent('page'),parentPage.locator("button:has-text('New Tab)").click()]);
const [childPage]= await Promise.all([context.waitForEvent('page'), parentPage.locator("button[onclick='myFunction()']").click()]);


const pages=context.pages();
console.log("no of pages created:", pages.length)

//Approach 1
console.log("title of parent page:", await pages[0].title());
console.log("title of parent page:", await pages[0].title());

//Approach 2
console.log("title of parent page:", await parentPage.title());
console.log("title of parent page:", await childPage.title());

    })