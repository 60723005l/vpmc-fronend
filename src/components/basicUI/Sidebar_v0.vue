<template>
    <md-drawer class="sidebar-container" md-persistent="full" :md-right="side==='right'" :md-active="open">
        <div class="title-container">
            <div class="vpmc-title">{{$store.state.widgetSidebar.current.title}}</div>
            <div class="action">
                <md-button class="md-icon-button"  @click="handleCollaps">
                    <md-icon>menu_open</md-icon>
                </md-button>
            </div>
        </div>
        <md-divider/>
        <keep-alive>
            <component :is="$store.state.widgetSidebar.current.value"></component>
        </keep-alive>
    </md-drawer>
</template>
<script>
import Layer from "@/components/Map/WidgetSidebar/Layer"
import Info from "@/components/Map/WidgetSidebar/Info"
import Geolocation from "@/components/Map/WidgetSidebar/Geolocation"
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
                // this.$emit('collapse')
                this.$store.commit('widgetSidebar/open', false)
            }
        },
    components: {
        Layer,
        Info,
        Geolocation,
    }
}
</script>
<style lang="scss" scoped>
.sidebar-container{
    z-index: 1;
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
