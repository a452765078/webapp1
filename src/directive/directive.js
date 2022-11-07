import loading from './loading/loading.vue';
import { createApp } from 'vue';

export default function() {
    return {
        mounted(el,binding) {
            const app = createApp(loading).mount(document.createElement("div"))
            const appName = binding.arg || 'loading'
            el[appName] = {}
            el[appName].instance = app
            if(binding.value) {
                el.appendChild(el[appName].instance.$el)
            }
        },
        updated(el,binding) {
            const appName = binding.arg || 'loading'
            if(binding.value != binding.oldValue) {
                const positions = getComputedStyle(el).position
                if(['absolute','relative','fixed'].indexOf(positions)) {
                    el.classList.add('g-relative')
                }
                el.removeChild(el[appName].instance.$el)
            }
        }
    }
}