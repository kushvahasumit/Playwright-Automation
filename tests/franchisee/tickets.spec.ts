import {test,expect} from '@playwright/test'

test('Tickets & Help tools', {tag:'@ticket'}, async ({page})=>{

  await page.goto(`${process.env.Franchise_url}/base/dashboard`);

  await page.getByRole('link', {name:'menu'}).click();

  await expect(page.getByRole('button', { name: 'construction Tools ' })).toBeVisible();

  await page.getByRole('button', { name: 'help Help Center ' }).click();
  await expect(page.getByRole('button', { name: 'help Help Center ' })).toBeVisible();

  await page.getByRole('link', { name: 'Ticket Status' }).click();
})

