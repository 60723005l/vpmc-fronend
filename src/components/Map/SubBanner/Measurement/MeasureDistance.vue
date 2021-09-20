<template>
    <div class="col">
        <button @click="handleMeasureClick" :disabled="active">新增測量</button>
        <div class="result col">
            MeasureDistance
            <span v-for="(item, index) in measures" :key="index">
                {{item}}
            </span>
        </div>
    </div>
</template>
<script>
import Global from "../../../../global"
import {length} from "@turf/turf"

let viewer
export default {
    name:"MeasureDistance",
    data()
        {
            return{
                active: false,
                measures:[]
            }
        },
    beforeDestroy()
        {
            viewer.pm.Draw.Line.disable()
            viewer.pm.getGeomanLayers().forEach( layer => 
            {
                viewer.removeLayer(layer)
            })
            this.unListenMouseClick()
        },
    mounted()
        {
            viewer = Global.VPMC.viewer
            this.listenMouseClick()
        },
    methods:
        {
            listenMouseClick()
            {
                viewer.on('pm:drawstart', this.handleActiveState);
                viewer.on('pm:create', this.handleDrawEnd);
            },
            unListenMouseClick()
            {
                viewer.off('pm:drawstart', this.handleActiveState);
                viewer.off('pm:create', this.handleDrawEnd );
            },
            handleActiveState()
            {
                this.active = viewer.pm.Draw.Line.enabled()
            },
            handleDrawEnd(shape)
            {
                this.active = false
                let len = length(shape.layer.toGeoJSON(), 'kilometers')
                this.measures.push(len.toFixed(3) + 'km')
            },
            handleMeasureClick()
            {
                viewer.pm.Draw.Line.enable()
            }
        }
}
</script>