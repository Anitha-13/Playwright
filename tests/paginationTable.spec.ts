import { test, expect, Locator } from '@playwright/test';
test("pagination table", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")
    let hasmorepages = 'true';
    while (hasmorepages) {
        const rows: Locator[] = await page.locator("#example tbody tr").all();
        for (let row of rows) {
            console.log(await row.innerText());

        }

        const nextButton: Locator = page.locator('button[aria-label="Next"]');
        const buttonDisabled = await nextButton.getAttribute('class');
        console.log(buttonDisabled)

        if (buttonDisabled?.includes('disabled')) {
            hasmorepages = false;
        }
        else {
            await (nextButton.click())
        }
    }
}
)



test("change entries and check the count of rows", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")
    //change the entry per page 
    const entries: Locator = page.locator("select[class='dt-input']");
    await entries.selectOption({ label: '25' })

    const rows: Locator = await page.locator("#example tbody tr");
    const rowCount = await rows.count()
    expect(rowCount).toBe(25)
}
)

test.only("search particular name and check whether filer works", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    await page.waitForTimeout(5000);
    //change the entry per page 
    const searchbar: Locator = page.locator("input[type='search']");
    await expect(searchbar).toBeVisible();
    await searchbar.fill('Serge Baldwin');

    const rows: Locator[] = await page.locator("#example tbody tr").all();
    console.log(rows)
    if (rows.length >= 1) {
        let matchfound=false;
        for (let row of rows) {
            const text: string = await row.innerText();
            console.log(text)
            if (text.includes('Serge Baldwin')) {


                console.log("Record exist")
                matchfound=true;
                break;
            }
            expect(matchfound).toBeTruthy
           
        }
    }
 else {
                console.log("No record exist with search name")
            }



}
)

