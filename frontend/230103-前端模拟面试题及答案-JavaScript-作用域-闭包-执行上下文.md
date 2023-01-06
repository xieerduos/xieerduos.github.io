# 前端模拟面试题及答案-JavaScript-作用域-闭包-执行上下文

## 13. 什么是作用域和作用链？

```
在 JavaScript 中，作用域（scope）指的是变量与函数的可访问范围，也就是变量或函数在程序中的可见性。

在 JavaScript 中，有两种作用域：全局作用域和局部作用域。

全局作用域：指的是在程序的最外层定义的变量或函数，这些变量或函数在整个程序中都是可见的。

局部作用域：指的是在函数内部定义的变量或函数，这些变量或函数只在函数内部是可见的，在函数外部是不可见的。

作用链（scope chain）指的是在 JavaScript 中用于查找变量或函数的一系列作用域的链式结构。

在 JavaScript 中，作用链是从内向外延伸的。
当在一个作用域内查找变量或函数时，如果在当前作用域中找不到，就会继续在外层的作用域中查找，直到找到为止。

例如，假设有如下代码：
```

```js
var x = 1;

function foo() {
  var y = 2;

  function bar() {
    var z = 3;
    console.log(x + y + z);
  }

  bar();
}

foo();
```

```
我们来看一下上面的代码中的变量 x 和 y 在各自的作用域内是如何查找的：

在函数 bar 内查找变量 x：首先在函数 bar 的局部作用域内查找，
因为在函数 bar 的局部作用域内并没有定义变量 x，所以查找失败；
然后继续在函数 foo 的局部作用域内查找，
因为在函数 foo 的局部作用域内并没有定义变量 x，所以查找失败；
最后，在全局作用域内查找，因为在全局作用域内定义了变量 x，所以查找成功。

在函数 foo 内查找变量 y：首先在函数 foo 的局部作用域内查找，
因为在函数 foo 的局部作用域内定义了变量 y，所以查找成功。

注意，在 JavaScript 中函数的作用域是在函数定义的时候就确定的，
而不是在函数调用的时候确定的。

例如，假设有如下代码：
```

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

```
在上面的代码中，
变量 x 和函数 foo 在全局作用域中定义，
变量 x 和函数 bar 在函数 bar 的局部作用域中定义。

当我们调用函数 bar 时，在函数 bar 内部会先定义一个局部变量 x，然后调用函数 foo。

此时，在函数 foo 中查找变量 x 时，会先在函数 foo 的局部作用域内查找，
因为在函数 foo 的局部作用域内并没有定义变量 x，所以查找失败；
然后继续在全局作用域内查找，因为在全局作用域内定义了变量 x，所以查找成功。


总结一下，在 JavaScript 中，作用域指的是变量或函数的可访问范围，有全局作用域和局部作用域两种。
作用链则是用于查找变量或函数的一系列作用域的链式结构，从内向外延伸。

所以，当我们在函数 bar 中调用函数 foo 时，
函数 foo 中的变量 x 并不是函数 bar 中的局部变量 x，而是全局作用域中的变量 x。

在 JavaScript 中，函数的作用域是在函数定义的时候就确定的，
而不是在函数调用的时候确定的。这意味着，当函数被调用时，函数内部可以访问外层作用域中的变量，
但是外层作用域不能访问函数内部的变量。
```

## 14. JavaScript 中`{}`里面定义的变量是不是局部作用域

在 JavaScript 中，使用大括号 {} 可以创建一个块级作用域。
在这个块级作用域内定义的变量是局部变量，只能在这个块级作用域内使用。

举个例子，以下代码中，x 只能在 if 语句块内使用：

```js
if (true) {
  let x = 1;
  console.log(x); // 1
}

console.log(x); // Uncaught ReferenceError: x is not defined
```

在 JavaScript 中，还有一种创建局部作用域的方法是使用函数。在函数中定义的变量也是局部变量，只能在函数内使用。

```js
function foo() {
  let x = 1;
  console.log(x); // 1
}

console.log(x); // Uncaught ReferenceError: x is not defined
```

因此，在 JavaScript 中，使用大括号 {} 创建的块级作用域内定义的变量是局部变量，只能在这个块级作用域内使用。

## 15. 这个使用的是 let 关键字，如果是使用 var 呢

在 JavaScript 中，使用 var 关键字定义的变量并不是局部变量，而是全局变量或函数作用域内的变量。

举个例子，以下代码中，使用 var 定义的变量 x 可以在 if 语句块外访问：

```js
if (true) {
  var x = 1;
  console.log(x); // 1
}

console.log(x); // 1
```

如果使用 let 定义变量 x，那么 x 将只能在 if 语句块内使用，在外部将会抛出一个 ReferenceError。

因此，在 JavaScript 中，使用 var 定义的变量并不是局部变量，而是全局变量或函数作用域内的变量。

在这里，我们还需要注意一点：在块级作用域内使用 var 定义变量会导致变量提升（hoisting）。也就是说，变量的定义会被提前到作用域的最顶端，这会导致一些奇怪的行为。

例如，以下代码会输出 undefined：

```js
if (true) {
  console.log(x); // undefined
  var x = 1;
}
```

上面的代码等价于：

```js
var x;
if (true) {
  console.log(x); // undefined
  x = 1;
}
```

所以，在块级作用域内使用 var 定义变量时，要小心这种变量提升的行为。

## 16. 什么是闭包，及应用场景？

```
闭包（closure）是 JavaScript 中的一种特殊的对象，
它由两部分构成：函数和该函数所声明的所有局部变量的环境。

闭包可以让你在函数外部访问函数内部的局部变量。
这一点在 JavaScript 中很重要，
因为 JavaScript 的函数作用域是在函数定义的时候就确定的，
而不是在函数调用的时候确定的。

例如，假设有如下代码：
```

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

```
在上面的代码中，函数 foo 声明了一个局部变量 x，并返回了内部函数 bar。

此时，在函数 foo 外部调用函数 baz 时，函数 baz 依然可以访问函数 foo 内部的变量 x。这就是闭包的作用。

闭包的应用场景包括：

封装私有变量：闭包可以用于封装函数内部的私有变量，使外界无法访问这些变量。

实现回调函数：闭包可以用于实现回调函数，例如计时器函数 setTimeout 和 setInterval。

模拟块级作用域：在 JavaScript 中，没有块级作用域的概念，但是可以用闭包来模拟块级作用域。

在使用闭包时，需要注意的是，如果闭包内部的变量持续存在，会导致内存泄漏。
因此，在使用闭包时应该注意及时销毁不再使用的变量。


在使用闭包时，还需要注意闭包会影响变量的查找顺序。例如，假设有如下代码：


```

```JS
var x = 1;

function foo() {
  var x = 2;

  function bar() {
    console.log(x);
  }

  return bar;
}

var baz = foo();
baz(); // 输出 2

```

```
在上面的代码中，变量 x 在全局作用域和函数 foo 的局部作用域中都有定义。

当我们调用函数 baz 时，在函数 baz 中查找变量 x 时，
会先在函数 baz 的局部作用域内查找，
因为在函数 baz 的局部作用域内并没有定义变量 x，所以查找失败；
然后继续在函数 foo 的局部作用域内查找，
因为在函数 foo 的局部作用域内定义了变量 x，所以查找成功。

这就是闭包会影响变量的查找顺序的一个例子。

总结一下，闭包是 JavaScript 中的一种特殊的对象，
由函数和该函数所声明的所有局部变量的环境组成。
闭包可以让你在函数外部访问函数内部的局部变量，
应用场景包括封装私有变量、实现回调函数和模拟块级作用域。
在使用闭包时，
需要注意及时销毁不再使用的变量，
以避免内存泄漏。
此外，闭包会影响变量的查找顺序，
函数内部的变量会优先于外层作用域中的变量查找。
```

## 17. 什么是执行上下文？

在 JavaScript 中，执行上下文（Execution Context）是代码执行的环境。
每个执行上下文都有自己的变量对象（Variable Object），用于存储变量和函数声明。

- JavaScript 引擎在执行代码时，会创建一个执行上下文并把它推入执行上下文栈（Execution Context Stack）。
  当代码执行完毕后，该执行上下文会从执行上下文栈中弹出。

* JavaScript 中有两种主要的执行上下文：
  全局执行上下文（Global Execution Context）和函数执行上下文（Function Execution Context）。

* 全局执行上下文是代码在浏览器或 Node.js 环境中首先被执行的上下文。
  它的变量对象是全局对象，比如浏览器中的 window 对象或 Node.js 中的 global 对象。

* 函数执行上下文是在函数被调用时创建的执行上下文。它的变量对象是函数内部的局部变量。
* 每个执行上下文都有自己的作用域链（Scope Chain），用于查找变量的定义。
  作用域链是一个由多个对象组成的链表，由当前执行上下文的变量对象开始，
  然后是它的父级执行上下文的变量对象，以此类推。

* 在 JavaScript 中，每个执行上下文都有一个自己的 this 值。
  在全局执行上下文中，this 的值通常是全局对象。
  在浏览器中，this 的值是 window 对象；
  在 Node.js 中，this 的值是 global 对象。

* 在函数执行上下文中，this 的值取决于函数的调用方式。
  如果函数是作为对象的方法调用的，那么 this 的值就是调用该方法的对象。例如：

```js
let obj = {
  name: 'Alice',
  greet: function () {
    console.log(`Hello, ${this.name}`);
  }
};
obj.greet(); // Hello, Alice
```

如果函数是通过函数调用表达式（Function Call Expression）调用的，那么 this 的值就是全局对象。例如：

```js
function greet() {
  console.log(`Hello, ${this.name}`);
}
greet(); // Hello, undefined (在浏览器中)
// Hello, global (在 Node.js 中)
```

在 JavaScript 中，还有一种方法可以改变函数的 this 值，那就是使用 call、apply 或 bind 方法。这些方法可以接受一个参数，用来指定函数的 this 值。

例如，我们可以使用 call 方法来改变 greet 函数的 this 值：

```js
function greet() {
  console.log(`Hello, ${this.name}`);
}
greet.call({name: 'Bob'}); // Hello, Bob
```

我们也可以使用 apply 方法来改变函数的 this 值：

```js
greet.apply({name: 'Alice'}); // Hello, Alice
```

还有，我们可以使用 bind 方法来创建一个函数的绑定函数（Bound Function），
这个绑定函数的 this 值是我们指定的值。例如：

```js
let greetBob = greet.bind({name: 'Bob'});
greetBob(); // Hello, Bob
```

因此，在 JavaScript 中，我们可以使用 call、apply 或 bind 方法来改变函数的 this 值。

bind 的应用

```js
var fn = (age) => {
  // 执行代码
  console.log('age', age);
};
var arr = []; // 数组元素是一个参数

arr.push(fn.bind(null, 22));
arr.push(fn.bind(null, 18));

console.log(arr);

setTimeout(() => {
  arr.forEach((item) => {
    item();
  });
}, 3000);
```

需要注意的是，在严格模式下（strict mode），如果函数的 this 值是 null 或 undefined，那么 this 的值不会自动指向全局对象。在严格模式下，这种情况下 this 的值仍然是 null 或 undefined。

例如，在严格模式下，以下代码会抛出一个 TypeError 错误：

```js
'use strict';

function greet() {
  console.log(`Hello, ${this.name}`);
}
greet(); // Uncaught TypeError: Cannot read property 'name' of undefined
```

为了避免在严格模式下抛出错误，
我们可以在调用函数之前检查 this 的值是否为 null 或 undefined，
如果是，就将 this 指向一个默认对象。例如：

```js
'use strict';

function greet() {
  this = this || {};
  console.log(`Hello, ${this.name}`);
}
greet();  // Hello, undefined

```

或者，我们也可以使用箭头函数（Arrow Function）来避免 this 的问题。
在箭头函数中，this 的值是固定的，不会受到调用方式的影响。例如：

```js
'use strict';

let greet = () => {
  console.log(`Hello, ${this.name}`);
};
greet(); // Hello, undefined
```

因此，在 JavaScript 中，我们可以使用箭头函数来避免 this 的问题。

总的来说，this 在 JavaScript 中是一个非常重要的概念。它代表函数执行时的上下文，可以用来访问函数内部的变量和外部的对象。但是，由于 this 的值受函数调用方式的影响，所以它的值并不总是我们期望的值。因此，我们需要注意 this 的值并适当地处理它。

例如，我们可以使用 call、apply 或 bind 方法来改变函数的 this 值，或者使用箭头函数来避免 this 的问题。这些方法都可以帮助我们更好地控制函数的执行上下文。
