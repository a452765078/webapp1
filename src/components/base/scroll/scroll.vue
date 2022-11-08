<template>
    <div class="scrollWrapper" ref="scrollRef">
        <div class="scrollContent">
            <slot></slot>
        </div>
    </div>
</template>
<script>
// import BScroll from '@better-scroll/core';
// import ObserveDOM from '@better-scroll/observe-dom'
import { ref } from 'vue';
// BScroll.use(ObserveDOM)
import scrollFunc from './index'
export default {
    name: 'scrollVue',
    props: {
        probeType:{
            type:Number,
            default(){return 1}
        }
    },
    setup(props,ctx) {
        const scrollRef = ref(null)
        scrollFunc(scrollRef,props)        
        return {
            scrollRef,
        }
    }
}
</script>
<style lang="scss">
.scrollWrapper {
    width: 100%;
    height: 800px;
    overflow: hidden;
    .scrollContent {

    }
}
</style>