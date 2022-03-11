<template>
  <div class="sheet-container">
    <div class="step-container">
      <span class="md-title">步驟一：載入勘估標的土地/建物謄本</span>
      <md-field>
        <label>點此上傳檔案</label>
        <md-file v-model="transcriptFile" />
      </md-field>
    </div>

    <div class="step-container">
      <span class="md-title">步驟二：輸入勘估標的基本資料</span>

      <div class="section-container">
        <span class="md-subheading">一、標的內容</span>
        <div class="section-content">
          <div class="content-row">
            <p>1.資產類型：</p>
            <div class="radio-set">
              <input type="radio" id="land" name="type" value="land" checked />
              <label for="land">土地</label>
            </div>
            <div class="radio-set">
              <input type="radio" id="building" name="type" value="building" />
              <label for="building">建物</label>
            </div>
            <div class="radio-set">
              <input type="radio" id="park" name="type" value="park" />
              <label for="park">車位</label>
            </div>
          </div>

          <div class="content-row">
            <p>2.土地標示：</p>
            <div class="radio-set">
              <select>
                <option>台北市</option>
              </select>
            </div>
            <div class="radio-set">
              <select>
                <option>中山區</option>
              </select>
            </div>
            <p>段小段：</p>
            <div class="radio-set">
              <input class="input-short" type="text" value="" />
              <input class="input-short" type="text" value="" />
            </div>
          </div>

          <div class="content-row">
            <p>3.建物標示：</p>
            <div class="radio-set">
              <select>
                <option>台北市</option>
              </select>
            </div>
            <div class="radio-set">
              <select>
                <option>中山區</option>
              </select>
            </div>
            <p>段小段：</p>
            <div class="radio-set">
              <input class="input-short" type="text" value="" />
              <input class="input-short" type="text" value="" />
            </div>
          </div>

          <div class="content-row">
            <p>4.建物門牌：</p>
            <div class="radio-set">
              <select>
                <option>台北市</option>
              </select>
            </div>
            <div class="radio-set">
              <select>
                <option>中山區</option>
              </select>
            </div>
            <div class="radio-set">
              <input class="input-long" type="text" value="" />
            </div>
          </div>

          <div class="content-row">
            <p>5.土地面積：</p>
            <div class="radio-set">
              <input class="input-short" type="text" value="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandSheet",
  data() {
    return {
      transcriptFile: undefined,
    };
  },
  methods: {
    handleBtnClick: (src) => {},
  },
};
</script>

<style lang="scss" scoped>
.sheet-container {
  height: fit-content;
  display: flex;
  flex-direction: column;
  .step-container {
    padding: 5px;
    margin: 5px;
    border-width: 1px;
    border-style: solid;
    .section-container {
      padding: 5px;
      .section-content {
        margin-left: 25px;
        .content-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
          .radio-set {
            display: flex;
            flex-direction: row;

            .input-long {
              width: 100px;
            }
            .input-short {
              width: 70px;
            }
          }
        }
      }
    }
  }
}
</style>