import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/hotsprings',
    name: 'HotspringsList',
    component: () => import(/* webpackChunkName: "HotspringsList" */ '../views/HotspringsList.vue')
  },
  {
    path: '/hotsprings/:post',
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
  routes
})

export default router
