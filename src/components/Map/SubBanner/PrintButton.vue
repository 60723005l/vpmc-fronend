<template>
    <div>
        <IconButton :src="'/static/icon/print.png'"/>
    </div>
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