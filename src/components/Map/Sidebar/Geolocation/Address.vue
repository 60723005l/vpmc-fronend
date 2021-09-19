<template>
    <div class="md-layout container">
        <md-card  class="md-layout-item">
            <md-card-content>
                <md-field >
                    <label >輸入門牌</label>
                    <md-input v-model="addr"></md-input>
                </md-field>
            </md-card-content>
            
            <md-card-actions>
                <md-button @click="handleClear">清除</md-button>
                <md-button @click="handleSearchClick">查詢</md-button>
            </md-card-actions>
        </md-card>
        <md-list class="search-list" v-if="search.show">
            <md-subheader>查詢結果</md-subheader>
            <md-list-item v-for="(address, index) in search.results" :key="index" @click="handleSearchResultClick(address)">
                <span class="md-list-item-text">{{address.FULL_ADDR}}</span>
            </md-list-item>
        </md-list>
    </div>
</template>
<script>
import api from "../../../../api"
import Global from "../../../../global"
import Leaflet from 'leaflet'

export default {
    name:"Address",
    data: () => ({
        addr:'',
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
                let resp = await api.Location.getGeoinfoFromAddr({oAddress: this.addr})
                this.search.results = this.createPoints(resp.AddressList)
                this.search.show = true

            },
            handleClear()
            {
                this.search.results.forEach( result => {
                    Global.VPMC.viewer.removeLayer( result.marker )
                })
                this.search.results = []
                this.search.show = false
            },
            createPoints(addrs)
            {
                return addrs.map( addr => {
                    let marker = Leaflet.marker( new Leaflet.LatLng(addr.Y, addr.X) )
                    marker.bindPopup(addr.FULL_ADDR)
                    Global.VPMC.viewer.addLayer(marker)
                    return {
                        ...addr,
                        marker
                    }
                })
            },
            handleSearchResultClick(address)
            {
                let {X, Y} = address
                address.marker.openPopup()
                Global.VPMC.viewer.flyTo(new Leaflet.LatLng(Y, X), 18)
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