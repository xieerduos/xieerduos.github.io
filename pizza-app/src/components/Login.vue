<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img class="mx-auto d-block" src="../../src/assets/icon.png" alt="">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input 
                type="email"
                class="form-control"
                v-model="email"
                >
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input 
                type="password"
                class="form-control"
                v-model="password"
                >
            </div>
            <button type="submit" class="btn btn-block btn-success">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
	data(){
		return {
			email:'',
			password:'',
		}
	},
	// 组件内的守卫
	beforeRouteEnter:(to, from , next)=>{
		// this.$store.dispatch("setUser", null)
		next(vm => vm.$store.dispatch("setUser", null));	
	},
	methods:{
		onSubmit(){
			// 登录，就是，用户输入内容，我们传到后台，后台登录验证，返回状态码，0 代表成功，1代表失败。
			// console.log('111')
			axios.get('/users.json')
			.then(res => {
				const data=res.data;
				const users = [];
				for(let key in data){
					const user = data[key]
					// console.log(user)
					users.push(user);

				}
				// console.log(users)
				let result = users.filter((user)=>{
					return user.email == this.email && user.password == this.password
				})
				// console.log(result)

				// 判断result的长度是否大于0
				if(result !=null && result.length >0) {

					this.$store.dispatch("setUser",result[0].email) // dispatch 是应用在 actions 的
					this.$router.push({name:'homeLink'})
				}else{
					alert('账号或密码错误');
					this.$store.dispatch("setUser", null)
				}
			})
		}
	}
}
</script>