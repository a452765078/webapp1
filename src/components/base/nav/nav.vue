<template>
    <div class="nav">
        <!-- <ul>
            <li v-for="(nav,index) in navList" :key="nav.id" @click="routerLink(index,nav.path)" :class="{'active-item':curIndex==index}">
                    {{nav.name}}
            </li>
        </ul> -->
        <div class="navList">
            <router-link  class="navItem" v-for="(nav,index) in navList" :key="nav.id"  :class="{'active-item':curIndex==index}" :to="nav.path">
                <span>{{nav.name}}</span>
            </router-link>
        </div>
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
                    name: '推荐',
                    path:'/recommend'
                },
                {
                    id:'002',
                    name: '歌手',
                    path:'/singer'
                },
                {
                    id:'003',
                    name: '排行',
                    path:'/rank'
                },
                {
                    id:'004',
                    name: '搜索',
                    path:'/search'
                },
            ],
        }
    },
    computed: {
        path() {
            return this.$route.path
        }
    },
    mounted() {
        let _path = this.$route.path
        let index = this.navList.findIndex(item=>{
            return item.path == this.path
        })
    },
    methods: {
        routerLink(index,path) {
            this.curIndex = index
            console.log(this.curIndex)
            this.$router.push({path})
        }
    }
}
</script>
<style lang="scss">
.nav {
    .navList {
        display: flex;
        justify-content: space-around;
        .navItem {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: $color-text-d;
            font-size: $font-size-medium;
            position: relative;

            &.router-link-active {
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