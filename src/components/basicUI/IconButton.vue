<template>
    
        <div class="icon-button" :style="cssProps" @click="handleClick">
            <md-ripple class="content">
                <div class="text" v-if="text">{{text}}</div>
                <img class="icon" :src="src"/>
            </md-ripple>
        </div>
    
    
</template>
<script>
export default {
    name:"IconButton",
    data()
        {
            return{
                
            }
        },
    props:
    {
        text: String,
        src:
        {
            type:String,
            default:'/static/icon/layer.png'
        },
        size:
        {
            type:Object,
            default: () =>
            {
                return {height: 30, width: 30}
            }
        }
    },
    computed:
        {
            cssProps()
            {
                return {
                    '--height': this.size.height + 'px',
                    '--width': this.size.width + 'px'
                }
            }
        },
    methods:
        {
            handleClick()
            {
                this.$emit('Click')
            }
        }
}
</script>
<style lang="scss" scoped>
.icon-button{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3px;
    min-height: var(--width);
    min-width: var(--width);
    cursor: pointer;
    .content{
        margin: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    &:hover{
        .text{
            font-weight: bolder;
        }
    }
    .text{
        color: $vpmc-color-primary;
        white-space: nowrap;
        font-size: 10px;
        transition: all 0.3s;
    }
    .icon{
        width: var(--width);
        // height: var(--height);
    }
}
</style>