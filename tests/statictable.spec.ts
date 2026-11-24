import { test, expect, Locator } from '@playwright/test'
test("static table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const Table: Locator = page.locator("table[name='BookTable']");
    await expect(Table).toBeVisible();

    //count no of rows in a table
    const Rows: Locator = Table.locator("tr");
    //const Rows: Locator= page.locator("table[name='BookTable'] tbody tr");
    const rowCount = await Rows.count();
    console.log(rowCount);
    expect(rowCount).toBe(7);

    //count no of columns in a table
    const columns: Locator = Rows.locator("th");
    //const columns: Locator= page.locator("table[name='BookTable'] tbody tr th");
    const columnCount = await columns.count();
    console.log(columnCount);
    expect(columnCount).toBe(4);


    //count no of cells in a table
    const cells: Locator = Rows.locator("td");
    const cellsData: string[] = await Rows.locator("td").allInnerTexts();
    console.log("printing cellsData");
    console.log(cellsData);
    //const cells: Locator= page.locator("table[name='BookTable'] tbody tr td");
    const cellCount = await cells.count();
    console.log(cellCount);
    expect(cellCount).toBe(24);
    for (let data of cellsData) {
        console.log(data);
        //console.log(data.join('\t'));     //string output can't apply join

    }



    //read all data from 2nd row
    const secondRowCells: Locator = Rows.nth(1).locator('td');
    const secondRowTexts: string[] = await secondRowCells.allInnerTexts();
    console.log(secondRowTexts);

    await expect(secondRowCells).toHaveText(['Learn Selenium', 'Amit', 'Selenium', '300']);
    for (let text of secondRowTexts) {
        console.log(text)
    }

    //read all data from table excluding header
    const allRowData = await Rows.all();
    for (let row of allRowData.slice(1)) {
        const cellsData: string[] = await row.locator("td").allInnerTexts();
        console.log(cellsData.join('\t'))
    }

    //print book names where author is Mukesh
    console.log("Books written by Mukesh");
    const MukeshBooks: string[] = [];
    for (let row of allRowData.slice(1)) {
        const cellsData: string[] = await row.locator("td").allInnerTexts();
        const Books = cellsData[0];
        const Author = cellsData[1];
        if (Author === 'Mukesh') {
            console.log(`${Author} \t ${Books}`);
            MukeshBooks.push(Books);

        }


    }

    //calculate total price of all books
    let TotalPrice = 0
    for (let row of allRowData.slice(1)) {
        const cellsData: string[] = await row.locator("td").allInnerTexts();
        const Price = cellsData[3];
        TotalPrice = TotalPrice + parseInt(Price);
       

    }
     console.log(TotalPrice);
}
)