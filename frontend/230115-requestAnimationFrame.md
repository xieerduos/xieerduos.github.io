# 使用 requestAnimationFrame 优化页面动画性能

在线查看例子 效果 setTimeout <a href="/examples/requestAnimationFrame/setTimeout.html" target="_blank">/examples/requestAnimationFrame/setTimeout.html</a>

在线查看例子 效果 requestAnimationFrame <a href="/examples/requestAnimationFrame/requestAnimationFrame.html" target="_blank">/examples/requestAnimationFrame/requestAnimationFrame.html</a>

## requestAnimationFrame 是什么

requestAnimationFrame 是一种浏览器 API，它可以更高效地控制页面动画的渲染。它允许开发者在浏览器重绘之前调用函数来更新动画。它非常适用于管理动画和游戏循环。

与 setTimeout 和 setInterval 相比，requestAnimationFrame 更加高效，因为它会在浏览器重绘之前调用函数，而不是在固定的时间间隔内调用函数。这可以防止动画卡顿，提高动画流畅性，并且根据浏览器的刷新率自动调整动画帧率。

总之，requestAnimationFrame 是一种更高效的动画渲染方式，它可以确保动画流畅并且节省电量。

举个例子

```js
function animate() {
  // update animation
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

上面的代码实现了循环动画，每一帧动画都会在浏览器重绘之前调用 animate 函数。

因为它更加高效，所以在构建动画或游戏时，推荐使用 requestAnimationFrame 代替 setTimeout 和 setInterval。

## 例子对比说明使用 setTimeout 会卡顿，使用 requestAnimationFrame 不会

是的，我可以举一个例子来说明使用 setTimeout 会导致动画卡顿，而使用 requestAnimationFrame 则不会。

假设我们要创建一个简单的动画，在页面上移动一个 div 元素。使用 setTimeout 实现这个动画的代码可能长这样：

```html
<div id="box"></div>

<script>
  var box = document.getElementById('box');
  var left = 0;
  function animate() {
    left++;
    box.style.left = left + 'px';
    setTimeout(animate, 1000 / 60);
  }
  animate();
</script>
```

这个例子中，我们使用 setTimeout 在每一帧动画之间添加了一个时间间隔。我们设置了一个 60fps 的帧率，也就是每秒 60 帧。这意味着每一帧动画的时间间隔为 1000/60 = 16.67ms。

这种实现方式会导致动画卡顿，因为它并不能保证在浏览器重绘之前调用 animate 函数。由于 JavaScript 是单线程的，如果在 JavaScript 执行过程中阻塞了其他任务，那么就会导致动画卡顿。

相反，使用 requestAnimationFrame 则不会卡顿，它能保证动画在浏览器重绘之前调用，而不是在固定的时间间隔内调用。

```html
<div id="box"></div>

<script>
  var box = document.getElementById('box');
  var left = 0;
  function animate() {
    left++;
    box.style.left = left + 'px';
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
</script>
```

在这个例子中，我们使用 requestAnimationFrame 来调用 animate 函数，这样就能保证动画在浏览器重绘之前调用，而不是在固定的时间间隔内调用。

使用 requestAnimationFrame 的好处在于，它能与浏览器重绘同步运行，从而避免动画卡顿。而使用 setTimeout 或 setInterval 就不能保证这一点，所以在构建动画或游戏时，推荐使用 requestAnimationFrame 代替 setTimeout 和 setInterval。

## requestAnimationFrame 和 setTimeout/setInterval 的区别

requestAnimationFrame 和 setTimeout/setInterval 最明显的区别是它们用于控制动画的方式不同。

setTimeout 和 setInterval 是 JavaScript 提供的定时器函数，它们在指定的时间间隔内不断调用函数。这意味着，即使浏览器没有重绘，也会不断调用函数。这可能会导致动画卡顿，因为浏览器在重绘时需要停顿一段时间来处理函数的调用。

requestAnimationFrame 是浏览器提供的 API，它在浏览器下一次重绘之前调用函数。这意味着，如果浏览器没有重绘，就不会调用函数。这样可以节省资源并确保动画流畅。

总结来说，requestAnimationFrame 是一种更高效的动画渲染方式，它可以根据浏览器的刷新率自动调整动画帧率，并且可以暂停或取消动画。而 setTimeout 和 setInterval 是在固定时间间隔内不断调用函数，可能会导致动画卡顿。

## requestAnimationFrame 在现代浏览器中的兼容性

can i use

requestAnimationFrame 在现代浏览器中是很好的支持的。

几乎所有现代浏览器都支持 requestAnimationFrame API。包括：

- Internet Explorer 10+
- Microsoft Edge
- Google Chrome
- Mozilla Firefox
- Apple Safari
- Opera

然而，在一些较老的浏览器中， requestAnimationFrame 可能不可用。如果需要兼容性，可以使用第三方库，如 Paul Irish 的 requestAnimationFrame.js 来提供兼容性。

总之，requestAnimationFrame 是一种广泛支持的 API，但如果需要兼容性，可以使用第三方库来提供兼容性。

## 如何使用 requestAnimationFrame 进行动画渲染

使用 requestAnimationFrame 进行动画渲染需要遵循一些基本的步骤。

1. 首先，需要在动画函数中使用 requestAnimationFrame 来调用函数。

```js
function animate() {
  // 更新动画
  requestAnimationFrame(animate);
}
```

2. 其次，在动画函数中需要更新动画元素的状态。这可能包括更新元素的位置、大小、样式等。

```js
function animate() {
  // 更新动画元素的状态
  element.style.left = x + 'px';
  element.style.top = y + 'px';

  requestAnimationFrame(animate);
}
```

3. 最后，在页面加载完成后调用动画函数。

```js
window.onload = function () {
  animate();
};
```

需要注意的是, requestAnimationFrame 只会在浏览器重绘时调用动画函数，因此动画不会占用太多的 CPU 资源。另外，在动画执行过程中可以通过 cancelAnimationFrame 取消动画。

总之，使用 requestAnimationFrame 进行动画渲染需要定义动画函数，在动画函数中使用 requestAnimationFrame 来调用函数，更新动画元素的状态并在页面加载完成后调用动画函数。

## requestAnimationFrame 的一些实际应用场景（如：页面滚动动画，canvas 动画等）

### 页面滚动动画：

使用 requestAnimationFrame 可以创建流畅的页面滚动动画。例如，可以使用它来控制页面元素的滚动效果，或者在页面滚动时显示/隐藏元素。

### canvas 动画：

使用 requestAnimationFrame 可以创建高性能的 canvas 动画。例如，可以使用它来控制 canvas 中元素的运动，或者在 canvas 中绘制动态图形。

### 游戏：

requestAnimationFrame 还可以用于游戏开发。例如，可以使用它来控制游戏角色的运动，或者在游戏循环中更新游戏场景。因为 requestAnimationFrame 根据浏览器的刷新率自动调整帧率，所以可以确保游戏流畅并且节省电量。

动画效果，如导航栏的收缩展开，按钮的点击效果等

### 其他动画效果：

如轮播图的切换效果，图片的缩放效果等。

总之, requestAnimationFrame 是一种高效的动画渲染方式，它可以用于多种应用场景，如页面滚动动画，canvas 动画，游戏开发，动画效果等。它可以确保动画流畅并节省电量，是一种非常实用的动画渲染方式。

## 小结：requestAnimationFrame 是一种更高效的动画渲染方式，可以节省电量并优化性能。

- requestAnimationFrame 是一种更高效的动画渲染方式，它可以在浏览器重绘之前调用函数，节省电量并优化性能。
- 它可以用于多种应用场景，如页面滚动动画，canvas 动画，游戏开发，动画效果等。
- 并且广泛支持于现代浏览器，在兼容性问题上可以使用第三方库来解决。

## 参考地址

https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame

---

## 常见问题解答

### requestAnimationFrame 是宏任务吗?

requestAnimationFrame 是一个由浏览器提供的 API，它能够在屏幕重绘前通知浏览器调用回调函数。

> 根据 W3C 官方文档：

> "requestAnimationFrame() 方法告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。"

> "这个方法使动画更加平滑，因为它避免了因为 JavaScript 脚本的执行速度过快而导致的动画卡顿现象。"

这说明 requestAnimationFrame 是和浏览器屏幕刷新率相关的，它是在屏幕重绘前调用，所以它属于宏任务.
