import {test,expect, Locator} from '@playwright/test'

test("verify css locators", async({page})=>{

await page.goto("https://www.w3schools.com/");
await page.waitForTimeout(5000)
//await expect(page.locator('input#tnb-google-search-input')).toBeVisible();

// expect(page.locator('div.tnb-button-light')).toBeVisible();

//await expect(page.locator("input[aria-label='Search field']")).toBeVisible();

await expect(page.locator("div.input[aria-label='Search field']")).toBeVisible();



})