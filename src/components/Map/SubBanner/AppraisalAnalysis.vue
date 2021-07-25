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
    {name:'現勘資料表'},
    {name:'市場比較法'},
    {name:'土開分析法'},
]
export default {
    name:"AppraisalAnalysis",
    data()
        {
            return{
                options:options,
                selected: options[0],
                placeholder:'估價分析',
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
