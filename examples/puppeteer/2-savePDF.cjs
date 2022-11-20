const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com/', {
    waitUntil: 'networkidle2'
  });
  await page.waitForSelector('body');
  await page.pdf({
    path: 'baidu.pdf',
    format: 'a2'
  });

  await browser.close();
})();
