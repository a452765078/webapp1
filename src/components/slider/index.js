import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import {ref,onMounted,onUnmounted} from 'vue'

// 注册插件
BScroll.use(Slide)
export default function(dom) {
    const bs = ref(null)
    onMounted(()=>{
        bs.value = new BScroll(dom, {
            scrollX: true,
            scrollY: false,
            slide: true,
            momentum: false,
            bounce: false,
            probeType: 2
        })
    })

    onUnmounted(()=>{
        bs.value.destroy()
    })

    
 
    return {
        bs
    }
}
