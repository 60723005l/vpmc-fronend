<template>
    <md-menu md-direction="bottom-end">
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
    {name:'網站使用手冊'},
    {name:'估價相關法令'},
    {name:'技術公報/範本'},

]
export default {
    name:"OnlineSupport",
    data()
        {
            return{
                options:options,
                selected: options[0],
                placeholder:'線上支援',
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
