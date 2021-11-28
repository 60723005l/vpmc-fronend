<template>
    <div class="full-page col">
        <Banner/>
        <SubBanner/>
        <div class="body">
            <LeafletViewer
                :viewerContainer="containerId"
                :option="mapOption" 
                :measurement="measurementOptions"/>
            <Sidebar 
                :basemaps="basemaps"
                :side="'left'" 
                :open="$store.state.subbanner.open"></Sidebar>
        </div>
        
        
    </div>
</template>
<script>
import LeafletViewer from "@/components/LeafletViewer"
import Banner from "@/components/Map/Banner"
import SubBanner from "@/components/Map/SubBanner"
import Sidebar from "@/components/basicUI/Sidebar"

import api from "../api"
import Global from "../global"
import Layer, { LayerInfo } from "../VPMC/module/Layer"
import Type from '../VPMC/module/Layer/Type'

export default {
    name: "Map",
    data()
        {
            return {
                containerId: process.env.CONTAINERID,
                mapOption: {},
                basemaps:[]
            }
        },
    created()
        {
            this.setDefaultLayers()
        },
    mounted()
        {            
            
        },
    computed:
        {
            measurementOptions(){
                    return{
                        activate: this.$store.state.measurement.activate,
                        onToggle: this.onMeasuerWindowToggle
                    }
                }
        },
    methods:
        {
            handleCollaps()
            {
                this.$store.commit('subbanner/open', false)
            },
            onMeasuerWindowToggle( )
            {
                this.$store.commit('measurement/toggle')
                this.measurementOptions.activate = this.$store.state.measurement.activate
                // this.measurementOptions.activate = !this.measurementOptions.activate
            },
            async setDefaultLayers()
            {
                let basemaps = await api.Layer.getBasemaps()
                let geoLayers = await api.Layer.getGeoLayers()
                this.addToMap(basemaps)
                this.addToMap(geoLayers)
            },
            addToMap( rawLayers )
            {
                rawLayers.forEach( (layer, index) => {
                    let layerItem = new Layer( 
                        new LayerInfo({
                            name: layer.name,
                            group: layer.group,
                            type: Type.WMTS,
                            options: { url: layer.url }
                        })
                    )
                    
                    Global.VPMC.viewerPromise.execute( viewer => 
                    {
                        layerItem.addToMap(viewer)
                        .addToControler( Global.VPMC.layerControl )
                        layerItem.show = false
                    })
                    
                })
                this.basemaps = Global.VPMC.layerControl.layerInfos
            },
        },
    components:
        {
            LeafletViewer,
            Banner,
            SubBanner,
            Sidebar,
            //----------------
            // Layer,
            // Info,
            // Geolocation,

        }            
}
</script>
<style scoped>
.full-page{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: antiquewhite;
    overflow: hidden;
}
.header{
    background:#1e1e23;
    /* min-height: 70px; */
}
.header-menu-holder{
    background: #41b883;
    padding: 10px;
    margin-top: -1px;
}
.body{
    background: cadetblue;
    height: 100%;
    position: relative;
}
</style>