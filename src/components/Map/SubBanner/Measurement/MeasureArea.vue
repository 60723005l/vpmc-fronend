<template>
    <div class="col">
        <button @click="handleMeasureClick" :disabled="active">新增測量</button>
        <div class="result col">
            MeasureArea
            <span v-for="(item, index) in measures" :key="index">
                {{item}}
            </span>
        </div>
    </div>
</template>
<script>
import Global from "../../../../global"
import {area} from "@turf/turf"

let viewer
export default {
    name:"MeasureArea",
    data()
        {
            return{
                active: false,
                measures:[]
            }
        },
    beforeDestroy()
        {
            viewer.pm.Draw.Polygon.disable()
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
                this.active = viewer.pm.Draw.Polygon.enabled()
            },
            handleDrawEnd(shape)
            {
                this.active = false
                let len = area(shape.layer.toGeoJSON())
                this.measures.push(len.toFixed(3) + 'm^2')
            },
            handleMeasureClick()
            {
                viewer.pm.Draw.Polygon.enable()
            }
        }
}
</script>