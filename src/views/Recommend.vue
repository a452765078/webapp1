<template>
  <div class="recommendWrapper" ref="recommendRef">
    <div class="recommendContent" v-if="isLoading">
      <div class="slider-wrapper">
        <slider v-if="sliders.length" :sliders="sliders"></slider>
      </div>
      <div class="albums">
        <h4>热门歌单推荐</h4>
        <div class="albumsList">
          <div class="item" v-for="item in albums" :key="item.id">
            <img :src="item.pic" alt="" @load="handleImgLoad" />
            <div class="desc">
              <span class="username">{{ item.username }}</span>
              <span class="title">{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script setup>
import { getRecommend } from "@/service/recommend.js";
import slider from "@/components/slider/slider.vue";
import loading from "@/components/loading/index.vue";
// import scroll from "@/components/base/scroll/scroll.vue";
import { createScrollbar } from "@/components/scroll/scrollBar";
import { ref, onMounted, computed } from "vue";
const sliders = ref([]);
const albums = ref([]);
const recommendRef = ref(null);
const bs = ref(null);
const isLoading = computed(() => {
  return sliders.value.length && albums.value.length;
});
const init = async () => {
  const res = await getRecommend();
  sliders.value = res.sliders;
  albums.value = res.albums;
};
//解决网络问题导致的页面卡顿
const handleImgLoad = () => {
  console.log("handleImage");
  bs.value.refresh();
};
init();
onMounted(() => {
  console.log("recommendRef.value =>", recommendRef.value);
  bs.value = createScrollbar(recommendRef.value);
});
</script>
<style lang="scss">
@import "@/assets/scss/base.scss";

.recommendWrapper {
  position: fixed;
  top: 88px;
  width: 100%;
  bottom: 0;
  overflow: hidden;
}

.recommendContent {
  width: 100%;

  .slider-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 40%;
    overflow: hidden;
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
}
</style>
