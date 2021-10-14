<template>
    <md-button class="md-icon-button" @click="handleClick">
        <IconButton :src="require('@/assets/icon/locate.png')"/>
    </md-button>
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "GeolocationButton",
    methods:
        {
            handleClick()
            {
                this.$store.dispatch('subbanner/activate', 'Geolocation')
                this.$store.commit('subbanner/open', true)
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