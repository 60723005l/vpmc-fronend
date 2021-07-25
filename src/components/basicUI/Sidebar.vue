<template>
    <div class="sidebar-container" :class="{close: !open}" :style="cssProps">
        <div class="collapse" @click="handleCollaps">➥</div>
        <slot name='tabs'></slot>
        <slot name='body'></slot>
    </div>
</template>
<script>
export default {
    name:"Sidebar",
    props:
        {
            open:
            {
                type: Boolean,
                default: false
            },
            side:{
                type: String,
                default: () =>
                {
                    return 'left'
                },
                validator: function (value) {
                    return ['left', 'right'].indexOf(value) !== -1
                }
            }
        },
    computed:
        {
            cssProps()
            {
                let left, right
                if(this.side === 'left')
                {
                    left = '0px',
                    right = 'none'
                }
                else
                {
                    left = 'none',
                    right = '0px'
                }
                return {"--left":left, "--right": right}
            }
        },
    methods:
        {
            handleCollaps()
            {
                this.$emit('collapse')
            }
        }
}
</script>
<style scoped>
.sidebar-container{
    position: absolute;
    left: var(--left);
    right: var(--right);
    top: 0px;
    background: #ffffffc7;
    height: 100%;
    min-width: 300px;
    width: auto;
    z-index: 1000;
    transition: 0.3s all;
}
.sidebar-container.close{
    min-width: 0px;
    width: 0px;
}
.sidebar-container.close .collapse{
    display: none;
}
.collapse{
    font-size: 20px;
    position: absolute;
    top: 0px;
    left: -26px;
    background: #0e3c63;
    color: white;
    padding: 0px 3px;
    cursor: pointer;
}
</style>
