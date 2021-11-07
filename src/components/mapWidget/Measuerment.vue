<template>
    <md-content class="measuer-widgit-contaner">
        <div class="header">
            <span class="close" @click="handleWindowClose">✖</span>
            <div class="title">測量</div>
        </div>
        <div class="tab-container">
            <div class="tabs" v-for="(mode, index) in measureMode.modes" :key="index">
                <md-ripple>
                <div 
                    class="tab"
                    :class="{active: mode.value === measureMode.current}" 
                    @click="handleModeChange(mode.value)"
                >{{mode.name}}
                </div>
                </md-ripple>
            </div>
        </div>
        <md-divider />
        <div class="content md-dense">
            <div class="md-subhead">測量結果</div>
            <div class="results">
                <md-ripple class="result-item" v-for="(item, index) in measures" :key="index" >
                    <span @click="handleResultClick(item.content)">{{item.result}}</span>
                </md-ripple>
            </div>
        </div>
        <md-divider />
        <div class="action">
            <md-button class="md-default md-flat outline" @click="handleDrawCancleOrClearResults">
                <span>清除</span>
                <md-icon>block</md-icon>
            </md-button>
            <md-button class="md-default md-flat outline" @click.exact="handleMeasureClick" :disabled="active">
                <span>新增</span>
                <md-icon>add_circle_outline</md-icon>
            </md-button>
        </div>
        

    </md-content>
</template>
<script>
import Global from "../../global"
import {area, length} from "@turf/turf"
import Leaflet from 'leaflet'
let viewer


class MeasureMode {
    constructor() {
        this._current = "area"
        this.modes = [
            {name: "面積", value: "area"},
            {name: "距離", value: "distance"}
        ]
        this.calculates = []
    }
    get current() { return this._current }
    set current( val ) {
        this._current = val
    }

}

export default {
    name: "Measuerment",
    data()
        {
            return{
                active: false,
                measureMode: new MeasureMode(),
                measures:[]
            }
        },
    beforeDestroy()
        {
            this.handleDrawCancleOrClearResults()
            this.unListenMouseClick()
        },
    mounted()
        {
            
        },
    methods:
        {
            handleWindowClose()
            {
                this.$emit('onClose')
            },
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
                if(this.active) {
                   viewer.off('pm:drawstart', this.handleActiveState);
                    viewer.off('pm:create', this.handleDrawEnd ); 
                }
                
            },
            handleActiveState()
            {
                switch(this.measureMode.current) {
                    case 'area':
                        this.active = viewer.pm.Draw.Polygon.enabled()
                        break
                    case 'distance':
                        this.active = viewer.pm.Draw.Line.enabled()
                        break
                }
                
            },
            handleDrawEnd(shape)
            {
                this.active = false
                let result = ''
                let len = undefined
                let label
                let lastPoint
                switch(this.measureMode.current) {
                    case 'area':
                        console.log(shape)
                        lastPoint = shape.marker.getLatLngs()[0][0]
                        len = area(shape.layer.toGeoJSON())
                        result = len.toFixed(3) + ' m²'
                        label = this.createLabel(lastPoint, result)
                        break
                    case 'distance':
                        console.log(shape)
                        lastPoint = shape.marker.getLatLngs()[0]
                        len = length(shape.layer.toGeoJSON(), {units: 'kilometers'})
                        result = (len * 1000).toFixed(3) + ' m'
                        label = this.createLabel(lastPoint, result)
                        break
                }
                this.measures.push( { result, content: shape, label} )
                this.unListenMouseClick()
            },
            createLabel(point, text)
            {
                const popup = Leaflet.popup({
                        keepInView:true, 
                        closeButton:false,
                        autoClose: false,
                        closeOnClick: false,
                        autoPan: false
                    })
                    .setLatLng(point)
                    .setContent(`<p>${text}</p>`)
                Global.VPMC.viewer.addLayer(popup)
                return popup
            },
            handleMeasureClick()
            {
                this.listenMouseClick()
                switch(this.measureMode.current) {
                    case 'area':
                         viewer.pm.Draw.Polygon.enable()
                        break
                    case 'distance':
                        viewer.pm.Draw.Line.enable()
                        break
                } 
            },
            handleModeChange( mode )
            {
                
                this.cancleDrawing()
                this.unListenMouseClick()
                this.active = false
                this.measureMode.current = mode; 
            },
            handleDrawCancleOrClearResults()
            {
                if(this.active){
                    this.cancleDrawing()
                } else {
                    this.clearResults()
                }
            },
            cancleDrawing()
            {
                if(this.active){
                    switch(this.measureMode.current) {
                    case 'area':
                        viewer.pm.Draw.Polygon.disable()
                        break
                    case 'distance':
                        viewer.pm.Draw.Line.disable()
                        break
                    } 
                }
            },
            clearResults() 
            {
                if (this.active) return
                this.removeDrewShape()
                this.measures = []
            },
            handleResultClick( content )
            {
                console.log(content.layer.getBounds())
                const bound = content.layer.getBounds()
                Global.VPMC.viewer.flyToBounds(bound, {padding: Leaflet.point(100, 100)})
            },
            removeDrewShape()
            {
                Global.VPMC.viewer.pm.getGeomanLayers().forEach( layer => 
                {
                    viewer.removeLayer(layer)
                })
                this.measures.forEach( measure => {
                    Global.VPMC.viewer.removeLayer(measure.label)
                })
            }
        }
}
</script>
<style lang="scss" scoped>
.measuer-widgit-contaner{
    position: absolute;
    top: 10px;
    right: 10px;
    min-width: 200px;
    min-height: 100px;
    // transform: translate(-50%, 0px);
    z-index: 500;
    display: flex;
    flex-direction: column;
    cursor: auto;
    // padding: 3px;
    .header{
        display: flex;
        padding: 5px;
        align-items: center;
        background-color: $vpmc-bg-title;
        .title{
            display: flex;
            justify-content: center;
            flex: 1;
            color: white;
            font-weight: bolder;
        }
        .close{
            padding: 0px 15px 0px 3px;
            cursor: pointer;
            &:hover {
                color: grey;
            }
        }
        
    }
    .tab-container{
        display: flex;
        justify-content: center;
        background-color: $vpmc-bg-subtitle;
        .tabs{
            display: flex;
            flex: 1;
            text-align: center;
            .tab{
                // margin: 3px;
                padding: 0px 5px;
                cursor: pointer;
                transition: 0.3s all;
                border-bottom: 1px solid $vpmc-bg-subtitle;
                color: white;
                &.active {
                    border-bottom: 1px solid white;
                    font-weight: bolder;
                }
                &:hover {
                    font-weight: bolder;
                }
            }
        }
    }
    .content{
        
        margin: 5px;
        .results{
            display: flex;
            flex-direction: column;
            margin: 5px;
            max-height: 200px;
            overflow: auto;
            .result-item{
                cursor: pointer;
                span{
                    display: flex;
                }
            }
        }
    }
    .action{
        display: flex;
        justify-content: flex-end;
        // transform: scale(0.7);
        .outline{
            // border: 1px solid #1e88e5;
        }
    }
}
</style>