<template>
    <!-- <md-button class="md-icon-button"  @click="handleClick"> -->
        <IconButton :src="require('@/assets/icon/info.png')" :text="'資訊'" @Click="handleClick"/>
    <!-- </md-button> -->
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "InfoButton",
    methods:
        {
            handleClick()
            {
                this.$store.commit('appraisalAnalysisSidebar/open', false)
                this.$store.dispatch('widgetSidebar/activate', 'Info')
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