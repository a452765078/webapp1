import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom'
import {ref,onMounted ,onUnmounted} from 'vue';
BScroll.use(ObserveDOM)

export default function(scrollRef) {
    const scroll = ref(null)

    onMounted(()=>{
        scroll.value = new BScroll(scrollRef.value,{
            observeDOM:true,
            click:true,
            probeType:1
        })
    })

    onUnmounted(()=>{
        scroll.value.destroy()
    })

    return {
        scroll
    }
}