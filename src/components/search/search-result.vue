<template>
<div class="search-result">
    <div class="search-result-wrapper">
        <div class="search-result-inner">
            <ul class="singerListWrapper" v-show="singerList&&singerList.length" ref="searchResultRef">
                <li v-for="singer in singerList" :key="singer.mid">
                    <a href="javascript:;" class="search-result-item" @click="toSingerDetail(singer)">
                        <i class="icon-mine"></i>
                        <span class="name">{{singer.name}}</span>
                    </a>
                </li>
            </ul>
            <ul class="songsListWrapper" v-show="songsList&&songsList.length">
                <li v-for="song in songsList" :key="song.mid" @click="toPlayer(song)">
                    <a href="javascript:;" class="search-result-item">
                        <i class="icon-music"></i>
                        <span class="name">{{song.name}}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

</template>
<script>
import useGetMore from './useGetMore';
import useToSingerDetail from './useToSingerDetail';
import {computed} from 'vue'
export default {
    name: 'search-result',
    props: {
        singerList:{
            type:Array,default:[]
        },
        songsList:{
            type:Array,default:[]
        }
    },
    emits:['getMore'],
    setup(props,{emit}) {
        //hooks
        useGetMore(props,emit)     //功能加载更多
        const {toSingerDetail,toPlayer} = useToSingerDetail()  //跳转到歌手详情/播放器


        return {
            toSingerDetail,
            toPlayer
        }
    }
}
</script>
<style lang="scss" scoped>
.search-result {
    .search-result-wrapper {
        padding: 20px 30px 0 30px;
        .search-result-inner {

            .search-result-item {
                display: inline-block;
                color: $color-text-d;
                font-size: $font-size-medium;
                height: 30px;
                i {
                    font-size: $font-size-medium;
                    margin-right: 18px;
                }
                .name {
                    display: inline-block;
                    width: 300px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>