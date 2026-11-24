import { test, expect, Locator } from "@playwright/test"

/* //POM Code
import { LoginPage } from "../PageLocators/login.page";
test("Login from qaplayground website",async({page})=>{
const loginPage= new LoginPage(page);
await loginPage.navigateTo();
await loginPage.login('standard_user', 'bank_sauce')
})
*/



test.describe('Secure Bank Test Cases', () => {
    test.beforeEach('Login into Secure Bank app', async ({ page }) => {

        await page.goto("https://qaplayground.com/bank/login");
        const userName: Locator = page.locator("input[id='login-username']")
        await userName.fill('standard_user')
        const passWord: Locator = page.locator("input[id='login-password']")
        await passWord.fill('bank_sauce')
        await page.locator("button[type='submit']").click();
    })


    test.skip("Login from qaplayground website", async ({ page }) => {
        await page.goto("https://qaplayground.com/")
        const demoApps: Locator = page.locator("#nav > div > ul > li:nth-child(3) > a")
        demoApps.click();
        const BankDemoApp: Locator = page.locator("img[alt='Bank demo app preview']")
        BankDemoApp.click()
    })


    test('Test01: Verify Dashboard Message', async ({ page }) => {
        //Verify Dashboard welcome Message
        console.log("Executing test case 01")
        await page.waitForLoadState();
        const Message = 'Welcome back, Alex'
        const welMessage: Locator = page.locator("[data-testid='dashboard-welcome-message']")
        const welMessageText = await welMessage.innerText();
        console.log("The welcome Message text from the locator", welMessageText)
        expect(welMessage).toContainText(Message)
    })

    test('Test02: Verify Total Balance Display', async ({ page }) => {
        //Verify Total Balance Display on Dashboard page
        const totalBalance: Locator = page.locator("p[data-testid='stat-card-net-worth-value']")
        const Amount = await totalBalance.innerText();
        console.log("The total amount displayed on Dashboard page", Amount)
    })

    test.only("Test03: Total Balance Check from both checkings and savings account", async ({ page }) => {
        await page.waitForTimeout(3000)


        const Amount: Locator = page.locator("p[data-testid='stat-card-net-worth-value']")
        const AmountD = await Amount.innerText();
        console.log("The total amount displayed on Dashboard page", AmountD)
        //const totalBalanceD: string = (AmountD.slice(1))
        const totalBalanceD: number = Number(AmountD.replace('$', ''))
        //let DashboardAmount:number=Number(totalBalanceD)
        console.log('The total amount displayed on Dashboard page without $', totalBalanceD)



        const Accounts: Locator = page.locator("a[data-testid='sidebar-link-accounts']")
        await Accounts.click();
        const AccountsPage: Locator = page.locator("[data-testid='accounts-page-title']")
        const AccountPageMessage = "My Accounts"
        expect(AccountsPage).toContainText(AccountPageMessage)
        console.log("-----------------------")
        await page.waitForTimeout(3000)
        const table: Locator = page.locator("table[data-testid='accounts-table']")
        expect(table).toBeVisible();
        const rows: Locator = table.locator("tr");
        const rowCount = await rows.count()
        console.log("The no of rows in the table is", rowCount)
        const rowData = await rows.all();
        console.log("The row data part is", rowData)
        const columns: Locator = rows.locator("td")
        const columnData = await columns.all()
        console.log(columnData)
        const testData = await columns.allInnerTexts()
        console.log("the test data is ", testData)
        let totalBalance = 0;
        for (let i = 1; i <= rowCount; i++) {
            const balance = await table.locator('tr').nth(i).locator('td').nth(2).innerText()
            console.log("the cellsdata is", balance)

            const clearbalance: number = Number(balance.replace('$', ''))
            console.log("The total balance is", clearbalance)

            totalBalance = totalBalance + clearbalance
        }

        console.log("The total balance from savings and checkings accounts is", totalBalance)


        
        expect(totalBalance).toBe(totalBalanceD)


    })

    test("Test04: Verify Recent Transactions Widget", async ({ page }) => {
        await page.waitForTimeout(5000)
        await page.waitForLoadState()
        const table: Locator = page.locator("table[class='w-full text-sm']");
        const rows: Locator = table.locator('tr')
        const rowCount = await rows.count()
        console.log("The no of rows:", rowCount)
        expect(rowCount).toBe(6)
        const rowData = await rows.all();
        const dateData = []
        for (let row of rowData.slice(1)) {
            const cellData: string[] = await row.locator('td').allTextContents()
            console.log("The celldata from rows", cellData)
            const Dates = cellData[0]
            dateData.push(Dates)

            console.log("The dates from rows", dateData)
        }
        const sorteddates: string[] = await dateData.toSorted();
        console.log("the sorted dates are", sorteddates)




        //expect(dateData).toEqual(sorteddates)
    })



    test("Test04: Verify Quick Transfer Link", async ({ page }) => {
        await page.waitForTimeout(5000)
        await page.waitForLoadState()
        const transfer: Locator = page.getByTestId("quick-action-transfer")
        await transfer.click()
        await expect(page).toHaveURL("https://qaplayground.com/bank/transfer")
    })

    test("Test05: Verify Quick Pay Bill Link", async ({ page }) => {
        await page.waitForTimeout(5000)
        const paybill: Locator = page.getByText("Pay a Bill")
        paybill.click()
        await expect(page).toHaveURL("https://qaplayground.com/bank/bill-pay")

    })

    test("Test04: Verify Theme Toggle", async ({ page }) => {
        await page.waitForTimeout(5000)
        const toggle: Locator = page.locator("button[aria-label='Switch to dark mode']")
        toggle.click()
        expect(page.getByRole("button").filter({ has: page.locator("[aria-label='Switch to light mode']") }))
        await page.waitForTimeout(5000)

    })




})