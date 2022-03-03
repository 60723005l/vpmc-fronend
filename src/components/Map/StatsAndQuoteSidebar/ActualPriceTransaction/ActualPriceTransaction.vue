<template>
    <md-tabs class="custom-tabs">
      <md-tab v-for="(tab, index) in tabs" :key="index" :id="tab.name" :md-label="tab.name">
          <component :is="tab.comp_name"></component>
      </md-tab>
    </md-tabs>
</template>
<script>

const tabs = [
    {name:'地區整體', comp_name:'RegionalOverview'},
    {name:'社區個別', comp_name:'ApartmentComplex'},
]
export default {
    name: 'ActualPriceTransaction',
    components:
        {
            RegionalOverview: async () => await import('./RegionalOverview'),
            ApartmentComplex: async () => await import('./ApartmentComplex'),
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