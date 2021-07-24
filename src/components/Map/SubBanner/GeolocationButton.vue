<template>
    <div>
        <IconButton :src="'/static/icon/locate.png'"/>
    </div>
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "GeolocationButton",
    components:
        {
            IconButton
        }
}
</script>
<style scoped>

</style>