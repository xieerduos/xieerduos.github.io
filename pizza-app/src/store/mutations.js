	// 主要用来更改属性 中的状态
	// 改变属性的状态
export const setMenuItems = (state, data)=>{
		state.menuItems = data
	}
	// 将匹配到的对象，在 menuItems 数组中删除
export const removeMenuItems = (state, data)=>{
		state.menuItems.forEach((item, index)=>{
			if(item == data){
				state.menuItems.splice(index, 1);
			}
		})
	}
	// 将新添加的 pizza push到 menuItems 属性中
export const pushToMenuItems = (state, data) =>{
		state.menuItems.push(data)
	}

	// 更改用户的状态信息
export const userStatus = (state,user) => {
		if(user){
			state.currentUser = user;
			state.isLogin = true;
		}else{
			state.currentUser = null;
			state.isLogin = false;
		}
	}