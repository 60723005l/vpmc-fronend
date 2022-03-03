<template>
    <Sidebar 
        :side="'left'" 
        :title="$store.state.statsAndQuoteSidebar.current.title"
        :open="$store.state.statsAndQuoteSidebar.open"
        @collapse="$store.commit('statsAndQuoteSidebar/open', false)">
        <keep-alive>
            <component :is="$store.state.statsAndQuoteSidebar.current.value"></component>
        </keep-alive>
    </Sidebar>
</template>
<script>

export default {
    name: 'StatsAndQuoteSidebar',
    components: {
        Sidebar: async () => await import('../../basicUI/Sidebar.vue'),
        ActualPriceTransaction: async () => await import('./ActualPriceTransaction'),
        LicenseAndPermit: async () => await import('./LicenseAndPermit'),

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
                    {key: 'ActualPriceTransaction', value: 'ActualPriceTransaction', title: '實價交易', payload: {}},
                    {key: 'LicenseAndPermit', value: 'LicenseAndPermit', title: '使照建照', payload: {}}
                ]
                map_list.forEach( item =>
                {
                    this.$store.commit('statsAndQuoteSidebar/addComponent', {...item})
                })
                
            }
        }
}
</script>