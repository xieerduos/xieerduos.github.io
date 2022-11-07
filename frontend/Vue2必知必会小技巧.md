# Vue2 必知必会小技巧

## 父子组件传值

### .sync 语法糖

[.sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

实现 element-ui dialog 打开 visible.sync 功能

这个语法有争议，在 vue1 中引入，曾经 vue2 中前几个版本删掉，后来又加上

超级、非常好用，实用

父子组件之间传值，同步值，能减少很多代码

### 自定义组件的 v-model

[自定义组件的 v-model 2.2.0+ 新增 vue 官网链接](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

普通组件 表单集合的二次封装 v-model

## 组件的二次封装
