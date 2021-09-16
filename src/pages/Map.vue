<template>
    <div class="full-page col">
        <Banner/>
        <SubBanner/>
        <div class="body">
            <LeafletViewer
                :viewerContainer="containerId"
                :option="mapOption" 
                :measurement="measurementOptions"/>
            <!-- <Sidebar :side="'right'" :open="$store.state.subbanner.open" @collapse="handleCollaps">
                <template v-slot:body>
                    <component :is="$store.state.subbanner.current.value"></component>
                </template>
            </Sidebar> -->
            <Sidebar :side="'left'" :open="$store.state.subbanner.open"></Sidebar>
        </div>
        
        
    </div>
</template>
<script>
import LeafletViewer from "@/components/LeafletViewer"
import Banner from "@/components/Map/Banner"
import SubBanner from "@/components/Map/SubBanner"
import Sidebar from "@/components/basicUI/Sidebar"

// import Layer from "@/components/Map/Sidebar/Layer"
// import Info from "@/components/Map/Sidebar/Info"
// import Geolocation from "@/components/Map/Sidebar/Geolocation"

export default {
    name: "Map",
    data()
        {
            return {
                containerId: process.env.CONTAINERID,
                mapOption: {},
            }
        },
    mounted()
        {            
            
        },
    computed:
        {
            measurementOptions(){
                    return{
                        activate: this.$store.state.measurement.activate,
                        onToggle: this.onMeasuerWindowToggle
                    }
                }
        },
    methods:
        {
            handleCollaps()
            {
                this.$store.commit('subbanner/open', false)
            },
            onMeasuerWindowToggle( )
            {
                this.$store.commit('measurement/toggle')
                this.measurementOptions.activate = this.$store.state.measurement.activate
                // this.measurementOptions.activate = !this.measurementOptions.activate
            }
        },
    components:
        {
            LeafletViewer,
            Banner,
            SubBanner,
            Sidebar,
            //----------------
            // Layer,
            // Info,
            // Geolocation,

        }            
}
</script>
<style scoped>
.full-page{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: antiquewhite;
    overflow: hidden;
}
.header{
    background:#1e1e23;
    /* min-height: 70px; */
}
.header-menu-holder{
    background: #41b883;
    padding: 10px;
    margin-top: -1px;
}
.body{
    background: cadetblue;
    height: 100%;
    position: relative;
}
</style>