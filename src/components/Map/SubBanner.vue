<template>
    <!-- <div class="sub-baner">
        <div class="group">
            <SystemManage  class="item"/>
            <DataMaintain  class="item"/>
            <AppraisalAnalysis  class="item"/>
        </div>
        <div class="group">
            <YuantaModule  class="item"/>
            <TaishinModule  class="item"/>
        </div>
        <div class="group">
            <OnlineSupport  class="item"/>
            <StatsAndQuote  class="item"/>
        </div>
        <div class="group">
            <GeolocationButton class="item"/>
            <LayerButton class="item"/>
            <MeasureButton class="item"/>
            <InfoButton class="item"/>
            <PrintButton class="item"/>
            <FullScreenButton class="item"/>
        </div>
    </div> -->
    <md-toolbar class="md-dense sub-baner md-third">
        <div class="group">
            <SystemManage  />
            <DataMaintain  />
            <AppraisalAnalysis  />
            <DecreeModuel  />
        </div>
        <div class="group" v-if="$store.state.user.role ==='Admin'">
            <YuantaModule  />
            <TaishinModule  />
        </div>
        <div class="group">
            <OnlineSupport  />
            <StatsAndQuote  />
        </div>
        <div class="group">
            <GeolocationButton />
            <LayerButton />
            <MeasureButton />
            <InfoButton />
            <PrintButton />
            <FullScreenButton />
        </div>
    </md-toolbar>
</template>
<script>
import SystemManage from './SubBanner/SystemManage'
import DataMaintain from './SubBanner/DataMaintain'
import AppraisalAnalysis from './SubBanner/AppraisalAnalysis'
import DecreeModuel from './SubBanner/DecreeModuel'
//---------------
import YuantaModule from './SubBanner/YuantaModule'
import TaishinModule from './SubBanner/TaishinModule'
//---------------
import OnlineSupport from './SubBanner/OnlineSupport'
import StatsAndQuote from './SubBanner/StatsAndQuote'

//---------------
import LayerButton from './SubBanner/LayerButton'
import MeasureButton from './SubBanner/MeasureButton'
import GeolocationButton from './SubBanner/GeolocationButton'
import PrintButton from './SubBanner/PrintButton'
import InfoButton from './SubBanner/InfoButton'
import FullScreenButton from './SubBanner/FullScreenButton'

export default {
    name: "SubBanner",
    mounted()
        {
            this.setSubBannerSideBarVuex()
        },
    methods:
        {
            setSubBannerSideBarVuex()
            {
                //value will be component name that used in sidebar slot
                let map_list = [
                    {key: 'Layer', value: 'Layer'},
                    {key: 'Geolocation', value: 'Geolocation'},
                    {key: 'Info', value: 'Info'},
                ]
                map_list.forEach( item =>
                {
                    let {key, value} = item
                    this.$store.commit('subbanner/addComponent', {key, value})
                })
                
            }
        },
    components:
        {
            SystemManage,
            DataMaintain,
            AppraisalAnalysis,
            DecreeModuel,
            //-----------------
            YuantaModule,
            TaishinModule,
            //------------------
            OnlineSupport,
            StatsAndQuote,
            //-------------------
            LayerButton,
            MeasureButton,
            GeolocationButton,
            PrintButton,
            InfoButton,
            FullScreenButton
        }
}
</script>
<style lang="sass">
    @import "./subbanner.scss"
</style>