<!-- 1.模板：html结构 -->
<template>
    <div id="app">
        <app-header></app-header>
        <users></users>
        <app-footer></app-footer>
    </div>
</template>

<!-- 2.行为：处理逻辑 -->
<script>

// 局部注册组件
import Users from './components/Users.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components:{
    "users":Users,
    "app-header":Header,
    "app-footer":Footer
  },
  data(){
    return {
      title:"这是我的第一个脚手架"
    }
  }
}
</script>

<!-- 3.样式：解决样式 -->

<style scoped >
  h1{
    color:purple;
  }
</style>
