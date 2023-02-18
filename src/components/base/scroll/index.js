import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
BScroll.use(ObserveDOM)

export default function (scrollRef, options) {
    const scroll = ref(null)
    const instance = getCurrentInstance()

    onMounted(() => {
        scroll.value = new BScroll(scrollRef.value, {
            observeDOM: true,
            click: true,
            ...options
        })
        if (options.probeType == 3) {
            scroll.value.on('scroll', function (pos) {
                instance.emit('scrollY', pos.y)
            })
        }
    })

    onUnmounted(() => {
        scroll.value.destroy()
    })

    return {
        scroll
    }
}