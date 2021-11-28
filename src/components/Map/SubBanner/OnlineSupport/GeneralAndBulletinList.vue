<template>
    <md-dialog :md-active.sync="isOpen">
        <md-dialog-title>通則／公報</md-dialog-title>
        <md-content class="content">
            <md-list >
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

const DecreeList = []
const DecreeMap = groupBy(DecreeList, 'title')
const titles = keys(DecreeMap)

export default {
    name:"GeneralAndBulletinList",
    data: () => ({
        decreeMap: DecreeMap,
        titles: titles
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
            this.extendFiles()
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
            async extendFiles()
            {
                const fileTypes = [{zh_name: '通則', type: "GeneralLaw"}, {zh_name: '公報', type: "Bulletin"}]
                for( let fileType of fileTypes ) {
                    let files = await api.File.getLawFiles({item: fileType.type})
                    let fileList = files.map( file => ({
                        title: fileType.zh_name,
                        subtitle: file.renderName,
                        link: process.env.BASE_BACKEND_URL + file.serverRoute.slice(1)
                    }))
                    this.decreeMap[fileType.zh_name] = fileList
                    this.titles.push(fileType.zh_name)
                }
            }
        }
}
</script>
<style lang="scss" scoped>
.content{
    overflow: auto;
}
</style>