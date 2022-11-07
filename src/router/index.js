import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect:'/recommend',
    component: () => import('@/views/Recommend.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
