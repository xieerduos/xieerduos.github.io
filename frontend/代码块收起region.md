# 代码块收起 region

## 使用方法

适用于绝大部分编程语言（html,js,css,jsx,ts,java,python ...)

语法: 在代码注释内部-要开始的地方 加#region 结束的地方加#endregion

```
    <!-- 注释代码 #region -->


    <!-- 注释代码 #endregion -->
```

## 在 html 中

```html
<style>
  /* #region 全局样式 */
  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 16px;
  }

  /* #endregion */
</style>
<script>
  window.$docsify = {
    // name: '抖音@程序员李钟意', // 左上角的名称
    repo: 'https://github.com/xieerduos/xieerduos.github.io', // 右上角的 github 猫

    loadSidebar: true, // 定制侧边栏 _sidebar.md生效
    // alias: {
    //   '/.*/_sidebar.md': '/_sidebar.md' // 嵌套的侧边栏
    // },

    subMaxLevel: 4, // 显示目录级

    // #region 全文检索
    search: {
      maxAge: 86400000, // 过期时间，单位毫秒，默认一天
      paths: 'auto', // or 'auto'
      placeholder: '输入关键字搜索',
      placeholder: {
        '/en/': 'Type to search',
        '/': '输入关键字搜索'
      },
      noData: {
        '/en/': 'No Results',
        '/': '找不到结果'
      },
      // 搜索标题的最大层级, 1 - 6
      depth: 6,
      hideOtherSidebarContent: true, // 是否隐藏其他侧边栏内容
      // 避免搜索索引冲突
      // 同一域下的多个网站之间
      namespace: 'website-1',
      // 使用不同的索引作为路径前缀（namespaces）
      // 注意：仅适用于 paths: 'auto' 模式
      // 初始化索引时，我们从侧边栏查找第一个路径
      // 如果它与列表中的前缀匹配，我们将切换到相应的索引
      pathNamespaces: ['/en'],

      // 您可以提供一个正则表达式来匹配前缀。在这种情况下，
      // 匹配到的字符串将被用来识别索引
      pathNamespaces: /^(\/(en))?(\/(v1|v2))?/
    },
    // 统计字数 (显示在每一个文章的有上角)
    count: {
      countable: true,
      fontsize: '0.9em',
      color: 'rgb(90,90,90)',
      language: 'chinese'
    }

    // #endregion
  };
</script>
```

## index.js 演示 #region 代码块收起

```javascript
// 演示 #region 代码块收起

// #region emmmm...

main();

function main() {
  sayHelloWorld();
  console.log('hello world');
  console.log('hello world');
  // code...
  // #region for循环遍历数组
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // code...
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // #endregion for循环遍历数组
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // #region Vue 代码
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // code...
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // #endregion Vue 代码
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
}

function sayHelloWorld() {
  console.log('hello world');
  console.log('hello world');
  // code...
  // #region React代码
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // code...
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // #endregion React代码
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // #region Nodejs代码
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // code...
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  // #endregion Nodejs代码
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
  console.log('hello world');
}
// code ...
// #endregion emmmm...
```
