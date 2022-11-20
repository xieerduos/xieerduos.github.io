const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.setViewport({
    width: 1600,
    height: 1080,
    deviceScaleFactor: 2
  });
  await page.screenshot({path: 'baidu.png'});
  await browser.close();
})();
