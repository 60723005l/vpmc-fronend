<template>
    <div>
        <IconButton :src="'/static/icon/locate.png'" @Click="handleClick"/>
    </div>
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