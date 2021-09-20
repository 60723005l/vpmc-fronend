<template>
    <!-- <div class="admin-district-container form"> -->
    <form class="md-layout container">
        <md-card  class="md-layout-item">
            <md-card-content>
                <md-field v-if="adminInfo" :class="{'md-has-value': county!==null}">
                    <label for="county">縣市</label>
                    <select class="custom-select" v-model="county">
                        <option v-for="(name, index) in adminInfo.counties" :key="index" :value="name">{{name}}</option>
                    </select>
                </md-field>
                <md-field v-if="adminInfo" :class="{'md-has-value': town!==null}">
                    <label>鄉鎮市區</label>
                    <select class="custom-select" v-model="town">
                        <option v-for="(info, index) in infosFromTowns" :key="index" :value="info.town">{{info.town}}</option>
                    </select>
                </md-field>
            </md-card-content>
            
            <md-card-actions>
                <md-button @click="handleClear">清除</md-button>
                <md-button @click="handleSearchClick">查詢</md-button>
            </md-card-actions>
        </md-card>
    </form>
</template>
<script>
import api from "../../../../api"
import Global from "../../../../global"

export default {
    name:"AdminDistrict",
    data: () => ({
        adminInfo: undefined,
        county: null,
        town: null,
    }),
    async created()
        {
            await this.setGeoinfosData()
        },
    computed:
        {
            infosFromTowns() {
                if( this.adminInfo ) {
                    let result = this.adminInfo.getTownsInfoByCounty(this.county)
                    return result? result: []
                }
                return []
            },
            currentInfo() {
                if( this.infosFromTowns.length > 0 && this.town ) {
                    let result = this.infosFromTowns.find( info => info.town === this.town)
                    return result
                }
                return undefined
            }
        },
    methods:
        {
            async setGeoinfosData()
            {
                this.adminInfo = await api.Location.getAdminGeoinfos()
            },
            handleClear()
            {
                this.county = null
                this.town = null
            },
            handleSearchClick()
            {
                if( this.currentInfo ) {
                    let { latlng } = this.currentInfo
                    Global.VPMC.viewer.flyTo( latlng, 15 )
                }
            },
        }
}
</script>
<style lang="scss" scoped>
.container{
    .custom-select{
        width: 100%;
        background: #424242;
        border: none;
        color: white;
        &.selected{
            background: black;
        }
    }
}
</style>