import{test, expect, Locator} from '@playwright/test';
test("Frames Demo", async({page})=>
{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    // total no of frames
    const frames=page.frames();
    console.log("Total no of Frames:", frames);


    //Approach 1: Page.frame accepts only frame name or url
   /* 
    const frame=page.frame({url: "https://ui.vision/demo/webtest/frames/frame_1"})
    if(frame)
    {
        await frame.locator("[name='mytext1']").fill("hello");
    
    }
    else{
        console.log("frame does not exist");
}
    await page.waitForTimeout(5000)
*/

    //Approach 2: using FrameLocator()

    const inputBox=page.frameLocator("[src='frame 1.html']").locator("[name='mytext1]");
    await inputBox.fill("John");
    await page.waitForTimeout(5000)
})


test.only("inner child frames demo", async({page})=>
{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frame3=page.frame({url: "https://ui.vision/demo/webtest/frames/frame_3"});

    if(frame3)
    {
        await frame3.locator("[name='mytext3']").fill("welcome");
        const childFrames=frame3.childFrames();
        console.log("no of childframes:", childFrames.length);
        const radio=childFrames[0].getByLabel("I am a human");
        await radio.check();
        await expect(radio).toBeChecked();

    }
    else
    {
        console.log("frame 3 is not found")

    }

    await page.waitForTimeout(5000)

})
