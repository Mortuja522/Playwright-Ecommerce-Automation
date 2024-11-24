const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let page;

Before(async () => {
  browser = await chromium.launch({ headless: false });  // Launch browser
  page = await browser.newPage();  // Create new browser context
});

After(async () => {
  await browser.close();  // Close browser after tests
});

module.exports = {
    default: `--require-module ts-node/register --require step_definitions/*.js --publish-quiet --format @cucumber/pretty-formatter`,
  };
  
  