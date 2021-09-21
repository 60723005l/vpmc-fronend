<template>
    <md-dialog :md-active.sync="_active">
      <md-dialog-title>透明度</md-dialog-title>
      <md-content>
          <div class="form">
              <input type="range" v-model="value" step="0.1" min="0" max="1" @change="handleInputChange"> 
              <label>{{value}}</label>
          </div>
      </md-content>
    </md-dialog>
</template>
<script>
import Global from "../../../../global"

export default {
    name: "OpacityPanel",
    data: () => ({
        value:''
    }),
    props:
        {
            active: Boolean,
            layerInfo: Object
        },
    computed:
        {
            _active: {
                get(){
                    return this.active
                },
                set(val){
                    this.$parent.opacityPanel.show = val
                }
            }
        },
    watch:
        {
            layerInfo:
            {
                handler(){
                    this.getOpacity()
                },
                deep: true
            }
        },
    mounted()
        {
            // this.value = this.opacityValue
            this.getOpacity()
        },
    updated()
        {
            // this.value = this.opacityValue
            // this.getOpacity()
        },
    methods:
        {
            getOpacity()
            {
                let layer = Global.VPMC.layerControl.get(this.layerInfo)
                console.log(1,layer.content.options.opacity )
                this.value = layer.content.options.opacity || "1"
            },
            handleInputChange()
            {
                let layer = Global.VPMC.layerControl.get(this.layerInfo)
                layer.content.setOpacity( this.value )
                console.log(2,layer.content.options.opacity )
            },
            asdf(){
                // this.$parent.
            }
        }
}
</script>
<style lang="scss" scoped>
.form{
    display: flex;
    justify-content: center;
    margin: 25px;
}
</style>