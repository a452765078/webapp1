<template>
<Teleport to="body">
    <div class="playerList">
        <div class="inner">
            <div class="back"></div>
            <div class="playerListInfo">
                <div class="header">
                    <div class="playOperate"   @click.stop="togglePlayMode">
                        <i class="icon" :class="playModeStyle"></i>
                        {{playModeName}}
                    </div>
                    <div class="delIcon icon-clear" @click="openCofirm"></div>
                </div>
                <div class="content">
                    <scroll :probeType="3" class="songsWrapper" ref="scrollRef">
                        <div class="songsList">
                            <ul ref="ulRef" >
                                <li class="item" v-for="(item,index) in playingList" :key="item.mid" @click.stop="selectSong(index)">
                                    <i class="icon" :class="curIndex==index?'icon-play':''"></i>
                                    <div class="name" >{{item.name}}</div>
                                    <div class="btn">
                                        <div class="favorite">
                                            <i :class="isHasInFavoriteList(item)?'icon-favorite':'icon-not-favorite'" @click.stop="toggleFavoriteStatus(item)"></i>
                                        </div>
                                        <div class="del icon-delete" @click.stop="delSong(item)"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </scroll>
                    <div class="addSongs">
                        <div class="addBtn">
                            添加歌曲到队列
                        </div>
                    </div>
                    <div class="close" @click.stop="close">关闭</div>
                </div>
            </div>

        </div>
    </div>  
</Teleport>
<confirm v-if="showConfirm" @confirm="delAll" @cancel="hide"></confirm>
</template>
<script>
import {useStore} from 'vuex';
import {computed,ref,watch,nextTick,onMounted} from 'vue';
import constVar from '@/assets/constVar/index';
import scroll from '@/components/base/scroll/scroll.vue';
import confirm from '@/components/base/confirm/confirm.vue';
export default {
    name: 'playerList',
    components: {
        scroll,
        confirm
    },
    emits:['closePlayerList','togglePlayMode','toggleFavoriteStatus'],
    setup(props,ctx) {
        // var
        const store = useStore()
        const ulRef = ref(null)
        const scrollRef = ref(null)
        const showConfirm = ref(false)
        //computed
        const playingList = computed(()=>store.state.playingList)
        const playModeStyle = computed(()=>{
            return `icon-${store.state.playMode}`
        })
        const playMode = computed(()=>store.state.playMode)
        const playModeName = computed(()=>{
            let name = ''
            if(playMode.value == constVar.LOOP) {
                name = "单曲循环"
            }else if(playMode.value == constVar.RANDOM){
                name = "随机播放"
            }else if(playMode.value == constVar.SEQUENCE){
                name = "顺序播放"
            }
            return name
        })
        const curIndex = computed(()=>store.state.index)
        const curLisDom = computed(()=>scrollRef.value.$el.querySelectorAll("li"))
        const favoriteList = computed(()=>store.state.favoriteList)
        const curPlaySong = computed(()=>store.getters.getCurPlaySong)

        //hook
        onMounted(()=>{
            scrollSong(curIndex.value)
        })
        //watch 
        watch(curIndex,async (index)=>{
            scrollSong(index)
        })


        //function
        function close() {
            ctx.emit("closePlayerList")
        }
        function togglePlayMode() {
            ctx.emit("togglePlayMode")
        }
        // function getTranslateY() {
        //     let domHeight = ulRef.value.children[0].clientHeight
        //     if(!domHeight) return ''
        //     ulRef.value.style = `transform:translateY(${-curIndex.value*domHeight}px)`
        // }
        function selectSong(index) {
            store.commit("setIndex",index)
            scrollSong(index)
        }
        function scrollSong(index) {
            scrollRef.value.scroll.scrollToElement(curLisDom.value[index])
        }
        function isHasInFavoriteList(item){
            const result = favoriteList.value.findIndex(song=>song.mid==item.mid)
            return result !== -1
        }
        function toggleFavoriteStatus(song) {
            ctx.emit("toggleFavoriteStatus",song)
        }
        function delSong(song) {
            let timer = null
            if(timer) {
                return
            }
            store.dispatch('delSong',song)
            timer = setTimeout(() => {
                clearTimeout(timer)
            }, 300);

        }
        function openCofirm() {
            showConfirm.value = true
        }
        function delAll() {
            store.dispatch("clearPlayList")
            hide()
        }
        function hide() {
            showConfirm.value = false
        }
        return {
            playingList,
            close,
            playModeStyle,
            playModeName,
            togglePlayMode,
            curIndex,
            ulRef,
            selectSong,
            scrollRef,
            curLisDom,
            isHasInFavoriteList,
            toggleFavoriteStatus,
            delSong,
            showConfirm,
            openCofirm,
            delAll,
            hide
        }
    }
}
</script>
<style lang="scss" scoped>
.playerList {

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $color-background-d;
    z-index: 9999;
    .inner {

        .playerListInfo {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: $color-highlight-background;

            .header {
                width: 100%;
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 12px;
                box-sizing: border-box;
                font-size: $font-size-medium;
                color: $color-text-l;
                .playOperate {
                    display: flex;
                    align-items: center;
                    justify-content: space-between  ;
                    width: 90px;
                    margin-left: 12px;
                    .icon {
                        font-size: 24px;
                        color: $color-theme;
                    }
                }
            }
            .content {
                .songsWrapper {
                    max-height: 180px;
                    overflow: hidden;
                    .songsList {
                        .item {
                            height: 30px;
                            font-size: $font-size-medium;
                            color: $color-text-d;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 0 28px;
                            .icon {
                                width: 20px;
                                color: $color-theme;
                                i {
                                    width: 100%;
                                    font-size: 12px;
                                }
                            }
                            .name {
                                flex: 1;
                            }
                            .btn {
                                width: 50px;
                                display: flex;
                                justify-content: space-around;
                                color: $color-theme;
                                font-size: $font-size-small;
                            }
                        }
                    }
                }

                .addSongs {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 30px 0;
                    .addBtn {
                        height: 30px;
                        line-height: 30px;
                        border: 1px solid $color-text-l;
                        font-size: $font-size-small;
                        color: $color-text-l;
                        padding: 0 14px;
                        border-radius: 20px;
                    }
                }
                .close {
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    background-color: $color-background;
                    font-size: $font-size-medium-x;
                    color: $color-text-l;
                }
            }
        }

    }
}


</style>