<template>
    <div>
        <IconButton :src="'/static/icon/info.png'" @Click="handleClick"/>
    </div>
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "InfoButton",
    methods:
        {
            handleClick()
            {
                this.$store.dispatch('subbanner/activate', 'Info')
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