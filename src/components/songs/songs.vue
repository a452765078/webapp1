<template>
    <div class="songs"  :style="imgZindex">
        <div class="imgWrapper" ref="imgRef">
            <div class="back" @click="back">后退</div>
            <div class="img" :style="imgStyle" alt=""></div>
            <h4>{{singer.name}}</h4>
            <div class="button" @click=selectRandomList>随机播放全部</div>
            <div class="mask" :style="filterStyle"></div>
        </div>
    </div>
    <!-- Q:v-loading:[test] test获取不到是怎么回事？ -->
    <scroll :probeType="3" @scrollY="scrollY" v-loading="loading" v-no-result="noResult">
        <div class="songsContent">
            <div class="songsList">
                <div class="item" v-for="(songs,index) in singerDetail"  @click="selectItem(songs,index)">
                    <h5>{{songs.name}}</h5>
                    <p>{{songs.album}}</p>
                </div>
            </div>
        </div>
    </scroll>


</template>
<script>
import {onMounted,ref,computed} from 'vue';
import {useRoute} from 'vue-router';
import {getItem} from '@/store/storage';
import scroll  from '../base/scroll/scroll.vue';
import service from '@/service/getData';
import { mapActions } from 'vuex';
export default {
    name: 'songs',
    components: {
        scroll
    },
    methods: {
        back() {
            this.$router.back()
        },
        ...mapActions(['selectSong','selectRandomPlay']),
        selectItem(song,index) {
            let obj = {songs:this.singerDetail,index}
            this.selectSong(obj)
        },
        selectRandomList() {
            let obj = {songs:this.singerDetail}
            this.selectRandomPlay(obj)
        }
    },
    data() {
        return {
    
        }
    },
    computed: {

    },

    setup(props,instance) {
        const route = useRoute()
        const singer = ref({})
        const singerDetail = ref({})
        const imgHeight = ref(0)
        const imgRef = ref(null)
        const posY = ref(0)
        const maxTranlateDistance = ref(0)
        const MIN_IMG_HEIGHT = 40
        let loading = ref(true)
        const imgZindex = computed(()=>{
            if(posY.value>0 && posY.value < maxTranlateDistance.value) {
                return `z-index:0`
            }else if(posY.value >= maxTranlateDistance.value){
                return `z-index:99;height:${MIN_IMG_HEIGHT}px;overflow:hidden`
            }else if(posY.value <0){
                return `z-index:99`
            }else{
                return `z-index:99`
            }
        })
        const imgStyle = computed(()=>{
            if(posY.value <0){
                const distance = -posY.value
                const scale = distance/imgHeight.value + 1
                return `background-image:url(${singer.value.pic});z-index:99;scale:${scale}`
            }
            return `background-image:url(${singer.value.pic});`
        })
        const filterStyle = computed(()=>{
            let _posY = posY.value
            let blur = Math.min(maxTranlateDistance.value/imgHeight.value*10,_posY / imgHeight.value*10)
            // console.log(blur)
            return {
                backdropFilter:`blur(${blur}px)`
            }
        })
        const noResult = computed(()=>{
            return singerDetail.value.length === 2
        })
        // const buttonStyle = computed(()=>{
        //     if(posY.value>0 && posY.value < maxTranlateDistance.value) {
        //         return `display:none`
        //     }else if(posY.value >= maxTranlateDistance.value){
        //         return `display:none`
        //     }else{
        //         return `display:block`
        //     }
        // })
        onMounted(async () => {
            singer.value = getItem("singer")
            const res = await service.getSingerDetail(singer.value)
            const res1 = await service.getSongsUrl(res.songs)  //songs是引用类型，不需要返回
            console.log(res.songs)
            singerDetail.value = res.songs
            loading.value = false
            imgHeight.value = imgRef.value.clientHeight
            maxTranlateDistance.value = imgHeight.value - MIN_IMG_HEIGHT
            // console.log(maxTranlateDistance)
        })
        function scrollY(_posY){
            posY.value = -_posY
        }

 

        return {
            singer,
            singerDetail,
            scrollY,
            imgRef,
            imgHeight,
            imgZindex,
            imgStyle,
            filterStyle,
            loading,
            noResult,
            // buttonStyle
        }
    }
}
</script>
<style lang="scss" scoped>
.songs {
    position: relative;
    .imgWrapper {
        width: 100%;
        height: 0;
        padding-top: 70%;
        position: relative;
        .img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
        }
        h4 {
            width: 100%;
            position: absolute;
            top: 12px;
            left: 0;
            text-align: center;
            color: $color-text;
            font-size: $font-size-large;
            z-index: 99;
        }
        .button {
            position: absolute;
            bottom: 18px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 30px;
            line-height: 30px;
            border-radius: 20px;
            border: 1px solid $color-theme;
            color: $color-theme;
            text-align: center;
            font-size: $font-size-medium;
            z-index: 99;
        }
        .back {
            position: absolute;
            top: 12px;
            left: 12px;
            color: $color-theme;
            font-size: $font-size-large-x;
            z-index: 999999;
        }
        .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: $color-background-d;
        }
    }
}
.songsContent {
    background-color: $color-background;
    .songsList {
        width: 100%;
        z-index: 99;
        padding-bottom: 295px;
        .item {
            height: 60px;
            padding-left: 30px;
            padding-top: 0px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            h5 {
                color: $color-text;
                font-size: $font-size-medium;
            }
            p {
                margin-top: 8px;
                color: $color-text-l;
                font-size: $font-size-medium;
            }
        }
    }
}


</style>