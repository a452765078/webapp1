import { computed } from 'vue'
import { getItem, setItem } from '@/store/storage'
import { useStore } from 'vuex'
import storageName from '@/assets/constVar/storageName'
export default function () {
    //store
    const store = useStore()

    //computed
    const curPlaySong = computed(() => store.getters.getCurPlaySong)
    const favoriteList = computed(() => store.state.favoriteList)
    const isHasInFavoriteList = computed(() => {
        const result = favoriteList.value.findIndex(song => song.mid == curPlaySong.value.mid)
        return result !== -1
    })

    //function
    function toggleFavoriteStatus(item) {
        // const favoriteList_ = favoriteList.value.concat()
        const favoriteList_ = getItem(storageName._FAVORITE_) && getItem(storageName._FAVORITE_).length ? getItem(storageName._FAVORITE_) : []
        //判断当前歌曲是否在数组里面
        const sameIndex = favoriteList_.findIndex(song => song.mid == item.mid)
        if (sameIndex !== -1) {
            favoriteList_.splice(sameIndex, 1)
            setItem(storageName._FAVORITE_, favoriteList_)
            store.commit("setFavoriteList", favoriteList_)
        } else {
            favoriteList_.push(item)
            setItem(storageName._FAVORITE_, favoriteList_)
            store.commit("setFavoriteList", favoriteList_)
        }
    }

    function addFavoriteList() {
        // const favoriteList_ = favoriteList.value.concat()
        const favoriteList_ = getItem(storageName._FAVORITE_) && getItem(storageName._FAVORITE_).length ? getItem(storageName._FAVORITE_) : []
        const curPlaySong_ = curPlaySong.value
        //判断当前歌曲是否在数组里面
        const sameIndex = favoriteList_.findIndex(song => song.mid == curPlaySong_.mid)
        if (sameIndex !== -1) {
            return
        }

        favoriteList_.push(curPlaySong_)
        setItem(storageName._FAVORITE_, favoriteList_)
        store.commit("setFavoriteList", favoriteList_)
    }

    function removeFavoriteList() {
        // const favoriteList_ = favoriteList.value.concat()
        const favoriteList_ = getItem(storageName._FAVORITE_) && getItem(storageName._FAVORITE_).length ? getItem(storageName._FAVORITE_) : []
        const curPlaySong_ = curPlaySong.value
        const sameIndex = favoriteList_.findIndex(song => song.mid == curPlaySong_.mid)
        if (sameIndex !== -1) {
            favoriteList_.splice(sameIndex, 1)
        }
        setItem(storageName._FAVORITE_, favoriteList_)
        store.commit("setFavoriteList", favoriteList_)
    }

    return {
        isHasInFavoriteList,
        toggleFavoriteStatus,
        addFavoriteList,
        removeFavoriteList
    }
}