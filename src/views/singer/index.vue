<template>
  <div class="singersWrapper">
    <div ref="scrollRef" class="singersInner">
      <div class="singerContent">
        <div class="singer">
          <div class="singerListWrapper">
            <div
              class="singerGroup"
              v-for="group in singers"
              :key="group.title"
              ref="singerGroupRef"
            >
              <h4>{{ group.title }}</h4>
              <div
                class="singerList"
                v-for="singer in group.list"
                :key="singer.id"
              >
                <div class="item" @click="handletoSingerdetail(singer)">
                  <img :src="singer.pic" alt="" />
                  <span>{{ singer.name }}</span>
                </div>
              </div>
            </div>
          </div>
          <h4
            class="topTitle"
            :style="moveStyle"
            v-show="!(curActiveIndex === 0)"
          >
            {{ curActiveTitle }}
          </h4>
        </div>
      </div>
    </div>
  </div>
  <div class="singerBar" @click="handleSwitchGroup">
    <div
      class="groupTitle"
      v-for="(group, index) in singers"
      :key="group.title"
      :class="{ 'active-title': index == curActiveIndex }"
      :data-index="index"
    >
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
<script setup>
import { ref, onMounted } from "vue";
import service from "@/service/getData";
import { setItem } from "@/store/storage";
import storageName from "@/assets/constVar/storageName";
import singerScrollHooks from "./components/onScroll";

const singers = ref([]);
//hooks
onMounted(async () => {
  const res = await service.getSinger();
  singers.value = res.singers;
});
//长列表滑动同时标题联动、右边的分组标题也联动
const {
  scrollRef,
  singerGroupRef,
  curActiveIndex,
  curActiveTitle,
  moveStyle,
  bs,
} = singerScrollHooks(singers);

//function
const handletoSingerdetail = (singer) => {
  setItem(storageName._SINGER_, singer);
  this.$router.push({
    path: `/singer/${singer.mid}`,
  });
};

const handleSwitchGroup = (e) => {
  curActiveIndex.value = e.target.dataset.index;
  if (e.target.classList.value.indexOf("groupTitle") != -1) {
    bs.value.scrollToElement(singerGroupRef.value[curActiveIndex.value]);
  }
};
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
