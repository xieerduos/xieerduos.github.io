const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const dayjs = require('dayjs');
const child_process = require('child_process');

// 判断当前是否客户端运行
const isLocalRun = process.argv[2] === '-c'; // -client

main();

async function main() {
  try {
    log('开始');
    log('isLocalRun', isLocalRun);
    const nodeVersion = await getNodeVersion();
    log('nodeVersion', nodeVersion);
    // 获取视频列表数据
    log('获取视频列表数据');
    let {videoList, statistic} = await getVideoList();

    const filePath = path.join('../../douyin/RankingList.md');

    log('视频列表数据写入排行榜', '共', videoList.length, '条');

    // 视频列表数据写入排行榜
    await writeRankingMdfile(filePath, [], {title: `# 抖音视频数分析\n\n`, onlyTitle: true, flag: 'w+'});

    await writeRankingMdfile(filePath, [], {
      title: `## ${statistic.userName}\n\n<p>${statistic.douyin}</p><p>${statistic.data
        .map((item) => `${item.label}: ${item.count}`)
        .join('&nbsp;|&nbsp;')}</p>\n\n`,
      onlyTitle: true,
      flag: 'a+'
    });

    await writeRankingMdfile(filePath, [], {title: `## 更新时间\n\n`, onlyTitle: true, flag: 'a+'});
    await writeRankingMdfile(filePath, [], {
      title: `最近更新时间：${dayjs(new Date()).format('YYYY-MM-DD HH:mm')}<br/>下一次更新时间：${dayjs(new Date())
        .add(3, 'hour')
        .format('YYYY-MM-DD HH:mm')}\n\n`,
      onlyTitle: true,
      flag: 'a+'
    });

    log('最近的10条视频');
    await writeRankingMdfile(filePath, [...videoList], {
      title: `## 最近的10条视频\n\n`,
      limit: 10,
      flag: 'a+'
    });

    log('点赞最多的10条视频');
    await writeRankingMdfile(filePath, [...videoList], {
      title: '## 点赞最多的10条视频\n\n',
      sortBy: 'desc',
      limit: 10,
      flag: 'a+'
    });

    const tagObj = getTagsObjByVideoList([...videoList]);

    // 统计标签出现的次数
    log('统计标签出现的次数');
    await analysisVideoTags(filePath, tagObj, {title: '## 统计标签出现的次数\n\n'});

    // 绘制饼图
    log('绘制饼图');
    await drawPieChart(filePath, tagObj, {title: ''});

    log('done');
  } catch (error) {
    log('error', [error]);
  }
}

// 写排行榜
function writeRankingMdfile(
  filePath = './test.md',
  data,
  {title = '', sortBy = '', limit = Infinity, flag = 'w+', onlyTitle = false} = {}
) {
  return new Promise((resolve, reject) => {
    if (sortBy) {
      // asc/desc（升序/降序）
      data = data
        .sort((a, b) => {
          if (sortBy === 'asc') {
            return a.like - b.like;
          }
          return b.like - a.like;
        })
        .slice(0, limit);
    } else {
      data = data.slice(0, limit);
    }

    let total = 0;
    // 表内容
    const tableBody = data.reduce((acc, item, index) => {
      total += item.like;
      acc += `|${index + 1}|${item.like}|[${item.title.replaceAll('\n', '-')}](https://douyin.com${item.href})|${
        Array.isArray(item.tags) && item.tags.join(',')
      }|${item.publishTime || ''}|\n`;
      return acc;
    }, '\n');

    const tableFooter = `|总计|${total}|||\n\n`;

    // 表头
    const tableHeader = `|序号|点赞|视频标题|标签|发布时间|\n|:--:|:--|:--|:--|:--|`;

    // 排行榜表格
    const tableContent = tableHeader + tableBody + tableFooter;

    // 文件内容
    const fileContent = onlyTitle ? title : title + tableContent;

    fs.writeFile(filePath, fileContent, {encoding: 'utf8', flag}, function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// 获取 tagObj
function getTagsObjByVideoList(data) {
  return data.reduce((acc, item) => {
    if (Array.isArray(item.tags)) {
      item.tags.forEach((tag) => {
        if (acc[tag]) {
          acc[tag]++;
        } else {
          acc[tag] = 1;
        }
      });
    }
    return acc;
  }, {});
}

// 统计标签出现的次数
function analysisVideoTags(filePath = './test.md', tagObj, {title = '', flag = 'a+'} = {}) {
  return new Promise((resolve, reject) => {
    // 表头
    const tableHeader = `|序号|出现次数|标签|\n|:--:|:--|:--|\n`;

    let total = 0;

    const tableBody = Object.keys(tagObj)
      .map((key) => {
        const number = tagObj[key];

        total += number;

        return {row: `|${number}|${key}|`, number};
      })
      .sort((a, b) => b.number - a.number)
      .reduce((acc, item, index) => {
        acc += `|${index + 1}${item.row}\n`;
        return acc;
      }, '');

    const tableFooter = `|总计|${total}||\n\n`;

    // 排行榜表格
    const tableContent = tableHeader + tableBody + tableFooter;

    const fileContent = title + tableContent;

    fs.writeFile(filePath, fileContent, {encoding: 'utf8', flag}, function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/**
 * 绘制饼图
 * @param {String} filePath 路径
 * @param {Object} tagObj {name: 222}
 * @param {Object} param2 {flag: 'a+'}
 * @returns Promise
 */
function drawPieChart(filePath, tagObj, {title = '', flag = 'a+'} = {}) {
  return new Promise((resolve, reject) => {
    const pieChartBefore = `\`\`\`Mermaid\npie title ${title}\n`;

    // 出现1，2次的为其他类目
    const dataSource = {};
    Object.keys(tagObj).forEach((key) => {
      const number = tagObj[key];
      if (number > 2) {
        dataSource[key] = number;
      } else if (dataSource['其他']) {
        dataSource['其他'] += 1;
      } else {
        dataSource['其他'] = 1;
      }
    });

    let pieChartData = '';

    Object.keys(dataSource).forEach((key) => {
      const number = dataSource[key];

      pieChartData += `    "${key}" : ${number}\n`;
    });
    const pieChartAfter = '```\n\n';

    const fileContent = pieChartBefore + pieChartData + pieChartAfter;

    fs.writeFile(filePath, fileContent, {encoding: 'utf8', flag}, function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

// 爬虫获取视频列表数据
async function getVideoList() {
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
  await page.goto('https://www.douyin.com/user/MS4wLjABAAAAkiur2fK3qQYKHtdnwzT2_ysUpdIbGRMJ_2l3cA_l_3A');
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
    log('4.等待3秒, 等待异步接口请求...');
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  };
  await loadMoreHandler();
  await loadMoreHandler();

  // #endregion 滚动到底部加载跟多数据

  // #region 通过插入js获取页面上的数据
  log('5.通过插入js获取页面上的数据..');

  const statisticsSelector = '.TxoC9G6_';
  await page.waitForSelector(statisticsSelector);
  const dataStatistic = await page.evaluate((statisticsSelector) => {
    const userName = (document.querySelector('.xpjM3LEg') || {}).innerText || '';
    const douyin = (document.querySelector('.aH7rLkZZ') || {}).innerText || '';

    const arr = [
      {count: 0, key: 'follow', label: '关注'},
      {count: 0, key: 'fans', label: '粉丝'},
      {count: 0, key: 'like', label: '获赞'}
    ];
    const data = Array.from(document.querySelectorAll(statisticsSelector)).map((ele, index) => {
      const newItem = arr[index];
      if (newItem) {
        newItem.count = ele.innerText;
      }
      console.log('newItem', newItem);
      return newItem;
    });
    return {
      userName,
      douyin,
      data
    };
  }, statisticsSelector);

  const resultsSelector = '.Eie04v01';
  await page.waitForSelector(resultsSelector);

  // 执行js代码 获取
  let videoList = await page.evaluate((resultsSelector) => {
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
      //   href:string; // 视频链接
      //   tags: string[] // 视频标签
      //   key: string; // 视频id，唯一id
      // }

      if (videoLikeCountEl) {
        const videoLike = videoLikeCountEl.textContent.trim();

        newItem.like = Number(videoLike);
      }

      if (videoTitleEl) {
        const title = videoTitleEl.textContent.trim();

        // 标题删掉标签
        newItem.title = title.replaceAll(/#\S{1,}/gi, '');

        // 把标签提取出来
        const tags = title.match(/#\S{1,}/gi) || [];

        // 过滤标签#分隔符之间的空格
        newItem.tags = tags
          .join('')
          .split('#')
          .filter((item) => item.trim());
      }

      if (videoHrefLinkEl) {
        newItem.href = videoHrefLinkEl.getAttribute('href');
        const key = newItem.href.match(/\w{1,}$/gi);
        newItem.key = Array.isArray(key) && key.length > 0 ? key[0] : '';
      }
      return newItem;
    });
  }, resultsSelector);

  // #endregion 通过插入js获取页面上的数据

  log('获取视频发布时间 start');
  // 获取视频发布时间
  videoList = await getVideoPublishingTime(browser, videoList);

  log('关闭浏览器');
  await browser.close();
  return {statistic: dataStatistic, videoList};
}

// 获取视频发布时间
async function getVideoPublishingTime(browser, videoList) {
  // 检查video-publish.json文件是否存在于当前目录中。
  // 获取本地缓存的获取发布日期记录
  // 如果已经存在不再获取
  const publishJsonPath = path.join(__dirname, './video-publish.json');
  const videoPublishJson = await new Promise((resolve, reject) => {
    fs.access(publishJsonPath, fs.constants.F_OK, (err) => {
      let publishData;
      if (!err) {
        log('video-publish.json 存在');
        publishData = fs.readFileSync(publishJsonPath, {encoding: 'utf8'});
      } else {
        log('video-publish.json 不存在', err);
        publishData = JSON.stringify({});
        fs.writeFileSync(publishJsonPath, publishData, {encoding: 'utf8', flag: 'w+'});
      }
      resolve(JSON.parse(publishData));
    });
  });

  const newVideoItems = [];

  for (let videoItem of videoList) {
    if (videoPublishJson[videoItem.key]) {
      newVideoItems.push({...videoItem, publishTime: videoPublishJson[videoItem.key]});
      continue;
    }
    if (isLocalRun) {
      newVideoItems.push({...videoItem, publishTime: ''});
    } else {
      const page = await browser.newPage();
      await page.setViewport({width: 1280, height: 720});
      log('videoItem.href', videoItem.href);
      await page.goto(`https://www.douyin.com${videoItem.href}`);

      // log('等待5秒', videoItem.href);
      // await new Promise((resolve, reject) => setTimeout(resolve, 5 * 1000));
      // log('截图', videoItem.href);
      // await page.screenshot({path: videoItem.key + '.png'});

      const resultsSelector = '.aQoncqRg';
      await page.waitForSelector(resultsSelector);

      const publishTime = await page.evaluate((resultsSelector) => {
        const publishElement = document.querySelector(resultsSelector);
        if (publishElement) {
          return publishElement.textContent.split('：')[1].trim();
        } else {
          log('getVideoPublishingTime error: no publish time', videoItem.href);
          return '';
        }
      }, resultsSelector);

      videoPublishJson[videoItem.key] = publishTime;
      newVideoItems.push({...videoItem, publishTime});
      await page.close();
    }
  }

  if (isLocalRun) {
    // 重新写回去
    fs.writeFileSync(publishJsonPath, JSON.stringify(videoPublishJson), {encoding: 'utf8', flag: 'w+'});
  }

  return newVideoItems;
}

// #region 把控制台信息写入到日志文件

function log(...reset) {
  // 日志内容
  const data = `[${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}] [${reset.join(',')}]\n`;

  // 写入日志的路径
  const logPath = path.join(__dirname, '5-RankingList.log');

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

// 获取node版本
function getNodeVersion() {
  return new Promise((resolve, reject) => {
    const nodeVersion = child_process.spawn('node', ['-v']);
    nodeVersion.stdout.on('data', (data) => {
      resolve(String(data).trim());
    });
    nodeVersion.stdout.on('error', (error) => {
      reject(error);
    });
  });
}
