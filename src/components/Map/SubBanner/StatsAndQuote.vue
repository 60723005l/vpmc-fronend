<template>
<div>
    <dropdown-menu
        v-model="show">
        <md-button class="btn btn-primary dropdown-toggle">
            {{placeholder}}
        </md-button>
        <div slot="dropdown" class="dropdown-content">
            <div class="option" v-for="(item, index) in options" :key="index">{{item.name}}</div>
        </div>
    </dropdown-menu>
</div>

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
