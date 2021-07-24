<template>
    <div>
        <IconButton :src="'/static/icon/info.png'"/>
    </div>
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "InfoButton",
    components:
        {
            IconButton
        }
}
</script>
<style scoped>

</style>