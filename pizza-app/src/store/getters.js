		// 对应的是一些方法，用来获取 state 中的属性 对应的数据
		// 获取属性的状态

		// 获取 属性状态 有多种方式
		// 第一种：
		// this.$store.state.menuItems
		// 这种方式有什么 不好呢
		// 这种方式获取属性，其实是将 menuItems 暴露给外界了

		// 第二种方式，就是getter

	export const getMenuItems = state => state.menuItems
	export const currentUser = state => state.currentUser
	export const isLogin = state => state.isLogin		