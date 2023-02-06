# 记录与面试官的深入对话 20230130

面试一把过的，2023.01.29

## **面试方式和参会人员**

面试时间：2023.01.29

方式：视频会议

参会人员：我、项目经理、技术面试官

主持人：项目经理

面试时长：1h40m

## **自我介绍**

1. 我是谁
2. 工作年限，经历
3. 我的优势（确定岗位 “electron 开发”）
   1. 成功开发过多个项目，详细的内容在我的简历
   2. nodejs
   3. 行业资源 百度、外企
4. 岗位要求？

## **技术：面试提问**

## 1. 什么是 BFC

https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context

BFC (Block Formatting Contexts) 是 CSS 中的一种布局模型，它是页面中的一个独立的渲染区域，元素在 BFC 中的布局不受外部元素的影响。

BFC 具有以下特性：

- 内部元素的垂直方向的外边距不会与外部元素的外边距发生重叠。
- BFC 元素内部的子元素的垂直方向的布局按照从上到下的顺序进行，即使它们在 HTML 代码中的顺序不同。
- BFC 元素内部的元素不会在垂直方向上溢出其边界。
- 在 BFC 中，浮动元素不会对其他元素的布局造成影响。

BFC 可以通过以下几种方法被创建：

- 根元素 (html)
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- overflow 值不为 visible、clip 的块元素
- 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
- 网格元素（display 值为 grid 或 inline-grid 元素的直接子元素），如果它们本身既不是 flex、grid 也不是 table 容器

BFC 的作用主要是帮助我们解决页面布局的问题，如：外边距重叠、浮动元素对其他元素的影响等。它提供了一种独立的布局环境，使得元素在布局上不受外部元素的影响，可以更加方便地实现复杂的布局效果。

另外，BFC 还可以控制元素的尺寸，例如在 BFC 中，内部元素的宽度会自动调整为完全包含它们，以防止它们的宽度超出容器的宽度。

总的来说，BFC 是一种非常有用的布局技术，通过使用 BFC，可以更方便地实现复杂的布局效果，并且保证布局的稳定性。

## 2. grid 和 flex 布局介绍一下

- Grid 布局：是 CSS 中的网格布局技术，可以将一个页面划分为行和列，便于控制元素的位置和大小。
- Flex 布局：是 CSS 中的弹性布局技术，可以让一个容器中的元素自动按照一定的比例分配空间，并且可以方便地实现水平或垂直方向的布局。

## 3. grid 3 等份怎么做

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

## 4. CSS 有一个元素被挤压了怎么办？

出现这种情况一般是宽度为 auto 导致，给容器设置固定或者比例就可以。

比如 grid 布局，下面把 auto 改为 1fr 单位

```CSS
.grid-container {
  display: grid;
  /* grid-template-columns: auto auto auto; */
  grid-template-columns: 1fr 1fr 1fr;
}
```

## 5. 什么是重绘和回流？

CSS 的重绘（Repaint）和回流（Reflow）是指浏览器如何处理网页的布局和渲染。

重绘是指当样式的改变不影响布局时，浏览器仅更新元素的外观，例如颜色，边框和阴影。

回流是指当元素的尺寸，位置或其他属性发生更改时，浏览器需要重新计算元素的布局。这可能导致其他元素的位置或大小更改，因此，回流是需要花费更多时间的。

注意：避免不必要的重绘和回流可以提高网页的性能。

**更详细一点**

回流（Reflow）：当页面上的元素尺寸，位置，结构或其他因素改变时，浏览器必须重新计算整个文档的布局。这就是所谓的回流。因此，回流可能导致整个文档的重新渲染。

重绘（Repaint）：当元素的样式更改而不影响布局时，浏览器将对该元素进行重绘。例如，当更改元素的颜色时，浏览器将进行重绘，因为它不会改变布局，但仍然需要更新元素的外观。

两者的区别：回流涉及到布局的整个文档，可能导致性能问题，因此应该尽量避免。相比之下，重绘只影响单个元素，因此它通常不会导致性能问题。

注意：通过使用优化技巧，如将动画分离到单独的层或使用缓存，可以减少不必要的重绘和回流，从而提高页面的性能。

**哪些 CSS 属性会导致重绘和回流**

下列 CSS 属性可能会导致回流（Reflow）：

- 宽度（width）和高度（height）
- 内外边距（margin，padding）
- 边框（border）
- 字体（font）大小，类型和样式
- 行高（line-height）
- 文本对齐（text-align）
- 定位（position）
- 浮动（float）
- 显示（display）

下列 CSS 属性可能会导致重绘（Repaint）：

- 颜色（color）
- 背景颜色（background-color）
- 阴影（box-shadow）
- 透明度（opacity）
- 文本阴影（text-shadow）
- 背景图像（background-image）

## 6. 什么是跨域

跨域（Cross-Origin Resource Sharing）是指在浏览器中，同一个域名（即域名、协议、端口三者相同）的页面可以相互请求，但跨域的页面之间则不能。这种限制是浏览器安全机制的一部分，为了避免第三方网站获取敏感数据。

例如：

一个页面是从"example.com"请求"api.example.com/data"的数据，如果不存在跨域允许，则请求将被拒绝。
可以使用以下方法解决跨域问题：

使用 CORS（Cross-Origin Resource Sharing）
使用代理服务器
使用 JSONP（JSON with Padding）
使用 PostMessage API

跨域（Cross-Origin Resource Sharing）是指在浏览器中，同一个域名（即域名、协议、端口三者相同）的页面可以相互请求，但跨域的页面之间则不能。这种限制是浏览器安全机制的一部分，为了避免第三方网站获取敏感数据。

例如：

一个页面是从"example.com"请求"api.example.com/data"的数据，如果不存在跨域允许，则请求将被拒绝。
可以使用以下方法解决跨域问题：

使用 CORS（Cross-Origin Resource Sharing）
使用代理服务器
使用 JSONP（JSON with Padding）
使用 PostMessage API

解决跨域的方法中：

- CORS (Cross-Origin Resource Sharing)是一种 W3C 标准，允许 Web 应用程序通过添加 HTTP 头部在不同的域之间进行数据交换。
- 使用代理服务器是一种将请求重定向到代理服务器的方法，该代理服务器再将请求转发到目标服务器。
- JSONP (JSON with Padding)是一种特殊的跨域技术，允许在不同域之间进行数据交换。
- PostMessage API 是一种在不同窗口、标签页或域之间进行通信的 API，可以解决跨域问题。

<a href="/#/frontend/230109-2-前端跨域-简单易懂的跨域解决方案" target="_blank">前端跨域-简单易懂的跨域解决方案</a><br/>

## 7. 同一个域名，通过 IP 会导致跨域吗？

比如说:example.com 域名解析的 IP 是 123.1.1.1 ， 我在 example.com 页面上面直接请求 123.1.1.1/api 获取数据 会导致跨域吗

是的，如果你在 example.com 页面中通过请求 123.1.1.1/api 获取数据，那么将导致跨域。在浏览器中，域名、协议、端口三者都必须相同才能避免跨域。请求 123.1.1.1/api 与请求 example.com 不同，因此将导致跨域。

## 8. js 事件模型，点击事件触发过程

JS 事件模型点击事件详细过程如下：

- 用户点击某个 HTML 元素，例如一个按钮。
- 浏览器从内到外（从最里层元素到最外层元素）捕获点击事件。
- 浏览器检查该元素是否有绑定了点击事件处理函数。
- 如果该元素有绑定点击事件处理函数，浏览器调用该函数，并向其传递事件对象。
- 事件对象包含有关点击事件的信息，例如事件类型、事件发生的元素、事件发生的时间等。
- 如果该元素有父元素，浏览器继续向上冒泡，并检查父元素是否有绑定点击事件处理函数。
- 如果父元素有绑定点击事件处理函数，则调用该函数，并向其传递事件对象。
- 冒泡过程继续进行，直到到达文档的根节点为止。
- 在冒泡阶段结束后，浏览器进入捕获阶段，从外到内检查是否有元素绑定了点击事件处理函数。
- 如果存在绑定点击事件处理函数的元素，则调用该函数，

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript Event Model</title>
  </head>
  <body>
    <div id="outerDiv">
      <div id="innerDiv">
        <button id="myButton">Click Me</button>
      </div>
    </div>
    <p id="output"></p>
    <script>
      var outerDiv = document.getElementById('outerDiv');
      var innerDiv = document.getElementById('innerDiv');
      var button = document.getElementById('myButton');

      button.addEventListener(
        'click',
        () => {
          console.log(3);
        },
        true
      );
      innerDiv.addEventListener(
        'click',
        () => {
          console.log(2);
        },
        true
      );

      outerDiv.addEventListener(
        'click',
        (event) => {
          console.log(1);
          // event.stopPropagation();
        },
        true
      );
      window.addEventListener(
        'click',
        () => {
          console.log(4);
        },
        true
      );
      window.addEventListener(
        'click',
        () => {
          console.log(5);
        },
        false
      );
      outerDiv.addEventListener(
        'click',
        () => {
          console.log(6);
        },
        false
      );
      innerDiv.addEventListener(
        'click',
        () => {
          console.log(7);
        },
        false
      );
      button.addEventListener(
        'click',
        () => {
          console.log(8);
        },
        false
      );
    </script>
  </body>
</html>
```

答案

```JavaScript
4
1
2
3
8
7
6
5
```

## 9. 浏览器的缓存机制都有哪些

比如：在 chrome 浏览器打开一个 html 加载 一个网页，缓存机制都有哪些

浏览器缓存机制主要有两种：强缓存和协商缓存。

强缓存：浏览器检查缓存中是否存在请求的资源，如果存在，则直接使用缓存中的资源，不再向服务器请求。强缓存通过 HTTP 响应头的 "Expires" 和 "Cache-Control" 指令来实现。

协商缓存：如果缓存中不存在请求的资源或者强缓存已经失效，浏览器会向服务器发送请求，询问服务器是否更新了资源。协商缓存通过 HTTP 请求头的 "If-Modified-Since" 和 "If-None-Match" 指令实现。

当你访问一个页面时，浏览器首先检查缓存中是否存在该页面，如果存在且未失效，则直接使用缓存中的页面；否则，浏览器会向服务器发起请求，询问是否需要更新页面，然后根据服务器的响应决定是否使用缓存或重新请求页面。

---

**更详细一点**

强缓存的工作原理如下：

- 在第一次请求某个资源时，浏览器会请求服务器，并将服务器的响应保存到缓存中。
- 在下一次请求该资源时，浏览器会先检查缓存中是否存在该资源，如果存在，则直接使用缓存中的资源，不再向服务器请求。

强缓存通过 HTTP 响应头的 "Expires" 和 "Cache-Control" 指令来实现。例如：

```yaml
HTTP/1.1 200 OK
Date: Mon, 01 Feb 2023 12:00:00 GMT
Expires: Tue, 02 Feb 2023 12:00:00 GMT
Cache-Control: max-age=86400
```

上面的 HTTP 响应头告诉浏览器该资源的缓存有效期为一天（max-age=86400，单位为秒），直到明天 12:00:00 GMT 之前，浏览器都不会再向服务器请求该资源，而是直接使用缓存中的资源。

协商缓存是一种更加灵活的浏览器缓存机制，它依赖于浏览器和服务器之间的协商来决定是否使用缓存。

在协商缓存中，浏览器请求时会携带 "Cache-Control" 和 "ETag" 等 HTTP 请求头，服务器响应时会返回 "Last-Modified" 或 "ETag" 等 HTTP 响应头，浏览器和服务器会根据这些头信息来决定是否使用缓存。

举个例子，假设浏览器请求一个名为 "index.html" 的网页，如下所示：

```yaml
GET /index.html HTTP/1.1
Host: example.com
Cache-Control: max-age=0
If-None-Match: "a-unique-hash-value"
```

服务器的响应：

```yaml
HTTP/1.1 200 OK
Date: Mon, 01 Feb 2023 12:00:00 GMT
Last-Modified: Mon, 01 Feb 2023 11:00:00 GMT
ETag: "a-unique-hash-value"
```

浏览器在第一次请求时，通过 "Cache-Control" 和 "If-None-Match" 请求头询问服务器该资源是否变更。服务器的响应带有 "Last-Modified" 和 "ETag" 响应头，表示该资源的最后修改时间和当前版本的唯一标识，浏览器将缓存该资源并存储这些响应头信息。

第二次请求时，浏览器会携带 "If-Modified-Since" 和 "If-None-Match" 请求头，告诉服务器它缓存的资源的最后修改时间和版本标识：

```yaml
GET /index.html HTTP/1.1
Host: example.com
Cache-Control: max-age=0
If-Modified-Since: Mon, 01 Feb 2023 11:00:00 GMT
If-None-Match: "a-unique-hash-value"
```

服务器会比较请求头中的最后修改时间和版本标识与服务器上当前的版本，如果没有变更，服务器会返回 "304 Not Modified" 状态码，告诉浏览器使用它缓存的资源，以避免重复下载：

```yaml
HTTP/1.1 304 Not Modified
Date: Mon, 01 Feb 2023 12:01:00 GMT
```

如果服务器上的资源发生了变更，则会返回最新的内容：

```yaml
HTTP/1.1 200 OK
Date: Mon, 01 Feb 2023 12:01:00 GMT
Last-Modified: Mon, 01 Feb 2023 12:00:00 GMT
ETag: "a-new-unique-hash-value"
```

这样，浏览器就能确定该资源是否需要更新，从而更有效地利用它的缓存。

**"Expires" 和 "Cache-Control" 为什么要两个字段，一个字段不就可以直到是否过期了吗**

Expires 和 Cache-Control 两个字段都用于控制缓存的有效期，但两者的使用方式和优先级略有不同。

Expires 是 HTTP/1.0 版本提出的字段，它的格式是一个绝对的日期/时间，告诉浏览器在此之前该资源是有效的。它不能与私有缓存（Private Cache）一起使用，也不能与 shared cache（共享缓存）一起使用，因此它的使用范围非常有限。

Cache-Control 是 HTTP/1.1 版本提出的字段，它是一个更灵活、功能更强的字段，可以通过不同的指令（例如 max-age，no-cache，no-store，private，public）控制缓存的有效期和共享范围。

所以，使用 Expires 和 Cache-Control 两个字段都可以控制缓存的有效期，但由于 Cache-Control 的功能更强，更灵活，因此更加受欢迎。在 HTTP/1.1 中，Expires 可以作为 Cache-Control 的备用字段使用，但它的优先级比 Cache-Control 低。

**你上面提到的 etag 是什么**

Etag (Entity Tag) 是 HTTP/1.1 版本提出的一个字段，用于描述一个资源的实体，它的作用是确定该资源是否已经更改。

Etag 的值是一个哈希值，代表了该资源的当前版本。当浏览器向服务器请求该资源时，可以同时发送 If-None-Match 请求头，询问该资源的 Etag 是否与浏览器缓存的版本相同。如果服务器返回的 Etag 值与浏览器缓存的版本不同，则说明该资源已经更新，浏览器需要重新请求最新的资源。

使用 Etag 的优点是，如果该资源没有更新，服务器可以立即返回 HTTP 状态码 304 (Not Modified)，表示该资源没有更新，浏览器可以继续使用缓存的版本，避免了不必要的网络带宽浪费。

## 10. Vue 里面 v-if 和 v-show 那个优先级高

v-if 和 v-show 是 Vue.js 中常用的指令，用于在界面上显示或隐藏元素。它们都可以根据某个表达式的值来决定是否显示。

Vue.js 2 和 Vue.js 3 中 v-if 与 v-show 的优先级是一样的，没有明显的差别。

不过，在使用时要注意：

v-if 是惰性的，只有在表达式的值为 true 时才创建元素；
v-show 则是立即显示/隐藏，通过控制元素的 display 属性实现；
因此，在需要频繁地显示/隐藏元素的场景中，使用 v-show 比 v-if 更好；在只需要一次性创建元素的场景中，使用 v-if 更合适。

## 11. hash 和 history 模式的实现原理

Vue Router 支持三种路由模式：

- Hash 模式：URL 中带有 #，使用 window.location.hash 进行路由跳转，默认模式。

- History 模式：URL 中不带 #，使用 HTML5 history API（history.pushState 和 history.replaceState）进行路由跳转。

- Abstract 模式：不支持 history.pushState 和 history.replaceState 的浏览器或 WebView 中使用。

---

Hash 模式：在 URL 中带有 # 符号的情况下，浏览器不会对 URL 进行请求，而是通过 JavaScript 监听 hashchange 事件，实现页面路由跳转。

History 模式：使用 HTML5 History API，可以模拟 URL 跳转，实现页面路由跳转。浏览器会发送请求，服务器返回正确的内容，支持前进和后退操作。

Abstract 模式：适用于不支持 HTML5 History API 的浏览器或者 WebView 环境，这种模式完全基于 JavaScript 进行路由跳转，不支持前进和后退操作，需要开发人员自己处理。

## 12. Vue 里面有一个父组件和子组件他们的生命周期钩子函数执行顺序

TodoList.vue

```vue
<template>
  <div class="todolist">
    <TodoItem></TodoItem>
  </div>
</template>
<script>
import TodoItem from '@/components/Todo/TodoItem';
export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  data() {
    return {};
  },
  beforeCreate() {
    console.log('TodoList beforeCreate');
  },
  created() {
    console.log('TodoList created');
  },
  beforeMount() {
    console.log('TodoList beforeMount');
  },
  mounted() {
    console.log('TodoList mounted');
  },
  beforeUpdate() {
    console.log('TodoList beforeUpdate');
  },
  updated() {
    console.log('TodoList updated');
  },
  beforeDestroy() {
    console.log('TodoList beforeDestroy');
  },
  destroyed() {
    console.log('TodoList destroyed');
  }
};
</script>
```

TodoItem.vue

```vue
<template>
  <div class="todoitem">todoitem</div>
</template>
<script>
export default {
  name: 'TodoItem',
  data() {
    return {};
  },
  beforeCreate() {
    console.log('TodoItem beforeCreate');
  },
  created() {
    console.log('TodoItem created');
  },
  beforeMount() {
    console.log('TodoItem beforeMount');
  },
  mounted() {
    console.log('TodoItem mounted');
  },
  beforeUpdate() {
    console.log('TodoItem beforeUpdate');
  },
  updated() {
    console.log('TodoItem updated');
  },
  beforeDestroy() {
    console.log('TodoItem beforeDestroy');
  },
  destroyed() {
    console.log('TodoItem destroyed');
  }
};
</script>
```

- 父组件 - TodoList beforeCreate
- 父组件 - TodoList created
- 父组件 - TodoList beforeMount
- 子组件 - TodoItem beforeCreate
- 子组件 - TodoItem created
- 子组件 - TodoItem beforeMount
- 子组件 - TodoItem mounted
- 父组件 - TodoList mounted

## 13. Vue 虚拟 DOM 是什么？

https://cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom

<a href="/#/frontend/230128-vue-interview-questions?id=_22-vue-的-virtual-dom-是什么？" target="_blank">Vue 的 Virtual DOM 是什么？</a>

https://cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom

## 14. 平时在开发中有没有封装一些自定义指令，比如：v-scroll 懒加载

**面试官：一屏幕有 10 个 DOM 10 条消息， 如何判断那一条消息需要发送已读回执**

## 15. 微任务和宏任务都有哪些？

**面试官：一个普通的 JavaScript 是宏任务还是微任务？比如变量声明**

## 16. fs 模块遍历文件夹，并且输出每一个文件的名称和路径，如何处理

## 17. Nodejs 里面什么是进程守护

1. nodemon
2. forever
3. pm2

## 18. Electron 问题，在开发的时候你主要负责主进程还是渲染进程

**面试官：你是如何和百度内容 exe 程序通信**

## 19. 最近做的 electron 版本是多少？6.12.1 升级 17.3

**面试官：已经到 21 版本了，为什么没有用 21 版本的内容**

## 20. 项目多空间切换 是业务模块还是什么定义

## 21. 全文检索, sqlite3 如何实现的

**消息是存储在本地吗？**

## 22. 加密方式使用的是哪种

## 23. 前端的 key 在哪里（公钥、私钥）

## 24. 如何使用 nodejs 查询别的应用启动路径

## 25. **实时获取到应用的安装和卸载**

Win32 API 可以用来监听 Windows 系统上应用安装和卸载事件，但需要通过一些第三方包才能在 Node.js 里面使用。可以使用 node-ffi 模块，该模块允许在 Node.js 里面调用 Windows API。具体实现方式可以参考示例代码和相关文档。

以下是一个使用 Node.js + win32api 实时监听系统安装/卸载事件的示例：

```javascript
const {Client} = require('node-wmi');
const wmi = new Client({username: 'Administrator', password: 'password'});

wmi.query('SELECT * FROM Win32_Product', function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

wmi.on('created', function (item) {
  console.log(item.Name + ' has been installed');
});

wmi.on('deleted', function (item) {
  console.log(item.Name + ' has been uninstalled');
});

wmi.on('changed', function (item) {
  console.log(item.Name + ' has been changed');
});
```

以上代码使用 Node.js 的 node-wmi 模块，通过监听 Win32_Product 的实例变化来实时获取应用的安装/卸载事件。

## 26. electron 签名和验证签名有了解吗

## 27. 代码题

题目 1

```js
console.log(1);
setTimeout(() => {
  console.log(2);
}, 0);

new Promise((resolve, reject) => {
  console.log(3);
  resolve();
})
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  });

console.log(6);
// 1
// 3
// 6
// 4
// 5
// 2
```

题目 2

```js
let a = {
  b: function () {
    console.log(this);
  },
  c: () => {
    console.log(this);
  }
};
a.b(); // a
a.c(); // window
```

题目 3

```js
for (let i = 0; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  });
}

// 0
// 1
// 2
// 3
```

题目 4

```js
// "use strict"
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}

Foo.getName = function () {
  console.log(2);
};

Foo.prototype.getName = function () {
  console.log(3);
};

var getName = function () {
  console.log(4);
};

function getName() {
  console.log(5);
}

// 请填写输出结果
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1 严格模式报错
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
```

---

## 28. **项目经理**：React 和 Vue 底层的区别，关于数据 DOM 操作，如何去判断，原理有了解过吗

## 29. 项目经理：Vue2 和 Vue3 的区别

## 30. 项目经理：Vue2 和 Vue3 了解的差不多，,老项目是使用 Vue2 写的,现在希望对他进行升级,Api 和代码组织形式发生了一些变化，,如果想把 Vue2 升级到 Vue3 的话，有没有做过类似的事情

有插件是可以做得到的

## 31. 项目经理：刚刚听到你的阐述大部分都是正确的, 这样，结合一下，因为你既懂 Vue 又懂 React, 你可以了解这两个框架底层对于数据的处理, 到底是一个什么样的逻辑, 比如：Vue 是基于 watcher, React 是基于 JSON 在底层会有一个 json 做底层算法的对比, 它的每一个版本都会有一些变化, Vue2 会吸收一些 React 的知识, Vue3 又会吸收一些

## 32. 判断有网或者没有网 有没有做过

## 33. 项目经理：你方不方便说一下你为什么从上一家公司离职

## 34. 项目经理：如果有机会合作的话, 对于未来的工作有什么期望或者规划

我：有的，
我想了解咱们公司是一个什么样的团队

我：一直是你问我
我希望了解一下公司团队、
公司模式、测试、流程和规模这些大概是什么样子的

---

## **35. 第二天中午，项目经理：打电话和我确认**

项目经理：忘记和你沟通薪资，你目前的月薪多少，以及你期望的薪资是多少。

我：“说了月薪，薪资结构，福利待遇” -- 具体多少 你猜

项目经理：现在外面大环境确实不太好，如果总包不比你上一家公司少你可以考虑吗？

我：可以

项目经理：好的，那我去跟领导沟通，看看这个岗位的预算是多少。

---

## **第二天下午，hr 加我微信**

hr: 咱们昨天面试的 \*\*\* PC 岗位面试通过了 面试官让我和您沟通一下

我：谢谢您的通知, 我非常兴奋面试通过了. 期待与您的进一步沟通

## 36. hr：您上一家公司的月薪是多少？

## 37. hr：您期望的月薪是多少？

我：咱们公司的薪资结构是什么样的，社保和公积金怎么缴纳的？

hr：社保公积金 北京最低标准。

我：emmmm，我以前公司是北京最高标准缴纳的。

我：基于咱们的薪资结构，我期望的是 n k（你猜），我觉得不能低于以前的。

我：我和面试官沟通得很好，我过往得经历特别符合这个岗位...（说我的优势）。

hr：你期望的月薪超出我们的范围，我需要去申请沟通。

## 38. hr：方便说一下你从上一家公司离职的原因吗？

1. 被裁员的
2. 我们的项目是主打即时通讯和在线音视频会议。随着大环境的放开，VIP 用户并不那么需要了，海外推广的同学卖不出去产品，公司高层只能通过裁员来轻量化运行...（这是真实原因）。

## 39. hr：您什么时候可以到岗？

## 40. hr：您目前还有其它 offer 吗？

我：节后第一次投简历面试 其他还没投

## 41. hr：您方便提供一下流水吗？我拿着流水去申请薪资

我：可以

## 42. hr：您在个人所得税 APP 上查询一下纳税证明发我

我：好的

---

还在等 hr 沟通结果...
