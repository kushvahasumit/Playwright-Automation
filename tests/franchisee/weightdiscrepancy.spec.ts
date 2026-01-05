import {test,expect} from '@playwright/test'

test('should export all weight discrepancy', {tag:'@weightdiff'}, async ({page}) => {

  page.goto(`${process.env.Franchise_url}/base/dashboard`);

  await page.getByRole('link', { name: 'menu' }).click();

  await page.getByRole('button', { name: 'construction Tools ' }).click();
  await expect(page.getByRole('button', { name: 'construction Tools ' })).toBeVisible();

  await page.getByRole('link', { name: 'Weight Dispersency' }).click();
  await expect(page.getByRole('tabpanel', { name: 'International Order' })).toBeVisible();

  await page.getByRole('link', { name: 'download Export' }).click();
  await expect(page.getByRole('dialog', { name: 'Accepting Terms and Conditions' })).toBeVisible();

  await page.getByRole('link', { name: 'Click Here' }).click();
})


