# Nodejs 爬虫进阶自动生成视频点赞排行榜

> 警告 请勿恶意爬取数据<br/>
> 警告 请勿恶意爬取数据<br/>
> 警告 请勿恶意爬取数据<br/>
> 警告 请勿恶意爬取数据<br/>

> 警告 这里仅仅学习分享技术<br/>
> 警告 这里仅仅学习分享技术<br/>
> 警告 这里仅仅学习分享技术<br/>

## 获取代码 puppeteer

当前文档 右上角有只猫 点击它就可以跳到 Github 上

代码已经托管在 Github 上

https://gitee.com/fe521/gitee.io

https://github.com/xieerduos/xieerduos.github.io

在这个目录下 `/examples/puppeteer/5-RankingList.js`

---

如果这部分的内容看不懂

可以先看下面两个文档

| 序号 | 文档                                                                          |
| :--: | :---------------------------------------------------------------------------- |
|  1   | [Nodejs 爬虫小白入门](/frontend/1120-Nodejs爬虫小白入门)                      |
|  2   | [Nodejs 爬虫-快速入门 Puppeteer](/frontend/1121-Nodejs爬虫-快速入门Puppeteer) |

### 切换目录

```bash
# 切换目录
cd /examples/puppeteer/
```

### 安装 puppeteer

```bash
# 也可以cnpm install，注意node 版本16.x以上
npm install

```

### 运行 node 执行代码 自动生成排行榜

```bash
node 5-RankingList.js
```

会自动创建 `5-RankingList.log` 日志文件

执行过程都在这个日志里面

```log
[2022-11-22 03:27:20.109] [开始]
[2022-11-22 03:27:20.120] [获取视频列表数据]
[2022-11-22 03:27:20.126] [puppeteer 开始]
[2022-11-22 03:27:21.280] [1.新打开一个页签]
[2022-11-22 03:27:32.081] [2.页面加载完成]
[2022-11-22 03:27:33.860] [3.关闭登录按钮]
[2022-11-22 03:27:34.402] [4.等待3秒, 等待异步接口请求...]
[2022-11-22 03:27:37.421] [5.通过插入js获取页面上的数据..]
[2022-11-22 03:27:38.046] [视频列表数据写入排行榜,共,35,条]
[2022-11-22 03:27:38.050] [最近的10条视频]
[2022-11-22 03:27:38.053] [点赞最多的10条视频]
[2022-11-22 03:27:38.060] [统计标签出现的次数]
[2022-11-22 03:27:38.066] [绘制饼图]
[2022-11-22 03:27:38.070] [done]
```

通过爬虫获取数据

自动化生成如下分析代码 写入到 `/douyin/RankingList.md` 目录中

````md
    # 抖音视频点赞排行榜

    ## 最近的10条视频

    |序号|点赞|视频标题|标签|
    |:--:|:--|:--|:--|
    |1|114|[前端Nodejs 爬虫小白入门，Puppeteer 爬虫爬取数据演示   ](https://douyin.com/video/7168197260734401799)|前端,代码,程序员|
    |2|578|[前端Nodejs 爬虫小白入门，Node爬取数据演示](https://douyin.com/video/7167758991055998222)||
    |3|359|[团队多人协作代码管理 git merge 工作流     ](https://douyin.com/video/7167047701987708173)|程序员,代码,前端|
    |4|75|[Markdown Mermaid 图表绘制工具     ](https://douyin.com/video/7167019782645108005)|前端,程序员,知识分享,编程,代码|
    |5|101|[扒一下炫酷的背景的代码  ](https://douyin.com/video/7166650705401400584)|程序员,前端|
    |6|142|[http3来了     ](https://douyin.com/video/7166265186108624164)|前端,程序员,代码,编程|
    |7|482|[Jenkins自动化部署项目代码          ](https://douyin.com/video/7165912754023419172)|jenkins,前端,代码,程序员,编程|
    |8|222|[一张时序图看懂https原理        ](https://douyin.com/video/7165535311575944462)|前端,代码,http,编程|
    |9|311|[快速了解端到端加密E2EE       ](https://douyin.com/video/7165167108660153636)|代码,编程,程序员,前端|
    |10|122|[网站预览pdf文件调研    ](https://douyin.com/video/7164790702256262431)|前端,代码,编程,程序员|
    |总计|2506|||

    ## 点赞最多的10条视频

    |序号|点赞|视频标题|标签|
    |:--:|:--|:--|:--|
    |1|2556|[十分推荐vue element admin开源项目 非常适合刚刚入门前端的同学学习   ](https://douyin.com/video/7161996754227907873)|程序员,代码,前端,编程|
    |2|959|[一行代码实现移动端适配 ](https://douyin.com/video/7158472643610561825)|前端|
    |3|615|[本地存储要使用localForage  ](https://douyin.com/video/7158668556664573188)|前端|
    |4|578|[前端Nodejs 爬虫小白入门，Node爬取数据演示](https://douyin.com/video/7167758991055998222)||
    |5|482|[Jenkins自动化部署项目代码          ](https://douyin.com/video/7165912754023419172)|jenkins,前端,代码,程序员,编程|
    |6|452|[代码折叠region 适用于任何编程语言    ](https://douyin.com/video/7160892403325439271)|代码,编程,程序员,前端|
    |7|395|[一秒查看开源代码     ](https://douyin.com/video/7161275091140087073)|代码,程序员,编程,前端|
    |8|359|[团队多人协作代码管理 git merge 工作流     ](https://douyin.com/video/7167047701987708173)|程序员,代码,前端|
    |9|311|[快速了解端到端加密E2EE       ](https://douyin.com/video/7165167108660153636)|代码,编程,程序员,前端|
    |10|226|[html css命名 ](https://douyin.com/video/7157725337302994214)|前端|
    |总计|6933|||

    ## 统计标签出现的次数

    |序号|出现次数|标签|
    |:--:|:--|:--|
    |1|34|前端|
    |2|25|程序员|
    |3|21|代码|
    |4|14|编程|
    |5|2|vue|
    |6|2|github|
    |7|1|知识分享|
    |8|1|jenkins|
    |9|1|http|
    |10|1|计算机|
    |11|1|黑客|
    |12|1|互联网|
    |总计|104||

    ```Mermaid
    pie title
        "前端" : 34
        "代码" : 21
        "程序员" : 25
        "知识分享" : 1
        "编程" : 14
        "jenkins" : 1
        "http" : 1
        "vue" : 2
        "计算机" : 1
        "黑客" : 1
        "互联网" : 1
        "github" : 2
    ```
````

`/examples/puppeteer/5-RankingList.js` 完整代码如下

````js
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const dayjs = require('dayjs');

main();

async function main() {
  try {
    log('开始');
    // 获取视频列表数据
    log('获取视频列表数据');
    const videoList = await getVideoList();

    const filePath = path.join('../../douyin/RankingList.md');

    log('视频列表数据写入排行榜', '共', videoList.length, '条');

    // 视频列表数据写入排行榜
    await writeRankingMdfile(filePath, [], {title: `# 抖音视频点赞排行榜\n\n`, onlyTitle: true});

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
      }|\n`;
      return acc;
    }, '\n');

    const tableFooter = `|总计|${total}|||\n\n`;

    // 表头
    const tableHeader = `|序号|点赞|视频标题|标签|\n|:--:|:--|:--|:--|`;

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

    let pieChartData = '';

    Object.keys(tagObj).forEach((key) => {
      const number = tagObj[key];

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
  const browser = await puppeteer.launch({
    headless: false, // 是否为无头浏览器，默认为true 这里为了演示 设置false
    devtools: false // 是否打开开发者工具
    // slowMo: 0 // slow down by 250ms
  });

  log('1.新打开一个页签');
  // 新打开一个页签
  const page = await browser.newPage();

  // 相当于输入 url 并回车 访问 https://example.com 页面
  await page.goto('https://www.douyin.com/user/MS4wLjABAAAAkiur2fK3qQYKHtdnwzT2_ysUpdIbGRMJ_2l3cA_l_3A');
  log('2.页面加载完成');

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
  // await loadMoreHandler();

  // #endregion 滚动到底部加载跟多数据

  // #region 通过插入js获取页面上的数据
  log('5.通过插入js获取页面上的数据..');
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
      //   href:string; // 视频链接
      //   tags: string[] // 视频标签
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
      }
      return newItem;
    });
  }, resultsSelector);

  // #endregion 通过插入js获取页面上的数据

  await browser.close();
  return result;
}

// #region 把控制台信息写入到日志文件
// todo todo
// todo todo
// 文件超出一定大小 重新写文件

function log(...reset) {
  const data = `[${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}] [${reset.join(',')}]\n`;

  // 以后面追加的方式写入文件
  fs.writeFileSync('5-RankingList.log', data, {encoding: 'utf8', flag: 'a+'});
}
// #endregion
````
