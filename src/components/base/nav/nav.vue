<template>
    <div class="nav">
        <ul>
            <li v-for="(nav,index) in navList" :key="nav.id" @click="curIndex=index" :class="{'active-item':curIndex==index}">{{nav.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'nav',
    data() {
        return {
            curIndex: 0,
            navList: [
                {
                    id:'001',
                    name: '推荐'
                },
                {
                    id:'002',
                    name: '歌手'
                },
                {
                    id:'003',
                    name: '排行'
                },
                {
                    id:'004',
                    name: '搜索'
                },
            ]
        }
    }
}
</script>
<style lang="scss">
.nav {
    ul {
        display: flex;
        justify-content: space-around;
        li {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: $color-text-d;
            font-size: $font-size-medium;
            position: relative;

            &.active-item {
                color: $color-theme;
                &::after {
                    position: absolute;
                    top: 80%;
                    left: 50%;
                    display: inline-block;
                    width: 24px;
                    height: 2px;
                    transform: translateX(-50%);
                    background-color: $color-theme;
                    color: $color-theme ;
                    content: ' ';
                }
            }

        }
    }
}
</style>