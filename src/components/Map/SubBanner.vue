<template>
    <md-toolbar class="md-dense sub-baner md-third vpmc-subbanner">
        <div class="group">
            <SystemManage  />
            <DataMaintain  />
            <AppraisalAnalysis  />
        </div>
        <div class="group" v-if="$store.state.user.role ==='Admin'">
            <YuantaModule  />
            <TaishinModule  />
        </div>
        <div class="group">
            <OnlineSupport  />
            <StatsAndQuote  />
        </div>
        <div class="group align-start">
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
    components:
        {
            SystemManage,
            DataMaintain,
            AppraisalAnalysis,
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
    @import "./subbanner.scss";
</style>
<style lang="scss" scoped>
.vpmc-subbanner{
    background-color: $vpmc-bg-subbanner !important;
}
</style>