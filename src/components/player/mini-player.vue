<template>
    <div class="mini-player" :style="playStyleMini" v-if="!playScreen" @click.stop="setPlayScreen">
        <div class="mini-player-inner">
            <div class="cdInner" ref="cdInnerRef">
                <img :src="curPlaySong.pic" alt="" ref="cdImgRef" :class="playingStyle" >
            </div>
            <div class="info">
                <span class="name">{{curPlaySong.name}}</span>
                <span class="singer">{{curPlaySong.singer}}</span>
            </div>
            <div class="btns">
                <div class="btn"  @click.stop="togglePlay" :class="playing ?'icon-pause':'icon-play'"></div>
                <div class="btn icon-playlist"></div>
            </div>
        </div>
    </div>
</template>
<script>
//此为单独的组件，没法正常使用。原因为点击播放按钮时要获取dom，但是获取不到。在主文件中则能直接获取到
import {computed,ref} from 'vue';
import {useStore} from 'vuex';
import useCd from './useCd'
export default {
    name: 'miniPlayer',
    props: {
        playStyleMini: {
            type:String,
            default:''
        },
    },
    setup() {
        //var
        const store = useStore()
        //computed
        const playScreen = computed(()=> store.state.playScreen)
        const curPlaySong = computed(()=> store.getters.getCurPlaySong)
        const playing = computed(()=>store.state.playing)

        //hook
        const {playingStyle,cdInnerRef,cdImgRef} = useCd()
        //function
        function setPlayScreen() {
            store.commit("setPlayScreen",true)
        }
        function togglePlay() {
            store.commit('setPlaying',!playing.value)
        }
        return {
            playScreen,
            curPlaySong,
            playing,
            playingStyle,
            cdInnerRef,
            cdImgRef,
            setPlayScreen,
            togglePlay
        }
    }
}
</script>
<style lang="scss" scoped>
.playing {
    animation: rotate 20s linear infinite;
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
</style>