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
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/Singer.vue'),
    children: [
      {
        path:':id',
        component: () => import('@/views/SingerDetail.vue')
      }
    ]
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/Rank.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
