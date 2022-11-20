# Nodejs 爬虫 - 快速入门 Puppeteer

https://github.com/puppeteer/puppeteer

## 参考文档

### Github 文档

| 序号 | 名称                      | url                                             |
| :--: | :------------------------ | :---------------------------------------------- |
|  1   | 官方文档                  | https://www.npmjs.com/package/puppeteer         |
|  2   | Github puppeteer-tutorial | https://github.com/MudOnTire/puppeteer-tutorial |

### 社区文档

上面的文档看不懂可以看看下面的：

| 序号 | 名称                      | url                                        |
| :--: | :------------------------ | :----------------------------------------- |
|  1   | Puppeteer 入门指引        | https://juejin.cn/post/7030695729769218062 |
|  2   | 无头浏览器 Puppeteer 初探 | https://juejin.cn/post/6844903504276881422 |

## Puppeteer 介绍

### Puppeteer 是什么？

Puppeteer 是一个 Node.js 库，它提供了一个高级 API 来通过 DevTools Protocol 控制 Chrome/Chromium 。

Puppeteer 默认以 无头 模式运行，但可以配置为在完整（非无头）Chrome/Chromium 中运行

### Puppeteer 可以做什么？

大多数您可以在浏览器中手动完成的事情都可以使用 Puppeteer 完成！

以下是一些帮助您入门的示例：

| 序号 | 摘要                                                                  |
| :--: | :-------------------------------------------------------------------- |
|  1   | 生成页面的屏幕截图和 PDF。                                            |
|  2   | 抓取 SPA（单页应用程序）并生成预渲染内容（即“SSR”（服务器端渲染））。 |
|  3   | 自动化表单提交、UI 测试、键盘输入等。                                 |
|  4   | 使用最新的 JavaScript 和浏览器功能创建自动化测试环境。                |
|  5   | 捕获站点的 时间线跟踪 以帮助诊断性能问题。                            |
|  6   | 测试 Chrome 扩展。                                                    |

## 查看你的 Nodejs 版本

首先查看一下的 node 的版本

可以参考我的 `v18.12.1`

```bash
PS D:\Desktop\gitee.io> node -v
v18.12.1
```

<a href="/#/frontend/Windows如何安装nvm管理nodejs" target="_blank">Windows 如何安装 nvm 管理 nodejs 版本</a>

## 安装 puppeteer 模块

参考文档：https://github.com/MudOnTire/puppeteer-tutorial

### 生成 package.json 文件

```bash
# 生成 package.json文件
npm init -y
```

### 创建 .puppeteerrc.cjs 文件

.puppeteerrc.cjs 文件的作用 https://github.com/puppeteer/puppeteer#configuration

```bash
# Windows电脑使用
# ni .puppeteerrc.cjs
touch .puppeteerrc.cjs

```

### `.puppeteerrc.cjs`

（[.puppeteerrc.cjs 是什么？](https://github.com/puppeteer/puppeteer#configuration)）

```cjs
const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer')
};
```

### 安装 puppeteer

```bash
# 安装puppeteer
npm i puppeteer
```

## 快速了解 puppeteer 的例子

源码在这里 https://github.com/MudOnTire/puppeteer-tutorial#usage

puppeteer api 文档 https://pptr.dev/api/puppeteer.page.waitforselector

### 使用 Puppeteer 给网页截图

#### 创建 1-index.js 文件

```bash
# Windows电脑使用 ni 1-index.js
touch 1-index.js

```

#### 1-index.js

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  // 设置窗口大小
  await page.setViewport({
    width: 1600,
    height: 1080,
    deviceScaleFactor: 2
  });
  // 截图
  await page.screenshot({path: 'baidu.png'});
  // 关闭浏览器
  await browser.close();
})();
```

### 执行 nodejs 代码

```bash
node 1-index.js
```

### 使用 Puppeteer 保存网页为 pdf 文件

#### 创建 2-savePDF.js 文件

```bash
# Windows电脑使用 ni node 2-savePDF.js
touch node 2-savePDF.js

```

#### 2-savePDF.js 文件内容

```js
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
```

```bash
node 2-savePDF.js
```

### puppeteer 自动化测试

执行 js 代码 && debugger

#### 创建 3-get-dimensions.js 文件

```bash
# Windows电脑使用 ni node 3-get-dimensions.js
touch node 3-get-dimensions.js

```

#### 3-get-dimensions.js 文件内容

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250, // slow down by 250ms
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto('https://baidu.com');

  // 执行JavaScript代码
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  await page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  await page.evaluate(() => console.log(`url is ${location.href}`));

  // debugger 调试
  await page.evaluate(() => {
    debugger;
  });

  await new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
  });

  console.log('Dimensions:', dimensions);
  // Dimensions: { width: 800, height: 600, deviceScaleFactor: 1 }

  // 关闭浏览器
  await browser.close();
})();
```

```bash
node 3-get-dimensions
```

## Puppeteer 综合例子

### 创建 node 4-get-douyin.js 文件

```bash
# Windows电脑使用 ni node 4-get-douyin.js
touch node 4-get-douyin.js

```

### 4-get-douyin.js 文件内容

```js
const puppeteer = require('puppeteer');

// puppeteer api 文档
// https://pptr.dev/api/puppeteer.page.waitforselector

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 是否为无头浏览器，默认为true 这里为了演示 设置false
    devtools: false, // 是否打开开发者工具
    slowMo: 250 // slow down by 250ms
  });

  console.log('新打开一个页签');
  // 新打开一个页签
  const page = await browser.newPage();

  // 相当于输入 url 并回车 访问 https://example.com 页面
  await page.goto('https://www.douyin.com/user/MS4wLjABAAAAkiur2fK3qQYKHtdnwzT2_ysUpdIbGRMJ_2l3cA_l_3A');
  console.log('页面加载完成');

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
    console.log('关闭登录按钮');
    await page.click(closeDyLogin);
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

    // 等待5秒, 等待异步接口请求
    console.log('等待3秒...');
    await new Promise((resolve, reject) => setTimeout(resolve, 3 * 1000));
  };
  await loadMoreHandler();
  await loadMoreHandler();

  // #endregion 滚动到底部加载跟多数据

  // #region 通过插入js获取页面上的数据
  console.log('通过插入js获取页面上的数据..');
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
  console.log(result);

  await browser.close();
})();
```

### 执行 nodejs 代码

```bash
node 4-get-douyin.js
```

### 执行结果

```bash
PS D:\Desktop\gitee.io\examples\puppeteer> node 4-get-douyin.js
1.新打开一个页签
2.页面加载完成
3.关闭登录按钮
4.等待3秒, 等待异步接口请求...
4.等待3秒, 等待异步接口请求...
5.通过插入js获取页面上的数据..
6.打印数据

[
  {
    like: 508,
    title: '前端Nodejs 爬虫小白入门，Node爬取数据演示',
    link: '/video/7167758991055998222'
  },
  {
    like: 354,
    title: '团队多人协作代码管理 git merge 工作流 #程序员  #代码  #前端',
    link: '/video/7167047701987708173'
  },
  ...
]
7.关闭浏览器
PS D:\Desktop\gitee.io\examples\puppeteer>
```

---
