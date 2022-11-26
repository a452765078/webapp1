import {watch,ref,computed} from 'vue'
import {useStore} from 'vuex'

export default function(playing) {
    const cdInnerRef = ref(null)
    const cdImgRef = ref(null)

    const playingStyle = computed(() => {
        return playing.value?'playing':''
    })

    watch(playing,(newVal)=>{
        if(!newVal) {
            const innerTransform = getComputedStyle(cdInnerRef.value).transform
            const imgTransform = getComputedStyle(cdImgRef.value).transform
            cdInnerRef.value.style.transform = innerTransform == 'none'?imgTransform:innerTransform.concat(' ',imgTransform) //不太明白，需要深究
        }
    })


    return {
        cdInnerRef,
        cdImgRef,
        playingStyle
    }
}