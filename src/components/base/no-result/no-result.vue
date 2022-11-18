<template>
    <div class="noResult">
        <div class="noResult-content">
            <div class="icon"></div>
            <div class="title">{{title}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'noResult',
    data() {
        return {
            title:'抱歉，没找到数据'
        }
    },
    methods: {
        setTitle(title) {
            this.title = title
        }
    }
}

</script>
<style lang="scss">
.noResult {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: $color-background;
    .noResult-content{
        position: absolute;
        left: 50%;
        top: 25%;
        transform: translate(-50%,-50%);
        align-items: center;
        .icon {
            margin:0 auto;
            width: 90px;
            height: 90px;
            @include bg-image('no-result');
            background-size: 90px 90px;
        }
        .title {
            text-align: center;
            color: $color-text-l;
            font-size: $font-size-medium;
            margin-top: 12px;
        }
    }

}
</style>