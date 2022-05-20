import Vue from 'vue'
import Router from 'vue-router'
import Visualization from "../page/visualization";
import AdminList from "../page/AdminList";
import Chromosome from "../page/Chromosome";

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');

const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const main = r => require.ensure([], () => r(require('@/page/main')), 'main');
const assemble = r => require.ensure([],()=>r(require('@/page/assemble')),'assemble');
const indexing = r => require.ensure([],()=>r(require('@/page/indexing')),'index')
const data = r => require.ensure([],()=>r(require('@/page/data')),'data')
const indexingBenchmark = r => require.ensure([],()=>r(require('@/page/indexingBenchmark')),'indexingBenchmark')
const PangenomeFile = r => require.ensure([],()=>r(require('@/page/PangenomeFile')),'PangenomeFile')
const visualization = r => require.ensure([],()=>r(require('@/page/visualization')),'visualization')
const chromosome = r => require.ensure([],()=>r(require('@/page/Chromosome')),'chromosome')
const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
            path: '/visualization',
            component: Visualization,
            meta: ['可视化','对比可视化']
        },{
            path: '/chromosome',
            component: Chromosome,
            meta: ['数据管理','数据提取']
        },{
            path:'/admin',
            component: AdminList,
            meta: ['信息管理','管理员列表']
        },{
			path: '',
			component: main,
			meta: [],
		},{
			path: '/assemble',
			component: assemble,
			meta: ['算法管理', '组装算法'],
		},{
			path: '/indexing',
			component: indexing,
			meta: ['算法管理', '匹配算法'],
		}, {
            path: '/indexingBenchmark',
            component: indexingBenchmark,
            meta: ['benchmark','indexingBenchmark']
        },{
            path: '/data',
            component: data,
            meta: ['数据管理','DNA数据管理']
        },{
            path: '/PangenomeFile',
            component: PangenomeFile,
            meta: ['数据管理','仿真数据']
        },{
			path: '/userList',
			component: userList,
			meta: ['信息管理', '用户列表'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['数据管理', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['数据管理', '食品列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
