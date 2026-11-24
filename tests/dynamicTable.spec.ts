import { test, expect, Locator } from '@playwright/test'
test("Dynamic Table", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    const table: Locator = page.locator("table[class='table table-striped'] tbody");
    await expect(table).toBeVisible();

    const headers: Locator = page.locator("table[class='table table-striped'] th")
    const headerCount = await headers.count();
    console.log(headerCount)
    expect(headerCount).toBe(5);

    //const rows:Locator=table.locator('tr');
    const rows: Locator = page.locator("table[class='table table-striped'] tbody tr");
    const rowCount = await rows.count();
    console.log(rowCount)
    expect(rowCount).toBe(4);

    const columns: Locator = rows.locator('td');
    const columnCount = await columns.count();
    console.log(columnCount)
    expect(columnCount).toBe(20);

    

    const rowDataLocators: Locator[] = await rows.all();
    console.log(rowDataLocators)
    for (let text of rowDataLocators) {
        const D = (await text.allInnerTexts())
        console.log(D.join('\t'))
        

         let CPULoad = '';
    for (const row of rowDataLocators) {

        const tableData: string = await row.locator('td').nth(0).innerText();
        //console.log(tableData)
        if (tableData === "Chrome") {
            console.log("get CPU Load ")
            CPULoad = await row.locator("td", { hasText: '%' }).innerText();
            console.log("cpuload is", CPULoad)
            break;
        }
    }
    const validateCPUload: string = await page.locator("#chrome-cpu").innerText();
    console.log("Validated CPU Load from Para:", validateCPUload)
    expect(validateCPUload).toContain(CPULoad)

    }


})