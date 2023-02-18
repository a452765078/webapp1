<template>
    <div class="player" v-show="playingList && playingList.length">
        <div class="normal-player" :style="playStyle">
            <div class="down icon-back" @click="setMiniPlay"></div>
            <div class="singerInfo">
                <h4>{{ curPlaySong.name }}</h4>
                <p>{{ curPlaySong.singer }}</p>
            </div>

            <div class="cdWrapper" ref="cdWrapperRef">
                <div class="cdMiddle" @touchstart="ontouchStart" @touchmove="ontouchMove" @touchend="ontouchEnd"
                    ref="cdMiddleRef">
                    <div class="inlineBlock" :style="middleLstyle">
                        <div class="cdInner" ref="cdInnerRef" v-show="true">
                            <img :src="curPlaySong.pic" alt="" :class="playingStyle" ref="cdImgRef">
                        </div>
                    </div>
                    <div class="inlineBlock" :style="middleRstyle">
                        <div class="cdInner" v-show="true">
                            <img :src="curPlaySong.pic" alt="">
                        </div>
                    </div>
                    <!-- <scroll :probeType="3" class="inlineBlock" >
                        <div class="lyricWrapper" ref="lyricRef">
                            <ul>
                                <li v-for="(lyric, index) in lyricsObjArr" :key="lyric.uid"
                                    :class="{ 'curLyric': index == lyricIndex }">{{ lyric.lyric }}</li>
                            </ul>
                        </div>
                    </scroll> -->

                </div>



            </div>
            <div class="processWrapper">
                <!-- <Process :currentTime="currentTime" @onchangeBar="changeBar" @onchangedBar="changedBar" @onEnd="onEnd"></Process> -->
                <Process :currentTime.prevent="currentTime" @onchangeBar.prevent="changeBar"
                    @onchangedBar.prevent="changedBar"></Process>
            </div>
            <div class="playBtn">
                <div class="icon i-left">
                    <i @click="togglePlayMode" :class="playModeStyle"></i>
                </div>
                <div class="icon i-left">
                    <i class="icon-prev" @click="prevSongs"></i>
                </div>
                <div class="icon i-center">
                    <i @click="togglePlay" :class="playing ? 'icon-pause' : 'icon-play'"></i>

                </div>
                <div class="icon i-right">
                    <i class="icon-next" @click="nextSongs"></i>
                </div>
                <div class="icon i-right">
                    <i class="icon-favorite" @click="removeFavoriteList" v-if="isHasInFavoriteList"></i>
                    <i class="icon-not-favorite" @click="addFavoriteList" v-else></i>
                </div>
            </div>
        </div>
        <div class="mini-player" :style="playStyleMini" v-if="!playScreen" @click.stop="setPlayScreen">
            <div class="mini-player-inner">
                <div class="cdInner" ref="cdInnerRef">
                    <img :src="curPlaySong.pic" alt="" :class="playingStyle" ref="cdImgRef">
                </div>
                <div class="info">
                    <span class="name">{{ curPlaySong.name }}</span>
                    <span class="singer">{{ curPlaySong.singer }}</span>
                </div>
                <div class="btns">
                    <div class="btn" @click.stop="togglePlay" :class="playing ? 'icon-pause' : 'icon-play'"></div>
                    <div class="btn icon-playlist" @click.stop="showPlayerList = true"></div>
                </div>
            </div>
        </div>
        <playderList v-if="showPlayerList == true" @closePlayerList="closePlayerList" @togglePlayMode="togglePlayMode"
            @toggleFavoriteStatus="toggleFavoriteStatus">
        </playderList>
        <audio ref="audioPlayRef" @canplay="songReady" @timeupdate="updateTime"></audio>
    </div>
</template>
<script>
import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';
import Process from './process.vue';
import useCd from './useCd';
import useLyric from './useLyric';
import useFavorite from './useFavorite';
import useMode from './useMode';
import useSongope from './useSongope';
import useCdmiddle from './useCdmiddle';
import scroll from '../base/scroll/scroll.vue';
import playderList from './player-list.vue';
import { isNullObj } from '@/assets/util/index';
import service from '@/service/getData'
export default {
    name: 'player',
    components: {
        Process,
        scroll,
        playderList
    },
    setup() {
        //store
        const store = useStore()
        //variable
        const playStyle = ref('')
        const playStyleMini = ref('')
        const audioPlayRef = ref(null)
        const currentTime = ref(0)
        const songReady = ref(false)
        const isChangeBar = ref(false)
        const lyricIndex = ref(0)
        const lyricRef = ref(null)
        const showPlayerList = ref(false)
        const cdWrapperRef = ref(null)
        const cdMiddleRef = ref(null)
        //state
        const curPlaySong = computed(() => store.getters.getCurPlaySong)
        const playScreen = computed(() => store.state.playScreen)
        const playing = computed(() => store.state.playing)
        const playingList = computed(() => store.state.playingList)
        //hook 
        const { playingStyle, cdInnerRef, cdImgRef } = useCd()
        const { lyricsObjArr, getIndexByCurTime, lyricRefHeight, cdWrapperRefHeight } = useLyric(lyricRef, cdWrapperRef)  //获取歌词高度，根据当前时间获取索引，歌词列表
        const { isHasInFavoriteList, toggleFavoriteStatus, addFavoriteList, removeFavoriteList } = useFavorite()  //点击收藏或者取消收藏，收藏样式调整
        const { togglePlayMode } = useMode()  //模式切换
        const { togglePlay, nextSongs, prevSongs } = useSongope(audioPlayRef, currentTime)  //歌曲前进后退中断、时间结束自动切换
        const { ontouchStart, ontouchMove, ontouchEnd, middleLstyle, middleRstyle } = useCdmiddle()
        //computed
        //获取歌词条最大移动的距离
        const maxTranslateY = computed(() => {
            return lyricRefHeight - cdWrapperRefHeight
        })
        const playModeStyle = computed(() => {
            return `icon-${store.state.playMode}`
        })
        //根据lyricIndex 得到歌词列表中正在播放的歌词
        const lyricStyle = computed(() => {
            let translateYDis = lyricIndex.value * 34
            if (translateYDis > maxTranslateY.value) {
                return `transform:translateY(${-maxTranslateY.value}px)`
            } else {
                return `transform:translateY(${-lyricIndex.value * 34}px)`
            }
        })

        //watch
        watch(playScreen, (newVal) => {
            playStyle.value = newVal ? `z-index:9999;opacity:1` : `z-index:-1;opacity:0`
            playStyleMini.value = !newVal ? `z-index:9999` : `z-index:-1`
        })
        watch(curPlaySong, async (newVal) => {
            if (isNullObj(newVal)) return //清空歌曲列表时处理
            currentTime.value = 0
            songReady.value = false
            const audioPlay = audioPlayRef.value
            let newVal_ = Object.assign({}, newVal)  //直接newVal会提示不能更改state
            if (!newVal_.url) {  //从搜索页面过来时没有url,请求url。
                await service.getSongsUrl([newVal_])
            }
            audioPlay.src = newVal_.url
            audioPlay.play()
            store.commit('setPlaying', true)
        })


        //function
        const test = {}
        //播放器实时更新播放时间所触发的事件。
        // 更新数据中的当前时间，根据时间与歌词列表得到激活的歌词列表索引。通过索引移动歌词列表
        function updateTime(e) {
            test.lastCurTime = e.target.currentTime
            if (!isChangeBar.value) {
                let currentTime = e.target.currentTime
                this.currentTime = currentTime
                // lyricIndex.value = getIndexByCurTime(currentTime, lyricsObjArr.value)
            }
        }
        //改变歌曲进度条，按键未放下。由子组件触发
        function changeBar({ changeBarStatus, curTime }) {
            isChangeBar.value = changeBarStatus
            lyricIndex.value = getIndexByCurTime(curTime, lyricsObjArr.value)
        }
        //改变歌曲进度条，按键放下。由子组件触发
        function changedBar({ changeBarStatus, curTime }) {
            isChangeBar.value = changeBarStatus
            const audioPlay = audioPlayRef.value
            audioPlay.currentTime = curTime
            if (playing.value) {
                audioPlay.play()
            } else {
                audioPlay.pause()
            }
        }
        function setPlayScreen() {
            store.commit("setPlayScreen", true)
        }
        function setMiniPlay() {
            store.dispatch('setMiniPlay')
        }
        function closePlayerList() {
            showPlayerList.value = false
        }

        return {
            curPlaySong,
            playScreen,
            playing,
            playStyle,
            playStyleMini,
            setMiniPlay,
            audioPlayRef,
            currentTime,
            songReady,
            togglePlay,
            nextSongs,
            prevSongs,
            togglePlayMode,
            playModeStyle,
            addFavoriteList,
            removeFavoriteList,
            updateTime,
            changeBar,
            changedBar,
            playingStyle,
            lyricsObjArr,
            lyricIndex,
            lyricRef,
            lyricStyle,
            setPlayScreen,
            cdInnerRef,
            cdImgRef,
            showPlayerList,
            closePlayerList,
            toggleFavoriteStatus,
            playingList,
            cdWrapperRef,
            cdWrapperRefHeight,
            lyricRefHeight,
            isHasInFavoriteList,
            ontouchStart,
            ontouchMove,
            ontouchEnd,
            cdMiddleRef,
            middleLstyle,
            middleRstyle
        }
    }
}

</script>
<style lang="scss">
@import url('@/assets/scss/icon.scss');

.playing {
    animation: rotate 20s linear infinite;
}

.inlineBlock {
    display: inline-block;
    transition: all .3s;
}

.player {
    position: relative;

    .normal-player {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $color-background;
        text-align: center;
        transition: all 0.5s;

        .down {
            width: 60px;
            height: 60px;
            position: absolute;
            left: 12px;
            right: 12px;
            font-size: 22px;
            line-height: 60px;
            color: $color-theme;
            transform: rotate(-90deg);
            z-index: 99;
        }

        .singerInfo {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

            h4 {
                font-size: $font-size-large;
                height: 40px;
                line-height: 40px;
            }

            p {
                font-size: $font-size-medium;

            }
        }


        .cdWrapper {
            position: fixed;
            top: 80px;
            bottom: 180px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;

            .cdInner {
                width: 100%;
                padding: 40px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;

                img {
                    width: auto;
                    height: auto;
                    max-width: 100%;
                    max-height: 100%;
                    border: 10px solid $color-text-l;
                    border-radius: 50%;
                }

                .playing {
                    animation: rotate 20s linear infinite;
                }
            }

            .lyricWrapper {
                padding: 20px 30px 30px 30px;
                display: flex;
                justify-content: center;
                font-size: $font-size-medium;

                li {
                    margin-top: 20px;
                    color: $color-text-l;
                }

                .curLyric {
                    color: $color-text;
                }
            }
        }

        .playBtn {
            position: absolute;
            bottom: 50px;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: $color-theme;

            .icon {
                flex: 1;

                i {
                    font-size: 30px;
                }

                .icon-play {
                    font-size: 50px;
                }

                .icon-pause {
                    font-size: 50px;
                }

                .icon-favorite {
                    color: $color-sub-theme;
                }
            }
        }

        .processWrapper {
            position: absolute;
            width: 100%;
            bottom: 110px;
            left: 0;
        }
    }

    .mini-player {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-left: 20px;
        padding-right: 12px;
        box-sizing: border-box;
        background-color: $color-highlight-background;

        .mini-player-inner {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;

            .cdInner {
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
            }

            .info {
                display: flex;
                flex-direction: column;
                width: 280px;
                margin-left: 8px;

                .name {
                    display: block;
                    color: $color-text;
                    font-size: $font-size-medium;
                }

                .singer {
                    display: block;
                    color: $color-text-l;
                    font-size: $font-size-small;
                    margin-top: 12px;
                }
            }

            .btns {
                display: flex;

                .btn {
                    font-size: 32px;
                    color: $color-theme-d;
                    margin-right: 12px;

                    &:last-child {
                        margin-right: 0px;
                    }
                }
            }

        }
    }
}
</style>