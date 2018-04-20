<template>
	<div class="row">
		<!-- new pizza -->
		<div class="col-sm-12 col-md-8">
			<app-new-pizza></app-new-pizza>
		</div>

		<!-- 品种展示 -->
		<div class="col-sm-12 col-md-4">
			<h3 class="text-muted my-5">菜单</h3>
			<table class="table">
				<thead class="table table-default">
					<tr>
						<th>品种</th>
						<th>删除</th>
					</tr>
				</thead>
				<tbody v-for="item in getMenuItems" :key="item.id">
					<tr>
						<td>{{item.name}}</td>
						<td>
							<button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">&times;</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

	</div>
</template>

<script>
import NewPizza from './NewPizza'
export default {
	data(){
		return{
			// getMenuItems:[]
		}
	},

	components:{
		'app-new-pizza':NewPizza
	},
	computed:{
		getMenuItems:{
			
			get(){
				// 在 vuex  中获取数据，就是拿到 state 中的那个属性
				// 有两种方式拿到这个属性。
				// 第一种
				// return this.$store.state.menuItems
				// 第二种方式：
				// 通过getters获取数据

				return this.$store.getters.getMenuItems
			},
			set(){

			}
			
		},
	},
	created(){
		fetch("https://wd5365637141xfbwze.wilddogio.com/menu.json").then(res => {
			return res.json()
		}).then(data=>{
			// console.log(data)
			let menuArray = []
			for(let key in data){
				// console.log(key) // key值
				// console.log(data[key]) // 对象的内容
				data[key].id=key ; // 给data添加一个id
				menuArray.push(data[key])
			}

			// 数据同步
			this.$store.commit("setMenuItems", menuArray)
			// this.getMenuItems = menuArray
		})
	},
	
	methods:{
		deleteData(item){
			fetch('https://wd5365637141xfbwze.wilddogio.com/menu/'+item.id+"/.json",{
				method:"DELETE",
				headers:{
					"Content-type":"application/json"
				}
			}).then(res => res.json())
			// .then(data => this.$router.push({name:"menuLink"}))
			.then(data => {
				this.$store.commit('removeMenuItems', item)
			})
			.catch(err =>console.log(err))
		}
	}
	// beforeRouteEnter:(to,from, next) =>{
	// 	// 进入组件前 

	// 	// alert('Hello ' + this.name);
	// 	// next()
	// 	next( (vm) => {
	// 		alert('Hello ' + vm.name);
	// 	})
	// },
	// beforeRouteLeave (to, from ,next){
	// 	if(confirm('你确定要离开吗？') == true) {
	// 		next()
	// 	} else {
	// 		next(false)
	// 	}
	// }

}
</script>