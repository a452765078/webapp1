<template>
    <div class="search-result"  v-loading:[loadingText]="!singerAndSongs.length" v-no-result="hasResult">
        <div class="search-result-inner" ref="containerRef">
            <ul ref="dataRef" >
                <li v-for="item in singerAndSongs" :key="item.mid">
                    <i :class="item.url?'icon-music':'icon-mine'"></i>
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="loadingWrapper" v-show="busy">
            <div class=""  v-loading="busy"></div>
        </div>
    </div>
</template>
<script>
import {ref,watch,nextTick,onMounted,onUnmounted,computed} from 'vue';
import service from '@/service/getData';
export default {
    name: 'search-result',
    props: {
        query:String,
    },
    setup(props,{}) {
        //var
        const query = ref(props.query)
        const page = ref(1)
        const showSinger = ref(true)
        const hasMore = ref(true)
        const singerAndSongs = ref([])
        const dataRef = ref(null)
        const containerRef = ref(null)
        const scrollHeight = ref(0)  //查询结果标签的高度
        const busy = ref(false)
        const loadingText = ref("hello")
        //computed
        const loading = computed(()=>{
            return !singerAndSongs.value.length
        })
        const hasResult = computed(()=>{
            return !hasMore.value&&!singerAndSongs.value.length
        })
        //hooks
        onMounted(()=>{
            containerRef.value.addEventListener("scroll",scrollBottom)
        })
        onUnmounted(()=>{
            // containerRef.value.removeEventListener("scroll",scrollBottom)
            //销毁时containerRef已经为空了
        })


        //watch
        watch(()=>props.query,async (newVal)=>{
            newVal = newVal.trim()
            query.value = newVal
            resetParasAndData()
            if(!newVal) return
            let params = {
                query:newVal,
                page:page.value,
                showSinger:showSinger.value
            }
            await getResultData(params)
            await nextTick()
            getMoreDataFirst(params)
        })
        //function
        function resetParasAndData() {
            query.value = ''
            page.value = 1
            showSinger.value = true
            singerAndSongs.value = []
        }
        async function getMoreDataFirst(params) {
            let scrollHeight = dataRef.value.scrollHeight
            let containerHeight = containerRef.value.scrollHeight
            if(scrollHeight<containerHeight&&hasMore.value){
                query.value = params.query
                page.value = params.page+1
                showSinger.value = params.showSinger
                let _params = {
                    query:params.query,
                    page:params.page+1,
                    showSinger:params.showSinger
                }
                await getResultData(_params)
                await nextTick()
                getMoreDataFirst(_params)
            }
        }
        function getMoreData() {
            let params = {
                query:query.value,
                page:page.value,
                showSinger:showSinger.value
            }
            getResultData(params)
        }
        async function getResultData(params) {
            const res = await service.getSongsSearch(params) 
            res.songs&&res.songs.length?await service.getSongsUrl(res.songs):''
            singerAndSongs.value.push(res.singer)
            singerAndSongs.value = res.songs&&res.songs.length?singerAndSongs.value.concat(res.songs):singerAndSongs.value
            singerAndSongs.value = singerAndSongs.value.filter(item=>item) //过滤undefined
            hasMore.value = res.hasMore
        }
        function scrollBottom(e) {
            let scrollHeight = e.target.scrollHeight
            let scrollTop = e.target.scrollTop
            let clientHeight = e.target.clientHeight
            let scrollBottom = scrollHeight - scrollTop - clientHeight;
            if(scrollBottom < 20&&!busy.value) {
                    busy.value  = true
                    setTimeout(async ()=>{
                        getMoreData()
                        busy.value = false
                    },1000)

                }
            }

        

        return {
            query,
            page,
            showSinger,
            singerAndSongs,
            resetParasAndData,
            dataRef,
            containerRef,
            getResultData,
            hasMore,
            scrollBottom,
            loading,
            hasResult,
            loadingText,
            busy
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.search-result {
    height: calc(100% - 74px);
    padding: 0px 30px;
    .search-result-inner {
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        ul {
            padding-bottom: 20px;
            li {
                color: $color-text-d;
                font-size: $font-size-medium;
                height: 30px;
                display: flex;
                align-items: center;
                i {
                    font-size: 14px;
                }
                span {
                    display: inline-block;
                    width: 300px;
                    margin-left: 14px;
                    @include no-wrap();
                }
            }
        }
    }
}
</style>