<template>
    <md-menu md-size="small" md-align-trigger>
        <md-button md-menu-trigger>{{placeholder}}</md-button>

        <md-menu-content class="banner-menu-content">
        <md-menu-item v-for="(item, index) in options" :key="index"
                    @click="item.action">{{item.name}}</md-menu-item>
        </md-menu-content>
        <DecreeList :open="options.decree.open" @onClose="options.decree.action"/>
        <GeneralAndBulletinList :open="options.generalAndBulletin.open" @onClose="options.generalAndBulletin.action"/>
    </md-menu>

</template>
<script>
import DropdownMenu from '@innologica/vue-dropdown-menu'

const options = {
    howToUse: {
        name: '網站使用手冊',
        action: () => {},
        open: false
    },
    decree: {
        name: '估價相關法令',
        action: () => {},
        open: false
    },
    generalAndBulletin: {
        name: '技術公報/範本',
        action: () => {},
        open: false
    },
}

export default {
    name:"OnlineSupport",
    data()
        {
            return{
                options: options,
                selected: undefined,
                placeholder:'線上支援',
                show:false
            }
        },
    created()
        {
            this.options.decree.action = () => {
                this.options.decree.open = !this.options.decree.open
            }
            this.options.generalAndBulletin.action = () => {
                this.options.generalAndBulletin.open = !this.options.generalAndBulletin.open
            }
        },
    methods:
        {
            handleSelect(payload)
            {
                this.selected = payload
            },
        },
    components:
        {
            DropdownMenu,
            DecreeList: async () => await import('./OnlineSupport/DecreeList.vue'),
            GeneralAndBulletinList: async () => await import('./OnlineSupport/GeneralAndBulletinList.vue'),
        }
}
</script>
