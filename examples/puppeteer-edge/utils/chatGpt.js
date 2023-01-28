// 打开博客
exports.handleOpenBlog = async (browser, data) => {
  try {
    const pageBlog = await browser.newPage();
    await pageBlog.goto('https://www.baidu.com');

    await pageBlog.waitForSelector('#kw');

    await pageBlog.evaluate(() => {
      const inputElement = document.querySelector('#kw');
      const searchButton = document.querySelector('#su');

      if (inputElement && searchButton) {
        inputElement.value = '程序员李钟意';

        setTimeout(() => {
          searchButton.click();
        }, 1000);
      }
    });
    return pageBlog;
  } catch (error) {
    console.error('handleOpenBlog error', error);
  }
};

function getData() {
  return [
    'Vue 的高阶组件是什么？',
    'Vue 的渲染函数是什么？',
    'Vue 的 $nextTick 方法是干什么用的？',
    'Vue 的 $set 和 $delete 方法是干什么用的？',
    'Vue 的 keep-alive 是什么？',
    'Vue 的计算属性和侦听器的区别是什么？',
    'Vue 的 $emit 和 $on 方法是干什么用的？',
    'Vue 的 $watch 和 $computed 方法有什么区别？',
    'Vue 的 $attrs 和 $listeners 是什么？',
    'Vue 的 Virtual DOM 是什么？',
    'Vue 的模板语法有哪些？',
    'Vue 的动态组件是如何实现的？',
    'Vue 的路由守卫是什么？',
    'Vue 的异步组件是如何实现的？',
    'Vue 的父子组件之间的通信方式有哪些？',
    'Vue 的路由懒加载是如何实现的？',
    'Vue 的自定义过渡类名是如何实现的？',
    'Vue 的插槽是什么？',
    'Vue 的深度监听是如何实现的？',
    'Vue 的组件递归是如何实现的？',
    'Vue 的响应式设计思想是什么？',
    'Vue 的路由懒加载和异步组件有什么区别？',
    'Vue 的组件内部通信和全局通信有什么区别？',
    'Vue 的组件内部状态和全局状态有什么区别？',
    'Vue 的组件化和模块化的区别是什么？',
    'Vue 的组件缓存和异步组件有什么区别？',
    'Vue 的组件通信和状态管理有什么关系？',
    'Vue 的组件内部状态管理和全局状态管理有什么区别？',
    'Vue 的组件间通信有哪些常用的方式？'
  ];
}
