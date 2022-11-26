<template>
<div class="player">
    <div class="normal-player" :style="playStyle" v-if="playScreen">
        <div class="down" @click="setMiniPlay">下拉</div>
        <h4>{{curPlaySong.name}}</h4>
        <p>{{curPlaySong.singer}}</p>
        <div class="cdWrapper">
            <div class="cdInner" ref="cdInnerRef" v-show="false">
                <img :src="curPlaySong.pic" alt="" :class="playingStyle" ref="cdImgRef">
            </div>
            <scroll :probeType="3">
                <div class="lyricWrapper" ref="lyricRef" :style="lyricStyle">
                    <ul>
                        <li v-for="(lyric,index) in lyricsObjArr" :key="lyric.uid" :class="{'curLyric':index==lyricIndex}">{{lyric.lyric}}</li>
                    </ul>
                </div>
            </scroll>

        </div>
        <div class="processWrapper">
            <Process :currentTime="currentTime" @onchangeBar="changeBar" @onchangedBar="changedBar" @onEnd="onEnd"></Process>
        </div>
        <div class="playBtn">
            <div class="icon i-left">
                <i  @click="togglePlayMode" :class="playModeStyle"></i>
            </div>
            <div class="icon i-left">
                <i class="icon-prev" @click="prevSongs"></i>
            </div>
            <div class="icon i-center">
                <i @click="togglePlay" :class="playing ?'icon-pause':'icon-play'"></i>
                
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
    <audio ref="audioPlayRef" @canplay="songReady" @timeupdate="updateTime"></audio>
</div>
</template>
<script>
import {computed,watch,ref} from 'vue';
import {useStore} from 'vuex';
import constVar from '@/assets/constVar/index';
import storageName from '@/assets/constVar/storageName';
import { getItem,setItem } from '@/store/storage';
import Process from  './process.vue';
import useCd from './useCd';
import useLyric from './useLyric';
import scroll  from '../base/scroll/scroll.vue';
export default {
    name: 'player',
    components: {
        Process,
        scroll
    },
    setup() {

        //variable
        const playStyle = ref('')
        const audioPlayRef = ref(null)
        const currentTime = ref(0)
        const songReady = ref(false)
        const isChangeBar = ref(false)
        const lyricIndex = ref(0)
        const lyricRef = ref(null)


        //state
        const store = useStore()
        const curPlaySong = computed(()=>store.getters.getCurPlaySong)
        const playScreen = computed(()=>store.state.playScreen)
        const playing = computed(()=>store.state.playing)
        const index = computed(()=> store.state.index)
        const sequenceList = computed(()=>store.state.sequenceList)
        const playMode = computed(()=>store.state.playMode)
        const favoriteList = computed(()=>store.state.favoriteList)

        //hook 
        const {playingStyle,cdInnerRef,cdImgRef} = useCd(playing)
        const {lyricsObjArr,getIndexByCurTime} = useLyric()

        //computed
        const playModeStyle = computed(()=>{
            return `icon-${store.state.playMode}`
        })
        const isHasInFavoriteList = computed(()=>{
            const result = favoriteList.value.findIndex(song=>song.mid==curPlaySong.value.mid)
            return result !== -1
        })

        const lyricStyle = computed(()=>{
            return `transform:translateY(${-lyricIndex.value*34}px)`
        })

        //watch
        watch(playScreen,(newVal)=>{
            playStyle.value = newVal?`z-index:9999`:`z-index:-1`
        })

        watch(curPlaySong,(newVal)=>{
            currentTime.value = 0
            songReady.value = false
            const audioPlay = audioPlayRef.value
            audioPlay.src = newVal.url
            audioPlay.play()
            store.commit('setPlaying',true)
            // debugger
            // isHasInFavoriteList()
        })

        watch(playing,(newVal)=>{
            const audioPlay = audioPlayRef.value
            if(playing.value) {
                audioPlay.play()
            }else {
                audioPlay.pause()
            }
        })

        watch(playMode,(newVal)=>{
            if(newVal == constVar.SEQUENCE) {
                store.dispatch('setSequenceList',sequenceList.value)
            }else if(newVal == constVar.RANDOM) {
                store.dispatch('setRandomList',sequenceList.value)
            }
        })


        //function
        function setMiniPlay() {
            store.dispatch('setMiniPlay')
        }

        function togglePlay() {
            store.commit('setPlaying',!playing.value)
        }

        function nextSongs() {
            let toggleIndex = index.value + 1
            if(toggleIndex > sequenceList.value.length - 1){
                toggleIndex = 0
            }
            store.commit("setIndex",toggleIndex)
        }
        function prevSongs() {
            let toggleIndex = index.value - 1
            if(toggleIndex < 0){
                toggleIndex = sequenceList.value.length - 1
            }
            store.commit("setIndex",toggleIndex)
        }
        function togglePlayMode() {
            // console.log(playMode)
            store.dispatch('setPlayModeBySequence',playMode.value)   
        }
        function addFavoriteList() {
            // const favoriteList_ = favoriteList.value.concat()
            const favoriteList_ = getItem(storageName._FAVORITE_)&&getItem(storageName._FAVORITE_).length?getItem(storageName._FAVORITE_):[]
            const curPlaySong_ = curPlaySong.value
            //判断当前歌曲是否在数组里面
            const sameIndex = favoriteList_.findIndex(song=>song.mid==curPlaySong_.mid)
            if(sameIndex !== -1) {
                return
            }

            favoriteList_.push(curPlaySong_)
            setItem(storageName._FAVORITE_,favoriteList_)
            store.commit("setFavoriteList",favoriteList_)
        }
        function removeFavoriteList() {
            // const favoriteList_ = favoriteList.value.concat()
            const favoriteList_ = getItem(storageName._FAVORITE_)&&getItem(storageName._FAVORITE_).length?getItem(storageName._FAVORITE_):[]
            const curPlaySong_ = curPlaySong.value
            const sameIndex = favoriteList_.findIndex(song=>song.mid==curPlaySong_.mid)
            if(sameIndex !== -1) {
                favoriteList_.splice(sameIndex,1)
            }
            setItem(storageName._FAVORITE_,favoriteList_)
            store.commit("setFavoriteList",favoriteList_)
        }
        function updateTime(e) {
            if(!isChangeBar.value) {
                let currentTime = e.target.currentTime
                this.currentTime = currentTime
                lyricIndex.value = getIndexByCurTime(currentTime,lyricsObjArr.value)
                // console.log(lyricIndex.value)
            }
        }

        function changeBar({changeBarStatus}){
            isChangeBar.value = changeBarStatus
        }
        function changedBar({changeBarStatus,curTime}){
            isChangeBar.value = changeBarStatus
            const audioPlay = audioPlayRef.value
            audioPlay.currentTime = curTime
            if(playing.value) {
                audioPlay.play()
            }else {
                audioPlay.pause()
            }
        }
        function onEnd(isEnd) {
            if(!isEnd) {
                return
            }
            if(playMode.value == constVar.LOOP) {
                loopPlay()
            }else {
                nextSongs()
            }
 
        }
        function loopPlay() {
            const audioPlay = audioPlayRef.value
            audioPlay.currentTime = 0
            audioPlay.play()
        }
        // function isHasInFavoriteList() {
        //     const result = favoriteList.value.findIndex(song=>song.mid==curPlaySong.value.value.mid)
        //     return result !== -1
        // }

        return {
            curPlaySong,
            playScreen,
            playing,
            playStyle,
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
            favoriteList,
            isHasInFavoriteList,
            updateTime,
            changeBar,
            changedBar,
            onEnd,
            playingStyle,
            cdInnerRef,
            cdImgRef,
            lyricsObjArr,
            lyricIndex,
            lyricRef,
            lyricStyle
        }
    }
}

</script>
<style lang="scss">
@import url('@/assets/scss/icon.scss');
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
        .down {
            width: 60px;
            height: 60px;
            position: absolute;
            left: 12px;
            right: 12px;
            line-height: 60px;
            color: $color-theme;
        }
        h4 {
            font-size: $font-size-large;
            height: 40px;
            line-height: 40px;
        }
        p {
            font-size: $font-size-medium;
            
        }
        .cdWrapper {
            position: fixed;
            left: 0;
            width: 100%;
            height: 70%;
            overflow: hidden;
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
            justify-content: space-between  ;
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

}
</style>