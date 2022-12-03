# Electron 码上翻译从 0 到 100 拆解实现

码上翻译项目

## 如何使用码上翻译

码上翻译，选中文本按快捷键即可翻译

## 码上翻译原理步骤

```bash
1. 创建electron项目
2. 监听快捷键 Ctrl+空格
3. 用户选中并且拷贝要翻译的文本
4. 快捷键获取剪切板内容
5. 调用百度翻译接口接口，返回翻译内容
6. 打开窗口，展示翻译内容
```

## 安装 electron-quick-start 并启动

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

## electron 官网例子

https://www.electronjs.org/zh/docs/latest/tutorial/quick-start

## 调整代码

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
    />
    <link href="./styles.css" rel="stylesheet" />
    <title>马上翻译</title>
  </head>
  <body>
    <div id="app">程序员李钟意 直播拆解实现码上翻译应用</div>
    <script src="./renderer.js"></script>
  </body>
</html>
```

main.js

```js
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}
```

## electron 注册快捷键

electron 注册快捷键官网地址 https://www.electronjs.org/zh/docs/latest/api/accelerator

### 监听快捷键并且打开窗口

main.js

```js
// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut} = require('electron');
const path = require('path');

let mainWindow;
function createWindow() {
  // 如果窗口存在，那么直接展示
  // https://www.electronjs.org/zh/docs/latest/api/browser-window#winisdestroyed
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.show();
    return;
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, // 窗口大小宽度
    height: 600, // 窗口大小高度
    frame: false, // 无边框窗口
    show: false, // 默认不展示
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  // 注册一个 'CommandOrControl+Y' 快捷键监听器.
  globalShortcut.register('CommandOrControl+Space', createWindow);

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
```

### 打开窗口的时候修改位置

1. 获取鼠标位置

https://www.electronjs.org/zh/docs/latest/api/screen#screengetcursorscreenpoint

2. 修改窗口的位置（相对于屏幕）

https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetboundsbounds-animate

```js
let mainWindow;
function createWindow() {
  // 获取鼠标在当前屏幕上的位置
  const point = screen.getCursorScreenPoint();

  // 如果窗口存在，那么直接展示
  // https://www.electronjs.org/zh/docs/latest/api/browser-window#winisdestroyed
  if (mainWindow && !mainWindow.isDestroyed()) {
    console.log('point', point); // {x: number; y:  number}
    mainWindow.show();

    mainWindow.setBounds({x: point.x, y: point.y, width: 300, height: 100});
    return;
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300, // 窗口大小宽度
    height: 100, // 窗口大小高度
    frame: false, // 无边框窗口
    show: false, // 默认不展示
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}
```

### 进程间通信

main.js 是主进程

index.html 是渲染进程

preload.js 是预加载的 js

监听主进程发过来的消息

https://www.electronjs.org/zh/docs/latest/tutorial/ipc#2-%E9%80%9A%E8%BF%87%E9%A2%84%E5%8A%A0%E8%BD%BD%E8%84%9A%E6%9C%AC%E6%9A%B4%E9%9C%B2-ipcrendereron

preload.js

```js
const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback)
});
```

main.js

```js
let mainWindow;
function createWindow() {
  // 如果窗口存在，那么直接展示
  // https://www.electronjs.org/zh/docs/latest/api/browser-window#winisdestroyed
  if (mainWindow && !mainWindow.isDestroyed()) {
    console.log('point', point); // {x: number; y:  number}

    // 设置当前窗口展示的位置
    mainWindow.setBounds({x: point.x, y: point.y, width: 800, height: 600});

    // 给渲染进程发送 消息
    mainWindow.webContents.send('show-translate', {data: point});

    // 打开窗口
    mainWindow.show();
    return;
  }
}
```

renderer.js

```js
// https://www.electronjs.org/zh/docs/latest/tutorial/ipc#2-%E9%80%9A%E8%BF%87%E9%A2%84%E5%8A%A0%E8%BD%BD%E8%84%9A%E6%9C%AC%E6%9A%B4%E9%9C%B2-ipcrendereron

const appEL = document.getElementById('app');

window.electronAPI.onShowTranslate((_event, value) => {
  console.log('value', value);
});
```

### 获取系统剪切板内容

https://www.electronjs.org/zh/docs/latest/api/clipboard

```js
// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut, screen, clipboard} = require('electron');
const path = require('path');

let mainWindow;
function createWindow() {
  // 获取鼠标在当前屏幕上的位置
  const point = screen.getCursorScreenPoint();

  // 如果窗口存在，那么直接展示
  // https://www.electronjs.org/zh/docs/latest/api/browser-window#winisdestroyed
  if (mainWindow && !mainWindow.isDestroyed()) {
    console.log('point', point); // {x: number; y:  number}

    // 设置当前窗口展示的位置
    mainWindow.setBounds({x: point.x, y: point.y, width: 800, height: 600});

    // 获取剪切板内容
    const text = clipboard.readText();
    // console.log('text', text);

    // 给渲染进程发送 消息
    mainWindow.webContents.send('show-translate', {data: point, text});

    // 打开窗口
    mainWindow.show();
    return;
  }
}
```

## 百度翻译开放平台

百度翻译开放平台 - 文档与支持 - 接入服务

https://api.fanyi.baidu.com/doc/13

### 通用翻译 API 接入文档

http://api.fanyi.baidu.com/doc/21

### 安装 md5 和 uuid

```bash
npm i uuid md5 --save
```

```bash
# 创建  config.js ,  touch  config.js (MacOS)
ni config.js
```

config.js 你要修改的文件，换成你的 appid 和 key

http://api.fanyi.baidu.com/manage/developer

config.js

```js
module.exports = {
  appid: '20221130001479050',
  key: '8y8QWUlo3Oz5ceX3ClPI'
};
```

main.js

```js
const {app, BrowserWindow, globalShortcut, screen, clipboard} = require('electron');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const md5 = require('md5');
const config = require('./config.js');

let mainWindow;
function createWindow() {
  // 获取鼠标在当前屏幕上的位置
  const point = screen.getCursorScreenPoint();

  // 如果窗口存在，那么直接展示
  // https://www.electronjs.org/zh/docs/latest/api/browser-window#winisdestroyed
  if (mainWindow && !mainWindow.isDestroyed()) {
    console.log('point', point); // {x: number; y:  number}

    // 设置当前窗口展示的位置
    mainWindow.setBounds({x: point.x, y: point.y, width: 800, height: 600});

    // 获取剪切板内容
    const text = clipboard.readText();
    // console.log('text', text);

    if (!text) {
      console.log('text is empty', text);
      return;
    }
    // \s匹配任何空白字符，包括空格、制表符、换页符等等
    // fix 签名错误
    const query = text.replace(/\s/gi, '');
    const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
    const appid = config.appid; // 需要获取
    const key = config.key; // 需要获取
    const salt = uuidv4();
    const sign = md5(`${appid}${query}${salt}${key}`);

    // 给渲染进程发送 消息
    mainWindow.webContents.send('show-translate', {
      query,
      url,
      appid,
      key,
      salt,
      sign
    });

    // 打开窗口
    mainWindow.show();
    return;
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, // 窗口大小宽度
    height: 600, // 窗口大小高度
    frame: false, // 无边框窗口
    show: false, // 默认不展示
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}
```

renderer.js

```js
// https://www.electronjs.org/zh/docs/latest/tutorial/ipc#2-%E9%80%9A%E8%BF%87%E9%A2%84%E5%8A%A0%E8%BD%BD%E8%84%9A%E6%9C%AC%E6%9A%B4%E9%9C%B2-ipcrendereron

const appEL = document.getElementById('app');

let lastQuery = ''; // 缓存上一次的查询内容
window.electronAPI.onShowTranslate((_event, value) => {
  if (lastQuery === value.query) {
    // 缓存上一次的查询内容
    // 和现在的一样不执行代码
    return;
  }
  console.log('value', value);

  appEL.style = 'color: #141414;';
  appEL.innerText = '正在翻译...';
});
```

## 接口请求实现百度翻译效果

增加 request 方法请求 百度翻译 api

```js
// https://www.electronjs.org/zh/docs/latest/tutorial/ipc#2-%E9%80%9A%E8%BF%87%E9%A2%84%E5%8A%A0%E8%BD%BD%E8%84%9A%E6%9C%AC%E6%9A%B4%E9%9C%B2-ipcrendereron

const appEL = document.getElementById('app');

let lastQuery = ''; // 缓存上一次的查询内容
window.electronAPI.onShowTranslate((_event, value) => {
  if (lastQuery === value.query) {
    // 缓存上一次的查询内容
    // 和现在的一样不执行代码
    return;
  }
  console.log('value', value);

  appEL.style = 'color: #141414;';
  appEL.innerText = '正在翻译...';

  request(value)
    .then((response) => response.json())
    .then((response) => {
      console.log('response', response);
      appEL.innerText = (response.trans_result[0] || {}).dst;
    })
    .catch((error) => {
      appEL.innerText = error.message;
      appEL.style = 'color: #f00;';
      console.error('[error]', [error]);
    });
});

// 通用翻译API接入文档 https://api.fanyi.baidu.com/doc/21
function request({url, appid, query, salt, sign}) {
  // const url = "http://api.fanyi.baidu.com/api/trans/vip/translate";
  // const appid = "20221130001479050";
  // const key = "8y8QWUlo3Oz5ceX3ClPI";
  // const salt = uuidv4();
  // const sign = md5(`${appid}${query}${salt}${key}`);

  return window.fetch(
    // `${url}?q=${query}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`
    `${url}?q=${query}&from=auto&to=auto&appid=${appid}&salt=${salt}&sign=${sign}`
  );
}
```

结果报错

```
Refused to connect to '<URL>' because it violates the following Content Security Policy directive: "default-src 'self'". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback.
```

原因是 electron 安全策略

解决办法： 注释掉 html 的 meta 限制` http-equiv="Content-Security-Policy"`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <!-- <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
    /> -->
    <link href="./styles.css" rel="stylesheet" />
    <title>马上翻译</title>
  </head>
  <body>
    <div id="app">程序员李钟意 直播拆解实现码上翻译应用</div>
    <script src="./renderer.js"></script>
  </body>
</html>
```

百度翻译 接口报错

原因是请求接口的频率太快了

```json
{"error_code": "54003", "error_msg": "Invalid Access Limit"}
```

限制接口访问，如果是相同的查询不请求接口

renderer.js

```js
const appEL = document.getElementById('app');

let lastQuery = ''; // 缓存上一次的查询内容
window.electronAPI.onShowTranslate((_event, value) => {
  if (lastQuery === value.query) {
    // 缓存上一次的查询内容
    // 和现在的一样不执行代码
    return;
  }
  lastQuery = value.query;
  console.log('value', value);
});
```

## 最后调整窗口和隐藏开发者工具

调整 窗口大小为 300\* 100，隐藏开发者工具

```js
let mainWindow;
function createWindow() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    // 设置当前窗口展示的位置
    mainWindow.setBounds({x: point.x, y: point.y, width: 300, height: 100});
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300, // 窗口大小宽度
    height: 100, // 窗口大小高度
    frame: false, // 无边框窗口
    show: false, // 默认不展示
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}
```

## electron 打包

官方文档 https://www.electronjs.org/zh/docs/latest/tutorial/打包教程

```bash
yarn add --dev @electron-forge/cli
```

```bash
npx electron-forge import
```

启动项目

```bash
npm start
```

打包项目 免安装包

```bash
PS D:\Desktop\gitee.io\examples\code-translate> npm run package

> electron-quick-start@1.0.0 package
> electron-forge package

✔ Checking your system
✔ Preparing to package application
✔ Running packaging hooks
  ✔ Running generateAssets hook
  ✔ Running prePackage hook
✔ Packaging application
  ✔ Packaging for x64 on win32 [14s]
✔ Running postPackage hook
```

打包项目 exe

```bash
PS D:\Desktop\gitee.io\examples\code-translate> npm run  make

> electron-quick-start@1.0.0 make
> electron-forge make

✔ Checking your system
✔ Loading configuration
✔ Resolving make targets
  › Making for the following targets: squirrel
✔ Running package command
  ✔ Preparing to package application
  ✔ Running packaging hooks
    ✔ Running generateAssets hook
    ✔ Running prePackage hook
  ✔ Packaging application
    ✔ Packaging for x64 on win32 [15s]
  ✔ Running postPackage hook
✔ Running preMake hook
✔ Making distributables
  ✔ Making a squirrel distributable for win32/x64 [1m18s]
✔ Running postMake hook
  › Artifacts available at: D:\Desktop\gitee.io\examples\code-translate\out\make
PS D:\Desktop\gitee.io\examples\code-translate>
```

## bug 修复

### 失去焦点隐藏翻译窗口

main.js

```js
let mainWindow;
function createWindow() {
  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('blur', () => {
    mainWindow.hide();
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}
```
