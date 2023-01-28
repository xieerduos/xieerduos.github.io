const fs = require('fs');
const path = require('path');
const puppeteerEdge = require('puppeteer-edge');
const puppeteerChrome = require('puppeteer');
const log = require('./log.js');
const {handleKugou, handleCloseKugou} = require('./utils/kugou.js');
const {handleOpenBlog} = require('./utils/blog.js');

// node index.js --chrome
const isChromeBrowser = process.argv[2] === '--chrome';
(async () => {
  let config = {
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', // 指向 Edge 的可执行文件
    userDataDir: 'D:\\Desktop\\gitee.io\\examples\\puppeteer-edge\\data'
  };
  let puppeteer = puppeteerEdge;

  if (isChromeBrowser) {
    puppeteer = puppeteerChrome;
    config = {
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 指向 Chrome 的可执行文件
      userDataDir: 'D:\\Desktop\\gitee.io\\examples\\puppeteer-edge\\chrome'
    };
  }
  const browser = await puppeteer.launch({
    ...config,
    headless: false,
    timeout: 60000,
    args: ['--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.goto('https://live.douyin.com/252989917313');

  // 设置页面大小
  await page.setViewport({
    width: 1200,
    height: 1080,
    deviceScaleFactor: 2
  });

  // 暴露回调函数
  await page.exposeFunction('handleCallback', (data) => {
    log(data);
  });
  let pageKugou;

  // 暴露回调函数
  await page.exposeFunction('handleKugou', async (data) => {
    if (pageKugou) {
      pageKugou = null;
      await handleCloseKugou(browser, data, 1);
    }
    console.log('pageKugou data', data);
    pageKugou = await handleKugou(browser, data);
  });

  // 关闭电脑 下播
  // page.exposeFunction('handleShutdown', async (data) => {
  //   console.log('/^程序员李钟意（前端）/ig.test(data)');
  //   if (/^程序员李钟意（前端）：gj7/gi.test(data)) {
  //     const {exec} = require('child_process');
  //     exec('shutdown -s -t 0', (err, stdout, stderr) => {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //       console.log(stdout);
  //     });
  //   }
  // });
  await page.exposeFunction('handleCloseKugou', async (data) => {
    pageKugou = null;
    await handleCloseKugou(browser, data);
  });
  let pageBlog = null;
  await page.exposeFunction('handleOpenBlog', async (data) => {
    if (pageBlog) {
      pageBlog = null;
      await handleCloseKugou(browser, data);
    }
    pageBlog = await handleOpenBlog(browser, data);
  });

  // 读取 JavaScript 文件
  const jsCodeAIAssistant = fs.readFileSync(path.join(__dirname, 'AIAssistant.js'), 'utf8');
  const jsCodeAssistant = fs.readFileSync(path.join(__dirname, 'Assistant.js'), 'utf8');
  const jsCodedebounce = fs.readFileSync(path.join(__dirname, 'debounce.js'), 'utf8');

  // 插入 JavaScript 代码到页面
  await page.addScriptTag({content: jsCodeAIAssistant});

  await page.evaluate(() => {
    const aIAssistant = new AIAssistant({name: '人工智能助理'});
    aIAssistant.start();
  });

  if (isChromeBrowser) {
    await page.addScriptTag({content: jsCodedebounce});
    await page.addScriptTag({content: jsCodeAssistant});

    await page.evaluate(() => {
      try {
        const assistant = new Assistant({name: '语音助理'});
        assistant.start();

        console.log('assistant', assistant);

        assistant.recognition.addEventListener('end', () => {
          console.log('1111', 1111);

          const textContent = assistant.getTextContent();

          if (/^播放/gi.test(textContent)) {
            window?.handleKugou(textContent);
          }
          if (/^(关闭音乐|停止播放)/gi.test(textContent)) {
            window?.handleCloseKugou();
          }

          // 重置为空
          assistant.setTextContent('');
          assistant.start();
        });
      } catch (error) {
        console.error('Assistant error', error);
      }
    });
  }

  // browser.close();
})();
