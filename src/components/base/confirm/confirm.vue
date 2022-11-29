<template>
<Teleport to="body">
    <div class="confirmWrapper">
        <div class="confirm">
            <div class="confirmInner">
                <div class="content">{{content}}</div>
                <div class="btn">
                    <div class="confirmBtn" @click.stop="confirm">{{confirmBtnContent}}</div>
                    <div class="cancelBtn" @click.stop="cancel">{{cancelBtnContent}}</div>
                </div>
            </div>
        </div>
    </div>
</Teleport>
</template>
<script>
export default {
    name: 'confirm',
    props: {
        content: {
            type:String,default(){return'是否清空播放列表'}
        },
        confirmBtnContent: {type:String,default:'清空'},
        cancelBtnContent: {type:String,default:'取消'}
    },
    emits:['confirm','cancel'],
    methods: {
        confirm() {
            this.$emit("confirm")
        },
        cancel() {
            this.$emit("cancel")
        }
    }
}
</script>
<style lang="scss">
.confirmWrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: $color-background-d;
    z-index: 9999;
    .confirm {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: $color-highlight-background;
        border-radius: 10px;
        color: $color-text-l;
        font-size: $font-size-large;
        .confirmInner {
            width: 250px;
            .content {
                height: 60px;
                border-bottom: 1px solid $color-background;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .btn {
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .confirmBtn {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid $color-background;
                    color: $color-text;
                }
                .cancelBtn {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}

</style>