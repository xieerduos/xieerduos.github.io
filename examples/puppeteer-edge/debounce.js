/**
 * @description 函数去抖
 * @param func 函数
 * @param wait 延迟毫秒
 * @param immediate 立即执行（在wait时间间隔内再次触发不会执行func）
 */

function debounce(func, wait, immediate = false) {
  let timeout;
  // 匿名函数 可以绑定this，
  // 箭头函数 绑定this不会生效
  return function () {
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);

      if (callNow) func.apply(this, arguments);
    } else {
      timeout = setTimeout(func.bind(this, ...arguments), wait);
    }
  };
}

// function countNumber(...reset) {
//   console.log('this.name :', this.name);
// }

// var name = 'myname window';

// const obj = {
//   name: 'myname obj',
//   countNumber
// };

// obj.countNumber();

// const debounced = debounce(obj.countNumber, 3000, false);

// window.addEventListener('resize', debounced.bind(obj, 1, 2, 3, 4));
