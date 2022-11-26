<template>
  <header-vue></header-vue>
  <nav-vue></nav-vue>
  <router-view/>
  <player></player>
</template>
<script>
import headerVue from '@/components/base/header/header.vue';
import navVue from '@/components/base/nav/nav.vue';
import player from '@/components/player/player.vue'
export default {
  name: 'root',
  components: {
    headerVue,
    navVue,
    player
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/reset.scss';
body {
  background-color: $color-background;
}

</style>
