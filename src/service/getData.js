import getData from './index'



export default {
    getRecommend() {
        return getData('/api/getRecommend')
    }
    ,getSinger() {
        return getData('/api/getSingerList')
    }
}