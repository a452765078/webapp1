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
    }
}