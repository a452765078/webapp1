<template>
  <div class="loading" :style="{ marginTop: `${props.top}px` }">加载中...</div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  top: {
    type: Number,
    default: 0,
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/variable.scss";
.loading {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-background;
}
</style>
