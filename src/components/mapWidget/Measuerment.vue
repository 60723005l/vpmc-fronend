<template>
    <md-content class="measuer-widgit-contaner">
        <div class="header">
            <span class="close">✖</span>
            <div class="tabs">
                <div class="tab">面積</div>
                <div class="tab">距離</div>
            </div>
        </div>
        <md-divider />
        <div class="content">
            <md-button class="md-icon-button" @click.exact="handleMeasureClick" :disabled="active">
                <md-icon>add</md-icon>
            </md-button>
        </div>
        

        

    </md-content>
</template>
<script>
import Global from "../../global"
import {area} from "@turf/turf"
let viewer

export default {
    name: "Measuerment",
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
            
        },
    methods:
        {
            listenMouseClick()
            {
                Global.VPMC.viewerPromise.execute( p_viewer => {
                    p_viewer.on('pm:drawstart', this.handleActiveState);
                    p_viewer.on('pm:create', this.handleDrawEnd);
                    viewer = Global.VPMC.viewer
                })
                
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
            this.unListenMouseClick()

            },
            handleMeasureClick()
            {
            this.listenMouseClick()

                viewer.pm.Draw.Polygon.enable()
            }
        }
}
</script>
<style lang="scss" scoped>
.measuer-widgit-contaner{
    position: absolute;
    top: 10px;
    left: 50%;
    min-width: 100px;
    min-height: 100px;
    transform: translate(-50%, 0px);
    z-index: 500;
    display: flex;
    flex-direction: column;
    cursor: auto;
    padding: 3px;
    .header{
        display: flex;
        padding: 5px;
        align-items: center;
        .close{
            padding: 0px 10px 0px 0px;
            cursor: pointer;
            &:hover {
                color: grey;
            }
        }
        .tabs{
            display: flex;
            .tab{
                margin: 3px;
                padding: 0px 5px;
                cursor: pointer;
                &.active {
                    background: #1e88e5;
                }
                &:hover {
                    background: #1e88e56b;
                }
            }
        }
    }
    .content{
        margin: 5px;
    }
}
</style>