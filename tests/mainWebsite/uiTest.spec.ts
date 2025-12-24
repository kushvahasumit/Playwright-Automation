import  {test, expect } from "@playwright/test";

test.use({
  viewport: { width: 1425, height: 850 },
})

test("Homepage UI test", {tag:"@UI"},async({page})=>{
  await page.goto(`${process.env.Base_url}`)
  await page.waitForTimeout(1000)
  await expect(await page.screenshot({ fullPage: true, animations:"disabled" })).toMatchSnapshot('homepage.png',{
    maxDiffPixelRatio:0.1,
    threshold:0.1,
  });
})

test("Tracking UI test", {tag:"@UI"},async({page})=>{
  await page.goto(`${process.env.Base_url}/live-tracking`)
  await page.waitForTimeout(1000)

  await expect(await page.screenshot({ fullPage: true, animations:"disabled" })).toMatchSnapshot('tracking.png',{
    maxDiffPixelRatio:0.2,
    threshold:0.3
  });
})

test("Aboutpage UI test", {tag: "@UI"}, async({page})=>{
   await page.goto(`${process.env.Base_url}/about`)
  await page.waitForTimeout(1000)

   await expect(await page.screenshot({fullPage: true, animations:"disabled"})).toMatchSnapshot('about.png',{
    maxDiffPixelRatio:0.2,
    threshold:0.2,
  })
})

test("Contactpage UI test", {tag : "@UI"}, async ({page})=>{
  await page.goto(`${process.env.Base_url}/contact-us`);
  await page.waitForTimeout(1000)

  await expect(await page.screenshot({fullPage:true, animations:"disabled"})).toMatchSnapshot('contactus.png', {
    maxDiffPixelRatio: 0.2,
    threshold:0.1,
  })
})

test('PickupPage UI test', { tag:"@UI"}, async ( { page })=>{
  await page.goto(`${process.env.Base_url}/pickup-request`);
  await page.waitForTimeout(1000)

  await expect(await page.screenshot({fullPage: true, animations:"disabled"})).toMatchSnapshot('pickup.png', {
    maxDiffPixelRatio: 0.2,
    threshold : 0.1 ,
  })
})

test('FranchiseePage UI test', { tag : "@UI"} , async ( { page }) => {
   await page.goto(`${process.env.Base_url}/franchise`);
  await page.waitForTimeout(1000)

   await expect(await page.screenshot({fullPage: true, animations:"disabled"})).toMatchSnapshot('frnachisee.png', {
    maxDiffPixelRatio: 0.2,
    threshold:0.2,
  })
})

test('CarreerPage UI test', {tag:"@UI"}, async ( { page})=>{
  await page.goto(`${process.env.Base_url}/careers`);
  await page.waitForTimeout(1000)

  await expect(await page.screenshot({fullPage: true, animations:"disabled"})).toMatchSnapshot('carrer.png', {
    maxDiffPixelRatio:0.2,
    threshold:0.2,
  })
})

test("Articlepage Ui test" , { tag : "@UI"}, async ( { page })=> {
  await page.goto( `${process.env.Base_url}/article`);
  await page.waitForTimeout(1000)

  await expect(await page.screenshot({fullPage: true, animations:"disabled"})).toMatchSnapshot('article.png', {
    threshold:0.2,
    maxDiffPixelRatio: 0.05
  })
})



