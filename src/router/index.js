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
            meta: ['?????????','???????????????']
        },{
            path: '/chromosome',
            component: Chromosome,
            meta: ['????????????','????????????']
        },{
            path:'/admin',
            component: AdminList,
            meta: ['????????????','???????????????']
        },{
			path: '',
			component: main,
			meta: [],
		},{
			path: '/assemble',
			component: assemble,
			meta: ['????????????', '????????????'],
		},{
			path: '/indexing',
			component: indexing,
			meta: ['????????????', '????????????'],
		}, {
            path: '/indexingBenchmark',
            component: indexingBenchmark,
            meta: ['benchmark','indexingBenchmark']
        },{
            path: '/data',
            component: data,
            meta: ['????????????','DNA????????????']
        },{
            path: '/PangenomeFile',
            component: PangenomeFile,
            meta: ['????????????','????????????']
        },{
			path: '/userList',
			component: userList,
			meta: ['????????????', '????????????'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['????????????', '????????????'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['????????????', '????????????'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['??????', '????????????'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['??????', '????????????'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['????????????', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['??????', '????????????'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['??????', '???????????????'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['??????', '????????????'],
		},{
			path: '/explain',
			component: explain,
			meta: ['??????', '??????'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
