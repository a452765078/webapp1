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
    setup() {
        const scrollRef = ref(null)
        scrollFunc(scrollRef)
        
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