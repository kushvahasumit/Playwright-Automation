import {test,expect} from '@playwright/test';

test('Download Passbook Details', {tag:'@smoke'}, async ({page})=>{
  page.goto(`${process.env.Franchise_url}/base/payments`);

  await page.getByRole('link', { name: 'menu' }).click();

  await page.getByRole('link', { name: 'credit_card Payments' }).click();

  await page.waitForTimeout(3000)
  expect(await page.screenshot({ fullPage: true, animations:"disabled",path:'tests/franchisee/passbook/passbook.png' }));

})
