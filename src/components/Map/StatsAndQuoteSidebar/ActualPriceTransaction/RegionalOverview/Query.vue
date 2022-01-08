<template>
    <form class="Query-root" @submit="handleSubmit">
        <select>
            <option value="視窗範圍內">視窗範圍內</option>
            <option value="行政區統計">行政區統計</option>
            <option value="自行劃定範圍">自行劃定範圍</option>
        </select>
        <select v-model="selected.county" @change="handleCountySelected">
            <option value="" disabled selected>行政區</option>
            <option v-for="(county, i) in counties" :key="i" :value="county">{{county}}</option>
        </select>
        <select v-model="selected.town" @change="handleTownSelected">
            <option value="" disabled selected>鄉鎮市區</option>
            <option v-for="(town, i) in towns" :key="i" :value="town">{{town}}</option>
        </select>
        <select v-model="selected.village">
            <option value="" disabled selected>村里別</option>
            <option v-for="(village, i) in villages" :key="i" :value="village">{{village}}</option>
        </select>
        <md-button type="submit" class="md-icon-button vpmc-btn">
            <md-icon>search</md-icon>
        </md-button>
    </form>
</template>
<script>
import api from '../../../../../api'

export default {
    name: 'Query',
    data(){
        return {
            selected: { county: undefined, town: undefined, village: undefined },
            counties: [],
            towns: [],
            villages: []
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
                const resp = await api.Transaction.getRegionHistory({...this.selected})
                this.$emit('submit', resp)
            },
            async handleCountySelected() {
                this.towns = await api.Utilities.getTownFromCounty({
                    county: this.selected.county
                })
            },
            async handleTownSelected() {
                this.villages = await api.Utilities.getVillageFromCountyTown({
                    county: this.selected.county,
                    town: this.selected.town
                })
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