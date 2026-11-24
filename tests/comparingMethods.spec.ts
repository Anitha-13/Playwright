import{test,expect,Locator} from '@playwright/test'
test("Comparing Methods", async({page})=>
{
await page.goto("https://demowebshop.tricentis.com/")
await page.waitForTimeout(5000)
const products:Locator = page.locator(".product-title");
const count=await products.count();
console.log("no of products:",count)
/*
console.log(await products.nth(1).innerText()); //gives text
console.log(await products.nth(1).textContent()); //extracts text along with hidden elements

for(let i=0;i<count;i++)
{
   //console.log( await products.nth(i).innerText());
   const prodNames:string|null=(await products.nth(i).textContent());
   console.log(prodNames?.trim());
   

}
*/
//2 allinnerText() vs allTextContent()
//console.log("Comparing allinnerText() vs allTextContent()")
   
  const prodNames:string[]= await products.allInnerTexts();
  console.log(prodNames);
  /* extracts text in an array:
  [
  '$25 Virtual Gift Card',
  '14.1-inch Laptop',
  'Build your own cheap computer',
  'Build your own computer',
  'Build your own expensive computer',
  'Simple Computer'
] */
  const prodNamesTC:string[]=  await products.allTextContents();
  console.log(prodNamesTC);
  /*Extract text along with hidden elements in an array
  [
  '\n            $25 Virtual Gift Card\n        ',
  '\n            14.1-inch Laptop\n        ',
  '\n            Build your own cheap computer\n        ',
  '\n            Build your own computer\n        ',
  '\n            Build your own expensive computer\n        ',
  '\n            Simple Computer\n        '
] */
const trimmedProducts:string[]=prodNamesTC.map(text=>text.trim());
console.log(trimmedProducts);

//3 all()-converts Locator---->Locator
const productLocators:Locator[]=await products.all();
console.log(productLocators)

//for of ----gives values
for (let P of productLocators)
{
  console.log(await P.innerText()) ;
}
// for in gives in the object---> gives keys/properties/indexes
for (let P in productLocators)
{
  console.log(await productLocators[P].innerText()) ;
}

}

)