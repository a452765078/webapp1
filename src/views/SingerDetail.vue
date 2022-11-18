<template>
<div class="singerDetail">

    <songs></songs>
</div>
</template>
<script>
import songs from '@/components/songs/songs.vue';
export default {
    name: 'singerDetail',
    components: {
        songs
    },
    methods: {

    },
}
</script>
<style lang="scss">
.singerDetail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: $color-background;
}
</style>