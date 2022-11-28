# JavaScript 模块（module）

## Can I use

all users 96.04% 都支持

https://caniuse.com/?search=module

<!-- <img src="/images/frontend/js_module_caniuse.png" style="max-width: 600px; max-height: 200px;"> -->

## 如何在 html 直接写

### 在线例子

<a href="/examples/js-module/index.html" target="_blank">/examples/js-module/index.html</a>

### 代码如下

#### /examples/js-module/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>程序员李钟意 - js module</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import sayHello from './sayHello.js';
      const text = sayHello('钟意你');
      console.log(text);
      document.querySelector('#app').innerHTML = text;
    </script>
  </body>
</html>
```

#### /examples/js-module/sayHello.js

```js
export default function sayHello(name) {
  return 'Hello ' + name + '!';
}
```

### 页面控制台输出结果

`Hello 钟意你!`

<!-- <img src="/images/frontend/js_module_sayhello.png" style="max-width: 600px; max-height: 200px;"> -->

## 扩展 Vite 原理

Vite 就是利用 js module 不打包直接运行 js module 代码所以很快

## 最后

也有人把`js module` 叫做 `ES Module`，叫什么这里不讨论，我反正管它叫做 `js module`
