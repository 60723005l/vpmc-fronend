<template>
    <div>
        <IconButton :src="'/static/icon/full-screen.png'"/>
    </div>
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "FullScreenButton",
    components:
        {
            IconButton
        }
}
</script>
<style scoped>

</style>