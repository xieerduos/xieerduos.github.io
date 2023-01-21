const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const dayjs = require('dayjs');
const child_process = require('child_process');

// 判断当前是否客户端运行
const isLocalRun = process.argv[2] === '-c'; // -client

main();
async function main() {
  // nodejs 爬虫
  const url = 'https://live.douyin.com/252989917313';
  log('puppeteer 开始');
  const browser = await puppeteer.launch(
    isLocalRun
      ? {headless: false}
      : {
          headless: true, // 是否为无头浏览器，默认为true 这里为了演示 设置false
          devtools: false, // 是否打开开发者工具
          args: ['--no-sandbox'],
          // chrome的默认安装路径
          executablePath: '/opt/google/chrome/chrome'
          // slowMo: 0 // slow down by 250ms
        }
  );

  log('1.新打开一个页签');
  // 新打开一个页签
  const page = await browser.newPage();

  // 相当于输入 url 并回车 访问 https://example.com 页面
  await page.goto(url);
  log('2.页面加载完成');

  // 设置页面大小
  await page.setViewport({
    width: 960,
    height: 3000,
    deviceScaleFactor: 2
  });
  // #region 关闭登录按钮
  try {
    const closeDyLogin = '.box-align-center .dy-account-close';
    await page.waitForSelector(closeDyLogin);
    await page.click(closeDyLogin);
    log('3.关闭登录按钮');
  } catch (error) {
    log('[关闭登录按钮 error]', JSON.stringify([error]));
  }
  // #endregion 关闭登录按钮

  log('关闭浏览器');
  await browser.close();
}
// #region 把控制台信息写入到日志文件

function log(...reset) {
  // 日志内容
  const data = `[${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}] [${reset.join(',')}]\n`;

  // 写入日志的路径
  const logPath = path.join(__dirname, '6-live.log');

  console.log(data);

  // 以后面追加的方式写入文件
  fs.writeFileSync(logPath, data, {encoding: 'utf8', flag: 'a+'});

  // #region 文件超出一定大小 重新写文件

  // 查看日志的文件信息
  const fileInfo = fs.statSync(logPath);

  // 判断是否大于 5M
  if (fileInfo.size >= 1024 * 1024 * 5) {
    // 大于5M重写文件
    fs.renameSync(logPath, `${path.basename(logPath, '.log')}.old.log`);
  }
  // #endregion
}
// #endregion
