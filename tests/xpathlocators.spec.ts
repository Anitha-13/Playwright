import{test,expect, Locator} from "@playwright/test"

test("verify the xpath locators",async ({page})=>
{
await page.
goto("https://demowebshop.tricentis.com/")

//absolutepath
const absolutelogo:Locator=page.locator("//html/body/div[4]/div[1]/div[1]/div[1]/a/img");
await expect(absolutelogo).toBeVisible();
//relativepath
const relativelogo:Locator=page.locator("//img[@alt='Tricentis Demo Web Shop']");
await expect(relativelogo).toBeVisible();
//contains
const products=page.locator("//h2/a[contains(@href,'computer')]");
const productsCount:number= await products.count();
console.log("no of computer products:" +productsCount );
expect(productsCount).toBeGreaterThan(0);

//console.log(await products.textContent()); //strict mode violation
console.log(await products.first().textContent());
console.log(await products.last().textContent());
console.log(await products.nth(2).textContent());

let productTitles:String[]= await products.allTextContents();
for(let pt of productTitles)
{
    console.log(pt)
}

//starts-with
const items =page.locator("//h2/a[starts-with(@href,'/build')]")
console.log(await items.allTextContents());

const itemsNames:string[]=await items.allTextContents();
for(let iN of itemsNames)
{
    console.log(iN);
}
//text()
const regLink: Locator=page.locator("//a[text()='Register']")
await expect(regLink).toBeVisible();

//last

const lastItem:Locator=page.locator("//div[@class='column follow-us']/ul/li[last()]");
await expect(lastItem).toBeVisible();
console.log(await lastItem.textContent());

//position
const positionItem:Locator=page.locator("//div[@class='column follow-us']/ul/li[position()=2]");
await expect(positionItem).toBeVisible();
console.log(await positionItem.textContent())

})