import { test, expect, Locator } from '@playwright/test'
test("Simple Alert Dialogs", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");


//Register a dialog handler
    page.on('dialog', (dialog) => {
        console.log('Dialog type is', dialog.type());
        expect(dialog.type()).toContain('alert');
        console.log("Dialog Text:", dialog.message());
        expect(dialog.message()).toContain("I am an alert box!")
        dialog.accept();
    })


    //playwright automaticatically dismiss the alerts 

    await page.locator("button[id='alertBtn']").click();  
        await page.waitForTimeout(5000);

})


test.only("Confirmation Dialogs", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log('Dialog type is', dialog.type());
        expect(dialog.type()).toContain('confirm');
        console.log("Dialog Text:", dialog.message());
        expect(dialog.message()).toContain("Press a button!")
      //  dialog.accept();
      dialog.dismiss();


    })

    await page.locator("button[id='confirmBtn']").click();
    const text: string = await page.locator("#demo").innerText();
    console.log(text)
    //await expect(page.locator("#demo")).toHaveText("You pressed OK!")
   await expect(page.locator("#demo")).toHaveText("You pressed Cancel!") 
    await page.waitForTimeout(5000);

})


test("Prompt Dialogs", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log('Dialog type is', dialog.type());
        expect(dialog.type()).toContain('prompt');
        console.log("Dialog Text:", dialog.message());
        expect(dialog.message()).toContain("Please enter your name:")
        expect(dialog.defaultValue()).toContain("Harry Potter")

        dialog.accept('John');


    })

    await page.locator("button[id='promptBtn']").click(); 

    const text: string = await page.locator("#demo").innerText();
    console.log(text)
    await expect(page.locator("#demo")).toHaveText("Hello John! How are you today?")
    
    await page.waitForTimeout(5000);
   

})
     