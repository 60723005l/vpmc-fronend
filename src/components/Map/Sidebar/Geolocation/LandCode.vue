<template>
    <div class="md-layout container">
        <md-card  class="md-layout-item">
            <md-card-content>
                <md-field >
                    <label >輸入地號</label>
                    <md-input v-model="landNum" placeholder="臺北市華興段三小段142號"></md-input>
                </md-field>
            </md-card-content>
            
            <md-card-actions>
                <md-button class="vpmc-btn" @click="handleClear">清除</md-button>
                <md-button class="vpmc-btn" @click="handleSearchClick">查詢</md-button>
            </md-card-actions>
        </md-card>
        <md-list class="search-list" v-if="search.show">
            <md-subheader>查詢結果</md-subheader>
            <md-list-item v-for="(target, index) in search.results" :key="index" @click="handleSearchResultClick(target)">
                <span class="md-list-item-text">{{target.title}}</span>
            </md-list-item>
        </md-list>
    </div>
</template>
<script>
import api from "../../../../api"
import Global from "../../../../global"
import Leaflet from 'leaflet'
import { jsonView } from "../../../../utilities"

export default {
    name:"LandCode",
    data: () => ({
        landNum:'臺北市華興段三小段142號',
        search: {
            results:[],
            show: false
        }
    }),
    beforeDestroy()
        {
            this.handleClear()
        },
    methods:
        {
            async handleSearchClick()
            {
                this.handleClear()
                let geojson = await api.Location.getGeomByLands({ "lands[]": this.landNum })
                this.search.results = this.createGeometry(geojson)
                this.search.show = true

            },
            handleClear()
            {
                this.search.results.forEach( result => {
                    Global.VPMC.viewer.removeLayer( result.content )
                })
                this.search.results = []
                this.search.show = false
            },
            createGeometry(geojson)
            {
                return geojson.features.map( feature => {
                    let geojsonLayer = Leaflet.geoJSON( {
                        type: "FeatureCollection",
                        features: [feature]
                    })
                    geojsonLayer.bindPopup( jsonView.singlePackToTable(feature.properties) )
                    geojsonLayer.on( 'click', e => {
                        let properties = e.layer.feature.properties
                        this.$store.commit('subbanner/setPayload', {key: "Info", payload: {properties}})
                    } )
                    Global.VPMC.viewer.addLayer( geojsonLayer)
                    return {
                        content: geojsonLayer,
                        title: feature.properties.query
                    }
                })
            },
            /**
             * @param {{content: Leaflet.GeoJSON, title: string}} target
             */
            handleSearchResultClick(target)
            {
                target.content.openPopup()
                Global.VPMC.viewer.flyToBounds( target.content.getBounds() )
            },
        }
}
</script>
<style lang="scss" scoped>
    .container{
        justify-content: center;
    }
    .search-list {
        margin-top: 10px;
        width: 100%;
        overflow: auto;
        display: inline-block;
        vertical-align: top;
        border: 1px solid rgba(0, 0, 0, 0.12);
    }
</style>