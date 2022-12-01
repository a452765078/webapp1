<template>
    <div class="search-hot">
        <div class="search-hot-wrapper">
            <div class="search-hot-inner">
                <h4 class="title">热门搜索</h4>
                <ul>
                    <li v-for="keyword in hotKeywordList" :key="keyword.id" @click="selectKeyWord(keyword.key)">
                        <span>{{keyword.key}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import service from "@/service/getData"
export default {
    name: 'search-hot',
    data() {
        return {
            hotKeywordList:[]
        }
    },
    emits:['selectKey'],
    async created() {
        const res = await service.getHotKeys()
        this.hotKeywordList = res.hotKeys
    },
    methods: {
        selectKeyWord(key) {
            this.$emit("selectKey",key)
        }
    }
}
</script>
<style lang="scss" scoped>
.fl {
    float: left;
}
.clearfix::after {
    display: table;
    clear: both;
    content: ' ';
}
.search-hot {
    position: absolute;
    top: 40px;
    left: 0;
    .search-hot-wrapper {
        padding: 20px 15px 0 15px;
        .search-hot-inner {
            font-size: $font-size-medium;
            color: $color-text-d;
            .title {
                color: $color-text-l;
                margin-bottom: 8px;
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    margin-right: 18px;
                    margin-top: 12px;
                    span {
                        display: inline-block;
                        background-color: $color-highlight-background;
                        padding: 6px 10px;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
}
</style>