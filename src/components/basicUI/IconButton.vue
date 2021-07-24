<template>
    <img class="icon" :src="src" :style="cssProps" @click="handleClick"/>
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
<style scoped>
.icon{
    width: var(--height);
    width: var(--width);
}
</style>