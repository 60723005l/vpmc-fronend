<template>
    <md-list-item md-expand>
        <span class="md-list-item-text">{{groupName}}</span>
            <md-list slot="md-expand" class="layer-list">
                <LayerItem v-for="( layer, index ) in values" 
                    :key="index" 
                    :value="layer"
                    :action="action">
                </LayerItem>
            </md-list>
    </md-list-item>
</template>
<script>
import LayerItem from "./LayerItem.vue"
export default {
    name: "LayerList",
    props: 
        {
            groupName: String,
            values: {
                type: Array,
                default: () => {

                }
            },
            action: Object
        },
    components:
        {
            LayerItem
        },
    methods:
        {
            handleCheck( layer )
            {
                this.$emit("onLayerCheck", layer)
            }
        }

}
</script>
<style lang="scss" scoped>
.layer-list{
    flex-direction: column-reverse;
}
</style>