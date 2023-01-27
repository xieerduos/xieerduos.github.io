// 关闭其他浏览器页签
exports.handleCloseKugou = async (browser, data) => {
  const pages = await browser.pages();
  for (const page of pages) {
    const url = page.url();
    if (!/^https:\/\/live.douyin.com/gi.test(url)) {
      await page.close();
    }
  }
};
// 播放酷狗音乐
exports.handleKugou = async (browser, data) => {
  const pageKugou = await browser.newPage();

  const searchKeyWord = data
    .replace(/\n/gi, '')
    .replace(/.*(?=播放)/gi, '')
    .replace('播放', '');

  await pageKugou.goto(`https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=${searchKeyWord}`);

  await pageKugou.waitForSelector('.list_content>li a');

  await pageKugou.evaluate(() => {
    const element = document.querySelector('.list_content>li a');
    element && element.click();
  });
  return pageKugou;
};
