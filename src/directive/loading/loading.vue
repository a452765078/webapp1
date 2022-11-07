<template>
<div class="loading">
    <img src="./loading.gif" alt="">
    <span>
        正在加载...
    </span>
</div>    
</template>
<script>
export default {
    name: 'loading'
}
</script>
<style lang="scss">
.loading {
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: $color-text;
    font-size: $font-size-medium;
    background-color: $color-background-d;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
        width: 40px;
        height: 40px;
    }
    span {
        margin-top: 15px;
    }
}

</style>