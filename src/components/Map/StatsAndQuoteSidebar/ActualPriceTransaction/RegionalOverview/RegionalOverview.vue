<template>
    <div class="RegionalOverview-root">
        <Query @submit="handleHistories"/>
        <!-- <div v-for="(title, index) in titles" :key="index"></div> -->
        <md-tabs class="custom-tabs" :md-active-tab="currentTabId" @md-changed="handleTabChange" md-dynamic-height>
            <md-tab v-for="(title, index) in titles" :key="index" :id="'rgo-' + index" :md-label="title.name">
                <div>
                    {{title.name}}
                    <LineChart :title="'交易筆數'" :uid="uniqueId" :unit="'筆'" :labels="Object.keys(history[title.name].counts)" :datas="Object.values(history[title.name].counts)"/>
                    <LineChart :title="'成交總價'" :dataScale="0.001" :uid="uniqueId" :unit="'萬'" :labels="Object.keys(history[title.name].totalPrice)" :datas="Object.values(history[title.name].totalPrice)"/>
                    <LineChart :title="'成交單價'" :dataScale="0.001" :uid="uniqueId" :unit="'萬/坪'" :labels="Object.keys(history[title.name].unitPrice)" :datas="Object.values(history[title.name].unitPrice)"/>
                    <LineChart :title="'交易時屋齡'" :uid="uniqueId" :unit="'年'" :labels="Object.keys(history[title.name].age)" :datas="Object.values(history[title.name].age)"/>
                </div>
            </md-tab>
        </md-tabs>
    </div>
</template>
<script>
import { RegionHistoryReturnItemType } from '../../../../../api/module/transaction'
import { mapKeys, uniqueId } from 'lodash'
import _uuid from '../../../../../lib/utilities/UUID'

export default {
    name: 'RegionalOverview',
    components:
    {
        Query: async () => await import('./Query.vue'),
        LineChart: async () => await import('./LineChart.vue')
    },
    data()
        {
            return {
                /**@type {typeof RegionHistoryReturnItemType} */
                history: {},
                titles: [],
                uniqueId: uniqueId(),
                currentTabId: ''
            }
        },
    methods: 
        {
            /**
             * @param {typeof RegionHistoryReturnItemType} history
             */
            handleHistories(history) {
                this.history = mapKeys(history, (value, key) => key.replace(/ *\([^)]*\) */g, ""))
                this.titles = Object.keys(this.history).map(title => ({name: title, id: _uuid()}))
                this.currentTabId = 'rgo-0'
                this.uniqueId = _uuid()
            },
            handleTabChange(id) {
                this.currentTabId = id
            }
        }
}
</script>
<style lang="scss" scoped>
.RegionalOverview-root{
    display: flex;
    flex-direction: column;
}
</style>