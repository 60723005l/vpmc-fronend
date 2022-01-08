<template>
    <div class="ApartmentComplex-root">
        <Query @submit="handleHistories"/>
        <div class="ApartmentComplex-histories">
            <HistoryCard v-for="(history, index) in histories" :key="index"
                :dateTime="history.transactionDate"
                :level="history.transferLevel"
                :unitInfo="getUnitInfo(history)"
                :priceInfo="getPriceInfo(history)"/>
        </div>
    </div>
</template>
<script>
import { pick } from 'lodash'
import { CommiteeHistroyRetureType } from '../../../../../api/module/transaction'


export default {
    name: 'ApartmentComplex',
    components: {
        Query: async () => await import('./Query.vue'),
        HistoryCard: async () => await import('./HistoryCard')
    },
    data: () => ({
        histories: []
    }),
    methods: {
        /**
         * @param {typeof CommiteeHistroyRetureType} histories
         */
        handleHistories(histories) {
            this.histories = histories
        },
        /**
         * @param {typeof CommiteeHistroyRetureType[0]} history
         */
        getUnitInfo(history) {
            return pick(history, [
                'units',
                'bathNumber',
                'bedNumber',
                'hallNumber'
            ])
        },
        /**
         * @param {typeof CommiteeHistroyRetureType[0]} history
         */
        getPriceInfo(history) {
            return pick(history, [
                'totalPrice',
                'unitPrice'
            ])
        }
    }
}
</script>
<style lang="scss" scoped>
.ApartmentComplex-root{
    display: flex;
    flex-direction: column;
    .ApartmentComplex-histories{
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
}
</style>