# Nodejs 爬虫小白入门

## Robots 协议

robots 协议也称爬虫协议、爬虫规则等，是指网站可建立一个 robots.txt 文件来告诉搜索引擎哪些页面可以抓取，哪些页面不能抓取。

robots 协议 百度百科 https://baike.baidu.com/item/robots协议/2483797

robots 维基百科 https://zh.m.wikipedia.org/zh-hans/Robots.txt

## 常见网站上的 robots 协议

robots 抖音 https://www.douyin.com/robots.txt

robots 阿里云 https://www.aliyun.com/robots.txt

## 开发日志

请求页面 （也可以使用 [axios](https://axios-http.com/docs/intro) 模块）request https://www.npmjs.com/package/request

可以理解为 node 版本的 jquery https://github.com/cheeriojs/cheerio/

### 初始化并安装模块

```bash
# 初始化生成package.json
npm init -y
# 安装request cheerio
npm i request cheerio
```

### 编写 Nodejs 代码

```bash
# 创建文件
# Windows使用：ni index.js
touch index.js
```

index.js

```js
const cheerio = require('cheerio');
const request = require('request');
request(
  'https://www.douyin.com/user/MS4wLjABAAAAkiur2fK3qQYKHtdnwzT2_ysUpdIbGRMJ_2l3cA_l_3A',
  (error, response, body) => {
    if (!error && response && response.statusCode === 200) {
      const $ = cheerio.load(body);
      const dataSource = []; // {title: string, viewed: number}
      $('.Eie04v01').each((i, el) => {
        const title = $(el).find($('.iQKjW6dr')).text().trim();

        // 正则表达式匹配任何空白字符或者非空白字符 https://www.cnblogs.com/laeni/p/9521729.html
        const tags = title.match(/#\S{1,}/gi) || [];
        dataSource.push({
          title,
          tags: tags
            .join('')
            .split('#')
            .filter((item) => item.trim())
        });
      });

      console.log('dataSource', dataSource);
    }
  }
);
```

```bash
# 执行代码
node index.js
```

### 爬取到数据结构

```js
const dataSource = [
  {
    title: '团队多人协作代码管理 git merge 工作流 #程序员  #代码  #前端',
    tags: ['程序员', '代码', '前端']
  },
  {
    title: 'Markdown Mermaid 图表绘制工具 #前端 #程序员 #知识分享 #编程 #代码',
    tags: ['前端', '程序员', '知识分享', '编程', '代码']
  },
  {title: '扒一下炫酷的背景的代码#程序员  #前端', tags: ['程序员', '前端']},
  {
    title: 'http3来了 #前端 #程序员 #代码  #编程',
    tags: ['前端', '程序员', '代码', '编程']
  },
  {
    title: 'Jenkins自动化部署项目代码  #jenkins  #前端  #代码  #程序员  #编程',
    tags: ['jenkins', '前端', '代码', '程序员', '编程']
  },
  {
    title: '一张时序图看懂https原理 #前端  #代码  #http   #编程',
    tags: ['前端', '代码', 'http', '编程']
  },
  {
    title: '快速了解端到端加密E2EE #代码  #编程  #程序员  #前端',
    tags: ['代码', '编程', '程序员', '前端']
  },
  {
    title: '网站预览pdf文件调研 #前端 #代码 #编程 #程序员',
    tags: ['前端', '代码', '编程', '程序员']
  },
  {
    title: '推荐快速入门docker docker-compose  #前端  #代码  #编程  #程序员',
    tags: ['前端', '代码', '编程', '程序员']
  },
  {
    title: '使用socket.io零代码实现白板功能 #前端  #代码  #程序员  #编程',
    tags: ['前端', '代码', '程序员', '编程']
  },
  {
    title: '面试题-实现网络请求并发限制管理类 #前端   #程序员   #代码   #编程',
    tags: ['前端', '程序员', '代码', '编程']
  },
  {
    title: '国内常用的React技术栈和不太推荐的antd pro #前端 #代码 #程序员',
    tags: ['前端', '代码', '程序员']
  },
  {
    title: '如何让浏览器马上进行垃圾回收？在你调试排查内存泄露的时候很有帮助#代码 #程序员 #前端',
    tags: ['代码', '程序员', '前端']
  },
  {
    title: '手把手教你如何使用prettier格式化你的代码3-3#前端#代码 #程序员#编程#vue',
    tags: ['前端', '代码', '程序员', '编程', 'vue']
  },
  {
    title: '手把手教你如何使用prettier格式化你的代码3-2#程序员 #前端#代码#编程',
    tags: ['程序员', '前端', '代码', '编程']
  },
  {
    title: '手把手教你如何使用prettier格式化你的代码3-1 #代码 #前端 #计算机 #程序员',
    tags: ['代码', '前端', '计算机', '程序员']
  },
  {
    title: '免费获得设计图 figma 摹客#代码#前端 #程序员',
    tags: ['代码', '前端', '程序员']
  },
  {
    title: '十分推荐vue element admin开源项目 非常适合刚刚入门前端的同学学习#程序员 #代码 #前端 #编程',
    tags: ['程序员', '代码', '前端', '编程']
  },
  {
    title: '一秒变黑客 反驳无效#黑客#代码#程序员 #互联网#前端',
    tags: ['黑客', '代码', '程序员', '互联网', '前端']
  },
  {
    title: '一秒查看开源代码 #代码  #程序员 #编程 #前端',
    tags: ['代码', '程序员', '编程', '前端']
  }
];
```

## Nodejs 爬虫（进阶）爬取异步数据（SPA 页面）

https://www.npmjs.com/package/puppeteer

无头浏览器 Puppeteer 初探 https://juejin.cn/post/6844903504276881422
