const puppeteer = require('puppeteer');

// puppeteer api 文档
// https://pptr.dev/api/puppeteer.page.waitforselector

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 是否为无头浏览器，默认为true 这里为了演示 设置false
    devtools: false, // 是否打开开发者工具
    slowMo: 250 // slow down by 250ms
  });

  console.log('1.新打开一个页签');
  // 新打开一个页签
  const page = await browser.newPage();

  // 相当于输入 url 并回车 访问 https://example.com 页面
  await page.goto('https://www.douyin.com/user/MS4wLjABAAAAkiur2fK3qQYKHtdnwzT2_ysUpdIbGRMJ_2l3cA_l_3A');
  console.log('2.页面加载完成');

  // 设置页面大小
  await page.setViewport({
    width: 960,
    height: 1175,
    deviceScaleFactor: 2
  });
  // #region 关闭登录按钮
  try {
    const closeDyLogin = '.box-align-center .dy-account-close';
    await page.waitForSelector(closeDyLogin);
    await page.click(closeDyLogin);
    console.log('3.关闭登录按钮');
  } catch (error) {
    console.error('[关闭登录按钮 error]', [error]);
  }
  // #endregion 关闭登录按钮

  // #region 滚动到底部加载跟多数据
  const loadMoreHandler = async () => {
    const footerSelector = '.kwodhZJl';
    await page.waitForSelector(footerSelector);

    await page.evaluate((footerSelector) => {
      const footers = Array.from(document.querySelectorAll(footerSelector));

      const footerEl = footers.length > 0 ? footers[footers.length - 1] : null;

      if (footerEl) {
        // 滚动到底部 会触发加载更多
        footerEl.scrollIntoView();
      }
    }, footerSelector);

    // 等待3秒, 等待异步接口请求
    console.log('4.等待3秒, 等待异步接口请求...');
    await new Promise((resolve, reject) => setTimeout(resolve, 1 * 1000));
  };
  await loadMoreHandler();
  await loadMoreHandler();

  // #endregion 滚动到底部加载跟多数据

  // #region 通过插入js获取页面上的数据
  console.log('5.通过插入js获取页面上的数据..');
  const resultsSelector = '.Eie04v01';
  await page.waitForSelector(resultsSelector);

  // 执行js代码 获取
  const result = await page.evaluate((resultsSelector) => {
    return [...document.querySelectorAll(resultsSelector)].map((videoItemEl) => {
      // js 获取 dom 节点
      const videoLikeCountEl = videoItemEl.querySelector('.author-card-user-video-like > span');
      const videoTitleEl = videoItemEl.querySelector('.iQKjW6dr');
      const videoHrefLinkEl = videoItemEl.querySelector('.B3AsdZT9');

      // console.log('videoLikeCountEl', videoLikeCountEl)
      // console.log('videoTitleEl', videoTitleEl)

      const newItem = {};
      // type NewItem = {
      //   like:number; // 点赞数量
      //   title:string; // 标题
      //   link:string; // 视频链接
      // }

      if (videoLikeCountEl) {
        const videoLike = videoLikeCountEl.textContent.trim();

        newItem.like = Number(videoLike);
      }

      if (videoTitleEl) {
        newItem.title = videoTitleEl.textContent.trim();
      }

      if (videoHrefLinkEl) {
        newItem.link = videoHrefLinkEl.getAttribute('href');
      }
      return newItem;
    });
  }, resultsSelector);

  // #endregion 通过插入js获取页面上的数据

  // 打印数据
  console.log('6.打印数据\n');

  console.log(result);

  await browser.close();

  console.log('7.关闭浏览器');
})();
