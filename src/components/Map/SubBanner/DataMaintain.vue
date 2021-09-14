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
