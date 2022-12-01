import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directive from '@/directive/directive'
import directiveNoResult from '@/components/base/no-result/directive.js'
import  infiniteScroll from 'vue-infinite-scroll'

createApp(App).directive('loading',directive).directive('no-result',directiveNoResult).use(infiniteScroll).use(store).use(router).mount('#app')
