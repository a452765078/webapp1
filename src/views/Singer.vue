<template>
<scroll v-loading="!singers.length" :probeType="3" @scrollY="getPosY">
    <div class="singer">
        <div class="singerListWrapper">
            <div class="singerGroup" v-for="group in singers" :key="group.title" ref="singerGroupRef">
                <h4>{{group.title}}</h4>
                <div class="singerList" v-for="singer in group.list" :key="singer.id">
                    <div class="item">
                        <img :src="singer.pic" alt="">
                        <span>{{singer.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <h4 class="topTitle" :style="curPosStyle">{{curTitile}}</h4>
        <div class="singerBar" ></div>
    </div>
</scroll>

</template>
<script>
import service from '@/service/getData';
import scroll from '@/components/base/scroll/scroll.vue';
import singerFunc from '@/components/singer/index';
import {ref,getCurrentInstance,onMounted} from 'vue';
export default {
    name: 'singer',
    components: {
        scroll
    },
    data() {
        return {
            // singers:[],
            posY:0
        }
    },
    // async created() {
    //     const res = await service.getSinger()
    //     this.singers = res.singers
    // },
    methods:{
        // getPosY(posY) {
        //     console.log("posY",posY)
        //     this.posY = -posY;
        // },
    },
    setup(props,ctx) {
        const singers = ref([])

        onMounted( async () => {
            const res = await service.getSinger()
            singers.value = res.singers
            console.log(singers.value)
        })

        const {singerGroupRef,getPosY,curIndex,curTitile,curPosStyle} = singerFunc(singers)
        return {
            singerGroupRef,
            singers,
            getPosY,
            curIndex,
            curTitile,
            curPosStyle
        }
    }
}
</script>
<style lang="scss">
.singer {
    position: relative;
    .singerListWrapper {
        position: relative;
        .singerGroup {
            padding-bottom: 30px;
            h4 {
                background-color: $color-highlight-background;
                font-size: $font-size-small;
                color: $color-text-l;
                height: 30px;
                line-height: 30px;
                padding-left: 12px;
                box-sizing: border-box;
            }
            .singerList {
                .item {
                    padding-left: 24px;
                    padding-top: 15px;
                    display: flex;
                    align-items: center;
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                    span {
                        font-size: $font-size-medium;
                        color: $color-text-l;
                        margin-top: 4px;
                        margin-left: 12px;
                    }
                }
            }
        }
    }
    .topTitle {
        background-color: $color-highlight-background;
        font-size: $font-size-small;
        color: $color-text-l;
        height: 30px;
        width: 100%;
        line-height: 30px;
        padding-left: 12px;
        box-sizing: border-box;
        position: absolute;
        top: 30px;
        left: 0;
        z-index: 99;
    }  
}
</style>