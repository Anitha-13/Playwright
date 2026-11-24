import { test, expect, Locator } from '@playwright/test'

test('select actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.waitForTimeout(5000);

    //select option from the dropdown
    await page.locator('[id=colors]').selectOption('Red') //visibletext
    await page.locator('[id=colors]').selectOption({ value: 'red' }) //by using value attribute
    await page.locator('[id=colors]').selectOption({ index: 4 }) //by using index
    await page.locator('[id=colors]').selectOption({ label: 'Red' }) // by using label

    //check dropdown count
    const dropdownOptions: Locator = page.locator('[id=colors] option');
    await expect(dropdownOptions).toHaveCount(7)

    const colours: any = await page.locator('//*[@id="colors"]/option');
    console.log(colours);
    /* o/p: locator('//*[@id="colors"]/option') */

    const coloursText: any = await page.locator('//*[@id="colors"]/option').allTextContents();
    console.log(coloursText);
    /* o/p [
      '\n        Red\n      ',
      '\n        Blue\n      ',
      '\n        Green\n      ',
      '\n        Yellow\n      ',
      '\n        Red\n      ',
      '\n        White\n      ',
      '\n        Green\n      '
    ] */

    //need to trim and get text options:

    const coloursTextOption: string[] = (await page.locator('//*[@id="colors"]/option').allTextContents()).map(text => text.trim())
    console.log(coloursTextOption)
    /*o/p [
  'Red',   'Blue',
  'Green', 'Yellow',
  'Red',   'White',
  'Green'
] */

    expect(coloursTextOption).toContain('Blue');

    //print colours
    for (const colour of coloursTextOption) {
        console.log(colour)
    }
    /*o/p: Red
Blue
Green
Yellow
Red
White
Green */
}
)