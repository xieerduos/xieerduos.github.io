import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import about from './components/about/about'

// 二级路由
import	Contact from './components/about/Contact'
import	Delivery from './components/about/Delivery'
import	History from './components/about/History'
import	OrderingGuide from './components/about/OrderingGuide'

// 三级路由
import Phone from './components/about/contact/Phone'
import PersonName from './components/about/contact/PersonName'

export const routes = [
	{path:'/', name:'homeLink',components:{
		default:Home,
		'orderingGuide':OrderingGuide,
		'delivery':Delivery,
		'history':History

	}},
	{path:'/menu',name:'menuLink', component:Menu},
	{path:'/admin',name:'adminLink', component:Admin, 
		// beforeEnter:(to, from, next) => {
			// 路由独享守卫
			// alert('还没有登录，请先登录');
			// next(false)
			// if(to.path == 'login' || to.path == 'register'){
			// 	next();
			// }else{
			// 	alert('还没有登录，请先登录');
			// 	next('/login')
			// }
		// }
	},
	{path:'/header',name:'headerLink', component:Header},
	{path:'/login',name:'loginLink', component:Login},
	{path:'/register',name:'registerLink', component:Register},
	{path:'/about',name:'aboutLink', redirect:'/contact', component:about, children:[
		{path:'/contact',name:'contactLink', redirect:'/personname',component:Contact, children:[
			{path:'/phone', name:'phoneNumber', component:Phone},
			{path:'/personname', name:'personName', component:PersonName},
		]},
		{path:'/about/delivery',name:'deliveryLink',component:Delivery},
		{path:'/history',name:'historyLink',component:History},
		{path:'/orderingGuide',name:'orderingGuideLink',component:OrderingGuide},
	]},
	{path:'*', redirect:'/'},
]
