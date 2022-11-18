import { createApp } from 'vue';

export default function(comp) {
    return {
        mounted(el,binding) {
            const app = createApp(comp).mount(document.createElement("div"))
            console.log(comp)
            const name = comp.name
            el[name] = {}
            el[name].instance = app
            if(binding.value) {
                el.appendChild(el[name].instance.$el)
            }
        },
        updated(el,binding) {
            const name = comp.name
            if(binding.value != binding.oldValue) {
                const positions = getComputedStyle(el).position
                if(['absolute','relative','fixed'].indexOf(positions) == -1) {
                    el.classList.add('g-relative')
                }
                // console.log(name)
                binding.value ?el.appendChild(el[name].instance.$el):el.removeChild(el[name].instance.$el)
            }
        }
    }
}