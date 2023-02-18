<template>
    <div class="process">
        <div class="curProcessTime">{{ isChangeBar ? _formatToStr(parseInt(curTime)) :
                _formatToStr(parseInt(currentTime))
        }}
        </div>
        <div class="processInner" ref="processRef">
            <div class="processBar" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend"
                :style="offsetDistanceStyle"></div>
            <div class="curProcess" ref="curProcessRef"></div>
        </div>
        <div class="maxProcessTime">{{ _formatToStr(curPlaySong.duration) }}</div>
    </div>
</template>
<script>
import { formatToStr } from '@/assets/util/index'
export default {
    name: 'process',
    props: {
        currentTime: {
            type: Number, default: 0
        }
    },
    data() {
        return {
            pageX: 0,
            translateDis: 0,
            maxWidth: 0,
            process: 0,
            curTime: 0,
            isChangeBar: false,
            parentProcess: {},
            isEnd: false
        }
    },
    computed: {
        offsetDistanceStyle() {
            let translateDis = this.translateDis
            return `transform:translate3d(${translateDis}px,-50%,0)`
        },
        curPlaySong() {
            return this.$store.getters.getCurPlaySong
        },
    },
    mounted() {

    },
    watch: {
        process(process) {
            this.curTime = parseInt(this.curPlaySong.duration * process)
        },
        currentTime(newVal) {
            // console.log(newVal)
            let curPlaySong = this.curPlaySong
            this.process = newVal / curPlaySong.duration
            this.translateDis = this.$refs['processRef'].clientWidth * this.process
            this.$refs['curProcessRef'].style.width = `${this.translateDis}px`
        },
    },
    methods: {
        ontouchstart(e) {
            this.pageX = e.touches[0].pageX
            this.maxWidth = this.$refs['processRef'].clientWidth
        },
        ontouchmove(e) {
            let delta = e.touches[0].pageX - this.pageX
            let barWidth = this.barWidth = e.target.clientWidth
            this.translateDis = Math.min(this.maxWidth - barWidth, Math.max(this.translateDis + delta, 0))
            this.pageX = e.touches[0].pageX
            this.$refs['curProcessRef'].style.width = `${this.translateDis}px`
            //
            this.isChangeBar = true
            this.process = this.translateDis / (this.maxWidth - barWidth)
            this.$emit("onchangeBar", { changeBarStatus: true, curTime: this.curTime })
        },
        ontouchend(e) {
            this.$emit("onchangedBar", { changeBarStatus: false, curTime: this.curTime })
            this.isChangeBar = false
        },
        _formatToStr(val) {
            return formatToStr(val)
        }
    },
}
</script>
<style lang="scss" scoped>
.process {
    display: flex;
    padding: 10px 30px;
    justify-content: space-around;
    align-items: center;

    .curProcessTime {
        font-size: $font-size-medium;
        margin-right: 12px;
    }

    .processInner {
        width: 90%;
        height: 6px;
        background-color: $color-dialog-background;
        position: relative;
        display: flex;

        .processBar {
            width: 10px;
            height: 10px;
            background-color: $color-theme;
            border-radius: 50%;
            border: 3px solid $color-text;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate3d(0, -50%, 0);
        }

        .curProcess {
            width: 12px;
            background-color: $color-theme;
        }
    }

    .maxProcessTime {
        font-size: $font-size-medium;
        margin-left: 12px;
    }
}
</style>