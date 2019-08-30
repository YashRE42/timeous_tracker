const puppeteer = require('puppeteer');
const CREDS = require('./creds');
async function run() {
const browser = await puppeteer.launch({
  headless: false,
  slowMo: 5 // slow down by 250ms
});
  const page = await browser.newPage();
  await page.goto('https://myactivity.google.com/');
  // await page.screenshot({ path: 'screenshots/myactivity.png' });
  const sign_in_button = ".WpHeLc";
  await page.click(sign_in_button);
  await page.waitForNavigation();
  // await page.screenshot({ path: 'screenshots/myactivity2.png' });
  const email_selector = '#identifierId';
  await page.click(email_selector);
  await page.keyboard.type(CREDS.email);
  const next = '#identifierNext > div.ZFr60d.CeoRYc';
  await page.click(next);
  await page.waitForNavigation();
  const password = '#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input';
  await page.waitFor(password);
  console.log("enter pass:")
  await page.click(password);
  await page.keyboard.type(CREDS.password);
  // await page.waitForNavigation();
  // await page.waitFor('jkOv3d');
  // page
  //   .waitForSelector('jkOv3d')
  //   .then(() => console.log("FOUND THE SOURCE"));
  // await page.waitFor(20*1000);
  await page.waitForNavigation();
  console.log("Hey");
  const menu = "#gb > div.gb_Sd.gb_9d.gb_1d.gb_0d > div.gb_Zc.gb_5c.gb_6c > div:nth-child(1)";
  await page.click(menu);
  await page.click("#gb > div.gb_de > div > div.gb_Lc > div > c-wiz > div > div > nav > a:nth-child(1)");
  const selector = ".KXhB0c.YYajNd";
  // const results = await page.$$(selector);
  // console.log(results);
  // await page.mouse.move(0, 0);
  // await page.mouse.down();
  // await page.mouse.move(0, 100);
  // await page.mouse.move(100, 100);
  // await page.mouse.move(100, 0);
  // await page.mouse.move(0, 0);
  // await page.mouse.move(120, 120);
  // await page.mouse.up();
  await page.screenshot({ path: 'screenshots/myactivity3.png' });
  // browser.close();
  // await page.click(next);
  // await page.waitForNavigation();
  // const PASSWORD_SELECTOR = '.ZFr60d.CeoRYc';
  // const CREDS = require('./creds');
  
  
  // await page.keyboard.type(CREDS.password);
  
  // await page.click(BUTTON_SELECTOR);
  
  // await page.waitForNavigation();
  
  // browser.close();
}

run();