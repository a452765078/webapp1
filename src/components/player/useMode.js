import { watch, computed } from 'vue'
import constVar from '@/assets/constVar/index';
import { useStore } from 'vuex';
export default function () {
    //store
    const store = useStore()
    //computed
    const playMode = computed(() => store.state.playMode)
    const sequenceList = computed(() => store.state.sequenceList)
    //watch
    watch(playMode, (newVal) => {
        if (newVal == constVar.SEQUENCE) {
            store.dispatch('setSequenceList', sequenceList.value)
        } else if (newVal == constVar.RANDOM) {
            store.dispatch('setRandomList', sequenceList.value)
        }
    })
    //function
    function togglePlayMode() {
        store.dispatch('setPlayModeBySequence', playMode.value)
    }
    return {
        togglePlayMode
    }
}