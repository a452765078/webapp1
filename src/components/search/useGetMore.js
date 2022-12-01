import { ref,watch,nextTick,onMounted,onUnmounted,onUpdated,computed} from 'vue';

export default function(props,emit) {
    //var
    const busy = ref(false)
    //computed 
    const dataCount = computed(()=>{return props.singerList.length+props.songsList.length})
    //watch
    watch(dataCount,(newVal)=>{  
        if(newVal<20) {
            getMore()
        }
    })

    //hook
    onMounted(()=>{
        window.addEventListener('scroll',scrollBottom)
    })

    onUnmounted(()=>{
        window.removeEventListener("scroll",scrollBottom)
    })

    //function 
    function getMore() {
        emit("getMore")
    }
    function scrollBottom() {
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset;
        let clientHeight = document.documentElement.clientHeight || window.innerHeight;
        let scrollBottom = scrollHeight - scrollTop - clientHeight;
        if(scrollBottom < 250&&!busy.value) {
            getMore()
            busy.value  = false
        }
    }
    return {

    }

}

