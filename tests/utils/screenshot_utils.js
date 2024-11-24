async function takeScreenshot(page, name) {
    await page.screenshot({ path: `tests/reports/screenshots/${name}.png` });
  }
  
  module.exports = { takeScreenshot };
  