<template>
    <!-- <md-button class="md-icon-button" @click="handlePrintClick"> -->
        <IconButton :src="require('@/assets/icon/print.png')" :text="'列印'" @Click="handlePrintClick"/>
    <!-- </md-button> -->
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "PrintButton",
    components:
        {
            IconButton
        },
    methods:
        {
            handlePrintClick()
            {
                this.$store.commit('widgetSidebar/open', false)
                setTimeout(print, 1000)
            }
        }
}
</script>
<style scoped>

</style>