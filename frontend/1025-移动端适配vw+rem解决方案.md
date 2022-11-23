# 移动端适配 vw+rem 解决方案

## 了解一下 rem

rem（font size of the root element）是相对长度单位。
相对于根元素（即 html 元素）font-size 计算值的倍数。

适配原理：将 px 替换成 rem，动态修改 html 的 font-size 适配。
它可以很好的根据根元素的字体大小来进行变化，从而达到各种
屏幕基本一致的效果体验

## u 同学给的设计稿

常见的设计图宽度，当然也可以是其他的宽度，比如 720 像素的

1. 375 iPhone7
2. 750 二倍图
3. 320 iPhone5
4. 640 二倍图

为什么给的是 375？因为这个是 iPhone7 的宽度，

也就是说最低兼容到 375 像素的屏幕。（低于 375 布局可能会乱）

其他的同理

## 1. vw + rem 方案

如果效果图是 375px 的，

html 的 style 属性的 font-size 设置为 26.666666vw

css 中 20px 改写为 0.2rem 即可

```html
<!DOCTYPE html>
<html lang="en" style="font-size: 26.666666vw">
  <head>
    <meta charset="UTF-8" />
    <!--
        下面一行代码的解析：
        width=device-width 内容宽度 等于 设备宽度，换句话说 网页宽度为设备宽度
        initial-scale=1.0 初始缩放比等于1.0倍，换句话说 网页初始化缩放比为1.0 就是默认不缩放
    -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      /* 设置 div 为宽度100px高度18px */
      .app-main {
        /* 移动端写法 */
        width: 1rem;
        height: 0.18rem;
        /* 
                PC端写法
                width: 100px;
                height: 18px; */
      }
    </style>
  </head>
  <body>
    <div class="app-main"></div>
  </body>
</html>
```

为什么是 26.666666vw？得了解下面几个问题

```
-   1. 什么是 viewport？
-   2. 为什么要用它？
-   3. 怎么用？
-   4. `vw`、`vh`是什么?

答：

1. 什么是 viewport？
   [MDN viewport](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Viewport_concepts)的解析是
   视口(viewport)代表当前可见的计算机图形区域。在 Web 浏览器术语中，通常与浏览器窗口相同，但不包括浏览器的 UI， 菜单栏等——即指你正在浏览的文档的那一部分。

2. 用它来移动端适配，兼容不同的设备，当然不局限于移动端，这里只讨论移动端

3. 只需要在`head`中定义 `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`就行，具体如下：

`
<head>
    <meta charset="UTF-8" />
    <!--
        下面一行代码的解析：
        width=device-width 内容宽度 等于 设备宽度，换句话说 网页宽度为设备宽度
        initial-scale=1.0 初始缩放比等于1.0倍，换句话说 网页初始化缩放比为1.0 就是默认不缩放
    -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
</head>
`

4.  `vw` 是视口宽度的一个单位，viewport width 的简称，根据 viewport 相关定义，
    已经定义好了的，PC 端 100vw 就等于浏览器的宽度，移动端 100vw 就是设备的宽度(按照上面的 width=device-width)
    `vh` 同理，是视口高度，viewport height 的简称，100vh 就是可视窗口的高度
```

了解完上面的知识点，我们可以回答

为什么 font-size 设置成 26.666666vw?

```
设计图的宽度 = 设备宽度
假如 设计图的宽度为 375px，当然可以是其他的，这里是一个假如，如果是640，750就把375换成对应的数值按照以下方法换算就行就行
因为
    375px = 100vw
那么
    1px = 100 / 375 vw = 0.26666666666666666vw（约等于）

为了方便计算，放大一百倍，精确到6位，只能下取舍，因为上取舍，计算宽度的时候会大于页面宽度，从而出现滚动条
故：
    100px = 26.666666vw（约等于）

又因为给 html 标签设置 font-size 为 26.666666vw （约等于）

1rem为font-size的大小

所以：
    1rem = 100px
    0.2rem = 20px
也就是说：
    设计图上的 12px 换算成rem就是0.12rem，20px就写成0.2rem即可
```

优点：不需要引入新的 js，一行代码搞定适配问题
缺点：浏览器兼容性差，IE9 以下不支持，但现代浏览器，特别是移动端，基本都支持

---

可以参考：

| 设计图大小（单位 px） | html 的 font-size（单位 vw） | 备注                           |
| --------------------- | :--------------------------: | ------------------------------ |
| 375                   |          26.666666           | 效果图 20px，代码应该写 0.2rem |
| 750                   |          13.333333           | 效果图 20px，代码应该写 0.2rem |
| 320                   |            31.25             | 效果图 20px，代码应该写 0.2rem |
| 640                   |            15.625            | 效果图 20px，代码应该写 0.2rem |

## 2. flexible 方案，（阿里）

在 [lib-flexible](https://github.com/amfe/lib-flexible) 的 github 上有着这样的一句话。

> 由于 `viewport` 单位得到众多浏览器的兼容，`lib-flexible` 这个过渡方案已经可以放弃使用，不管是现在的版本还是以前的版本，都存有一定的问题。建议大家开始使用 viewport 来替代此方案。`vw` 的兼容方案可以参阅《如何在 Vue 项目中使用 vw 实现移动端适配》一文。

我们可以得到一个很明确的信息，lib-flexible 这个方案已经被放弃使用了，我们可以去拥抱 `vw` 的那套实现方案。

## 3. 基于 flexible 的 [hotcss](https://github.com/LinkSun/hotcss)方案

---

该文档写于 2019 年 12 月 23 日
