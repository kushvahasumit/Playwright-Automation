import {test, expect} from '@playwright/test'

test('Apply courior rule', {tag:"@smoke"}, async ({page})=>{
  page.goto(`${process.env.Franchise_url}/base/dashboard`);

  await page.getByRole('link', { name: 'menu' }).click();
  await expect(page.getByRole('button', { name: 'flight_takeoff Create Order ' })).toBeVisible();

  await page.getByRole('button', { name: 'construction Tools ' }).click();
  await expect(page.getByRole('button', { name: 'construction Tools ' })).toBeVisible();

  await page.getByRole('link', { name: 'Courier Rules', exact: true }).click();

  await page.getByRole('link', { name: 'Add Rules' }).click();
  await page.getByRole('slider').first().fill('1');
  await page.getByRole('slider').nth(1).fill('20');

  await expect(page.getByRole('link', { name: 'AGC' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Select Destinaton to Set the' }).click();
  await expect(page.getByRole('option', { name: 'Select Destinaton to Set the' })).toBeVisible();

  await page.getByRole('option', { name: 'Hong Kong' }).click();
  await expect(page.getByRole('combobox', { name: 'Australia' })).toBeVisible();

  // drag&drop feature applied here
  await page.dragAndDrop('.service-logo >> nth=0','#addServicesToMakeRules',{
  sourcePosition: { x: 10, y: 10 },
  targetPosition: { x: 100, y: 20 },
  force: true,
  timeout: 5000
  })

  await page.locator('#courierRuleNametoAdd').click();
  await page.locator('#courierRuleNametoAdd').fill('rule for australia');
  await page.getByRole('button', { name: 'Rule It' }).click();

})
