# 直播讲解测试题目汇总

## 2023/01/16 作用域、作用链、闭包

<a href="/examples/live-code/index.html" target="_blank">examples/live-code/index.html</a><br/>

作用域

```js
var x = 1;

function foo() {
  console.log(x);
}

function bar() {
  var x = 2;
  foo();
}

bar();
```

闭包题目：

```js
function foo() {
  var x = 1;

  function bar() {
    console.log(x);
  }

  return bar;
}

var baz = foo();
baz(); // 输出 1
```

<img src="../../images/frontend/live_js-use-strict.png" style="max-height: 220px" /><br/>

## 2023/01/17 宏任务和微任务

使用例子，从简单到复杂让大家理解宏任务和微任务

### 例子如下

<img src="../../images/frontend/live_macrotask-and-microtask1.png" style="max-height: 220px" /><br/>

<img src="../../images/frontend/live_macrotask-and-microtask2.png" style="max-height: 220px" /><br/>

<img src="../../images/frontend/live_macrotask-and-microtask3.png" style="max-height: 220px" /><br/>

<img src="../../images/frontend/live_macrotask-and-microtask4.png" style="max-height: 220px" /><br/>

<img src="../../images/frontend/live_macrotask-and-microtask5.png" style="max-height: 220px" /><br/>

<img src="../../images/frontend/live_macrotask-and-microtask7.png" style="max-height: 220px" /><br/>

<img src="../../images/frontend/live_macrotask-and-microtask8.png" style="max-height: 220px" />
