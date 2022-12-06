# 网站加载速度优化-减少白屏时间

亲测有用，值得学习了解

## 方案

把首屏用不到的 js 库 script 标签 加上 async

我把`mermaid.min.js`插件增加了`async`减少了 160 毫秒白屏时间

## script 标签 的 async 和 defer 的区别

### 默认不加 async 和 defer

浏览器会立即加载并执行相应的脚本。会堵塞页面展示。

### 加了 async

异步下载 js，下载完成后立即执行 js。不会堵塞页面展示。

### 加了 defer

异步下载 js，等待其他 js 加载和执行完，DOMContentLoaded 之前执行 js。会堵塞页面展示。

## 参考链接

Script 标签上使用 defer 和 async 的区别（前端面试） https://blog.csdn.net/weixin_46544034/article/details/123146915

Scripts: async, defer https://javascript.info/script-async-defer

## 最后

欢迎大佬纠错

---
