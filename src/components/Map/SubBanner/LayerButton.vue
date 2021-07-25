<template>
    <div>
        <IconButton :src="'/static/icon/layer.png'" @Click="handleClick"/>
    </div>
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name: "LayerButton",
    methods:
        {
            handleClick()
            {
                this.$store.dispatch('subbanner/activate', 'Layer')
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