import{test, expect,Locator} from "@playwright/test";


/*
built-in Locators
css selectors
xpaths
*/
test(" Verify playwrightLocators", async({page})=>
{
await page.goto("https://demo.nopcommerce.com/");

const logo:Locator=page.getByAltText("nopCommerce demo store");
logo.click();
await expect(logo).toBeVisible();

await expect(page.getByText("Welcome to our store")).toBeVisible();

await page.getByRole("link",{name:'Register'}).click();
await expect(page.getByRole("heading",{name:'Register'})).toBeVisible();

await page.getByLabel('FirstName').fill("John");
await page.getByLabel('Last name').fill("Kennedy");
await page.getByLabel('Email').fill("john@gmail.com")

page.getByPlaceholder('Search store').fill('Apple z')
})