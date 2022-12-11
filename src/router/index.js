import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect:'/recommend',
    component: () => import('@/views/Recommend.vue'/*webpackChunkName: "Recommend"*/)
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend.vue'/*webpackChunkName: "Recommend"*/)
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/Singer.vue'/*webpackChunkName: "singer"*/),
    children: [
      {
        path:':id',
        component: () => import('@/views/SingerDetail.vue'/*webpackChunkName: "singer"*/)
      }
    ]
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/Rank.vue'/*webpackChunkName: "rank"*/)
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'/*webpackChunkName: "search"*/),
    children: [
      {
        path: ':id',
        component: () => import('@/components/songs/songs.vue'/*webpackChunkName: "search"*/)
      },
      {
        path: 'player',
        component: () => import('@/components/player/player.vue'/*webpackChunkName: "player"*/)
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
