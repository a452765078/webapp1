import {ref,onMounted,nextTick,watch,computed,getCurrentInstance} from 'vue'


export default function(singers) {
    const singerGroupRef = ref(null)
    const singerGroupHeights = ref([])
    const posY = ref(0)
    const curIndex = ref(0)
    const posDistance = ref(0)
    const titleHeight = 30
    const transformDistance = ref(0)

    let curTitile = computed(()=>{
        if(!singers.value||singers.value.concat().length==0) {
            return ''
        }
        return singers.value[curIndex.value].title
    })

    let curPosStyle = computed(()=>{
        return `top:${posDistance.value}px;transform:translateY(${-transformDistance.value}px)`
    })

    watch(singers,async() => {
        await nextTick()
        calculateHeight(singerGroupRef)
    })

    watch(posY,(newVal) => {
        const singerGroupHeightsVal = singerGroupHeights.value
        for(let i=0;i<singerGroupHeightsVal.length-1;i++) {
            if(newVal>=singerGroupHeightsVal[i]&&newVal<singerGroupHeightsVal[i+1]) {
                curIndex.value = i
                posDistance.value = newVal
                transformDistance.value = (singerGroupHeightsVal[i+1] - newVal) < titleHeight?titleHeight- (singerGroupHeightsVal[i+1] - newVal):0
                break
            }
        }
    })



    function calculateHeight(singerGroupRef) {
        const singerGroupVal = singerGroupRef.value
        const startHeight = 0
        let cumHeight = 0
        singerGroupHeights.value.push(startHeight)
        for(let i=0;i<singerGroupVal.length;i++) {
            cumHeight += singerGroupVal[i].clientHeight
            singerGroupHeights.value.push(cumHeight)
        }
    }

    function getPosY(val) {
        posY.value = -val
    }

    return {
        singerGroupRef,
        getPosY,
        curIndex,
        curTitile,
        curPosStyle
    }
}