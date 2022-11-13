# https 时序图

## 一张时序图看懂 https 原理

<img src="/images/frontend/https_sequence.png"  style="max-width: 600px;"/><br/>

## 浏览器是如何验证 https 证书合法性的？

证书链，将会自下而上逐个去验证，一直到根证书

查看域名证书链

<img src="/images/frontend/https_root_ca.png"  style="max-width: 600px;"/><br/>

具体详细过程可以查看下面两个链接

https://www.zhihu.com/question/37370216

https://www.cnblogs.com/guoxianqi2020/p/13814920.html

## 如何获取 https 证书

阿里云免费证书

```
登录阿里云 - 点击左上角面包屑 - 弹出的面板选择 安全 - SSL 证书（应用安全）

进入SSL证书 - 免费证书（个人每年可以申请 20 个 https 域名证书）
```
