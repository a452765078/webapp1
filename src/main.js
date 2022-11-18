import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directive from '@/directive/directive'
import directiveNoResult from '@/components/base/no-result/directive.js'

createApp(App).directive('loading',directive).directive('no-result',directiveNoResult).use(store).use(router).mount('#app')
