import { ref,watch,nextTick,onMounted,onUnmounted,onUpdated,computed} from 'vue';
import {setItem} from '@/store/storage';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'
export default function() {
    const router = useRouter()
    const store = useStore()

    function toSingerDetail(singer) {
        setItem("singer",singer)
        router.push(`/search/${singer.mid}`)
    }

    function toPlayer(songs) {
        store.dispatch('selectSongBySong',songs)
    }

    return {
        toSingerDetail,
        toPlayer
    }
}