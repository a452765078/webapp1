<template>
    <div class="singersWrapper">
        <scroll v-loading="!singers.length" :probeType="3" @scrollY="getPosY" ref="scrollRef" class="singersInner">
            <div class="singerContent">
                <div class="singer">
                    <div class="singerListWrapper">
                        <div class="singerGroup" v-for="group in singers" :key="group.title" ref="singerGroupRef">
                            <h4>{{ group.title }}</h4>
                            <div class="singerList" v-for="singer in group.list" :key="singer.id">
                                <div class="item" @click="toSingerDetail(singer)">
                                    <img :src="singer.pic" alt="">
                                    <span>{{ singer.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 class="topTitle" :style="curPosStyle">{{ curTitile }}</h4>
                </div>
            </div>
        </scroll>
    </div>
    <div class="singerBar" @click="switchGroup">
        <div class="groupTitle" v-for="(group, index) in singers" :key="group.title"
            :class="{ 'active-title': index == curIndex }" :data-index="index">
            {{ group.title }}
        </div>
    </div>
    <!-- <router-view>
    </router-view> -->

    <router-view v-slot="{ Component }">
        <transition name="slide">
            <component :is="Component" />
        </transition>
    </router-view>

</template>
<script>
import service from '@/service/getData';
import scroll from '@/components/base/scroll/scroll.vue';
import singerFunc from '@/components/singer/index';
import { ref, getCurrentInstance, onMounted, onActivated, onDeactivated } from 'vue';
import { setItem } from '@/store/storage';
import storageName from '@/assets/constVar/storageName'
export default {
    name: 'singer',
    components: {
        scroll
    },
    data() {
        return {
            // singers:[],
            posY: 0
        }
    },
    // async created() {
    //     const res = await service.getSinger()
    //     this.singers = res.singers
    // },
    methods: {
        // getPosY(posY) {
        //     console.log("posY",posY)
        //     this.posY = -posY;
        // },
        toSingerDetail(singer) {
            setItem(storageName._SINGER_, singer)
            this.$router.push({
                path: `/singer/${singer.mid}`,
            })
        }
    },
    setup(props, ctx) {
        console.log("singer")

        onDeactivated(() => {
            console.log("singer onDeactivated")
        })
        onActivated(() => {
            console.log("singer onActivated")
        })

        const singers = ref([])
        const scrollRef = ref(null)

        onMounted(async () => {
            const res = await service.getSinger()
            singers.value = res.singers
            // console.log(singers.value)
        })

        function switchGroup(e) {
            curIndex.value = e.target.dataset.index
            // console.log(e)
            if (e.target.classList.value.indexOf('groupTitle') != -1) {
                // console.log(singerGroupRef.value[curIndex.value])
                // scrollRef.value.scroll.scrollToElement(e)   e不能作为跳转的tab,此处作为我愚蠢的提醒
                scrollRef.value.scroll.scrollToElement(singerGroupRef.value[curIndex.value])
                // console.log("sucess")
            }
            // if(el) {
            //     scrollRef.value.scroll.scrollToElement(el)
            // }else {
            //     consle.log(el)
            // }
        }



        const { singerGroupRef, getPosY, curIndex, curTitile, curPosStyle } = singerFunc(singers)
        return {
            singerGroupRef,
            singers,
            getPosY,
            curIndex,
            curTitile,
            curPosStyle,
            //bar
            switchGroup,
            scrollRef,
        }
    }
}
</script>
<style lang="scss">
.singersWrapper {
    position: fixed;
    top: 80px;
    bottom: 0px;
    width: 100%;

    .singersInner {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .singerContent {

            .singer {
                position: relative;

                .singerListWrapper {
                    position: relative;

                    .singerGroup {
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
        }
    }


}

.singerBar {
    position: fixed;
    top: 20%;
    right: 0;
    text-align: center;
    height: 40%;
    border-radius: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: $color-background-d;

    .groupTitle {
        width: 20px;
        height: 20px;
        color: $color-text-l;
        font-size: $font-size-small;

        &.active-title {
            color: $color-theme;
        }
    }
}
</style>