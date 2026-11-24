import { test, expect, Locator } from '@playwright/test';
test('Boostrap hidden dropdown', async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.waitForTimeout(5000);
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button[type='submit']").click();

    
    //click oon PIM
    await page.getByText("PIM").click();
    //click on job Title description
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(5000);
    //capture all the options
    const jobTitleOptions:Locator= page.locator("div[role='listbox'] span");
const count:number=await jobTitleOptions.count();
console.log("Number of Job Title Options:", count)

for(let i=0;i<count;i++)
   //console.log( await jobTitleOptions.nth(i).textContent());

console.log( await jobTitleOptions.nth(i).innerText());

//select/click on option
for(let i=0;i<count;i++){
   //console.log( await jobTitleOptions.nth(i).textContent());

const text = await jobTitleOptions.nth(i).innerText();
if(text==="QA")
{
await jobTitleOptions.nth(i).click()
}
}
await page.waitForTimeout(3000)})

