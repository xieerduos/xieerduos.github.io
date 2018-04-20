import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
// 如果是 index.js 直接引入文件夹路径就可以
// 如果是 store.js 需要把 store.js 引入 
import { store } from './store/store.js'


// 配置默认根路径
axios.defaults.baseURL = "https://wd5365637141xfbwze.wilddogio.com/"

// 配置Vue原型 (在任何组件中都可以正常使用 axios )
Vue.prototype.http = axios


import { routes } from './router'

Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	mode:'history',
	scrollBehavior(to, from, savedPosition){
		// return { x:0, y:500,}
		// return { selector: '.btn'}

		if(savedPosition){
			return savedPosition
		}else{
			return { x:0,y:0}
		}
	}
})



new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
