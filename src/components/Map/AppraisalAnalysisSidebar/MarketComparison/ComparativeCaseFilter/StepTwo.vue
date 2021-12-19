<template>
    <form novalidate class="md-layout" @submit.prevent="()=>{}">
        <md-card>
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
                                            <select>
                                                <option value="" disabled selected>縣市</option>
                                            </select>
                                        </div>
                                        <div class="form-item">
                                            <select>
                                                <option value="" disabled selected>鄉鎮市區</option>
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
                                            <input type="number" placeholder="輸入值">
                                        </div>
                                        <div class="text-item">公尺內(空間直線距離)</div>
                                    </div>
                                </div>
                                <!-- ------------------ -->
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">交易時間：</div>
                                        <input type="checkbox">
                                        <div class="text-item">近</div>
                                        <select>
                                            <option value="" disabled selected>不限</option>
                                        </select>
                                        <div class="text-item">年，</div>

                                        <input type="checkbox">
                                        <div class="form-item">
                                            <input type="number" placeholder="輸入值">
                                        </div>
                                        <div class="text-item">年至</div>
                                        <div class="form-item">
                                            <input type="number" placeholder="輸入值">
                                        </div>
                                        <div class="text-item">年</div>
                                    </div>
                                </div>
                                <!-- ------------------ -->
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">資產類型：</div>
                                        <select>
                                            <option value="" disabled selected>不限</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- ------------------ -->
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">面積坪數：</div>
                                        <input type="checkbox">
                                        <div class="text-item">近</div>
                                        <select>
                                            <option value="" disabled selected>不限</option>
                                        </select>
                                        <div class="text-item">年，</div>

                                        <input type="checkbox">
                                        <div class="form-item">
                                            <input type="number" placeholder="輸入值">
                                        </div>
                                        <div class="text-item">坪至</div>
                                        <div class="form-item">
                                            <input type="number" placeholder="輸入值">
                                        </div>
                                        <div class="text-item">坪</div>
                                    </div>
                                </div>
                                <!-- ------------------ -->
                                <div class="item-group-content">
                                    <div class="item-group-content">
                                        <input type="checkbox">
                                        <div class="text-item">屋齡：</div>
                                        <select>
                                            <option value="" disabled selected>不限</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button type="submit" class="vpmc-btn">篩選執行</md-button>
            </md-card-actions>
        </md-card>

    </form>
</template>
<script>
export default {
    name: 'StepTwo'
}
</script>
<style lang="scss" scoped>
@import './Step.scss';
</style>