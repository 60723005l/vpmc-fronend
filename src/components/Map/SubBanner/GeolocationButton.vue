<template>
    <!-- <md-button class="md-icon-button" @click="handleClick"> -->
        <!-- <md-ripple> -->
        <IconButton :src="require('@/assets/icon/locate.png')" :text="'定位'" @Click="handleClick"/>
        <!-- </md-ripple> -->
    <!-- </md-button> -->
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "GeolocationButton",
    methods:
        {
            handleClick()
            {
                this.$store.commit('appraisalAnalysisSidebar/open', false)
                this.$store.dispatch('widgetSidebar/activate', 'Geolocation')
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