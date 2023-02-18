import { ref, watch, onMounted, nextTick } from 'vue'

export default function (cdMiddleRef, cdWrapperRef) {
    //var
    const deltaX = ref(0)
    const deltaY = ref(0)
    const translateDis = ref(0)
    const lastEndTranslateDis = ref(0)
    const startPageX = ref(0)
    const startPageY = ref(0)
    const maxMovedis = ref(0)
    const childrenNum = ref(0)
    const RATE = 0.5
    const rollDer = ref('')
    const middleLstyle = ref('')
    const middleRstyle = ref('')
    //function
    function ontouchStart(e) {
        // debugger
        maxMovedis.value = cdWrapperRef.value.clientWidth
        childrenNum.value = cdMiddleRef.value.children.length
        startPageX.value = e.touches[0].pageX
        startPageY.value = e.touches[0].pageY
    }
    function ontouchMove(e) {
        // debugger
        deltaX.value = e.touches[0].pageX - startPageX.value
        deltaY.value = e.touches[0].pageY - startPageY.value
        const absDeltaX = Math.abs(deltaX.value)
        const absDeltaY = Math.abs(deltaY.value)
        rollDer.value = absDeltaX > absDeltaY ? 'h' : 'v'
        if (rollDer.value == 'h') {
            // translateDis.value = deltaX.value + translateDis.value
            translateDis.value = Math.min(0, Math.max(-(childrenNum.value - 1) * maxMovedis.value, deltaX.value + translateDis.value))
            translateDom(translateDis.value)
        }
        startPageX.value = e.touches[0].pageX
        startPageY.value = e.touches[0].pageY
    }
    function ontouchEnd() {
        debugger
        let translateDelta = translateDis.value - lastEndTranslateDis.value
        if (isLessRate(translateDelta)) {
            let plusAndMinus = isIndexIncrease(translateDelta) ? -1 : 1  //判断索引索引是递增还是递减
            translateDis.value = maxMovedis.value * plusAndMinus + lastEndTranslateDis.value  //判断基于之前的位置移动
            if (!isInOfBounds(translateDis.value)) {
                resetPos()
                return
            }
            lastEndTranslateDis.value = translateDis.value //下一次移动时会基于上一次判断
            translateDom(translateDis.value)
        } else {
            resetPos()
        }
    }

    function resetPos() {
        translateDis.value = lastEndTranslateDis.value  //没达到最小移动范围回到上一次移动的位置
        middleRstyle.value = {
            transform: `translate3d(${translateDis.value}px,0px,1px)`,
        }
        middleLstyle.value = {
            opacity: 0
        }
    }

    function isLessRate(val) {//判断移动距离是否大于最小距离
        return Math.abs(val) > Math.abs(maxMovedis.value * RATE)
    }
    function isIndexIncrease(translateDis) { //判断索引是递增还是递减
        return -translateDis > 0
    }
    function isInOfBounds(val) { //是否在边界外
        // debugger
        let maxBounds = 0
        let minBounds = -cdMiddleRef.value.children.length * cdWrapperRef.value.clientWidth
        return val > minBounds && val <= maxBounds
    }

    function translateDom(distance) {
        middleLstyle.value = {
            opacity: 0
        }
        middleRstyle.value = {
            transform: `translate3d(${distance}px,0px,1px)`,
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