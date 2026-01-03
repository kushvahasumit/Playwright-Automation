import {test} from '@playwright/test'

test('Verify Calculator', {tag:'@smoke'}, async ({page, browser}) => {
  page.goto(`${process.env.Franchise_url}/base/dashboard`);

  await page.getByRole('link', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'calculate Calculator' }).click();

  await page.getByRole('link', { name: 'calculate Calculator' }).click();
  await page.getByRole('tabpanel', { name: 'International' }).getByLabel('Default select example').selectOption('Australia');

  await page.getByRole('textbox', { name: 'Delivery Pin Code' }).fill('2007');
  await page.getByRole('textbox', { name: 'Delivery Pin Code' }).press('Tab');
  await page.getByRole('spinbutton', { name: '0.00' }).fill('1.235');
  await page.getByRole('spinbutton', { name: '0.00' }).press('Tab');
  await page.getByRole('spinbutton', { name: 'L', exact: true }).fill('1');
  await page.getByRole('spinbutton', { name: 'L', exact: true }).press('Tab');
  await page.getByRole('spinbutton', { name: 'B' }).fill('2');
  await page.getByRole('spinbutton', { name: 'B' }).press('Tab');
  await page.getByRole('spinbutton', { name: 'H' }).fill('3');
  await page.getByRole('spinbutton', { name: 'H' }).press('Tab');
  await page.getByRole('spinbutton', { name: 'Invoice value (₹)' }).fill('589');
  await page.getByRole('spinbutton', { name: 'Invoice value (₹)' }).press('Tab');
  await page.getByRole('button', { name: 'Calculator' }).click();

  await page.screenshot({fullPage:true,path: 'tests/franchisee/calcService/service.png',animations:'disabled'})

})

// if we using workers more, that only applicable, if test cases are 2 or seperate not in group(describe) that run on diffrent workers else use only 1 worker if test is serials
// for practice

test("For practice", {tag:'@smoke'}, async ({page})=>{
  // For learning purpose

  await page.goto(`${process.env.Base_url}`);
  await page.getByTitle('One Network, Unlimited Reach').isVisible();

  // await page.dragAndDrop('#source', '#target', {
  // sourcePosition: { x: 34, y: 7 },
  // targetPosition: { x: 10, y: 20 },
  // })

  // const locator = await page.frameLocator('#iframe').getByText('One Network, Unlimited Reach')
  // locator.click();

  // const array = [4,5,6,7];
  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  //   console.log(element)
  // }

  // await page.waitForTimeout(2000);

  // const resolvePromise = await Promise.all([
  // await page.goto(`${process.env.Base_url}`),
  // await page.getByTitle('One Network, Unlimited Reach').isVisible()
  // ])


  // keyboard or mouse events

  await page.keyboard.press('A');
  await page.screenshot({fullPage:false, path: 'tests/franchisee/passbook/a.png', animations:'disabled'});

  await page.mouse.move(100,200);
  await page.mouse.click(100,200,{button:'right'});

})
