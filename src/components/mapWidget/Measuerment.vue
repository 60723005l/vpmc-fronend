<template>
    <md-content class="measuer-widgit-contaner">
        <div class="header">
            <span class="close" @click="handleWindowClose">✖</span>
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
            <md-button class="md-default md-flat outline" @click="handleDrawCancle">
                <md-icon>block</md-icon>
            </md-button>
            <md-button class="md-default md-flat outline" @click.exact="handleMeasureClick" :disabled="active">
                <md-icon>add_circle_outline</md-icon>
            </md-button>
        </div>
        

    </md-content>
</template>
<script>
import Global from "../../global"
import {area, length} from "@turf/turf"
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
            this.handleDrawCancle()
            Global.VPMC.viewer.pm.getGeomanLayers().forEach( layer => 
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
                switch(this.measureMode.current) {
                    case 'area':
                        len = area(shape.layer.toGeoJSON())
                         result = len.toFixed(3) + ' m²'
                        break
                    case 'distance':
                        len = length(shape.layer.toGeoJSON(), 'kilometers')
                        result = len.toFixed(3) + ' km'
                        break
                }
                this.measures.push( { result, content: shape} )
                this.unListenMouseClick()

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
                
                this.handleDrawCancle()
                this.unListenMouseClick()
                this.active = false
                this.measureMode.current = mode; 
            },
            handleDrawCancle()
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
            handleResultClick( content )
            {
                Global.VPMC.viewer.flyToBounds(content.layer.getBounds())

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
        .close{
            padding: 0px 15px 0px 3px;
            cursor: pointer;
            &:hover {
                color: grey;
            }
        }
        .tabs{
            display: flex;
            .tab{
                // margin: 3px;
                padding: 0px 5px;
                cursor: pointer;
                transition: 0.3s all;
                &.active {
                    background: #1e88e5;
                }
                &:hover {
                    background: #1e88e5;
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