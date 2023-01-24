# 直播语音助理-语音播报

1. 支持语音识别、播放
2. 支持实时翻译
3. 支持多种语言，如普通话、粤语

## 注入 JavaScript 步骤

1. 创建书签
2. 书签内容写入`javascript:alert("hello world");`

## 注入直播间欢迎语音播放

### 编写 JavaScript 代码

粤语

```js
main();
function main() {
  readUserComments();
  welcome();
}
function welcome() {
  setInterval(function () {
    const bottomElements = document.querySelectorAll('.webcast-chatroom___bottom-message');
    const currentElement = bottomElements[bottomElements.length - 1];

    const lastMessage = sessionStorage.getItem('MESSAGE_BOTTOM');
    const currentMessage = currentElement && currentElement.innerText;

    if (currentMessage === lastMessage) {
      console.log('重复');
      return;
    }
    sessionStorage.setItem('MESSAGE_BOTTOM', currentMessage);
    console.log('欢迎 ', currentMessage);
    let sayText = currentMessage;
    if (sayText.indexOf('来了') !== -1) {
      sayText = currentMessage.replace(/来了$/gi, '');
      sayText = '欢迎 ' + sayText;
    }

    sayMessage(sayText);
  }, 3000);
}
function readUserComments() {
  setInterval(function () {
    const giftElements = document.querySelectorAll('.webcast-chatroom___item.webcast-chatroom___enter-done');
    const currentGiftElement = giftElements[giftElements.length - 1];

    const lastMessage = sessionStorage.getItem('MESSAGE_GIFT');
    let currentMessage = currentGiftElement && currentGiftElement.innerText;

    if (!currentMessage || (currentMessage && currentMessage.indexOf('来了') !== -1)) {
      console.error('currentMessage', currentMessage);
      return;
    }

    if (currentMessage === lastMessage) {
      console.log('重复');
      return;
    }
    sessionStorage.setItem('MESSAGE_GIFT', currentMessage);

    console.log('评论: ', currentMessage);

    sayMessage(currentMessage);
  }, 1500);
}

function sayMessage(currentMessage = '') {
  console.log(currentMessage);
  /*把数据存储在服务端*/
  window.fetch(`http://localhost:3300/?data=${currentMessage}`).catch((error) => {
    console.log('window.fetch error', error);
  });

  var say = new window.SpeechSynthesisUtterance(currentMessage || '');
  say.voice = window.speechSynthesis.getVoices().filter(function (voice) {
    return voice.lang === 'zh-HK';
  })[0];
  window.speechSynthesis.speak(say);
}
```

普通话

```js
main();
function main() {
  readUserComments();
  welcome();
}
function welcome() {
  setInterval(function () {
    const bottomElements = document.querySelectorAll('.webcast-chatroom___bottom-message');
    const currentElement = bottomElements[bottomElements.length - 1];

    const lastMessage = sessionStorage.getItem('MESSAGE_BOTTOM');
    const currentMessage = currentElement && currentElement.innerText;

    if (currentMessage === lastMessage) {
      console.log('重复');
      return;
    }
    sessionStorage.setItem('MESSAGE_BOTTOM', currentMessage);
    console.log('欢迎 ', currentMessage);
    let sayText = currentMessage;
    if (sayText.indexOf('来了') !== -1) {
      sayText = currentMessage.replace(/来了$/gi, '');
      sayText = '欢迎 ' + sayText;
    }

    sayMessage(sayText);
  }, 3000);
}
function readUserComments() {
  setInterval(function () {
    const giftElements = document.querySelectorAll('.webcast-chatroom___item.webcast-chatroom___enter-done');
    const currentGiftElement = giftElements[giftElements.length - 1];

    const lastMessage = sessionStorage.getItem('MESSAGE_GIFT');
    let currentMessage = currentGiftElement && currentGiftElement.innerText;

    if (!currentMessage || (currentMessage && currentMessage.indexOf('来了') !== -1)) {
      console.error('currentMessage', currentMessage);
      return;
    }

    if (currentMessage === lastMessage) {
      console.log('重复');
      return;
    }
    sessionStorage.setItem('MESSAGE_GIFT', currentMessage);

    console.log('评论: ', currentMessage);

    sayMessage(currentMessage);

    if (/(这是|这是啥|这是什么)/.test(currentMessage)) {
      sayMessage('我是直播语音助理');
    }
  }, 1500);
}

function sayMessage(currentMessage = '') {
  console.log(currentMessage);

  /*把数据存储在服务端*/
  window.fetch(`http://localhost:3300/?data=${currentMessage}`).catch((error) => {
    console.log('window.fetch error', error);
  });

  var say = new window.SpeechSynthesisUtterance(currentMessage || '');
  say.volume = 0.6;
  say.voice = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.name === 'Microsoft Kangkang - Chinese (Simplified, PRC)')[0];

  window.speechSynthesis.speak(say);
}
```

### 把代码添加到标签中

### 点击书签名称注入代码并执行

### 自动答复

输入关键字，自动回复

比如：如何学习前端？

### 数据上报

#### 1. 搭建 nodejs 服务器

初始化 package.json 文件

```bash
npm init -y
```

创建文件

```bash
# git bash 使用下面命令， Window Posershell 使用 ni server.js
touch server.js
```

安装依赖

```bash
npm i express cors dayjs nodemon --save
```

server.js

```js
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');

app.use(cors());

app.get('/', function (req, res) {
  const data = req.query.data;

  if (data) {
    log(data);
  } else {
    console.error('data :>> ', data);
  }
  // 把 data 写入到文件中，按行写入
  res.json({message: 'ok'});
});

app.listen(3300);

// 如何使用 get 请求
// http://localhost:3300/?data=hello%20worl

function log(...reset) {
  // 日志内容
  const data = `[${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}] [${reset.join(',')}]\n`;

  // 写入日志的路径
  const logPath = path.join(__dirname, 'server.log');

  console.log(data);

  // 以后面追加的方式写入文件
  fs.writeFileSync(logPath, data, {encoding: 'utf8', flag: 'a+'});

  // #region 文件超出一定大小 重新写文件

  // 查看日志的文件信息
  const fileInfo = fs.statSync(logPath);

  // 判断是否大于 15M
  if (fileInfo.size >= 1024 * 1024 * 15) {
    // 大于15M重写文件
    fs.renameSync(logPath, `${path.basename(logPath, '.log')}.old.log`);
  }
  // #endregion
}
```

启动 server 服务器

```bash
nodemon server.js
```

### 2. fetch 请求

```js
/*把数据存储在服务端*/
window.fetch(`http://localhost:3300/?data=${currentMessage}`).catch((error) => {
  console.log('window.fetch error', error);
});
```

### 控制声音

使用 audio 标签播放
