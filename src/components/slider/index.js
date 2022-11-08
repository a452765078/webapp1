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
        //这个地方在切换路由时报错，不清楚原因是什么
        //报错内容：Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'trigger')
        // bs.value.destroy()
        // console.log(bs.value)
        // bs.value.destroy()

    })

    
 
    return {
        bs
    }
}
