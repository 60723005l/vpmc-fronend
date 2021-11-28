<template>
    <md-dialog :md-active.sync="isOpen">
        <md-dialog-title>法令查詢</md-dialog-title>
        <md-content class="content">
            <md-list>
                <md-list-item md-expand :md-expanded="true" v-for="(title, index) in titles" :key="index">
                    <span class="md-list-item-text">{{title}}</span>
                    <md-list slot="md-expand">
                        <md-list-item class="md-inset" v-for="(subItem, index2) in decreeMap[title]" :key="index2">
                            <a :href="subItem.link" target="_blank">{{subItem.subtitle}}</a>
                        </md-list-item>
                    </md-list>
                </md-list-item>
            </md-list>
        </md-content>
    </md-dialog>
</template>
<script>
import api from "../../../../api"
import { groupBy, keys } from 'lodash'

export default {
    name:"DecreeList",
    data: () => ({
        decreeMap: {},
        titles: []
    }),
    props: 
        {
            open: {
                type: Boolean,
                default: false
            }
        },
    created()
        {
            this.fetchDecrees()
        },
    computed:
        {
            isOpen: {
                get: function () {
                    return this.open
                },
                set: function (val) {
                    this.$emit('onClose', val)
                }
            }
        },
    methods:
        {
            async fetchDecrees() {
                const decrees = await api.Decree.listAll()
                this.decreeMap = groupBy(decrees, 'title')
                this.titles = keys(this.decreeMap)
            }
        }
}
</script>
<style lang="scss" scoped>
.content{
    overflow: auto;
}
</style>