import { Expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    //declare the type of page and locators
    readonly page: Page
    readonly userName: Locator
    readonly passWord: Locator
    readonly submit: Locator
    readonly Accounts: Locator
    readonly AccountsPage: Locator
readonly table: Locator
readonly rows: Locator
readonly columns: Locator
readonly accountFrozen:Locator


    //initialize the properties inside constructor
    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator("input[id='login-username']")
        this.passWord = page.locator("input[id='login-password']")
        this.submit = page.locator("button[type='submit']")

        //Account Locators
        this.Accounts = page.locator("a[data-testid='sidebar-link-accounts']")
        this.AccountsPage = page.locator("[data-testid='accounts-page-title']")
        this.table = page.locator("table[data-testid='accounts-table']")
        this.rows = this.table.locator("tr");
        this.columns=this.rows.locator("td")
        this.accountFrozen=page.locator("div[data-testid='frozen-account-banner']")


    }

    // actionable methods
    async navigateTo() {
        await this.page.goto("https://qaplayground.com/bank/login");
    }

    async login(user: string, pass: string) {
        await this.userName.fill(user)
        await this.passWord.fill(pass)
        await this.submit.click();
    }


    async navigateToAccounts() {
        await this.Accounts.click();
        await this.page.waitForLoadState();



    }

}
