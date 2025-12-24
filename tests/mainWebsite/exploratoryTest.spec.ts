import { test, expect } from '@playwright/test';
import strict from 'assert/strict';

test('Check all Website URL',{tag:"@link"}, async ({ page }) => {
  await page.goto(`${process.env.Base_url}`,{ waitUntil: 'networkidle' });
  await expect(page.getByRole('link', { name: 'AGC Akash Ganga' }).first()).toBeVisible();

  await page.getByRole('button', { name: 'More About Us' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/about`);
  await expect(page.getByRole('heading', { name: 'Delivering Trust, Connecting' })).toBeVisible();

  await page.getByRole('contentinfo').getByRole('link', { name: 'Careers' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/careers`);
  await expect(page.getByRole('heading', { name: 'Careers' })).toBeVisible();

  await page.getByRole('link', { name: 'Franchise' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/franchise`);
  await expect(page.getByRole('heading', { name: 'Franchisee' })).toBeVisible();

  await page.getByRole('link', { name: 'Pickup Request' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/pickup-request`);
  await expect(page.getByRole('heading', { name: 'Pickup Request' })).toBeVisible();

  await page.getByRole('navigation').getByRole('link', { name: 'Contact Us' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/contact-us`);
  await expect(page.getByRole('heading', { name: 'Head Office :' })).toBeVisible();

  await page.getByRole('link', { name: 'Tracking' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/live-tracking`);
  await expect(page.getByRole('heading', { name: 'Track your orders easily' })).toBeVisible();

  await page.getByRole('link', { name: 'AGC Akash Ganga' }).first().click();
  await expect(page).toHaveURL(`${process.env.Base_url}`)
  await expect(page.getByRole('heading', { name: 'One Network, Unlimited Reach' })).toBeVisible();

  await page.getByRole('link', { name: 'Privacy Policy' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/privacy-policy`);
  await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();

  await page.getByRole('link', { name: 'Shipping & Policy' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/shipping-policy`);
  await expect(page.getByRole('heading', { name: 'Shipping Policy' })).toBeVisible();

  await page.getByRole('link', { name: 'Terms & Conditions' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/terms-conditions`);
  await expect(page.getByRole('heading', { name: 'Terms & Conditions' })).toBeVisible();

  await page.getByRole('link', { name: 'Cancellation Policy' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/cancellation-policy`);

  await page.getByRole('link',{name:'Article'}).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/article`);

});

test("Fill contact form", {tag:"@func"},async ({page})=>{
  await page.goto(`${process.env.Base_url}/about`)

  await page.getByRole('button', { name: 'Contact Us' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/contact-us`);
  await expect(page.getByRole('heading', { name: 'Head Office :' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Name', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('sumit test');
  await page.getByRole('textbox', { name: 'Enter your phone number' }).click();
  await page.getByRole('textbox', { name: 'Enter your phone number' }).fill('1235467895');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@random.in');
  await page.getByRole('radio', { name: 'Yes', exact: true }).click();
  await page.getByRole('radio', { name: 'No No' }).click();
  await page.locator('#ecommerce-yes').nth(1).click();
  await page.locator('[id="«rc»-form-item"]').click();
  await expect(page.getByRole('option', { name: '-500 Orders' })).toBeVisible();

  await page.getByLabel('-1000 Orders').getByText('-1000 Orders').click();
  await expect(page.getByRole('link', { name: 'AGC Akash Ganga' }).first()).toBeVisible();

  await page.getByRole('button', { name: 'Start Shipping!' }).click();
  await page.waitForTimeout(1000)
  await expect(page.getByRole('alertdialog', { name: 'OTP Verification' })).toBeVisible();

  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByRole('link', { name: 'AGC Akash Ganga' }).first()).toBeVisible();
})

test("Check Article", {tag:"@func"},async ({page})=>{
  await page.goto(`${process.env.Base_url}`)

  await page.getByRole('link',{name:'Article'}).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/article`);
  await page.getByRole("heading",{name:"Reliable Courier Solutions Fast, Secure, and Reaching Every Corner"})
  await page.getByRole('button',{name:"Read More"}).click();
  await page.getByRole("heading",{name:"Who use Courior Service?"})
})

test("Track my order",{tag:"@func"}, async ({page})=>{
  await page.goto(`${process.env.Base_url}`)

  await page.getByRole('link', { name: 'Tracking' }).click();
  await expect(page).toHaveURL(`${process.env.Base_url}/live-tracking`);
  await expect(page.getByRole('heading', { name: 'Track your orders easily' })).toBeVisible();

  await page.getByRole("textbox",{name:"Enter your Order id / AWB"}).fill("65425454")
  await page.getByRole("button",{name:"Track"}).click()

  await expect(page.getByRole('link', { name: 'sam properties' })).toBeVisible();

  await page.getByRole('link', { name: '10', exact: true }).click();
  await page.getByRole('textbox', { name: 'Remarks' }).click();
  await page.getByRole('textbox', { name: 'Remarks' }).fill('nice tracking');
  await page.getByRole('button', { name: 'Send Customer Experience' }).click();
  await page.goto(`${process.env.Base_url}/live-tracking`);
  await expect(page.getByRole('link', { name: 'AGC Akash Ganga' }).first()).toBeVisible();
})

test("Check my pincode & branch",{tag:"@func"},async ({page})=>{
  await page.goto(`${process.env.Base_url}/live-tracking`);
  await expect(page.getByRole('link', { name: 'AGC Akash Ganga' }).first()).toBeVisible();

  await page.getByRole('textbox', { name: 'Enter your center/pincode' }).click();
  await page.getByRole('textbox', { name: 'Enter your center/pincode' }).fill('249201');
  await page.getByRole('textbox', { name: 'Enter your center/pincode' }).press('Enter');
  await page.getByRole('textbox', { name: 'Enter your center/pincode' }).click();
  await page.getByRole('textbox', { name: 'Enter your center/pincode' }).fill('Kota');
  await page.getByRole('textbox', { name: 'Enter your center/pincode' }).press('Enter');
  await page.getByRole('textbox', { name: 'Enter your center/pincode' }).click();
  await page.getByRole('textbox', { name: 'Enter your center/pincode' }).fill('KOTA HUB');
  await page.getByRole('textbox', { name: 'Enter your center/pincode' }).press('Enter');
  await page.getByRole('button', { name: 'Go' }).click();
  await expect(page.getByRole('heading', { name: 'Related Region' })).toBeVisible();

  await page.getByRole('link', { name: 'AGC Akash Ganga' }).first().click();
})



test.fixme('fix practice', {tag:'@needFix'}, async ({page,browser})=>{
  await page.goto('https://github.com/kushvahasumit');
  await page.getByRole('textbox', {name: 'github'}).first().clear();

  const context = await browser.newContext();
  const google = await context.newPage();

  await google.goto('https://github.com/');
  await google.getByRole('heading', {name:'github'})

  await page.getByRole('button', { name: 'Follow' }).click();
})

