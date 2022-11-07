import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directive from '@/directive/directive'

createApp(App).directive('loading',directive()).use(store).use(router).mount('#app')
