<template>
    <md-drawer class="sidebar-container" md-persistent="full" :md-right="side==='right'" :md-active="open">
        <md-button class="md-icon-button"  @click="handleCollaps">
            <md-icon>menu_open</md-icon>
        </md-button>
        <md-divider/>
        <keep-alive>
            <component :is="$store.state.subbanner.current.value"></component>
        </keep-alive>
    </md-drawer>
</template>
<script>
import Layer from "@/components/Map/Sidebar/Layer"
import Info from "@/components/Map/Sidebar/Info"
import Geolocation from "@/components/Map/Sidebar/Geolocation"
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
                this.$store.commit('subbanner/open', false)
            }
        },
    components: {
        Layer,
        Info,
        Geolocation,
    }
}
</script>
<style scoped>
.sidebar-container{
    z-index: 1;
}
</style>
