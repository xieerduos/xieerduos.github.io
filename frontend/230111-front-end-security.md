# 前端安全：如何防止 XSS 攻击和保护用户隐私

## 一、什么是 XSS？

XSS（Cross-Site Scripting）是一种常见的 Web 应用程序安全漏洞，可以让攻击者在受害者的浏览器中注入恶意的客户端脚本，从而获得更多的权限。

XSS 攻击把攻击者的代码注入到网站或应用程序中，这些代码可以控制用户的浏览器，改变页面的内容，收集用户信息等。

## 二、XSS 的原理

XSS 攻击的原理是，当用户访问一个网站时，攻击者会在网站中植入恶意的 JavaScript 代码，这些恶意的 JavaScript 代码会被执行，从而实现攻击者的目的。

攻击者可以使用这些恶意的 JavaScript 代码来收集用户的敏感信息，窃取用户的账户和密码，甚至控制用户的浏览器，进行其他攻击。

## 三、XSS 的分类

XSS 攻击可以分为 3 类：存储型（持久型）、反射型（非持久型）、DOM 型。

图示 XSS 攻击：https://www.figma.com/file/S0md4YKYGHrssPeNfActHa/

### 1. 反射型 XSS

当用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站。
Web 服务器将注入脚本，比如一个错误信息，搜索结果等 返回到用户的浏览器上。
由于浏览器认为这个响应来自"可信任"的服务器，所以会执行这段脚本。

流量走向：浏览器——>后端——>浏览器

### 2. 存储型 XSS

注入型脚本永久存储在目标服务器上。当浏览器请求数据时，脚本从服务器上传回并执行。

流量走向：浏览器——>后端——>数据库——>后端——>浏览器

### 3. DOM 型 XSS

DOM 型 XSS 是一种可以在客户端（浏览器）中执行的跨站脚本攻击，它利用了在网页中插入恶意代码的漏洞。

攻击者可以通过插入恶意代码来窃取用户的敏感信息，比如`登录凭据`，`修改网页`内容，或者`执行任意的指令`，从而损害用户的利益。

流量走向：URL——>浏览器

---

**存储型和 DOM 型 其实有时候是一起的，并没有说具体是那个**

是的，您说得对。存储型 XSS 和 DOM 型 XSS 有时是相互关联的，因为存储型 XSS 攻击往往需要通过 DOM 型 XSS 来实现。

- 存储型 XSS 攻击是指攻击者将恶意脚本存储在服务器端，然后当其他用户访问时，浏览器会执行这些脚本。
- 而 DOM 型 XSS 攻击是指攻击者通过在网页中注入恶意脚本，使得浏览器在处理网页时执行这些脚本。

在存储型 XSS 攻击中，攻击者通常会利用 DOM 型 XSS 漏洞，将恶意脚本注入到网页中，并将其存储在服务器端。
当其他用户访问网页时，浏览器会执行这些恶意脚本，从而实现 XSS 攻击。

所以存储型 XSS 攻击和 DOM 型 XSS 攻击是有关联的，通常是由于存在 DOM 型 XSS 漏洞导致存储型 XSS 攻击的产生。

防范 XSS 攻击需要采用多层防护措施，包括对用户输入的过滤和转义，使用 Content-Security-Policy 等，这样才能最大程度的降低 XSS 攻击的风险。

---

**反射型是不是也是同理？反射型、存储型和 DOM 型 XSS 有时是相互关联的**

反射型 XSS 和存储型 XSS、DOM 型 XSS 也是有关联的。

反射型 XSS 攻击是指攻击者通过在网页中注入恶意脚本，使得浏览器在处理网页时执行这些脚本，这种攻击主要是在客户端进行，并且只能在用户打开攻击链接时才能发生。

而存储型 XSS 攻击是指攻击者将恶意脚本存储在服务器端，然后当其他用户访问时，浏览器会执行这些脚本。

反射型 XSS 和存储型 XSS 的区别是，

- 前者的攻击脚本是在客户端注入的，而后者的攻击脚本是在服务器端存储的。
- 而这两种攻击都可以通过 DOM 型 XSS 漏洞进行。

所以反射型 XSS 攻击和存储型 XSS 攻击和 DOM 型 XSS 攻击是有关联的，通常是由于存在 DOM 型 XSS 漏洞导致反射型 XSS 攻击的产生。

防范 XSS 攻击需要采用多层防护措施，包括对用户输入的过滤和转义，使用 Content-Security-Policy 等，这样才能最大程度的降低 XSS 攻击的风险。

---

## 四、XSS 的防御技术

1. 对数据进行转义处理：将特殊字符转义成 HTML 实体，从而防止攻击者插入恶意代码。

2. 验证用户输入：对用户提交的数据进行格式验证，以过滤掉不合要求的输入，防止攻击者插入恶意代码。

3. 使用 HTTPOnly 标记：在 Cookie 中设置 HTTPOnly 标记，使得 Cookie 不能被客户端脚本访问，从而防止攻击者利用 XSS 漏洞获取 Cookie 信息。

4. 使用 `Content Security Policy`：通过设置 Content Security Policy，可以限制浏览器加载的脚本文件，从而防止攻击者利用 XSS 漏洞注入恶意代码。

## 五、XSS 的实战案例

1. 攻击者在网站注册一个用户，用户名设置为`<script>alert('XSS')</script>`，当其他用户浏览这个用户的个人主页时，就会弹出一个 XSS 的警告框。

2. 攻击者在网站的搜索框中输入`<script>alert('XSS')</script>`，当用户点击搜索按钮时，就会弹出一个 XSS 的警告框。

3. 攻击者在网站的评论框中输入`<script>alert('XSS')</script>`，当用户点击发表评论按钮时，就会弹出一个 XSS 的警告框。

## 六、XSS 的总结

前端安全是非常重要的一个问题，在防止 XSS 攻击和保护用户隐私方面有很多技巧可以使用。

### 防止 XSS 攻击:

- 对用户输入的数据进行转义，使其不能包含恶意代码。
- 使用 `Content Security Policy (CSP)` 限制网页可以加载的资源。
- 通过 `HttpOnly` 和 `secure` 标志设置 `cookie`。
- 避免在页面上使用 `eval()` 和其他动态代码执行函数。

### 保护用户隐私:

- 使用 HTTPS 保证数据传输的安全性。
- 避免将敏感信息存储在浏览器中，如果必须存储，请使用加密存储。
- 客户端使用授权令牌来保护敏感资源。

## 参考链接

百度百科 https://baike.baidu.com/item/XSS

MDN Cross-site scripting（跨站脚本攻击） https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting

Excess XSS https://excess-xss.com/

翻译后 http://qingbob.com/Excess-XSS/