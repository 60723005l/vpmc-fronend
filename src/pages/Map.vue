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
        <div class="hidden"><CustomMapPopup /></div>
    </div>
</template>
<script>
import LeafletViewer from "@/components/LeafletViewer"
import Banner from "@/components/Map/Banner"
import SubBanner from "@/components/Map/SubBanner"
import projector, { EPSG } from '../VPMC/module/projector'

import api from "../api"
import Global from "../global"
import Layer, { LayerInfo } from "../VPMC/module/Layer"
import Type from '../VPMC/module/Layer/Type'
import Event from '../utilities/Event'
import CustomMapPopup from "../components/CustomMapPopup"


window.EPSG = EPSG
window.projector = projector
window.E = Event

export default {
    name: "Map",
    data()
        {
            return {
                containerId: process.env.CONTAINERID,
                mapOption: {},
                basemaps:[],
            }
        },
    created()
        {
            console.log(this)
            this.setDefaultLayers()
        },
    async mounted()
        {            
            await this.readTransData()
        },
    beforeDestroy () {
        if (Global.VPMC.transactionDataStreaming) {
            Global.VPMC.transactionDataStreaming.updateEvent.removeEventListener(handleStreamingUpdate)
        }
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
            async readTransData () {
                await Global.VPMC.asyncViewer
                const streaming = Global.VPMC.transactionDataStreaming
                streaming.apiFactory = api.Transaction.getByExtent
                streaming.updateEvent.addEventListener(this.handleStreamingUpdate)
                streaming.beforeUpdateEvent.addEventListener(this.handleStreamingBeforeUpdate)
                streaming.start()
                return streaming
            },
            handleStreamingBeforeUpdate: async () => {
                await Global.VPMC.asyncViewer
                Global.VPMC.transactionDataBufferQuery.createBufferGraphic(Global.VPMC.viewer.getCenter())
            },
            async handleStreamingUpdate (points) {
                await Global.VPMC.asyncViewer
                const bufferQuery = Global.VPMC.transactionDataBufferQuery
                const targetLayers = bufferQuery.query(points)
                const bus = this.$bus
                targetLayers.forEach(layer => {
                    layer.on('click', () => {
                        bus.$emit('map-popup:msg', layer)
                        layer.openPopup()
                    })
                })
            },
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
            CustomMapPopup,
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
.hidden{
    height: 0;
    width: 0;
    overflow: hidden;
}
</style>