<template>
<div class="search">
    <searchBoxVue v-model="query"></searchBoxVue>
    <!-- search-result -->
    <search-result :query="query" v-show="query"></search-result>
</div>
</template>
<script>
import {ref} from 'vue';
import searchBoxVue from '@/components/search-1/search-box.vue';
import searchResult from '@/components/search-1/search-result.vue';
export default {
    name: 'search',
    components: {
        searchBoxVue,
        searchResult
    },
    setup() {
        const query = ref('')


        return {
            query
        }
    }
}
</script>
<style lang="scss">
.search {
    position: fixed;
    top: 80px;
    bottom: 0;
    width: 100%;

}

</style>