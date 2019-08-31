const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const CREDS = require('./creds');
async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 35,
    // slowMo: 5 // slow down by 250ms
    // Launch chromium using a proxy server on port 8080.
    // More on proxying:
    //    https://www.chromium.org/developers/design-documents/network-settings
    // args: [ '--proxy-auto-detect' ]
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
  await page.waitFor('#password');
  const input = await page.$(`#password`);
  await input.type("abc", {delay:100});
  await input.press('Backspace', {delay:100});
  await input.press('Backspace', {delay:100});
  await input.press('Backspace', {delay:100});
  await input.type(CREDS.password);
  await page.click("#passwordNext > div.ZFr60d.CeoRYc");
  await page.waitForNavigation();
  const menu = ".gb_wc";
  await page.waitFor(menu);
  await page.$eval(menu, a => {a.click();});
  const element_wise = "a.Zt1cpf:nth-child(2)";
  await page.waitFor(element_wise);
  await page.$eval(element_wise, a => {a.click();});
  console.log("Mark point 1");
  // var selector1 = ".df0WNe.Cyfgae .KXhB0c.YYajNd .k7dX8b .KzaDP .MxGxCb";
  var selector1 = ".WFTFcf";
  await page.waitFor(selector1);
  for (var i = 0; i < 100; i++) {
    await page.evaluate(() => new Promise(function(resolve, reject) {
                                            setTimeout(function() {
                                              window.scrollBy(0, 100*window.innerHeight);
                                              resolve();
                                            }, 300);
                                          })
    )
  }
  var BIG_LIST = await page.$$eval(selector1, async function (list) {
                                                function timeout(ms) {
                                                  return new Promise(resolve => setTimeout(resolve, ms));
                                                }
                                                async function sleep(fn, ...args) {
                                                    await timeout(500);
                                                    return fn(...args);
                                                }
                                                big_list = [];
                                                for (var i = 0; i < list.length; i++) {
                                                  list[i].click();
                                                  await sleep (function () {});
                                                  var detail_selector = ".mjANdc.eEPege .amA3ab.rAEh4d .FhkRX .Rg2ICf";
                                                  var elem = document.querySelectorAll(detail_selector);
                                                  var detail_attributes = [];
                                                  for (var j=0; j < elem.length; j++){
                                                    detail_attributes.push(elem[j].innerHTML);
                                                  }
                                                  var text_description_selector = ".mjANdc.eEPege .uUy2re .QTGV3c";
                                                  var text_description_obj = document.querySelector(text_description_selector);
                                                  if (text_description_obj != null)
                                                    var text_description = text_description_obj.innerHTML;
                                                  var text_description_link_selector = ".mjANdc.eEPege .uUy2re .QTGV3c .l8sGWb";
                                                  var text_description_link_obj = document.querySelector(text_description_link_selector);
                                                  if (text_description_link_obj != null)
                                                    var text_description_link = text_description_link_obj.text;
                                                  var application_descriptor_selector = ".mjANdc.eEPege .KzaDP span";
                                                  var application_descriptor_obj = document.querySelector(application_descriptor_selector);
                                                  if (application_descriptor_obj != null)
                                                    var application_descriptor = application_descriptor_obj.innerHTML;
                                                  var x_icon = document.querySelector(".VfPpkd-Bz112c-LgbsSe.yHy1rc.sIGDgc");
                                                  x_icon.click();
                                                  await sleep (function () {});
                                                  big_list.push({
                                                    'detail_attributes':detail_attributes,
                                                    'text_description':text_description,
                                                    'text_description_link':text_description_link,
                                                    'application_descriptor':application_descriptor,
                                                  })
                                                  console.log(big_list);
                                                }
                                                return new Promise(function(resolve, reject) {
                                                                    setTimeout(function() {
                                                                      resolve(big_list);
                                                                    }, 2500);
                                                                  })
                                              }
                                   )
    console.log(BIG_LIST);
  console.log("Mark point 2");
  await page.screenshot({ path: 'screenshots/myactivity3.png' });
  // browser.close();
  // await page.click(next);
  // await page.waitForNavigation();
  // const PASSWORD_SELECTOR = '.ZFr60d.CeoRYc';
  // const CREDS = require('./creds');
  
  
  // await page.keyboard.type(CREDS.password);
  
  // await page.click(BUTTON_SELECTOR);
  
  // await page.waitForNavigation();
  
  browser.close();
}

run();