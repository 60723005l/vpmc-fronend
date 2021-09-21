<template>
    <md-list-item class="md-inset">

        <!-- <md-checkbox v-model="checked" @change="handleCheck($event)"/> -->
        <input type="checkbox" v-model="checked" @change="handleCheck($event)">
        
        
        <md-menu md-direction="bottom-end">
            <md-button @click="handleClick" md-menu-trigger class="md-icon-button"><md-icon>menu</md-icon></md-button>
            <md-menu-content>
                <md-menu-item @click="handleOpacityPanel">透明度</md-menu-item>
            </md-menu-content>
        </md-menu>
        <span class="md-list-item-text">{{value.name}}</span>
    </md-list-item>
</template>
<script>

export default {
    name: "LayerItem",
    data: () => ({
        checked:false
    }),
    props:
        {
            value: {
                type: Object
            },
            action: Object
        },
    mounted()
        {
            this.checked = this.value.show
        },
    updated()
        {
            this.checked = this.value.show
        },
    methods:
        {
            handleClick()
            {
                console.log(333)
            },
            handleCheck(event)
            {
                // console.log(event.target.checked)
                this.action.onLayerCheck(this.checked, this.value)
                this.checked = this.value.show
            },
            handleOpacityPanel()
            {
                this.action.openOpacityPanel(this.value)
            }
        }
}
</script>
<style lang="scss" scoped>

</style>