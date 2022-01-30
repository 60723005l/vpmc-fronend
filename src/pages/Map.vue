<template>
    <div class="full-page col">
        <Banner/>
        <SubBanner/>
        <div class="body">
            <LeafletViewer
                :viewerContainer="containerId"
                :option="mapOption" 
                :measurement="measurementOptions"/>
            <WidgetSidebar/>
            <AppraisalAnalysisSidebar/>
            <StatsAndQuoteSidebar/>
            <!-- <Sidebar 
                :basemaps="basemaps"
                :side="'left'" 
                :open="$store.state.widgetSidebar.open"></Sidebar> -->
        </div>
        
        
    </div>
</template>
<script>
import LeafletViewer from "@/components/LeafletViewer"
import Banner from "@/components/Map/Banner"
import SubBanner from "@/components/Map/SubBanner"
// import Sidebar from "@/components/basicUI/Sidebar"
import projector, { EPSG } from '../VPMC/module/projector'
import TransactionDataStreaming from '../VPMC/module/TransactionDataStreaming'
import { Map } from "leaflet"

import api from "../api"
import Global from "../global"
import Layer, { LayerInfo } from "../VPMC/module/Layer"
import Type from '../VPMC/module/Layer/Type'

window.EPSG = EPSG
window.projector = projector

const readTransData = async () => {
    /**@type {Map} */
    const viewer = await Global.VPMC.asyncViewer
    const streaming = new TransactionDataStreaming(viewer, api.Transaction.getByExtent)
    streaming.start()
    // const rawDatas = api.Transaction.getByExtent({
    //     xmin: 0,
    //     xmax: 10000000,
    //     ymin: 0,
    //     ymax: 10000000
    // })
    // console.log(rawDatas)
}

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
            Global.VPMC.asyncViewer.then(viewer => {
                Global.VPMC.transactionDataStreaming.apiFactory = api.Transaction.getByExtent
                Global.VPMC.transactionDataStreaming.start()
            })
            
        },
    mounted()
        {            
            readTransData()
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
                this.$store.commit('widgetSidebar/open', false)
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
                let realEstateLayers = await api.Layer.getRealEstateLayers()
                this.addToMap(realEstateLayers, Type.GEOJSON_BUILDING)
                this.addToMap(basemaps, Type.WMTS)
                this.addToMap(geoLayers, Type.WMTS)

            },
            addToMap( rawLayers, type )
            {
                rawLayers.forEach( (layer, index) => {
                    let layerItem = new Layer( 
                        new LayerInfo({
                            name: layer.name,
                            group: layer.group,
                            type: type,
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
            WidgetSidebar: async () => import('../components/Map/WidgetSidebar/WidgetSidebar.vue'),
            AppraisalAnalysisSidebar: async () => import('../components/Map/AppraisalAnalysisSidebar/AppraisalAnalysisSidebar.vue'),
            StatsAndQuoteSidebar: async () => import('../components/Map/StatsAndQuoteSidebar/StatsAndQuoteSidebar.vue')
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