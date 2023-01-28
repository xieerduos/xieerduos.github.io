// 打开博客
exports.handleOpenBlog = async (browser, data) => {
  try {
    const pageBlog = await browser.newPage();
    await pageBlog.goto('https://www.baidu.com');

    await pageBlog.waitForSelector('#kw');

    await pageBlog.evaluate(() => {
      const inputElement = document.querySelector('#kw');
      const searchButton = document.querySelector('#su');

      if (inputElement && searchButton) {
        inputElement.value = '程序员李钟意';

        setTimeout(() => {
          searchButton.click();
        }, 1000);
      }
    });
    return pageBlog;
  } catch (error) {
    console.error('handleOpenBlog error', error);
  }
};
