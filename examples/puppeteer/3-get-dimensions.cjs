const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250, // slow down by 250ms
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto('https://baidu.com');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  await page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  await page.evaluate(() => console.log(`url is ${location.href}`));
  await page.evaluate(() => {
    debugger;
  });
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
  });

  console.log('Dimensions:', dimensions);
  // Dimensions: { width: 800, height: 600, deviceScaleFactor: 1 }

  await browser.close();
})();
