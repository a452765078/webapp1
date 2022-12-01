import getData from './index'



export default {
    getRecommend() {
        return getData('/api/getRecommend')
    }
    ,getSinger() {
        return getData('/api/getSingerList')
    }
    ,getSingerDetail(params) {
        const {mid} = params
        return getData(`/api/getSingerDetail?mid=${mid}`)
    },
    getSongsUrl(songs) {
        return getData(`/api/getSongsUrl`,{
            mid:songs.map((song)=>{
                return song.mid
            })
        }).then((result)=>{
            const dmap = result.map
            return songs.map(song=>{
                song.url=dmap[song.mid]
            })
        })
    },
    getSongsLyric(params){
        const {mid} = params
        return getData(`/api/getLyric?mid=${mid}`)
    },
    getSongsSearch(params){
        const {query,page,showSinger} = params
        return getData(`/api/search?query=${query}&page=${page}&showSinger=${showSinger}`)
    },
    getHotKeys(){
        return getData(`/api/getHotKeys`)
    }
}