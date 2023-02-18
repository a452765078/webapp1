import { computed, watch } from "vue"
import { useStore } from "vuex"
import constVar from '@/assets/constVar/index'
export default function (audioPlayRef, currentTime) {
    //store
    const store = useStore()
    //computed
    const curPlaySong = computed(() => store.getters.getCurPlaySong)
    const playMode = computed(() => store.state.playMode)
    const playingList = computed(() => store.state.playingList)
    const index = computed(() => store.state.index)
    const playing = computed(() => store.state.playing)
    const isEnd = computed(() => {
        return parseInt(currentTime.value) == curPlaySong.value.duration
    })
    //watch
    //监听是否已结束播放，isEnd是计算属性
    watch(isEnd, (newVal) => {
        if (newVal) {
            onEnd(newVal)
        }
    })
    //播放状态，true则播放，false停止
    watch(playing, (newVal) => {
        const audioPlay = audioPlayRef.value
        if (playing.value) {
            audioPlay.play()
        } else {
            audioPlay.pause()
        }
    })
    //function
    function togglePlay() {
        store.commit('setPlaying', !playing.value)
    }

    function nextSongs() {
        let toggleIndex = index.value + 1
        if (toggleIndex > playingList.value.length - 1) {
            toggleIndex = 0
        }
        store.commit("setIndex", toggleIndex)
    }
    function prevSongs() {
        let toggleIndex = index.value - 1
        if (toggleIndex < 0) {
            toggleIndex = playingList.value.length - 1
        }
        store.commit("setIndex", toggleIndex)
    }
    //结束播放之后，根据播放模式选择下一首音乐或者继续播放当前歌曲
    function onEnd(isEnd) {
        if (!isEnd) {
            return
        }
        if (playMode.value == constVar.LOOP) {
            loopPlay()
        } else {
            nextSongs()
        }

    }
    function loopPlay() {
        const audioPlay = audioPlayRef.value
        audioPlay.currentTime = 0
        audioPlay.play()
    }
    return {
        togglePlay,
        nextSongs,
        prevSongs,
        onEnd
    }
}