<template>
<div class="slide-banner-wrapper" ref="slideRef">
    <div class="slide-banner-content">
        <div class="slide-page" v-for="slider in sliders" :key="slider.id">
            <img :src="slider.pic" :alt="slider.title">
        </div>
    </div>
</div>
</template>
<script>
import { ref } from 'vue';
import scrollFunc from './index';
export default {
    name: 'slider',
    props: {
        sliders:{
            type: Array,default(){return []}
        }
    },
    setup() {
        const slideRef = ref(null)
        const {bs} = scrollFunc(slideRef.value)

        return {
            slideRef,
            bs
        }
    }
}
</script>
<style lang="scss">
.slide-banner-wrapper {
    width: 100%;
    height: 0%;
    padding-top: 40%;
    position: relative;
    overflow: hidden;
    .slide-banner-content {
        position: absolute;
        top: 0;
        left: 0;
        .slide-page {
            display: inline-block;
            img {
                width: 100%;
                display: block;
            }
        }
    }
}
</style>