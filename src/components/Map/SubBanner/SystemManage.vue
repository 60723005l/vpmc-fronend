<template>
<div>
    <dropdown-menu
        v-model="show">
        <md-button class="btn btn-primary dropdown-toggle ">
            {{placeholder}}
        </md-button>
        <div slot="dropdown" class="dropdown-content">
            <div class="option" 
                v-for="(item, index) in options" :key="index"
                @click="handleSelect(item)">{{item.name}}</div>
        </div>
    </dropdown-menu>
</div>

</template>
<script>
import DropdownMenu from '@innologica/vue-dropdown-menu'

let options = 
[
    {name:'帳號管理'},
    {name:'權限管理'},
    {name:'業務報表'},
    {name:'使用者紀錄'},

]
export default {
    name:"SystemManage",
    data()
        {
            return{
                options:options,
                selected: options[0],
                placeholder:'系統管理',
                show:false
            }
        },
    methods:
        {
            handleSelect(option)
            {
                this.selected = option
                switch(option.name)
                {
                    case '帳號管理':
                        
                        let url = `${process.env.BASE_BACKEND_URL}Identity/Account/Manage`
                        window.open(url, '_blank').focus();
                        break
                }
            }
        },
    components:
        {
            DropdownMenu
        }
}
</script>
