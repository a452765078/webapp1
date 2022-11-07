<template>
  <header-vue></header-vue>
  <nav-vue></nav-vue>
  <router-view/>
</template>
<script>
import headerVue from '@/components/base/header/header.vue';
import navVue from '@/components/base/nav/nav.vue';
export default {
  name: 'root',
  components: {
    headerVue,
    navVue
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/reset.scss';
#app {
  background-color: $color-background;
}
</style>
