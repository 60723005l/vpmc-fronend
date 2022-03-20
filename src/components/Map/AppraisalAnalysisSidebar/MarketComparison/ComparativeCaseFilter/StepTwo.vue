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
                                <input type="radio" v-model="mode" :value="MODE.SMART">
                                <div class="text-item">系統智選模式(智選至少三個/選取數量另由參數設定作調整)</div>
                            </div>
                            <div class="col-item">
                                <div class="item-group-content">
                                    <input type="radio" v-model="mode" :value="MODE.MANUAL">
                                    <div class="text-item">自行選取模式</div>
                                </div>
                                <fieldset class="dens-fieldset" :disabled="mode !== MODE.MANUAL">
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
                                        <div class="item-group-content row-item">
                                            <div class="row-item">
                                                <input type="checkbox" v-model="transTime.enable">
                                                <div class="text-item">交易時間：</div>
                                            </div>
                                            <fieldset class="item-group-content dens-fieldset col-item" :disabled="!transTime.enable">
                                                <div class="row-item">
                                                    <input type="radio" v-model="transTime.mode" :value="MODE.NOLIMIT"
                                                        @change="() => {
                                                            transTime.vm.startDate.vm = '1911'
                                                            transTime.vm.endDate.vm = '2099'
                                                        }"/>
                                                    <div class="text-item">不限</div>
                                                </div>
                                                <div class="row-item">
                                                    <input type="radio" v-model="transTime.mode" :value="MODE.MANUAL"/>
                                                    <fieldset class="dens-fieldset row-item" :disabled="transTime.mode !== MODE.MANUAL">
                                                        <input class="form-item" type="number" min="1911" :max="transTime.vm.endDate.vm" placeholder="輸入值" v-model="transTime.vm.startDate.vm">
                                                        <div class="text-item">年至</div>
                                                        <input class="form-item" type="number" :min="Number(transTime.vm.startDate.vm) + 1" max="2099" placeholder="輸入值" v-model="transTime.vm.endDate.vm">
                                                        <div class="text-item">年</div>
                                                    </fieldset>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <!-- ------------------ -->
                                    <div class="item-group-content">
                                        <div class="item-group-content row-item">
                                            <div class="row-item">
                                                <input type="checkbox" v-model="assert.enable">
                                                <div class="text-item">資產類型：</div>
                                            </div>
                                            <fieldset class="item-group-content dens-fieldset col-item" :disabled="!assert.enable">
                                                <div class="row-item">
                                                    <input type="radio" v-model="assert.mode" :value="MODE.NOLIMIT"/>
                                                    <div class="text-item">不限</div>
                                                </div>
                                                <div class="row-item">
                                                    <input type="radio" v-model="assert.mode" :value="MODE.MANUAL"/>
                                                    <select v-model="assert.vm" :disabled="assert.mode !== MODE.MANUAL">
                                                        <option v-for="(assertType, index) in assert.datas" :key="index" :value="assertType">{{assertType}}</option>
                                                    </select>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <!-- ------------------ -->
                                    <div class="item-group-content">
                                        <div class="item-group-content row-item">
                                            <div class="row-item">
                                                <input type="checkbox" v-model="unitArea.enable">
                                                <div class="text-item">面積坪數：</div>
                                            </div>
                                            <fieldset class="item-group-content dens-fieldset col-item" :disabled="!unitArea.enable">
                                                <div class="row-item">
                                                    <input type="radio" v-model="unitArea.mode" :value="MODE.NOLIMIT"
                                                        @change="() => {
                                                            unitArea.vm.minArea.vm = '0'
                                                            unitArea.vm.maxArea.vm = '10000'
                                                        }"/>
                                                    <div class="text-item">不限</div>
                                                </div>
                                                <div class="row-item">
                                                    <input type="radio" v-model="unitArea.mode" :value="MODE.MANUAL"/>
                                                    <fieldset class="dens-fieldset row-item" :disabled="unitArea.mode !== MODE.MANUAL">
                                                        <input class="form-item" type="number" placeholder="輸入值" min="0" max="10000" v-model="unitArea.vm.minArea.vm">
                                                        <div class="text-item">坪至</div>
                                                        <input class="form-item" type="number" placeholder="輸入值" min="0" max="10000" v-model="unitArea.vm.maxArea.vm">
                                                        <div class="text-item">坪</div>
                                                    </fieldset>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <!-- ------------------ -->
                                    <div class="item-group-content">
                                        <div class="item-group-content row-item">
                                            <div class="row-item">
                                                <input type="checkbox" v-model="age.enable">
                                                <div class="text-item">屋　　齡：</div>
                                            </div>
                                            
                                            <fieldset class="item-group-content dens-fieldset col-item" :disabled="!age.enable">
                                                <div class="row-item">
                                                    <input type="radio" v-model="age.mode" :value="MODE.NOLIMIT"/>
                                                    <div class="text-item">不限</div>
                                                </div>
                                                <div class="row-item">
                                                    <input type="radio" v-model="age.mode" :value="MODE.MANUAL"/>
                                                    <input type="number" min="0" max="10000" v-model="age.vm" :disabled="age.mode !== MODE.MANUAL">
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </fieldset>
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

const MODE = {
    MANUAL: 'MANUAL',
    SMART: 'SMART',
    NOLIMIT: 'NOLIMIT'
}

class FormItem {
    constructor (name ,vm, datas, mode) {
        this.name = name
        this.vm = vm
        this.enable = true
        this.datas = datas
        this.mode = mode || MODE.NOLIMIT
    }
}

export default {
    name: 'StepTwo',
    data() {
        return {
            MODE: MODE,
            mode: MODE.MANUAL,
            county: new FormItem('縣市', undefined, []),
            town: new FormItem('鄉鎮市', '大園區', []),
            distance: new FormItem('距離', 100),
            assert: new FormItem('assert', '華廈', ['公寓', '住宅大樓', '華廈', '套房', '店面'], MODE.NOLIMIT),
            transTime: new FormItem(
                'transTime',
                {
                    startDate: new FormItem('startDate',1911),
                    endDate: new FormItem('endDate', 2099),
                }
            ),
            unitArea: new FormItem(
                'unitArea',
                {
                    minArea: new FormItem('minArea', 0),
                    maxArea: new FormItem('maxArea', 1000)
                },
                MODE.MANUAL
            ),
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
                        transactionInterval: String(this.transTime.vm.startDate.vm)+'/01/01' + '-' + String(this.transTime.vm.endDate.vm)+'/01/01',
                        assertType: this.assert.vm,
                        totalUnitsInterval: this.unitArea.vm.minArea.vm + '-' + this.unitArea.vm.maxArea.vm,
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
.dens-fieldset{
    padding: 0;
    margin: 0;
    border: 0;
}
</style>