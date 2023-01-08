# 语音直播助理

## 版本管理

- v1.0.0 已经实现
- v1.1.0 等待实现
- v1.2.0 等待实现
- v1.3.0 等待实现

## 技术栈

- Html
- Css
- Javascript
- Nodejs
- Electron

## 需求背景

换句话说，要解决的痛点

有同学进入直播间，
我每一次都要欢迎一下同学，
这样很容易打断我的思路

## 需求描述

1. 按快捷键，播放语音

2. 快捷键对应的播放的语音

```
F3 欢迎来到程序员李钟意的直播间
F4 感谢你的关注
F5 没有点关注的点点关注
F6 百度搜索“程序员李钟意”
F7 主播是前端开发，可以提问前端的问题
F8 点关注 私聊我 进学习群
```

3. 顶部自上而下-灵动岛显示文本
4. 选中文本，按快捷键，播放选中的内容

## 技术实现

### AI 迎宾

1. 注册全局快捷键
2. 快捷键处理，进程通信-渲染进程 html5 播放语音

### 选中文本播放

1. 获取剪切板内容
2. 进程通信-渲染进程 html5 播放语音

## 开发日志

获取 electron-quick-start demo

1. 下载地址

https://github.com/electron/electron-quick-start

2. 修改逻辑代码，主进程

3. 注册快捷键
4. 快捷键方法调用 python 代码播放语音

```JS
  globalShortcut.register('F3', sayText('欢迎来到程序员李钟意的直播间'));
  globalShortcut.register('F4', sayText('感谢你的关注'));
  globalShortcut.register('F5', sayText('没有点关注的点点关注'));
  globalShortcut.register('F6', sayText('百度搜索“程序员李钟意”'));
  globalShortcut.register('F7', sayText('主播是前端开发，可以提问前端的问题'));
  globalShortcut.register('F8', sayText('点关注 私聊我 进学习群'));
```

---

### 完整代码

Github

[/examples/python-say/](https://github.com/xieerduos/xieerduos.github.io/tree/main/examples/python-say))

---

## 使用 HTML5 代码实现

### 文本转语音

感谢评论区同学：

```js
const say = new window.SpeechSynthesisUtterance('你好，欢迎来到直播间');
undefined;
window.speechSynthesis.speak(say);
```

### 语音转文本

```js
// 创建一个 SpeechRecognition 对象
const recognition = new SpeechRecognition();

// 开始识别
recognition.start();

// 监听 result 事件，获取识别结果
recognition.addEventListener('result', (event) => {
  // 获取识别的结果
  const transcript = event.results[0][0].transcript;

  // 在页面上显示结果
  const p = document.createElement('p');
  p.innerHTML = transcript;
  document.body.appendChild(p);
});
```
