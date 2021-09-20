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
    {name:'實價交易'},
    {name:'建照使照'},
    {name:'台灣總經蓋覽'},
    {name:'美港新Reits'},

]
export default {
    name:"StatsAndQuote",
    data()
        {
            return{
                options:options,
                selected: options[0],
                placeholder:'統計及行情',
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
