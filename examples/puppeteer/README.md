# Puppeteer

https://github.com/puppeteer/puppeteer

## 快速入门 Puppeteer

### 查看你的 Nodejs 版本

首先查看一下的 node 的版本

如果不是 16.x 以上版本，可以参考我的 `v18.12.1`

[Windows 如何安装 nvm 管理 nodejs 版本](/frontend/Windows如何安装nvm管理nodejs)

```bash
PS D:\Desktop\gitee.io> node -v
v18.12.1
```

### 参考文档

官方文档 https://www.npmjs.com/package/puppeteer

Github 好例子 https://github.com/MudOnTire/puppeteer-tutorial

上面的文档看不懂可以看看下面的：

Puppeteer 入门指引 https://juejin.cn/post/7030695729769218062

无头浏览器 Puppeteer 初探 https://juejin.cn/post/6844903504276881422

### Puppeteer 介绍

#### Puppeteer 是什么？

Puppeteer 是一个 Node.js 库，它提供了一个高级 API 来通过 DevTools Protocol 控制 Chrome/Chromium 。

Puppeteer 默认以 无头 模式运行，但可以配置为在完整（非无头）Chrome/Chromium 中运行

#### Puppeteer 可以做什么？

大多数您可以在浏览器中手动完成的事情都可以使用 Puppeteer 完成！以下是一些帮助您入门的示例：

生成页面的屏幕截图和 PDF。
抓取 SPA（单页应用程序）并生成预渲染内容（即“SSR”（服务器端渲染））。
自动化表单提交、UI 测试、键盘输入等。
使用最新的 JavaScript 和浏览器功能创建自动化测试环境。
捕获站点的 时间线跟踪 以帮助诊断性能问题。
测试 Chrome 扩展。

## 开发日志

参考文档：https://github.com/MudOnTire/puppeteer-tutorial

```bash
# 生成 package.json文件
npm init -y

# 安装puppeteer
npm i puppeteer
```
