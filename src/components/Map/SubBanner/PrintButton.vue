<template>
    <md-button class="md-icon-button" @click="handlePrintClick">
        <IconButton :src="'/static/icon/print.png'"/>
    </md-button>
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
                this.$store.commit('subbanner/open', false)
                setTimeout(print, 1000)
            }
        }
}
</script>
<style scoped>

</style>