<template>
<div>
    <dropdown-menu
        v-model="show">
        <button class="btn btn-primary dropdown-toggle">
            {{placeholder}}
        </button>
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
