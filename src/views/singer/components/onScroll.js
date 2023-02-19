import { onMounted, ref, computed, watch, nextTick } from "vue";
import { createScrollPos } from "@/components/scroll/scrollPos";
export default function (singers) {
  const scrollRef = ref(null);
  const bs = ref(null);
  //初始化
  const singerGroupRef = ref(null);
  const singerGroupHeights = ref([]);
  //滑动之后联动的数据
  const curActiveIndex = ref(0);
  const titleMoveDistance = ref(0);
  const titleTranslate = ref(0);
  const titleHeight = 30;
  //computed
  const curActiveTitle = computed(() => {
    if (singers.value.length === 0) return "";
    return singers.value[curActiveIndex.value].title;
  });
  const moveStyle = computed(() => {
    return {
      position: "absolute",
      top: `${titleMoveDistance.value}px`,
      left: 0,
      transform: `translateY(-${titleTranslate.value}px)`,
    };
  });
  //hooks
  onMounted(async () => {
    bs.value = createScrollPos(scrollRef.value);
    bs.value.on("scroll", _getPosY);
  });

  //watch
  watch(singers, async (newVal) => {
    //使用watch是为了解耦，适应更多情况。比如初次获取数据、下拉刷新
    await nextTick(); //dom渲染完成才能计算高度
    _calDomHeight(singerGroupRef);
  });

  //function
  const _calDomHeight = (singerGroupRef) => {
    const singerGroupVal = singerGroupRef.value;
    const startHeight = 0;
    let cumHeight = 0;
    singerGroupHeights.value.push(startHeight);
    for (let i = 0; i < singerGroupVal.length; i++) {
      cumHeight += singerGroupVal[i].clientHeight;
      singerGroupHeights.value.push(cumHeight);
    }
  };

  const _getPosY = (pos) => {
    _updateCurActiveIndexAndStyle(-pos.y); //这里要取反
  };

  const _updateCurActiveIndexAndStyle = (val) => {
    const singerGroupHeightsVal = singerGroupHeights.value;
    for (let i = 0; i < singerGroupHeightsVal.length - 1; i++) {
      if (
        val >= singerGroupHeightsVal[i] &&
        val < singerGroupHeightsVal[i + 1]
      ) {
        curActiveIndex.value = i;
        titleMoveDistance.value = val;
        titleTranslate.value =
          singerGroupHeightsVal[i + 1] - val < titleHeight
            ? titleHeight - (singerGroupHeightsVal[i + 1] - val)
            : 0;
        break;
      }
    }
  };

  return {
    scrollRef,
    singerGroupRef,
    curActiveIndex,
    curActiveTitle,
    moveStyle,
    bs,
  };
}
