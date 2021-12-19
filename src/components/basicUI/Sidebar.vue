<template>
    <md-drawer class="sidebar-container" md-persistent="full" :md-right="side==='right'" :md-active="open">
        <div class="title-container">
            <div class="vpmc-title">{{title}}</div>
            <div class="action">
                <md-button class="md-icon-button"  @click="$emit('collapse')">
                    <md-icon>menu_open</md-icon>
                </md-button>
            </div>
        </div>
        <md-divider/>
        <slot></slot>
    </md-drawer>
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
            title:
            {
                type: String,
                default: ''
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
        }
}
</script>
<style lang="scss" scoped>
.sidebar-container{
    z-index: 1;
    max-width: 450px;
    min-width: 200px;
    width: auto;
    .title-container{
        display: flex;
        align-items: center;
        padding: 0px 10px;
        background-color: $vpmc-bg-title;
        .action{
            justify-content: end;
            display: flex;
            flex: 1;
        }
    }
}
</style>
<style scoped>

</style>
