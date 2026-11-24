import { test, expect, Locator } from '@playwright/test'
test("assignment1", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const dynamicTable = page.locator("#taskTable tbody");
    await expect(dynamicTable).toBeVisible();
    const rows = page.locator("#taskTable tbody tr");
    const rowCount = await rows.count()
    expect(rowCount).toBe(4);
    const rowData: Locator[] = await rows.all()
    console.log(rowData)
    //validate CPU load of Chrome process//
    let CPULoad = '';
    for (const row of rowData) {

        const tableData: string = await row.locator('td').nth(0).innerText();
        //console.log(tableData)
        if (tableData === "Chrome") {
            console.log("get CPU Load ")
            CPULoad = await row.locator("td", { hasText: '%' }).innerText();
            console.log("cpuload is", CPULoad)
            break;
        }
    }
    const validateCPUload: string = await page.locator("strong[class='chrome-cpu']").innerText();
    console.log("Validated CPU Load from Para:", validateCPUload)
    expect(CPULoad).toContain(validateCPUload)

    let DS = ''
    for (const row of rowData) {
        const tableData: string = await row.locator('td').nth(0).innerText();
        //console.log(tableData);
        if (tableData === 'Firefox') {
            console.log('Get diskspace of Firefox process')

            // DS = await row.locator("td").filter({hasText:/^MB/s$/}).innerText();
            DS = await row.locator("td", { hasText: 'MB/s' }).innerText();
            console.log("Validated diskspace of Firefox Process:", DS)
            break;
        }
    }


    const validatediskspace: string = await page.locator("strong[class='firefox-disk']").innerText();
    console.log("Validated diskspace", validatediskspace)
    expect(DS).toContain(validatediskspace)

    /*   
       let MSFF='';
           //  Memory Size of Firefox process: 46.2 MB
           for (const row of rowData) {
               const tableData: string = await row.locator('td').nth(0).innerText();
               console.log(tableData);
               if (tableData === 'Firefox') {
                   console.log('Get Memory Size of Firefox process')
                 
                 MSFF = await row.locator("td").filter({hasText:/^MB$/}).innerText();
                   console.log(MSFF) 
                   break;
               }
                   */

    let NwSC = ''

    for (const row of rowData) {
        const tableData: string = await row.locator('td').nth(0).innerText();
        console.log(tableData);
        if (NwSC === 'Chrome') {
            // console.log('Get networkspeed of Chrome')

            //NwSC = await row.locator("td").filter({ hasText: /^Mbps$/ }).innerText();
            NwSC = await row.locator("td", { hasText: 'Mbps' }).innerText();
            console.log("Get networkspeed of Chrome", NwSC)
            break;
        }
        const validatentwspeed: string = await page.locator("strong[class='chrome-network']").innerText();
        console.log("Validated ntwspeed", validatentwspeed)
        expect(NwSC).toContain(validatentwspeed)

    }
})