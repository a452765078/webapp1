<template>
    <div class="header">
        <img src="@/assets/images/default.png" alt="">
        <span>Children Music</span>
    </div>
</template>
<script>
export default {
    name: 'headerVue'
}
</script>
<style lang="scss">
.header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    img {
        margin-top: 3px;
        width: 32px;
        height: 32px;
    }
    span {
        margin-top: 15px;
        margin-left: 8px;
        color: $color-theme;
        font-size: $font-size-medium-x;
    }
}
</style>