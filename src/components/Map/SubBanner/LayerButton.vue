<template>
    <md-button class="md-icon-button" @click="handleClick">
        <IconButton :src="require('@/assets/icon/layer.png')"/>
    </md-button>
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