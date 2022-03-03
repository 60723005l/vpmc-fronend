<template>
    <md-tabs class="custom-tabs" md-dynamic-height>
        <md-tab v-for="(admin, index) in getAdmins()" :key="index" :id="'lap-' + index" :md-label="admin">
            <div v-if="admin">
                {{admin}}
                <LineChart
                    v-for="(name, nindex) in Object.keys(rawData[admin])" :key="nindex"
                    :uid="uniqueId"
                    :title="name"
                    :unit="'K'"
                    :labels="groupDateValueByMonthAndYear(rawData[admin][name])['1'].map(item => new Date(item.date).getFullYear())"
                    :datas="Object.values(groupDateValueByMonthAndYear(rawData[admin][name]))"
                    :dataScale="0.001"
                    />
            </div>
        </md-tab>
    </md-tabs>
</template>
<script>
import api from '../../../../api'
import { groupBy, mapValues, uniqueId } from 'lodash'


export default {
    name: 'LicenseAndPermit',
    components: {
        LineChart: async () => await import('./LineChart.vue')
    },
    data() {
        return {
            rawData: {},
            uniqueId: uniqueId()
        }
    },
    async created() {
        this.rawData = await api.LicenseAndPermit.listAll()
        console.log(this.rawData)
    },
    computed: {

    },
    methods: {
        getAdmins () {
            return Object.keys(this.rawData)
        },
        groupDateValueByMonthAndYear (dateValue) {
            const fixData = mapValues(dateValue, (value, key) => ({date: key, value}))
            return groupBy(fixData, value => new Date(value.date).getMonth() + 1)
        }
    }
}
</script>