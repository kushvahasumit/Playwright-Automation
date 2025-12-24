import {chromium} from '@playwright/test'
import {expect} from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config();

(async ()=>{
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page =  await context.newPage();

  await page.goto(`${process.env.Franchise_url}/login`)
  await expect(page).toHaveURL(`${process.env.Franchise_url}/login`)

  await page.getByRole('textbox', {name:'Username'}).fill(`${process.env.Franchise_username}`)
  await page.getByRole('textbox', {name : 'PASSWORD'}).fill(`${process.env.Franchise_password}`)

  await page.getByRole('button', {name:'Login'}).click();

  await expect(page).toHaveURL(`${process.env.Franchise_url}/department`)

  await page.goto(`${process.env.Franchise_url}/department`)
  await page.getByRole('button', {name: 'Go to International'}).click();

  await expect(page).toHaveURL(`${process.env.Franchise_url}/base/dashboard`)


  // Save cookies + session
  await page.context().storageState({ path: "storage/loginState.json" });

  console.log(" Login state saved to storage/loginState.json");
  await browser.close();
})()
