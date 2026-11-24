import{test, expect, Locator} from '@playwright/test'
test('Autosuggest dropdown', async({page})=>{
    await page.goto("https://www.flipkart.com/");
    await page.waitForTimeout(5000)

    await page.locator("span[role='button']").click();
    await page.locator("#container > div > div.HaReuk > div > div > div > div > div > div > div > div > div > div.FO_kXv > div > div > div:nth-child(2) > div > div > div > div > div > header > div.lfFUxn > div.olwU0Z.CXZSEo > form > div > div > input").fill("smart"); //searh text
    
    //get all suggested options--> ctrl+shift+P on DOM --> emulate focused page
    const options:Locator=page.locator("ul>li");
    await page.waitForTimeout(5000)
    const count=await options.count();
    console.log("number of suggested options:", count)
    //printing all suggested options
    console.log("5 th option:", await options.nth(5).innerText())

    for(let i=0;i<count;i++)
    {
        console.log( await options.nth(i).innerText())
    }

    //select click on the option : smartphone
    for(let i=0;i<count;i++)
    {
        //const text=await options.nth(i).innerText();
        const text=await options.nth(i).textContent();
        
        if(text==='smartphone')
        {
           await options.nth(i).click();
            break;
        }
        }
})