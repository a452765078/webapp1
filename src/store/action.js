import constVar from '@/assets/constVar/index'
import {getRandomIndex,swap} from '@/assets/util/index'
export default {
    selectSong({commit},{songs,index}) {
        commit('setPlaying',true)
        commit('setPlayMode',constVar.SEQUENCE)
        commit('setPlayScreen',true)
        commit('setSequenceList',songs)
        commit('setPlayingList',songs)
        commit('setIndex',index)
    },
    selectRandomPlay({commit},{songs}) {
        const max = songs.length
        const randomList = songs.concat()
        for(let i=0;i<max;i++) {
            let j = getRandomIndex(max) 
            swap(i,j,randomList)
        }
        commit('setPlaying',true)
        commit('setPlayMode',constVar.RANDOM)
        commit('setPlayScreen',true)
        commit('setSequenceList',songs)
        commit('setPlayingList',randomList)
        commit('setIndex',0)

    }
}