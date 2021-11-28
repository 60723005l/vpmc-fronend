<template>
    <div>
        <md-list :md-expand-single="false">
            <LayerList v-for="(group, name) in groupedLayers" :key="name"
                :values="group" :groupName="name" :action="action"/>
            <!-- <LayerList :values="basemaps" :groupName="'底圖'" :action="action"/> -->
        </md-list>
        <OpacityPanel 
            v-if="opacityPanel.layerInfo"
            :active="opacityPanel.show"
            :layerInfo="opacityPanel.layerInfo"/>
    </div>
    
</template>
<script>
import LayerList from "./Layer/LayerList.vue"
import OpacityPanel from "./Layer/OpacityPanel.vue"
import { groupBy } from 'lodash'
import Leaflet from "leaflet"

import Global from "../../../global"
import Layer, { LayerInfo } from "../../../VPMC/module/Layer"

export default {
    name:"Layer",
    data: () => ({
        groupedLayers: {},
        action: {},
        opacityPanel: {
            initvalue: "",
            show: false,
            layerInfo: undefined
        }
    }),
    components:
        {
            LayerList,
            OpacityPanel
        },
    created()
        {
            this.action = {
                onLayerCheck: this.onLayerCheck,
                openOpacityPanel: this.openOpacityPanel
            }
        },
    mounted()
        {
            this.setLayerList()
        },
    methods:
        {
            setLayerList()
            {
                let layerControl = Global.VPMC.layerControl
                this.groupedLayers = groupBy(layerControl.layerInfos, (value)=> value.group )
            },
            onLayerCheck( checked, layer )
            {
                let layerControl = Global.VPMC.layerControl
                let layerItem = layerControl.get( layer )
                layerItem.show = checked
                layerItem.zIndex = layer.zIndex
                layerControl.setLayerList()

            },
            /**
             * @param {LayerInfo} layerInfo
             */
            openOpacityPanel(layerInfo)
            {
                this.opacityPanel.show = true
                this.opacityPanel.layerInfo = layerInfo
            },
        }
}
</script>