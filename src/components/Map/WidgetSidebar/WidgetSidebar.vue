<template>
    <Sidebar 
        :side="'left'" 
        :title="$store.state.widgetSidebar.current.title"
        :open="$store.state.widgetSidebar.open"
        @collapse="$store.commit('widgetSidebar/open', false)">
        <keep-alive>
            <component :is="$store.state.widgetSidebar.current.value"></component>
        </keep-alive>
    </Sidebar>
</template>
<script>

export default {
    name: 'WidgetSidebar',
    components: {
        Sidebar: async () => await import('../../basicUI/Sidebar.vue'),
        Layer: async () => await import('./Layer.vue'),
        Info: async () => await import('./Info.vue'),
        Geolocation: async () => await import('./Geolocation.vue')
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
                    {key: 'Layer', value: 'Layer', title: '圖層', payload: {}},
                    {key: 'Geolocation', value: 'Geolocation', title: '定位', payload: {}},
                    {key: 'Info', value: 'Info', title: '資訊', payload: {}},
                ]
                map_list.forEach( item =>
                {
                    this.$store.commit('widgetSidebar/addComponent', {...item})
                })
                
            }
        }
}
</script>