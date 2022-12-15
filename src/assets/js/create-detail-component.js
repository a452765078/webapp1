import service from '@/service/getData';
import { getItem } from '@/store/storage';
import { onMounted, ref } from 'vue';
export default function () {
    const singer = ref({})
    const songs = ref([])
    const loading = ref(true)

    onMounted(async () => {
        singer.value = getItem("singer")
        const res = await service.getSingerDetail(singer.value)
        await service.getSongsUrl(res.songs)  //songs是引用类型，不需要返回
        songs.value = res.songs
        loading.value = false
    })
    return {
        singer,
        songs,
        loading
    }
}