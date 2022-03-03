<template>
    <Sidebar 
        :side="'left'" 
        :title="$store.state.appraisalAnalysisSidebar.current.title"
        :open="$store.state.appraisalAnalysisSidebar.open"
        @collapse="$store.commit('appraisalAnalysisSidebar/open', false)">
        <keep-alive>
            <component :is="$store.state.appraisalAnalysisSidebar.current.value"></component>
        </keep-alive>
    </Sidebar>
</template>
<script>

export default {
    name: 'AppraisalAnalysisSidebar',
    components: {
        Sidebar: async () => await import('../../basicUI/Sidebar.vue'),
        MarketComparison: async () => await import('./MarketComparison'),
        OnsiteSurvey: async () => await import('./OnsiteSurvey'),
        LandDevAnalysis: async () => await import('./LandDevAnalysis')
    },
    created(){
        this.setComponents()
    },
    methods:
        {
            setComponents()
            {
                //value will be component name that used in sidebar slot
                let map_list = [
                    {key: 'MarketComparison', value: 'MarketComparison', title: '市場比較法', payload: {}},
                    {key: 'OnsiteSurvey', value: 'OnsiteSurvey', title: '現勘資料表', payload: {}},
                    {key: 'LandDevAnalysis', value: 'LandDevAnalysis', title: '土開分析法', payload: {}},
                ]
                map_list.forEach( item =>
                {
                    this.$store.commit('appraisalAnalysisSidebar/addComponent', {...item})
                })
                
            }
        }
}
</script>