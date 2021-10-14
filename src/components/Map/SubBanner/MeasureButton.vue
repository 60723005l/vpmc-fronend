<template>
    <div>
        <md-button class="md-icon-button" @click="handleMeasureClick">
            <IconButton :src="require('@/assets/icon/measure.png')"/>
        </md-button>
        <!-- <Window
            v-if="show"
            :title="'測量'"
            :float="true"
            :resize="false"
            @onClose="handleWindowClose">
            <template v-slot:windowBar>
                <Tabs :tabs="tabs" @Click="handleTabClick"/>
            </template>
            <template v-slot:body>
                <component :is="currentTab.comp_name"></component>
            </template>
        </Window> -->
    </div>
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"
import Tabs from "@/components/basicUI/Tabs"
import Window from "@/components/basicUI/Window"
import MeasureDistance from "./Measurement/MeasureDistance.vue"
import MeasureArea from "./Measurement/MeasureArea.vue"

import * as turf from '@turf/turf'
console.log(turf)

let tabs = [
    {name:'面積', comp_name:'MeasureArea'},
    {name:'距離', comp_name:'MeasureDistance'},
]
export default {
    name: "MeasureButton",
    data()
        {
            return{
                show:false,
                tabs:tabs,
                currentTab:tabs[0]
            }
        },
    methods:
        {
            handleMeasureClick()
            {
                this.$store.commit('measurement/toggle')
                this.show = true
            },
            handleTabClick(tab)
            {
                this.currentTab = tab
            },
            handleWindowClose()
            {
                this.show = false
            }
        },
    components:
        {
            IconButton,
            Window,
            Tabs,
            MeasureDistance,
            MeasureArea
        }
}
</script>
<style scoped>

</style>