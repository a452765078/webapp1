import { ref, watch, onMounted, nextTick } from 'vue'

export default function () {
    //var
    const middleLstyle = ref({})
    const middleRstyle = ref({})
    const offsetWidth = ref(0)
    const per = 0.3
    const pos = {}
    const curWillShow = ref('')
    const curView = ref('cd')
    //function
    function ontouchStart(e) {
        pos.pageX = e.touches[0].pageX
        pos.width = window.innerWidth
        pos.translateDis = 0
    }
    function ontouchMove(e) {
        // debugger
        pos.deltaX = e.touches[0].pageX - pos.pageX
        offsetWidth.value = Math.min(0, Math.min(-pos.width, offsetWidth.value + pos.deltaX))
        const deltaPer = Math.abs(offsetWidth.value) / pos.width
        const opacity = 1 - deltaPer
        middleLstyle.value = {
            opacity: opacity
        }
        middleRstyle.value = {
            transform: `translate3d(${offsetWidth.value}px,0,0)`
        }
        if (deltaPer > per) {
            curWillShow.value = curView.value === 'cd' ? 'lyric' : 'cd'
            console.log(curWillShow.value)
        }
        pos.pageX = e.touches[0].pageX
    }
    function ontouchEnd() {
        if (curWillShow.value === 'cd') {
            curView.value = 'cd'
            middleLstyle.value = {
                opacity: 1
            }
            middleRstyle.value = {
                transform: `translate3d(0px,0,0)`
            }
        } else {
            curView.value = 'lyric'
            middleLstyle.value = {
                opacity: 0
            }
            middleRstyle.value = {
                transform: `translate3d(${-pos.width}px,0,0)`
            }
        }
    }


    return {
        ontouchStart,
        ontouchMove,
        ontouchEnd,
        middleLstyle,
        middleRstyle
    }
}