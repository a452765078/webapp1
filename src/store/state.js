import constVar from '@/assets/constVar/index'
import storageName from '@/assets/constVar/storageName'
import {getItem} from '@/store/storage'


export default {
    playing: false,
    playMode: constVar.SEQUENCE,
    playScreen: false,
    sequenceList:[],
    playingList: [],
    index:0,
    favoriteList: getItem(storageName._FAVORITE_)&&getItem(storageName._FAVORITE_).length?getItem(storageName._FAVORITE_) : []
}