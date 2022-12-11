<template>
<!-- search-box -->
<div class="search-box-wrapper">
    <div class="search-box-inner">
        <i class="icon-search icon"></i>
        <input type="text" placeholder="搜索歌曲、歌手" class="text" v-model="query">
        <i class="icon-dismiss icon" @click="clear" v-show="query"></i>
    </div>
</div>
</template>
<script>
import { debounce } from 'throttle-debounce';
import {ref,watch} from 'vue'
export default {
    name: 'serach-box',
    props:{
        modelValue:String,
    },
    emits: ['update:modelValue'],
    setup(props,{emit}) {
        const query = ref(props.modelValue)
        //watch
        watch(query,debounce(500,(newVal)=>{
                emit('update:modelValue',newVal)
            })
        )
        watch(()=>props.modelValue,(newVal)=>{
            query.value = newVal
        })

        //function
        function clear() {
            query.value = ''
        }

        return {
            query,
            clear
        }
    }
}
</script>
<style lang="scss" scoped>
.search-box-wrapper {
    padding: 20px;
    box-sizing: border-box;
    .search-box-inner{
        background-color: $color-highlight-background;
        border-radius: 5px;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 2px 8px;
        .icon-search {
            font-size: 22px;
            color: $color-text-l;
        }
        .icon-dismiss {
            color: $color-text-l;
        }
        .text {
            flex: 1;
            background-color: $color-highlight-background;
            outline: none;
            color: $color-text;
            font-size: $font-size-medium;
        }
    }
}
</style>