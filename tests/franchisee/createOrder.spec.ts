import {test,expect} from "@playwright/test"
import path from 'path'


test.describe('Franchise Order Workflow', ()=>{
  test.describe.configure({ mode: 'serial' });

  test('Department Selection & Order Creation', async ({page})=>{
  await page.goto(`${process.env.Franchise_url}/base/dashboard`)

  // Add order page
  await page.getByRole('link', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'flight_takeoff Create Order ' }).click();
  await expect(page.getByRole('button', { name: 'flight_takeoff Create Order ' })).toBeVisible();

  await page.getByRole('link', { name: 'Add Order' }).click();

  // Fill form
  await page.locator('#destination').selectOption('Australia');
  await page.locator('#consignorLastDetails').check();

  // consinee
  await page.locator('#consigneeName').click();
  await page.locator('#consigneeName').fill('test for report');
  await page.locator('#consigneeName').press('Tab');
  await page.locator('#consigneeAddress').fill('123 test report');
  await page.locator('#consigneeAddress').press('Tab');
  await page.locator('#consigneezipCode').fill('75001');
  await page.locator('#consigneezipCode').press('Tab');
  // await expect(page.getByRole('tooltip', { name: 'Show Available States By' })).toBeVisible();

  await page.getByRole('button', { name: 'expand_circle_down' }).click();
  await page.getByText('State*: expand_circle_down').click();
  await page.locator('#finalStateNameByDestination').selectOption('Queensland');
  await page.locator('#consigneeCity').click();
  await page.locator('#consigneeCity').fill('test');
  await page.locator('#consigneePhone').click();
  await page.locator('#consigneePhone').fill('8745968547');

  await page.locator('#interGoods').selectOption('Checking');
  await page.getByRole('spinbutton', { name: 'Pkgs * :' }).click();
  await page.getByRole('spinbutton', { name: 'Pkgs * :' }).fill('1');
  await page.locator('#actWeightJS').click();
  await page.locator('#actWeightJS').fill('1');
  await page.getByRole('spinbutton', { name: 'L', exact: true }).click();
  await page.getByRole('spinbutton', { name: 'L', exact: true }).fill('1');
  await page.getByRole('spinbutton', { name: 'W' }).click();
  await page.getByRole('spinbutton', { name: 'W' }).fill('2');
  await page.getByRole('spinbutton', { name: 'H', exact: true }).click();
  await page.getByRole('spinbutton', { name: 'H', exact: true }).fill('3');
  await page.getByPlaceholder('Pcs').click();
  await page.getByPlaceholder('Pcs').fill('5');
  await page.locator('#invValueCurrency').selectOption('INR');
  await page.getByRole('spinbutton', { name: 'Box * :' }).click();
  await page.getByRole('spinbutton', { name: 'Box * :' }).fill('1');
  await page.locator('#boxContent').selectOption('Raw');
  await page.locator('#boxHSN').selectOption('7859643');
  // sometimes .fill donts work so use .type or move to tab
  await page.getByRole('spinbutton', { name: 'Qty * :' }).click();
  await page.getByRole('spinbutton', { name: 'Qty * :' }).type('1');

  await page.getByRole('spinbutton', { name: 'Rate * :' }).click();
  await page.getByRole('spinbutton', { name: 'Rate * :' }).type('12');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('heading', { name: 'AGC-SELF' })).toBeVisible();

  await page.locator('.service-card-dropdown').first().click();
  await page.locator('#remark').click();
  await page.locator('#remark').fill('without courior rule');
  await page.getByRole('button', { name: 'Submit' }).click();

  })

  test("Orders Page & Manifest Generation", async ({ page }) => {
  await page.goto(`${process.env.Franchise_url}/international/orders`)

  await expect(page.getByRole('tabpanel', { name: 'New' })).toBeVisible();
    await page.reload();

  await page.waitForTimeout(20000);
  await page.getByRole('button', { name: 'box_add' }).first().click();
  await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();

  await page.getByRole('link', { name: 'border_color' }).first().click();
  await expect(page.getByRole('tabpanel', { name: 'New' })).toBeVisible();

  await page.getByRole('tab', { name: 'Ready To Ship' }).click();
  await expect(page.getByRole('tabpanel', { name: 'Ready To Ship' })).toBeVisible();

  await page.waitForTimeout(20000);
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('#shipTabelInternational > tr');
    return rows.length > 0;
  }, { timeout: 30000 }); // ( wait for CRON JOB response i.e used for AWB number )

  await page.reload();
await expect(page.getByRole('tabpanel', { name: 'Ready To Ship' })).toBeVisible();
  await page.getByRole('tab', { name: 'Ready To Ship' }).click();
  await expect(page.getByRole('tabpanel', { name: 'Ready To Ship' })).toBeVisible();

  await page.getByRole('checkbox', { name: 'check to get the last record' }).check();
  await page.getByRole('button', { name: 'deployed_code Bulk Action' }).click();
  await expect(page.getByRole('list', { name: 'deployed_code Tool Kit' })).toBeVisible();

  await page.getByRole('button', { name: 'Manifest' }).click();
  await expect(page.getByRole('dialog', { name: 'Manifestation Successful' })).toBeVisible();

  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Check Out' }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('tabpanel', { name: 'Manifest/ARF/' })).toBeVisible();

  await page1.getByRole('tabpanel', { name: 'Manifest/ARF/' }).getByLabel('', { exact: true }).check();
  await page1.getByRole('button', { name: 'deployed_code Bulk Action' }).click();
  await expect(page1.getByRole('list', { name: 'deployed_code Tool Kit' })).toBeVisible();

  await page1.getByRole('button', { name: 'Dispatch' }).click();
  await expect(page1.getByRole('dialog', { name: 'Select Warehouse Route' })).toBeVisible();

  await page1.getByRole('button', { name: 'Select this Route' }).first().click();

{
  await page.getByRole('tab', { name: 'Ready To Ship' }).click();
  // await expect(page.getByRole('tabpanel', { name: 'Ready To Ship' })).toBeVisible();

  // await page.locator('#shipTabelInternational > tr > td > .form-check').first().click();

  await page.getByRole('button', { name: 'deployed_code Bulk Action' }).click();
  // await expect(page.getByRole('list', { name: 'deployed_code Tool Kit' })).toBeVisible();

  await page.getByRole('button', { name: 'Manifest' }).click();
  await expect(page.getByRole('dialog', { name: 'Manifestation Successful' })).toBeVisible();

  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Check Out' }).click();
  const page1 = await page1Promise;
  // await expect(page1.getByRole('tabpanel', { name: 'Manifest/RTE/' })).toBeVisible();

  await page1.getByRole('tabpanel', { name: 'Manifest/RTE/' }).getByLabel('', { exact: true }).check();
  await page1.getByRole('button', { name: 'deployed_code Bulk Action' }).click();
  await expect(page1.getByRole('list', { name: 'deployed_code Tool Kit' })).toBeVisible();

  await page1.getByRole('button', { name: 'Dispatch' }).click();
  // await expect(page1.getByRole('dialog', { name: 'Select Warehouse Route' })).toBeVisible();

  await page1.getByRole('button', { name: 'Select this Route' }).first().click();
  // await expect(page1.getByRole('tabpanel', { name: 'Manifest/RTE/' })).toBeVisible();

  await page.waitForTimeout(2000)
  const [page2] = await Promise.all([
    page1.waitForEvent('popup', { timeout: 60000 }),      // start listening
    page1.getByRole('button', { name: 'Generate Manifest' }).click() // trigger
  ]);

}

  });

})
