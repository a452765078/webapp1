<template>
  <div class="slide-banner-wrapper" ref="slideRef">
    <div class="slide-banner-content">
      <div class="slide-page" v-for="slider in sliders" :key="slider.id">
        <img :src="slider.pic" :alt="slider.title" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import { createSlider } from "@/components/scroll/slide";
const props = defineProps({
  sliders: {
    type: Array,
    default() {
      return [];
    },
  },
});
const slideRef = ref(null);
const bs = ref(null);

onMounted(() => {
  bs.value = createSlider(slideRef.value);
});
// onUnmounted(() => {
//   console.log("destory");
//   bs.value.destroy();
// }); 是否可以和onActivated 一起使用？
</script>
<style lang="scss">
.slide-banner-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  .slide-banner-content {
    width: 100%;
    height: 100%;
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
