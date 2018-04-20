import Vue from 'vue'
// 1. 引入vuex
import Vuex from 'vuex'

// import * as actions from './actions'
// import * as mutations from './mutations'
// import * as getters from './getters'

import menu from './module/menu.js'
import status from './module/status.js'
import users from './module/users.js'

// 2. 使用vuex
Vue.use(Vuex)


// 3. 实例化vuex store 对象

export const store = new Vuex.Store({
	// state:{ // 主要承载的是属性，用来存储数据的
	// 	// 设置属性
	// 	menuItems:{},
	// 	currentUser:null,
	// 	isLogin:false
	// },
	// getters,
	// mutations,
	// actions
	modules:{
		menu,
		status,
		users,
	}
})


/**
	模块化，最根本的 其实就是将大的 东西，进行拆分成很多小的 东西
	然后就可以 实现 低耦合的
	*/ 


