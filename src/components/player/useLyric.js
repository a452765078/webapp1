import { watch, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import service from '@/service/getData'
import { formatLyricTime, isNullObj } from '@/assets/util/index';


export default function (lyricRef, cdWrapperRef) {
    //var
    const store = useStore()
    const lyric = ref({})
    const lyricsObjArr = ref([])
    const lyricRefHeight = ref(0)
    const cdWrapperRefHeight = ref(0)
    //state 
    const curPlaySong = computed(() => store.getters.getCurPlaySong)
    //watch
    watch(curPlaySong, async (newVal) => {
        if (isNullObj(newVal)) return //清空歌曲列表时处理
        const res = await service.getSongsLyric(newVal)
        lyric.value = res.lyric
        getLyricArr(lyric.value)
        await nextTick()  //必须些nexttick才能获取到最新的高度
        lyricRefHeight.value = lyricRef.value.clientHeight
        cdWrapperRefHeight.value = cdWrapperRef.value.clientHeight
    })

    //function
    function getLyricArr(lyric) {
        const regNewLine = /\n/
        const lineArr = lyric.split(regNewLine)
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/

        lyricsObjArr.value = []
        lineArr.forEach(item => {
            if (item === '') return
            const obj = {}
            const time = item.match(regTime)

            obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
            obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
            obj.uid = Math.random().toString().slice(-6)
            if (obj.lyric === '') {
                console.log('这一行没有歌词')
            } else {
                lyricsObjArr.value.push(obj)
            }
        })
        // console.log(lyricsObjArr.value)
    }

    function getIndexByCurTime(curTime, clyricsObjArr) {
        let length = clyricsObjArr.length - 1
        let index = 0
        for (let i = 0; i < length; i++) {
            let startTime = clyricsObjArr[i].time
            let endTime = clyricsObjArr[i + 1].time
            if (curTime >= startTime && curTime < endTime) {
                index = i
                break
            }
        }
        return index
    }


    return {
        lyricsObjArr,
        getIndexByCurTime,
        lyricRefHeight,
        cdWrapperRefHeight
    }
}