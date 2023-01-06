# 前端模拟面试题及答案-JavaScript-继承-原型和原型链-代码执行机制

## 18. JavaScript 如何实现继承？

- JavaScript 中的继承是通过原型链（Prototype Chain）实现的。
- 在 JavaScript 中，
- 每个对象都有一个内部指针（[[Prototype]]）指向另一个对象，
- 称为原型对象（Prototype Object）。
- 当访问对象的某个属性时，
- 如果对象本身没有这个属性，
- 则会沿着原型链向上查找，
- 直到找到这个属性为止。
- 这样，就可以在原型对象中定义公共的属性和方法，
- 让所有的对象都能够继承这些属性和方法。

例如，我们可以定义一个原型对象，用来表示所有动物的公共属性和方法：

```js
let Animal = {
  type: 'Animal',
  say: function () {
    console.log(`I am a ${this.type}.`);
  }
};
```

然后，我们可以通过将一个对象的原型设置为 Animal，
来让这个对象继承 Animal 中定义的属性和方法。例如：

```js
let cat = {
  type: 'Cat'
};
cat.__proto__ = Animal; // 设置 cat 的原型为 Animal

cat.say(); // I am a Cat.
```

这样，cat 就继承了 Animal 中定义的属性和方法。

需要注意的是，JavaScript 中的继承是通过原型链实现的，而不是通过类和实例的继承关系。

因此，JavaScript 中的继承有一些与传统的面向对象编程（OOP）语言不同的特点。

例如，在 JavaScript 中，可以在运行时动态地修改对象的原型，从而改变对象的继承关系。
这在传统的面向对象语言中是不允许的。

另外，JavaScript 中的原型链继承是浅拷贝（Shallow Copy），而不是深拷贝（Deep Copy）。
这意味着，如果对象的原型中有引用类型的属性，那么继承这个对象的所有对象都会共享这个属性。

因此，在使用 JavaScript 中的继承时，需要注意这些特点，避免继承带来的问题。

## 19. 什么是 JavaScript 的原型及原型链，简单介绍一下。

在 JavaScript 中，每个对象都有一个内部指针（[[Prototype]]）指向另一个对象，
称为原型对象（Prototype Object）。
这个原型对象可以有自己的原型对象，形成一个原型链（Prototype Chain）。

- 当访问对象的某个属性时，
- 如果对象本身没有这个属性，
- 则会沿着原型链向上查找，
- 直到找到这个属性为止。
- 这样，就可以在原型对象中定义公共的属性和方法，
- 让所有的对象都能够继承这些属性和方法。

例如，我们可以定义一个原型对象，用来表示所有动物的公共属性和方法：

```js
let Animal = {
  type: 'Animal',
  say: function () {
    console.log(`I am a ${this.type}.`);
  }
};
```

然后，我们可以通过将一个对象的原型设置为 Animal，来让这个对象继承 Animal 中定义的属性和方法。例如：

```js
let cat = {
  type: 'Cat'
};
cat.__proto__ = Animal; // 设置 cat 的原型为 Animal

cat.say(); // I am a Cat.
```

这样，cat 就继承了 Animal 中定义的属性和方法。

可以看到，JavaScript 中的原型对象可以用来实现继承，即让一个对象继承另一个对象中定义的属性和方法。这样，就可以避免在每个对象中都重复定义相同的属性和方法，提高代码的复用性。

此外，JavaScript 中的原型还可以用来模拟多态（Polymorphism）。例如，我们可以定义多个原型对象，表示不同类型的动物，然后让这些原型对象之间相互继承，从而达到多态的效果。

例如，我们可以定义一个 Cat 原型，用来表示所有猫的特性：

```js
let Cat = {
  type: 'Cat',
  say: function () {
    console.log('Meow!');
  }
};
```

然后，我们可以将 Cat 原型的原型设置为 Animal，让 Cat 原型继承 Animal 原型中定义的属性和方法：

```js
Cat.__proto__ = Animal;
```

这样，所有通过 Cat 原型创建的对象都会继承 Cat 原型和 Animal 原型中定义的属性和方法。

例如，我们可以通过 Cat 原型创建一只名叫 Tom 的猫：

```js
let tom = {
  name: 'Tom'
};
tom.__proto__ = Cat;

tom.say(); // Meow!
console.log(tom.type); // Cat
```

可以看到，
通过 Cat 原型创建的 tom 对象既继承了 Cat 原型中的 say 方法，
也继承了 Animal 原型中的 type 属性。
这就是 JavaScript 中的原型链继承。

## 20. JavaScript 代码执行原理机制是什么？

JavaScript 代码在执行时，会进行如下流程：

1. 首先，JavaScript 引擎会对代码进行`词法分析`（Lexical Analysis），将代码分解为若干个`词法单元`（Lexical Unit）。

2. 接着，JavaScript 引擎会对`词法单元`进行`语法分析`（Syntax Analysis），将词法单元组`合成语法树`（Syntax Tree）。

3. 然后，JavaScript 引擎会将`语法树`转化为`可执行代码`，并将其加入`执行上下文`（Execution Context）的`代码执行栈`（Execution Stack）中。

4. 当代码执行栈中的代码执行完毕后，JavaScript 引擎会从`执行上下文中弹出执行栈`，并将控制权交回调用者。

这样，JavaScript 代码就被执行完毕。

需要注意的是，JavaScript 中的执行上下文是有层级的，即一个执行上下文可以嵌套在另一个执行上下文中。这种情况下，JavaScript 引擎会将嵌套的执行上下文加入执行栈中，并在执行完毕后弹出。

**上一个问题，“JavaScript 代码执行原理机制是什么？” 你可以更加生动形象的解释吗**

JavaScript 代码执行原理机制可以理解为以下过程：

1. 首先，JavaScript 引擎会读取代码，并将代码分解成若干个词法单元，类似于拆分成单词。这一过程叫做词法分析。
2. 接着，JavaScript 引擎会将词法单元组合成语法树，类似于把单词组合成句子。这一过程叫做语法分析。
3. 然后，JavaScript 引擎会将语法树转化为可执行代码，并将其加入执行栈中。执行栈就像是一个盒子，存储着需要执行的代码。
4. 当执行栈中的代码执行完毕后，JavaScript 引擎会将执行栈弹出，并将控制权交回调用者。

这就是 JavaScript 代码执行原理机制的大致流程。

希望我的回答能够帮助你更加生动形象的理解 JavaScript 代码执行原理机制。

**可以更加详细一点吗**

好的，我来解释一下 JavaScript 代码执行原理机制的更加详细的过程：

首先，当 JavaScript 引擎读取到代码时，它会将代码分解为若干个词法单元。词法单元是 JavaScript 中最小的语法单位，可以是关键字、标识符、运算符、字符串、数字等。例如，对于代码 "let x = 1 + 2"，JavaScript 引擎会将其分解为 "let"、"x"、"="、"1"、"+"、"2" 六个词法单元。

接着，JavaScript 引擎会对词法单元进行语法分析，即检查词法单元的排列是否符合语言的语法规则。如果语法检查通过，JavaScript 引擎会将词法单元组合成一颗语法树。语法树是一种表示代码结构的树形结构，用来表示代码中各个语句之间的嵌套关系。例如，对于上面的代码 "let x = 1 + 2"，JavaScript 引擎

会将其组合成如下语法树：

```js
       =
      / \
  let   +
      /   \
     x     2
          / \
         1   2
```

然后，JavaScript 引擎会将语法树转化为可执行代码。可执行代码就是 JavaScript 引擎可以直接执行的代码，通常是机器码或者中间代码。

最后，JavaScript 引擎会将可执行代码加入执行栈中，并开始执行代码。执行栈就像是一个盒子，存储着当前正在执行的代码。当执行栈中的代码执行完毕后，JavaScript 引擎会将执行栈弹出，并将控制权交回调用者。

需要注意的是，JavaScript 中的执行上下文是有层级的，即一个执行上下文可以嵌套在另一个执行上下文中。这种情况下，JavaScript 引擎会将嵌套的执行上下文加入执行栈中，并在执行完毕后弹出。

例如，假设我们有如下代码：

```JS
function foo() {
  console.log('foo');
}

function bar() {
  foo();
  console.log('bar');
}

bar();
```

在执行时，JavaScript 引擎会依次执行如下流程：

1. 将 bar 函数的执行上下文加入执行栈中。
2. 执行 bar 函数内的代码，即调用 foo 函数。
3. 将 foo 函数的执行上下文加入执行栈中。
4. 执行 foo 函数内的代码，即输出 "foo"。
5. 将 foo 函数的执行上下文从执行栈中弹出。
6. 继续执行 bar 函数内的代码，即输出 "bar"。

将 bar 函数的执行上下文从执行栈中弹出。
这就是 JavaScript 代码执行原理机制的更加详细的过程。

希望我的回答能够帮助你更加详细的理解 JavaScript 代码执行原理机制。
