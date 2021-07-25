<template>
    <div class="geolocation-sidebar-container col">
        <Tabs :tabs="tabs" @Click="handleTabClick"/>
        <div class="body">
            <component :is="currentTab.comp_name"></component>
        </div>
    </div>
</template>
<script>

import Tabs from "@/components/basicUI/Tabs"
import AdminDistrict from "./Geolocation/AdminDistrict.vue"
import Address from "./Geolocation/Address.vue"
import LandCode from "./Geolocation/LandCode.vue"
import Coords from "./Geolocation/Coords.vue"


let tabs = [
    {name:'行政區', comp_name:'AdminDistrict'},
    {name:'門牌', comp_name:'Address'},
    {name:'地號', comp_name:'LandCode'},
    {name:'座標', comp_name:'Coords'},
]
export default {
    name:"Geolocation",
    data()
        {
            return {
                currentTab: tabs[0],
                tabs: tabs
            }
        },
    methods:
        {
            handleTabClick(tab)
            {
                this.currentTab = tab
            }
        },
    components:
        {
            Tabs,
            AdminDistrict, Address, LandCode, Coords
        }
}
</script>
<style lang="sass">
    @import './geolocation.scss'
</style>