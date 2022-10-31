# Vue2 风格指南

[Vue2 风格指南 https://v2.cn.vuejs.org/v2/style-guide/](https://v2.cn.vuejs.org/v2/style-guide/)

Vue 单文件组件规范模板

## TodoList.vue

Template

```vue
<template>
    <div class="todo-list">
        <TodoItem :visible.sync="visible" />
    </div>
</template>
```

Script Option

```vue
<script>
import TodoItem from './TodoItem';
export default {
    // 全局感知 (要求组件以外的知识)
    name: 'TodoList',

    // 模板依赖 (模板内使用的资源)
    components: {
        TodoItem
    },
    directives: {},
    filters: {},
    props: {},

    // 本地状态 (本地的响应式 property)
    data() {
        return {
            visible: false, // 显示/隐藏  父-子，子-父组件传值
            activeUsers: []
        };
    },
    computed: {},

    // 事件 (通过响应式事件触发的回调)
    watch: {},

    // 生命周期钩子 (按照它们被调用的顺序)
    // beforeCreate() {},
    created() {},
    // beforeMount() {},
    mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeDestroy() {},
    // destroyed() {},

    // 非响应式的 property (不依赖响应系统的实例 property)
    methods: {
        publicMethod() {}
    }
};
</script>
```

## TodoItem.vue

Template

```vue
<template>
    <div class="todo-item">
        <!-- <MyComponent 
      定义 (提供组件的选项)
      is

      列表渲染 (创建多个变化的相同元素)
      v-for

      条件渲染 (元素是否渲染/显示)
      v-if
      v-else-if
      v-else
      v-show
      v-cloak

      渲染方式 (改变元素的渲染方式)
      v-pre
      v-once

      全局感知 (需要超越组件的知识)
      id

      唯一的 attribute (需要唯一值的 attribute)
      ref
      key

      双向绑定 (把绑定和事件结合起来)
      v-model

      其它 attribute (所有普通的绑定或未绑定的 attribute)

      事件 (组件事件监听器)
      v-on

      内容 (覆写元素的内容)
      v-html
      v-text
    /> -->
    </div>
</template>
```

Script Option

```vue
<script>
export default {
    // 副作用 (触发组件外的影响)
    // el

    // 全局感知 (要求组件以外的知识)
    name: 'TodoItem',
    // parent

    // 组件类型 (更改组件的类型)
    // functional: true,

    // 模板修改器 (改变模板的编译方式)
    // delimiters
    // comments

    // 模板依赖 (模板内使用的资源)
    components: {},
    directives: {},
    filters: {},

    // 组合 (向选项里合并 property)
    // extends
    // mixins

    // 接口 (组件的接口)
    // inheritAttrs
    // model
    // props/propsData
    props: {
        visible: {type: Boolean, required: true, default: false},
        status: {type: String, required: false, default: ''},
        bool: {type: Boolean, required: false, default: true},
        age: {type: Number, required: false, default: 0},
        obj: {type: Object, required: false, default: () => ({})},
        arr: {type: Array, required: false, default: () => []},
        func: {type: Function, required: false, default: () => () => {}}
    },

    // 本地状态 (本地的响应式 property)
    data() {
        return {
            activeUsers: []
        };
    },
    computed: {
        inputVisible: {
            get() {
                return this.visible;
            },
            set(value) {
                this.$emit('update:visible', value);
            }
        }
    },

    // 事件 (通过响应式事件触发的回调)
    watch: {},

    // 生命周期钩子 (按照它们被调用的顺序)
    // beforeCreate() {},
    created() {},
    // beforeMount() {},
    mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeDestroy() {},
    // destroyed() {},

    // 非响应式的 property (不依赖响应系统的实例 property)
    methods: {
        publicMethod() {
            this.inputVisible = !this.inputVisible;
        }
    }

    // 渲染 (组件输出的声明式描述)
    // template/render
    // renderError
};
</script>
```
