import { test, expect } from '@playwright/test'
import { LoginPage } from "../PageLocators/login.page";
test.describe('Account Test Cases', () => {
    test.beforeEach('Login into Secure Bank app', async ({ page }) => {



        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.login('standard_user', 'bank_sauce')

    })


    test("test01 Verify Accounts List Load", async ({ page }) => {

        console.log("In test1")
        const loginPage = new LoginPage(page);
        await loginPage.navigateToAccounts();
        const AccountPageMessage = "My Accounts"
        expect(await loginPage.AccountsPage.innerText()).toBe(AccountPageMessage)
        console.log("-----------------------")

        expect(loginPage.table).toBeVisible();
        expect(loginPage.rows).toHaveCount(3)
        const rowCount = await loginPage.rows.count()
        console.log("Rows expected are 3 ")


        for (let i = 1; i <= rowCount; i++) {


            const row = loginPage.rows.nth(i)
            const accountNames = await row.locator("td:nth-child(2)").innerText()
            console.log(accountNames)

        }



    })


    test.only("test02 Verify Account Details Display", async ({ page }) => {

        console.log("In test2")
        const loginPage = new LoginPage(page);
        await loginPage.navigateToAccounts();
        const AccountPageMessage = "My Accounts"
        expect(await loginPage.AccountsPage.innerText()).toBe(AccountPageMessage)
        console.log("-----------------------")

        expect(loginPage.table).toBeVisible();
        expect(loginPage.rows).toHaveCount(3)
        const rowCount = await loginPage.rows.count()
        console.log("Rows expected are 3 ")


        for (let i = 1; i < rowCount; i++) {


            const row = loginPage.rows.nth(i)
            const accountNames: string = await row.locator("td:nth-child(1)").innerText();
            console.log("The account names are ", accountNames)
            expect(row.locator("td:nth-child(1)")).toBeVisible();

            expect(accountNames).toContain("****")
            console.log("The account names are masked")

            await page.waitForTimeout(3000)
        }


    })

})