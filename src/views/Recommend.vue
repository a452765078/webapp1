<template>
<scroll>
    <div class="slider-wrapper">
        <div class="slider-inner">
            <slider v-if="sliders.length" :sliders="sliders"></slider>
        </div>
    </div>
    <div class="albums">
        <h4>热门歌单推荐</h4>
        <div class="albumsList">
            <div class="item" v-for="item in albums" :key="item.id">
                <img :src="item.pic" alt="">
                <div class="desc">
                    <span class="username">{{item.username}}</span>
                    <span class="title">{{item.title}}</span>
                </div>
            </div>
        </div>
    </div>
</scroll>
</template>
<script>
import service from '@/service/getData.js';
import slider from '@/components/slider/slider.vue';
import scroll from '@/components/base/scroll/scroll.vue';
export default {
    name: 'recommenVue',
    components: {
        slider,
        scroll
    },
    data() {
        return {
            sliders: [],
            albums: []
        }
    },
    async created() {
        const res = await service.getRecommend()
        this.sliders = res.sliders
        this.albums = res.albums
        console.log(res)
    }
}
</script>
<style lang="scss">
.slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    .slider-inner {
        width: 100%;
    }
}
.albums {
    color: $color-theme;
    h4 {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: $font-size-medium;
    }
    .albumsList {
        .item {
            display: flex;
            padding: 15px;
            box-sizing: border-box;
            img {
                width: 60px;
                height: 60px;
            }
            .desc {
                margin-left: 15px;
                height: 60px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .username {
                    display: block;
                    color: $color-text;
                    font-size: $font-size-medium;
                }
                .title {
                    display: block;
                    color: $color-text-l;
                    font-size: $font-size-medium;
                }
            }

        }
    }
}
</style>