function greet() {
  console.log('this', this); // Window
  // window.name = '';
  console.log(`Hello, ${this.name}`);
}
greet();
// // 1. undefined
// // 2. 报错

// ---

// 'use strict';

// function greet() {
//   console.log('this', this); // this undefined
//   // Uncaught TypeError: Cannot read properties of undefined (reading 'name')
//   console.log(`Hello, ${this.name}`);
// }

// greet();

// 我不希望下面 this.name 报错，不要删“'use strict'”
('use strict');

// 方法1：
// const greet = () => {
//   console.log('this', this); // this undefined
//   console.log(`Hello, ${this.name}`); // "Hello, "
// };
// greet();

// 方法2：
// function greet() {
//   console.log('this', this); // this undefined
//   console.log(`Hello, ${this.name}`); // "Hello, "
// }
// const fn = greet.bind({name: ''}) // Hello, undefined
// fn();

// 方法3：
// function greet() {
//   const that = this || {name: ''};
//   console.log('that', that); // this undefined
//   console.log(`Hello, ${that.name}`); // "Hello, "
// }
// greet();

// 方法4
function greet() {
  // "?." 操作符允许你在一个对象中访问一个属性
  // 如果该对象为 null 或 undefined，则返回 undefined，而不会抛出错误。
  // "?? "操作符允许你在一个变量中获取值
  // 如果该变量为 null 或 undefined，则返回后面的默认值，而不是返回 undefined。
  console.log(`Hello, ${this?.name ?? ''}`); // "Hello, "
  // console.log(`Hello, ${this?.name || ''}`); // "Hello, "
}
// greet();

new greet();
