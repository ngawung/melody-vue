import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},

	{
		path: '/hotsprings/page/:id?',
		name: 'HotspringsList',
		component: () => import(/* webpackChunkName: "HotspringsList" */ '../views/HotspringsList.vue'),
		props: (route) => {
			console.log("props", route.params)
			const id = Number.parseInt(route.params.id, 10)
			if (Number.isNaN(id)) return { id: 0 };
			else return { id }
		}
	},

	{
		path: '/hotsprings/category/:category',
		name: 'HotspringsListCategory',
		component: () => import(/* webpackChunkName: "HotspringsList" */ '../views/HotspringsList.vue')
	},

	{
		path: '/hotsprings/:year',
		name: 'HotspringsListYear',
		component: () => import(/* webpackChunkName: "HotspringsList" */ '../views/HotspringsList.vue')
	},
	
	{
		path: '/hotsprings/:year/:month',
		name: 'HotspringsListMonth',
		component: () => import(/* webpackChunkName: "HotspringsList" */ '../views/HotspringsList.vue')
	},

	{
		path: '/hotsprings/:year/:month/:post',
		name: 'Hotsprings',
		component: () => import(/* webpackChunkName: "Hotsprings" */ '../views/Hotsprings.vue')
	},


	// Static Page

	{
		path: '/convert-drastic',
		name: 'ConvertDrastic',
		component: () => import(/* webpackChunkName: "ConvertDrastic" */ '../views/ConvertDrastic.vue')
	},


	// 404
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: () => import(/* webpackChunkName: "ConvertDrastic" */ '../views/404.vue')
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior(to, from) {
		return {x: 0, y: 0}
	}
})

export default router
