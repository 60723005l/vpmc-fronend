<template>
    <form novalidate class="md-layout" @submit.prevent="()=>{}">
        <md-card>
            <md-card-content>
                <div class="vpmc-step-form-wraper">
                    <div class="vpmc-Step-title">步驟一：載入勘估標的位置</div>
                    <div class="vpmc-step-content">
                        <div class="vpmc-step-item-group">
                            <div class="item-group-title">一、地號：</div>
                            <div class="item-group-content">
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
                                <div class="text-item">段小段：</div>
                                <div class="form-item">
                                    <select>
                                        <option value="" disabled selected>小段</option>
                                    </select>
                                </div>
                                <div class="form-item">
                                    <input type="text" placeholder="請輸入地號">
                                </div>
                            </div>
                        </div>
                        <!-- ------------------------------- -->
                        <div class="vpmc-step-item-group">
                            <div class="item-group-title">二、門牌：</div>
                            <div class="item-group-content">
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
                                <div class="form-item">
                                    <input type="text" placeholder="請輸入路段門牌">
                                </div>
                            </div>
                        </div>
                        <!-- ------------------------------- -->
                        <div class="vpmc-step-item-group">
                            <div class="item-group-title">三、WGS84座標：</div>
                            <div class="item-group-content">
                                <div class="text-item">緯度：</div>
                                <div class="form-item">
                                    <input type="number" placeholder="輸入值">
                                </div>
                                <div class="text-item">經度：</div>
                                <div class="form-item">
                                    <input type="number" placeholder="輸入值">
                                </div>
                            </div>
                        </div>
                        <!-- ------------------------------- -->
                        <div class="vpmc-step-item-group">
                            <div class="item-group-title">四、CCIS案件編號：</div>
                            <div class="item-group-content">
                                <div class="form-item">
                                    <input type="text" placeholder="輸入值( 10位數字編碼)">
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button type="submit" class="vpmc-btn">定位執行</md-button>
            </md-card-actions>
        </md-card>

    </form>
</template>
<script>
export default {
    name: 'StepOne'
}
</script>
<style lang="scss" scoped>
@import './Step.scss';
</style>