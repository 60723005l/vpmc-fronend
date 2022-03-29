<template>
  <form novalidate class="md-layout" @submit.prevent="() => {}">
    <md-card class="form-card">
      <md-card-content>
        <div class="vpmc-step-form-wraper">
          <div class="vpmc-Step-title">步驟二：比較標的篩選條件模式</div>
          <div class="vpmc-step-content">
            <div class="vpmc-step-item-group">
              <div class="item-group-title">篩選條件模式：</div>
              <div class="item-group-content">
                <input type="radio" v-model="mode" :value="MODE.SMART" />
                <div class="text-item">
                  系統智選模式(智選至少三個/選取數量另由參數設定作調整)
                </div>
              </div>
              <div class="col-item">
                <div class="item-group-content">
                  <input type="radio" v-model="mode" :value="MODE.MANUAL" />
                  <div class="text-item">自行選取模式</div>
                </div>
                <fieldset
                  class="dens-fieldset"
                  :disabled="mode !== MODE.MANUAL"
                >
                  <div class="item-group-content">
                    <div class="item-group-content">
                      <input type="checkbox" />
                      <div class="text-item">行政區：</div>
                      <div class="form-item">
                        <select
                          v-model="county.vm"
                          @change="handleCountySelect"
                        >
                          <option value="" disabled selected>縣市</option>
                          <option
                            v-for="(item, index) in county.datas"
                            :key="index"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                      <div class="form-item">
                        <select v-model="town.vm">
                          <option value="" disabled selected>鄉鎮市區</option>
                          <option
                            v-for="(item, index) in town.datas"
                            :key="index"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <!-- ------------------ -->
                  <div class="item-group-content">
                    <div class="item-group-content">
                      <input type="checkbox" />
                      <div class="text-item">距離：</div>
                      <div class="text-item">距勘估標的</div>
                      <div class="form-item">
                        <input
                          type="number"
                          placeholder="輸入值"
                          v-model="distance.vm"
                        />
                      </div>
                      <div class="text-item">公尺內(空間直線距離)</div>
                    </div>
                  </div>
                  <!-- ------------------ -->
                  <div class="item-group-content">
                    <div class="item-group-content row-item">
                      <div class="row-item">
                        <input type="checkbox" v-model="transTime.enable" />
                        <div class="text-item">交易時間：</div>
                      </div>
                      <fieldset
                        class="item-group-content dens-fieldset col-item"
                        :disabled="!transTime.enable"
                      >
                        <!-- <div class="row-item">
                          <input
                            type="radio"
                            v-model="transTime.mode"
                            :value="MODE.NOLIMIT"
                            @change="
                              () => {
                                transTime.vm.startDate.vm = '1911';
                                transTime.vm.endDate.vm = '2099';
                              }
                            "
                          />
                          <div class="text-item">不限</div>
                        </div> -->
                        <div class="row-item">
                          <!-- <input
                            type="radio"
                            v-model="transTime.mode"
                            :value="MODE.MANUAL"
                          /> -->
                          <fieldset class="dens-fieldset row-item">
                            <!-- <input  :disabled="transTime.mode !== MODE.MANUAL"
                              class="form-item"
                              type="number"
                              min="1911"
                              :max="transTime.vm.endDate.vm"
                              placeholder="輸入值"
                              v-model="transTime.vm.startDate.vm"
                            />
                            <div class="text-item">年至</div>
                            <input
                              class="form-item"
                              type="number"
                              :min="Number(transTime.vm.startDate.vm) + 1"
                              max="2099"
                              placeholder="輸入值"
                              v-model="transTime.vm.endDate.vm"
                            />
                            <div class="text-item">年</div> -->
                            <select v-model="transTime.vm.dateDelta.vm">
                              <option
                                v-for="(year, index) in transTime.vm.dateDelta
                                  .datas"
                                :value="year.value"
                                :key="index"
                              >
                                {{ year.name }}
                              </option>
                            </select>
                          </fieldset>
                          年內
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <!-- ------------------ -->
                  <div class="item-group-content">
                    <div class="item-group-content row-item">
                      <div class="row-item">
                        <input type="checkbox" v-model="assert.enable" />
                        <div class="text-item">資產類型：</div>
                      </div>
                      <fieldset
                        class="item-group-content dens-fieldset col-item"
                        :disabled="!assert.enable"
                      >
                        <select v-model="assert.vm">
                          <option
                            v-for="(assertType, index) in assert.datas"
                            :key="index"
                            :value="assertType.value"
                          >
                            {{ assertType.name }}
                          </option>
                        </select>
                        <!-- <div class="row-item">
                                                    <input type="radio" v-model="assert.mode" :value="MODE.NOLIMIT"/>
                                                    <div class="text-item">不限</div>
                                                </div>
                                                <div class="row-item">
                                                    <input type="radio" v-model="assert.mode" :value="MODE.MANUAL"/>
                                                    <select v-model="assert.vm" :disabled="assert.mode !== MODE.MANUAL">
                                                        <option v-for="(assertType, index) in assert.datas" :key="index" :value="assertType">{{assertType}}</option>
                                                    </select>
                                                </div> -->
                      </fieldset>
                    </div>
                  </div>
                  <!-- ------------------ -->
                  <div class="item-group-content">
                    <div class="item-group-content row-item">
                      <div class="row-item">
                        <input type="checkbox" v-model="unitArea.enable" />
                        <div class="text-item">面積坪數：</div>
                      </div>
                      <fieldset
                        class="item-group-content dens-fieldset col-item"
                      >
                        <select v-model="unitArea.vm">
                          <option
                            v-for="(data, index) in unitArea.datas"
                            :value="data.value"
                            :key="index"
                          >
                            {{ data.name }}
                          </option>
                        </select>
                      </fieldset>
                      <!-- <fieldset
                        class="item-group-content dens-fieldset col-item"
                        :disabled="!unitArea.enable"
                      >
                        <div class="row-item">
                          <input
                            type="radio"
                            v-model="unitArea.mode"
                            :value="MODE.NOLIMIT"
                            @change="
                              () => {
                                unitArea.vm.minArea.vm = '0';
                                unitArea.vm.maxArea.vm = '10000';
                              }
                            "
                          />
                          <div class="text-item">不限</div>
                        </div>
                        <div class="row-item">
                          <input
                            type="radio"
                            v-model="unitArea.mode"
                            :value="MODE.MANUAL"
                          />
                          <fieldset
                            class="dens-fieldset row-item"
                            :disabled="unitArea.mode !== MODE.MANUAL"
                          >
                            <input
                              class="form-item"
                              type="number"
                              placeholder="輸入值"
                              min="0"
                              max="10000"
                              v-model="unitArea.vm.minArea.vm"
                            />
                            <div class="text-item">坪至</div>
                            <input
                              class="form-item"
                              type="number"
                              placeholder="輸入值"
                              min="0"
                              max="10000"
                              v-model="unitArea.vm.maxArea.vm"
                            />
                            <div class="text-item">坪</div>
                          </fieldset>
                        </div>
                      </fieldset> -->
                    </div>
                  </div>
                  <!-- ------------------ -->
                  <div class="item-group-content">
                    <div class="item-group-content row-item">
                      <div class="row-item">
                        <input type="checkbox" v-model="age.enable" />
                        <div class="text-item">屋　　齡：</div>
                      </div>

                      <fieldset
                        class="item-group-content dens-fieldset col-item"
                      >
                        <select v-model="age.vm">
                          <option
                            v-for="(data, index) in age.datas"
                            :value="data.value"
                            :key="index"
                          >
                            {{ data.name }}
                          </option>
                        </select>
                      </fieldset>
                      <!-- <fieldset
                        class="item-group-content dens-fieldset col-item"
                        :disabled="!age.enable"
                      >
                        <div class="row-item">
                          <input
                            type="radio"
                            v-model="age.mode"
                            :value="MODE.NOLIMIT"
                          />
                          <div class="text-item">不限</div>
                        </div>
                        <div class="row-item">
                          <input
                            type="radio"
                            v-model="age.mode"
                            :value="MODE.MANUAL"
                          />
                          <input
                            type="number"
                            min="0"
                            max="10000"
                            v-model="age.vm"
                            :disabled="age.mode !== MODE.MANUAL"
                          />
                          年
                        </div>
                      </fieldset> -->
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button type="submit" class="vpmc-btn" @click="handleSubmit"
          >篩選執行</md-button
        >
      </md-card-actions>
    </md-card>
  </form>
</template>
<script>
import api from "../../../../../api";
import moment from "moment";

const MODE = {
  MANUAL: "MANUAL",
  SMART: "SMART",
  NOLIMIT: "NOLIMIT",
};

class FormItem {
  constructor(name, vm, datas, mode) {
    this.name = name;
    this.vm = vm;
    this.enable = true;
    this.datas = datas;
    this.mode = mode || MODE.NOLIMIT;
  }
}

export default {
  name: "StepTwo",
  data() {
    return {
      MODE: MODE,
      mode: MODE.MANUAL,
      county: new FormItem("縣市", undefined, []),
      town: new FormItem("鄉鎮市", "大園區", []),
      distance: new FormItem("距離", 100),
      assert: new FormItem(
        "assert",
        "華廈",
        [
          { name: "不限", value: MODE.NOLIMIT },
          { name: "住宅（公寓）", value: "公寓" },
          { name: "住宅（華廈）", value: "華廈" },
          { name: "住宅（大樓）", value: "住宅大樓" },
          { name: "住宅（透天厝）", value: "透天厝" },
          { name: "土地", value: "土地" },
          { name: "店面", value: "店面" },
          { name: "辦公商業大樓", value: "辦公商業大樓" },
          { name: "車位", value: "車位" },
        ],
        MODE.NOLIMIT
      ),
      transTime: new FormItem("transTime", {
        // startDate: new FormItem("startDate", 2010),
        // endDate: new FormItem("endDate", 2022),
        dateDelta: new FormItem("dateDelta", 2022, [
          { name: "不限", value: 2017 },
          { name: "0", value: 2022 },
          { name: "1", value: 2021 },
          { name: "2", value: 2020 },
          { name: "3", value: 2019 },
          { name: "4", value: 2018 },
          { name: "5", value: 2017 },
        ]),
      }),
      unitArea: new FormItem(
        "unitArea",
        "0-10000",
        [
          { name: "不限", value: "0-10000" },
          { name: "小於25坪", value: "0-25" },
          { name: "25-50坪", value: "25-50" },
          { name: "50-80坪", value: "50-80" },
          { name: "大於80坪", value: "80-10000" },
        ],
        MODE.MANUAL
      ),
      age: new FormItem("age", "0-100", [
        { name: "不限", value: "0-100" },
        { name: "小於5年", value: "0-5" },
        { name: "5~10年", value: "5-10" },
        { name: "10~20年", value: "10-20" },
        { name: "20~30年", value: "20-30" },
        { name: "大於30年", value: "30-100" },
      ]),
    };
  },
  async created() {
    this.county.datas = await api.Utilities.getAllCounties();
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();

      const parmas = {
        county: this.county.vm,
        town: this.town.vm,
        transactionInterval:
          String(this.transTime.vm.dateDelta.vm) +
          "/01/01" +
          "-" +
          //   String(this.transTime.vm.endDate.vm) +
          "2022/01/01",
        assertType: this.assert.vm,
        totalUnitsInterval: this.unitArea.vm,
        age: this.age.vm,
        distance: this.distance.vm,
      };

      // const resp = await api.Transaction.getRegionHistory({...this.selected})
      this.$emit("submit", parmas);
    },
    async handleCountySelect() {
      this.town.datas = await api.Utilities.getTownFromCounty({
        county: this.county.vm,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./Step.scss";
.dens-fieldset {
  padding: 0;
  margin: 0;
  border: 0;
}
</style>