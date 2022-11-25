# Nodejs 爬虫 Centos7 无法运行 puppeteer 解决方案

亲测有效

## 1. 添加 Repo 源

```bash
# 切换目录
cd /etc/yum.repos.d/
# 创建 google.repo
touch google.repo
# 编辑 google.repo 文件
vi google.repo
```

google.repo 文件内容

```repo
[google]
name=Google-x86_64
baseurl=http://dl.google.com/linux/rpm/stable/x86_64
enabled=1
gpgcheck=0
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub
```

## 2.yum 安装

```bash
$ sudo yum update
$ sudo yum install google-chrome-stable
```

如果 `yum update` 报错 自己 google 找答案

我的解决方案是换了一台服务器

## 3. 成功安装

```bash
Downloading packages:
(1/11): libXScrnSaver-1.2.2-6.1.el7.x86_64.rpm             |  24 kB   00:00
(2/11): libappindicator-gtk3-12.10.0-13.el7.x86_64.rpm     |  37 kB   00:00
(3/11): libdbusmenu-gtk3-16.04.0-4.el7.x86_64.rpm          |  34 kB   00:00
(4/11): libdbusmenu-16.04.0-4.el7.x86_64.rpm               | 132 kB   00:00
(5/11): liberation-fonts-1.07.2-16.el7.noarch.rpm          |  13 kB   00:00
(6/11): liberation-narrow-fonts-1.07.2-16.el7.noarch.rpm   | 202 kB   00:00
(7/11): libindicator-gtk3-12.10.1-6.el7.x86_64.rpm         |  63 kB   00:00
(8/11): redhat-lsb-submod-security-4.1-27.el7.centos.1.x86 |  15 kB   00:00
(9/11): redhat-lsb-core-4.1-27.el7.centos.1.x86_64.rpm     |  38 kB   00:01
(10/11): spax-1.5.2-13.el7.x86_64.rpm                      | 260 kB   00:01
(11/11): google-chrome-stable-78.0.3904.70-1.x86_64.rpm    |  61 MB   00:09
--------------------------------------------------------------------------------
Total                                              6.2 MB/s |  61 MB  00:09

Installed:
  google-chrome-stable.x86_64 0:78.0.3904.70-1

Dependency Installed:
  libXScrnSaver.x86_64 0:1.2.2-6.1.el7
  libappindicator-gtk3.x86_64 0:12.10.0-13.el7
  libdbusmenu.x86_64 0:16.04.0-4.el7
  libdbusmenu-gtk3.x86_64 0:16.04.0-4.el7
  liberation-fonts.noarch 1:1.07.2-16.el7
  liberation-narrow-fonts.noarch 1:1.07.2-16.el7
  libindicator-gtk3.x86_64 0:12.10.1-6.el7
  redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1
  redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1
  spax.x86_64 0:1.5.2-13.el7

Complete!
```

## Centos 下安装 nodejs

我已经安装过了

这里采用简单的 yum 安装方式，你也可以采用自己喜欢的方式安装。

```bash
curl -sL https://rpm.nodesource.com/setup_10.x | bash -
yum install -y nodejs
```

如果是升级，可以使用 n 工具

```bash
# 全局安装n
$ npm install -g n
# 升级到最新稳定版
$ n stable
# 升级到最新版
$ n latest
# 升级到定制版
$ n v7.10.0
# 切换使用版本
$ n 7.10.0 (ENTER)
```

## 安装 puppeteer

```bash
# 初始化生成 package.json文件
npm init -y
```

```bash
npm install puppeteer --ignore-scripts
```

## 一个例子

我们使用 npm init 初始化一个项目，编辑 index.js

```js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    //沙箱很难配，有兴趣的童鞋可以试试。
    args: ['--no-sandbox'],
    headless: true,
    // chrome的默认安装路径
    executablePath: '/opt/google/chrome/chrome',
    slowMo: 100
  });
  const page = await browser.newPage();
  await page.goto('http://baidu.com');
  await page.screenshot({path: 'puppeteer.png'});
  await browser.close();
})();
```

## 参考

服务器 Centos 下安装无头浏览器，并附 puppeteer 的例子 https://juejin.cn/post/6955437989384159263#heading-0

## 看过的文章

https://github.com/macacajs/macaca-docker-images/tree/master/macaca-puppeteer-docker

https://cloud.tencent.com/developer/article/1746953?from=15425

puppeteer cluster 相关 docker 镜像构建 https://juejin.cn/post/6968335094842916901

puppeteer 实现掘金登录滑块校验 https://juejin.cn/post/7080036974605631524

---
