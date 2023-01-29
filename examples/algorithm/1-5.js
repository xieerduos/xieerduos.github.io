// 翻转字符串
function reverseString(str) {
  // 将字符串转换为数组
  let strArr = str.split('');
  // 使用 reverse 方法翻转数组
  strArr.reverse();
  // 将数组转换回字符串
  return strArr.join('');
}
// 在数组中找到最大数
function findMax(arr) {
  // 使用 reduce 方法找到数组中的最大值
  return arr.reduce((a, b) => Math.max(a, b));
}
// 检查字符串是否是回文
function isPalindrome(str) {
  // 将字符串转换为小写
  str = str.toLowerCase();
  // 将字符串与其翻转后的形式进行比较
  return str === reverseString(str);
}
// 求一个给定数的阶乘
function factorial(num) {
  // 初始化结果为 1
  let result = 1;
  // 从 2 开始遍历到给定数
  for (let i = 2; i <= num; i++) {
    // 每次乘上遍历到的数
    result *= i;
  }
  // 返回结果
  return result;
}
// 求一个给定数的斐波那契数列
function fibonacci(num) {
  // 初始化数组
  let fibArr = [0, 1];
  // 从 2 开始遍历到给定数
  for (let i = 2; i <= num; i++) {
    // 每次将两个前面的数相加并添加到数组中
    fibArr.push(fibArr[i - 1] + fibArr[i - 2]);
  }
  // 返回结果
  return fibArr[num];
}

// 测试用例：

// 翻转字符串:
console.log(reverseString('hello')); // "olleh"
console.log(reverseString('world')); // "dlrow"

// 在数组中找到最大数:
console.log(findMax([1, 2, 3, 4, 5])); // 5
console.log(findMax([5, 4, 3, 2, 1])); // 5

// 检查字符串是否是回文:
console.log(isPalindrome('hello')); // false
console.log(isPalindrome('level')); // true

// 求一个给定数的阶乘:
console.log(factorial(5)); // 120
console.log(factorial(3)); // 6

// 求一个给定数的斐波那契数列:
console.log(fibonacci(5)); // 3
console.log(fibonacci(10)); // 34

// 希望这些测试用例能帮助你理解这些算法。
