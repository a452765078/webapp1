<template>
<div class="search-box">
    <div class="search-box-wrapper">
        <div class="search-box-inner">
            <div class="searchBtn">
                <i class="icon-search"></i>
            </div>
            <input class="text" type="text" placeholder="搜索歌曲、歌手" v-model="inputText">
        </div>
    </div>
    <searchResultVue :singerList="singerList" :songsList="songsList" @getMore="getMore"></searchResultVue>
    <searchHotVue @selectKey="selectKey"  v-show="!inputText"></searchHotVue>
</div>
<router-view v-slot="{Component}">
    <transition name="slide">
        <component :is="Component" />
    </transition>
</router-view>
</template>
<script>
import {watch,ref,nextTick} from 'vue';
// import {debounce} from '@/assets/util/index';
import service from '@/service/getData';
import searchResultVue from './search-result.vue';
import searchHotVue from './search-hot.vue';
export default {
    name: 'search-box',
    components: {
        searchResultVue,
        searchHotVue
    },
    setup() {
        const inputText = ref('')
        const timer = ref(null)  //存储定时任务
        const page = ref(1)
        const singerList = ref([]) //查询结果
        const songsList = ref([])  //查询结果
        const hasMore = ref(true) //下一次查询是否有数据
 
        //watch
        watch(inputText,(newVal,oldVal)=>{
            // if(!newVal){
            //     resetSearchResult()
            //     return
            // }
            if(newVal !==oldVal) {
                resetSearchResult()
            }
            if(timer.value) {
                clearTimeout(timer.value)
            }
            timer.value = setTimeout(async ()=>{
                let params = {
                query:newVal,
                page:page.value,
                showSinger:true,
                }
                getSongsSearch(params)
            },1000)
        })


        
        //function
        async function getSongsSearch(params) {
            const res = await service.getSongsSearch(params)
            hasMore.value = res.hasMore
            res.singer?singerList.value.push(res.singer):''
            let songs = res.songs
            res.songs?songs.map(song=>songsList.value.push(song)):''
            // console.log(singerList.value,songsList.value)
        }
        function resetSearchResult() {
            page.value = 1
            singerList.value = []
            songsList.value = []
            hasMore.value = true
        }
        function getMore() {
            if(hasMore) {
                page.value += 1
                let params = {
                    query:inputText.value,
                    page:page.value,
                    showSinger:true,
                }
                getSongsSearch(params)
            }
        }
        function selectKey(key) {
            inputText.value = key
        }


        return {
            inputText,
            singerList,
            songsList,
            getMore,
            selectKey
        }
    }
}
</script>
<style lang="scss" scoped>
.search-box {
    position: relative;
    .search-box-wrapper {
        margin-top: 30px;
        padding:0 20px;
        .search-box-inner {
            background-color: $color-highlight-background;
            padding: 6px 6px;
            border-radius: 5px;
            display: flex;
            .searchBtn {
                i {
                    color: $color-text-l;
                    font-size: 22px;
                }
            }
            .text {
                margin-left: 12px;
                width: 300px;
                border: none;
                background-color: transparent;
                outline: none;
                color: $color-text;
                font-size: $font-size-medium;
            }
        }
    }

}
</style>