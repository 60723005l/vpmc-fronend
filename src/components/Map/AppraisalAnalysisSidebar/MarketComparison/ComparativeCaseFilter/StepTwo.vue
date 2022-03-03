<template>
    <form novalidate class="md-layout" @submit.prevent="()=>{}">
        <md-card class="form-card">
            <md-card-content>
                <div class="vpmc-step-form-wraper">
                    <div class="vpmc-Step-title">步驟二：比較標的篩選條件模式</div>
                    <div class="vpmc-step-content">
                        <div class="vpmc-step-item-group">
                            <div class="item-group-title">篩選條件模式：</div>
                            <div class="item-group-content">
                                <input type="checkbox">
                                <div class="text-item">系統智選模式(智選至少三個/選取數量另由參數設定作調整)</div>
                            </div>
                            <div class="col-item">
                                <div class="item-group-content">
                                    <input type="checkbox">
                                    <div class="text-item">自行選取模式</div>
                                </div>
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">行政區：</div>
                                        <div class="form-item">
                                            <select v-model="county.vm" @change="handleCountySelect">
                                                <option value="" disabled selected>縣市</option>
                                                <option v-for="(item, index) in county.datas" :key="index">{{item}}</option>
                                            </select>
                                        </div>
                                        <div class="form-item">
                                            <select v-model="town.vm">
                                                <option value="" disabled selected>鄉鎮市區</option>
                                                <option v-for="(item, index) in town.datas" :key="index">{{item}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- ------------------ -->
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">距離：</div>
                                        <div class="text-item">距勘估標的</div>
                                        <div class="form-item">
                                            <input type="number" placeholder="輸入值" v-model="distance.vm">
                                        </div>
                                        <div class="text-item">公尺內(空間直線距離)</div>
                                    </div>
                                </div>
                                <!-- ------------------ -->
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">交易時間：</div>
                                        <div class="form-item">
                                            <input type="date" placeholder="輸入值" min="1911-01-01" v-model="transStartDate.vm">
                                        </div>
                                        <div class="text-item">年至</div>
                                        <div class="form-item">
                                            <input type="date" placeholder="輸入值" max="2030-01-01" v-model="transEndDate.vm">
                                        </div>
                                        <div class="text-item">年</div>
                                    </div>
                                </div>
                                <!-- ------------------ -->
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">資產類型：</div>
                                        <select v-model="assert.vm">
                                            <option v-for="(assertType, index) in assert.datas" :key="index" :value="assertType">{{assertType}}</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- ------------------ -->
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">面積坪數：</div>
                                        <div class="form-item">
                                            <input type="number" placeholder="輸入值" min="0" v-model="unitMinArea.vm">
                                        </div>
                                        <div class="text-item">坪至</div>
                                        <div class="form-item">
                                            <input type="number" placeholder="輸入值" min="0" v-model="unitMaxArea.vm">
                                        </div>
                                        <div class="text-item">坪</div>
                                    </div>
                                </div>
                                <!-- ------------------ -->
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">屋齡：</div>
                                        <input type="number" v-model="age.vm">
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button type="submit" class="vpmc-btn" @click="handleSubmit">篩選執行</md-button>
            </md-card-actions>
        </md-card>

    </form>
</template>
<script>
import api from '../../../../../api'
import moment from 'moment'
import MarketComparisonVue from '../MarketComparison.vue'

class FormItem {
    constructor (name ,vm, datas) {
        this.name = name
        this.vm = vm
        this.disable = false
        this.datas = datas
    }
}

export default {
    name: 'StepTwo',
    data() {
        return {
            county: new FormItem('縣市', undefined, []),
            town: new FormItem('鄉鎮市', '大園區', []),
            distance: new FormItem('距離', 100),
            assert: new FormItem('assert', '華廈', ['公寓', '住宅大樓', '華廈', '套房', '店面']),
            transStartDate: new FormItem('transStartDate', moment('1911-01-01').format('YYYY-MM-DD')),
            transEndDate: new FormItem('transEndDate', moment('2023-01-01').format('YYYY-MM-DD')),
            unitMinArea: new FormItem('unitMinArea', 0),
            unitMaxArea: new FormItem('unitMaxArea', 1000),
            age: new FormItem('age', 50)
        }
    },
    async created()
        {
            this.county.datas = await api.Utilities.getAllCounties()
        },
    methods:
        {
            async handleSubmit(e){
                e.preventDefault()
                
                const parmas = {
                        county: this.county.vm,
                        town: this.town.vm,
                        transactionInterval: moment(this.transStartDate.vm).format('YYYY/MM/DD') + '-' + moment(this.transEndDate.vm).format('YYYY/MM/DD'),
                        assertType: this.assert.vm,
                        totalUnitsInterval: this.unitMinArea.vm + '-' + this.unitMaxArea.vm,
                        age: this.age.vm,
                        distance: this.distance.vm
                    }

                // const resp = await api.Transaction.getRegionHistory({...this.selected})
                this.$emit('submit', parmas)
            },
            async handleCountySelect() {
                this.town.datas = await api.Utilities.getTownFromCounty({
                    county: this.county.vm
                })
            }
        }
}
</script>
<style lang="scss" scoped>
@import './Step.scss';
</style>