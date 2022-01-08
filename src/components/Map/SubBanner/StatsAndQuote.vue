<template>
    <md-menu md-size="small" md-align-trigger>
        <md-button md-menu-trigger>{{placeholder}}</md-button>

        <md-menu-content class="banner-menu-content">
        <md-menu-item v-for="(item) in optionsWithVuex" :key="item.name"
                    @click="handleSelectForVuex(item)">{{item.name}}</md-menu-item>
        <md-menu-item v-for="(item) in options" :key="item.name"
                    @click="handleSelect(item)">{{item.name}}</md-menu-item>
        </md-menu-content>
        
    </md-menu>
</template>
<script>
import DropdownMenu from '@innologica/vue-dropdown-menu'

let optionsWithVuex = 
[
    {name:'實價交易', componentName:'ActualPriceTransaction'},
    {name:'建照使照', componentName:'LicenseAndPermit'},

]
let options = 
[
    {name:'台灣總經蓋覽'},
    {name:'美港新Reits'},

]
export default {
    name:"StatsAndQuote",
    data()
        {
            return{
                optionsWithVuex,
                options,
                selected: undefined,
                placeholder:'統計及行情',
                show:false
            }
        },
    methods:
        {
            handleSelectForVuex(payload)
            {
                this.selected = payload
                this.$store.commit('widgetSidebar/open', false)
                this.$store.commit('appraisalAnalysisSidebar/open', false)
                this.$store.dispatch('statsAndQuoteSidebar/activate', payload.componentName)
                this.$store.commit('statsAndQuoteSidebar/open', true)
            },
            handleSelect(payload)
            {
                this.selected = payload
            }
        },
    components:
        {
            DropdownMenu
        }
}
</script>
