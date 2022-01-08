<template>
    <md-menu md-size="small" md-align-trigger>
        <md-button md-menu-trigger>{{placeholder}}</md-button>

        <md-menu-content class="banner-menu-content">
        <md-menu-item v-for="(item, index) in options" :key="index"
                    @click="handleSelect(item)">{{item.name}}</md-menu-item>
        </md-menu-content>
    </md-menu>

</template>
<script>
import DropdownMenu from '@innologica/vue-dropdown-menu'

let options = 
[
    {name:'現勘資料表', componentName: 'OnsiteSurvey'},
    {name:'市場比較法', componentName: 'MarketComparison'},
    {name:'土開分析法', componentName: 'LandDevAnalysis'},
]
export default {
    name:"AppraisalAnalysis",
    data()
        {
            return{
                options:options,
                selected: options[0],
                placeholder:'估價分析',
                show:false
            }
        },
    methods:
        {
            handleSelect(payload)
            {
                this.selected = payload
                
                this.$store.commit('widgetSidebar/open', false)
                this.$store.commit('statsAndQuoteSidebar/open', false)
                this.$store.dispatch('appraisalAnalysisSidebar/activate', payload.componentName)
                this.$store.commit('appraisalAnalysisSidebar/open', true)
            }
        },
    components:
        {
            DropdownMenu
        }
}
</script>
