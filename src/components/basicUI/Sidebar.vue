<template>
    <md-drawer md-persistent="full" :md-right="side==='right'" :md-active="open">
        <md-button class="md-icon-button"  @click="handleCollaps">
            <md-icon>menu_open</md-icon>
        </md-button>
        <md-divider/>
        <template>
            <component :is="$store.state.subbanner.current.value"></component>
        </template>
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
