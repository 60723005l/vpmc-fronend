<template>
    <md-tabs class="custom-tabs">
      <md-tab v-for="(tab, index) in tabs" :key="index" :id="tab.name" :md-label="tab.name">
          <component :is="tab.comp_name"></component>
      </md-tab>
    </md-tabs>
</template>
<script>

const tabs = [
    {name:'設定價格因素調整表', comp_name:'PriceFactorAdjustTable'},
    {name:'比較案例篩選(人工/智慧)', comp_name:'ComparativeCaseFilter'},
    {name:'土開價格智慧分析', comp_name:'LandDevSmartAnalysis'},
]
export default {
    name: 'MarketComparison',
    components:
        {
            PriceFactorAdjustTable: async () => await import('./PriceFactorAdjustTable.vue'),
            ComparativeCaseFilter: async () => await import('./ComparativeCaseFilter/ComparativeCaseFilter'),
            LandDevSmartAnalysis: async () => await import('./LandDevSmartAnalysis.vue'),
        },
    data()
        {
            return {
                currentTab: tabs[0],
                tabs: tabs
            }
        },
}
</script>