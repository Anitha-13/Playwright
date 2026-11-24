import { test, expect } from '@playwright/test'
import { LoginPage } from "../PageLocators/login.page";

test("test3, Verify Overdraft Banner", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('overdraft_user', 'bank_sauce')

    await loginPage.navigateToAccounts();
    const AccountPageMessage = "My Accounts"
    expect(await loginPage.AccountsPage.innerText()).toBe(AccountPageMessage)
    console.log("-----------------------")


    expect(loginPage.table).toBeVisible();
    expect(loginPage.rows).toHaveCount(3)
    const rowCount = await loginPage.rows.count()
    console.log("Rows expected are 3 ")

    const checkingsStatus = await (loginPage.table.locator('tr').nth(1).locator('td').nth(3).innerText())
    expect(checkingsStatus).toContain("Overdrawn")

    for (let i = 1; i < rowCount; i++) {
        const status = await loginPage.table.locator('tr').nth(i).locator('td').nth(3).innerText()
        console.log("status of the accounts are", status)
    }

})



test("test4, Verify Frozen Account Alert", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('frozen_user', 'bank_sauce')

    await loginPage.navigateToAccounts();


    const accountstatus = await loginPage.accountFrozen.innerText()

    console.log(accountstatus)
    expect(accountstatus).toContain("Account Frozen")



})


test.only("test5, Verify Add Account Functionality", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'bank_sauce')
    await loginPage.navigateToAccounts();

    const AddAccount = page.getByTestId('add-account-btn')

    await AddAccount.click();
    //await page.locator("_r_1_").click();
    //page.on('dialog',async (dialog) =>{

        
    await page.getByLabel('Account Name').fill("Dummy")
    await page.waitForTimeout(5000)
    await page.getByTestId("account-form-type-select").click()
    //await page.getByRole("button",{name:'Select type'}).click()
    await page.getByRole("option",{name:'Credit'}).click()
    console.log("selected");
    
    //await page.locator("#base-ui-_r_42_").clear()
    await page.locator("input[type='number']").fill('200')
    await page.getByRole("checkbox").click();
    await page.getByTestId("save-account-form-btn").click()

    await page.waitForTimeout(5000)

    expect(loginPage.table).toBeVisible();
    expect(loginPage.rows).toHaveCount(4)
    const rowCount = await loginPage.rows.count()
    console.log("Rows expected are 3 ")

    const accountNames:string[]=[]
    for (let i = 1; i <rowCount; i++) {


            const row = loginPage.rows.nth(i)
            console.log(row);
            //const lastrow=await loginPage.rows.nth(3).allInnerTexts()
            //console.log(lastrow);
            //expect(lastrow).('Dummy')
            //expect((await loginPage.rows.nth(3).allInnerTexts)).toContain()
            const accountNamesR= await row.locator("td:nth-child(2)").innerText()
            const accountTypeR=await row.locator("td:nth-child(1)").innerText()
            console.log(accountNamesR)
            console.log(accountTypeR);

           accountNames.push(accountNamesR)


        }

        expect(accountNames).toContain('Credit')

const newrow=await page.getByRole('row',{name:'Dummy'})
console.log(newrow);

            await expect(newrow).toBeVisible
       
    //})



})