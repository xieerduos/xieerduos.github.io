# 语音直播助理 2.0.0

使用 html5 实现

## 版本管理

- v2.0.0

## 技术栈

- Html
- Css
- Javascript
- Nodejs
- Vue
- Electron
- Electron builder 打包项目

## 需求描述

1. 文字转语音播放
2. 选中文本，按快捷键播放
3. 实现直播间自动输出字幕
4. 可以打包应用
5. 自动更新版本

## 调研代码

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
