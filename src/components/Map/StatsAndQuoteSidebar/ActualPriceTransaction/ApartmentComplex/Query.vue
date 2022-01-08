<template>
    <form class="Query-root" @submit="handleSubmit">
        <select v-model="selected.county" @change="handleCountySelected">
            <option value="" disabled selected>行政區</option>
            <option v-for="(county, i) in counties" :key="i" :value="county">{{county}}</option>
        </select>
        <select v-model="selected.town" @change="handleTownSelected">
            <option value="" disabled selected>鄉鎮市區</option>
            <option v-for="(town, i) in towns" :key="i" :value="town">{{town}}</option>
        </select>
        <select v-model="selected.village" @change="handleVillageSelected">
            <option value="" disabled selected>村里別</option>
            <option v-for="(village, i) in villages" :key="i" :value="village">{{village}}</option>
        </select>
        <select v-model="selected.commitee">
            <option value="" disabled selected>---</option>
            <option v-for="(commitee, i) in commitees" :key="i" :value="commitee">{{commitee}}</option>
        </select>
        <md-button type="submit" class="md-icon-button vpmc-btn">
            <md-icon>search</md-icon>
        </md-button>
    </form>
</template>
<script>
import api from '../../../../../api'
import { omit, pick } from 'lodash'

export default {
    name: 'Query',
    data(){
        return {
            selected: { county: undefined, town: undefined, village: undefined, commitee: undefined },
            counties: [],
            towns: [],
            villages: [],
            commitees: []
        }
    },
    async created()
        {
            this.counties = await api.Utilities.getAllCounties()
        },
    methods:
        {
            async handleSubmit(e){
                e.preventDefault()
                const resp = await api.Transaction.getCommitteeHistory({name: this.selected.commitee})
                this.$emit('submit', resp)
            },
            async handleCountySelected() {
                this.towns = await api.Utilities.getTownFromCounty({...pick(this.selected, ['county'])})
            },
            async handleTownSelected() {
                this.villages = await api.Utilities.getVillageFromCountyTown({...pick(this.selected, ['county', 'town'])})
            },
            async handleVillageSelected() {
                this.commitees = await api.Transaction.getCommittee({...omit(this.selected, ['commitee'])})
            }
        }
}
</script>
<style lang="scss" scoped>
.Query-root{
    display: flex;
    align-items: center;
    select{
        height: min-content;
        padding: 5px;
    }
}
</style>d