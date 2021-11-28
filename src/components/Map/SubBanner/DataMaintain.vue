<template>
    <md-menu md-size="small" md-align-trigger>
        <md-button md-menu-trigger>{{placeholder}}</md-button>

        <md-menu-content class="banner-menu-content">
        <md-menu-item v-for="(item, index) in options" :key="index"
                    @click="handleSelect(item)">{{item.name}}</md-menu-item>
        </md-menu-content>
    </md-menu>

</template>
<script>
import DropdownMenu from '@innologica/vue-dropdown-menu'

let options = 
[
    {name:'圖層管理'},
    {name:'文件管理'},

]
export default {
    name:"DataMaintain",
    data()
        {
            return{
                options:options,
                selected: options[0],
                placeholder:'資料維護',
                show:false
            }
        },
    methods:
        {
            handleSelect(payload)
            {
                this.selected = payload
            }
        },
    components:
        {
            DropdownMenu
        }
}
</script>
