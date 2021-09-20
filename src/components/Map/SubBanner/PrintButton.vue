<template>
    <md-button class="md-icon-button">
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
        }
}
</script>
<style scoped>

</style>