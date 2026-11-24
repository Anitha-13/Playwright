import { test, expect, Locator } from '@playwright/test';

test("verify textbox actions", async ({ page }) => {
    page.goto("https://testautomationpractice.blogspot.com/")
    await page.waitForTimeout(5000);


    const NameHolder: Locator = page.locator("#name");

    await expect(NameHolder).toBeVisible();
    await expect(NameHolder).toBeEnabled();

    const textBoxLength: string | null = await NameHolder.getAttribute("maxlength");
    expect(textBoxLength).toBe('15');

    await NameHolder.fill("Anitha");

    console.log("text of firstName:", await NameHolder.textContent()); //returns empty
    console.log("text of firstName:", await NameHolder.inputValue()); //returns value 

    const emailHolder: Locator = page.locator("#email");
    await emailHolder.fill("Anitha@gmail.com");

    const phoneHolder: Locator = page.locator("#phone");
    await phoneHolder.fill("123456");

    const addressHolder: Locator = page.locator("textarea[class='form-control']");
    await addressHolder.fill("Anitha");







}
)

test('radio button actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.waitForTimeout(5000)
    const maleRadio: Locator=page.locator("input[id=male]");
    expect(maleRadio.isVisible());
    expect(await maleRadio.isChecked()).toBe(false);
    await page.locator("input[id=male]").check();
    expect(await maleRadio.isChecked()).toBe(true);


   // await expect(page.locator("input[id=male]")).toBeChecked();

})


test.only('select actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.waitForTimeout(5000);

    const colours:any =await page.locator('//*[@id="colors"]/option').allTextContents();
    console.log(colours);

    for(let colourselect in colours)
    {
 await page.getByLabel(colours).selectOption('green');
    }


   

})


