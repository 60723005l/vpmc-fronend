<template>
    <!-- <md-button class="md-icon-button" @click="handleClick"> -->
        <IconButton :src="require('@/assets/icon/layer.png')" :text="'圖層'" @Click="handleClick"/>
    <!-- </md-button> -->
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "LayerButton",
    methods:
        {
            handleClick()
            {
                this.$store.commit('appraisalAnalysisSidebar/open', false)
                this.$store.commit('statsAndQuoteSidebar/open', false)
                this.$store.dispatch('widgetSidebar/activate', 'Layer')
                this.$store.commit('widgetSidebar/open', true)
                
            }
        },
    components:
        {
            IconButton
        }
}
</script>
<style scoped>

</style>