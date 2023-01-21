# Vue 组件二次封装源码

粉丝评论区留言说

“可以出一期组件封装的吗？”

可以

## **视频地址**

https://www.douyin.com/video/7191116267842030885

## **视频源码如下：**

## 组件封装源码 TheElDialog/index.vue

```vue
<template>
  <!-- 组件二次封装
        要求：用法一致，可以扩展接口
        目的：解决公共组件默认样式、逻辑等问题
        关键api: v-bind="$attrs" v-on="$listeners"
    -->
  <el-dialog
    :close-on-press-escape="closeOnPressEscape"
    :close-on-click-modal="closeOnClickModal"
    :destroy-on-close="destroyOnClose"
    :append-to-body="appendToBody"
    :width="width || (isMobile ? '92%' : '75%')"
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
    class="minWidth"
    :fullscreen="isFullscreen"
  >
    <el-button class="fullscreen-button">
      <i class="el-dialog__close el-icon el-icon-full-screen " @click="isFullscreen = !isFullscreen"></i>
    </el-button>
    <slot></slot>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'TheElDialog',
  props: {
    width: {
      type: String,
      default: '75%'
    },
    minWidth: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    closeOnPressEscape: {type: Boolean, default: true},
    closeOnClickModal: {type: Boolean, default: false},
    destroyOnClose: {type: Boolean, default: true},
    appendToBody: {type: Boolean, default: true}
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  computed: {
    isMobile() {
      return this.$store.getters['app/isMobile'];
    }
  },
  created() {
    this.isFullscreen = this.fullscreen;
  },
  methods: {
    setFullscreen(isFullscreen) {
      this.isFullscreen = isFullscreen;
    }
  }
};
</script>
<style lang="scss">
.minWidth {
  .el-dialog {
    min-width: 600px;
  }
  .fullscreen-button {
    position: absolute;
    top: 22px;
    right: 44px;
    font-size: 14px;
    padding: 0;
    border: none;
    background-color: transparent;
  }
}
</style>
```

## 组件使用 CreateBill.vue

```vue
<template>
  <TheElDialog
    :title="title"
    :visible.sync="centerDialogVisible"
    @close="handleCenterDialogClose"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      @submit.native.prevent
      ref="formRule"
      :model="form"
      :rules="rules"
      :label-width="isMobile ? '80px' : '120px'"
    >
      <!-- coding... -->
      <el-form-item prop="remark" label="备注">
        <!-- coding... -->
      </el-form-item>
    </el-form>
    <!-- coding... -->
  </TheElDialog>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped></style>
```
