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
            <div class="label-set">
              <p>1.資產類型：</p>
              <div class="radio-set">
                <input
                  type="radio"
                  id="land"
                  name="type"
                  value="land"
                  checked
                />
                <label for="land">土地</label>
              </div>
              <div class="radio-set">
                <input
                  type="radio"
                  id="building"
                  name="type"
                  value="building"
                />
                <label for="building">建物</label>
              </div>
              <div class="radio-set">
                <input type="radio" id="park" name="type" value="park" />
                <label for="park">車位</label>
              </div>
            </div>
          </div>

          <div class="content-row">
            <div class="label-set">
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
          </div>

          <div class="content-row">
            <div class="label-set">
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
          </div>

          <div class="content-row">
            <div class="label-set">
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
          </div>

          <div class="content-row">
            <div class="label-set">
              <p>5.土地面積：</p>
              <div class="radio-set">
                <input class="input-short" type="text" value="" />
              </div>
            </div>
          </div>
        </div>

        <span class="md-subheading">二、產權分析</span>
        <div class="section-content">
          <div class="content-row">
            <div class="label-set">
              <p>1.土地所有權人及權利範圍：</p>
              <div class="radio-set">
                <input
                  type="radio"
                  id="land"
                  name="type"
                  value="land"
                  checked
                />
                <label for="land">名下全部</label>
              </div>
            </div>
            <div class="label-set">
              <div class="radio-set">
                <input
                  type="radio"
                  id="building"
                  name="type"
                  value="building"
                />
                <label for="building">持分產權</label>
              </div>
            </div>
          </div>

          <div class="content-row">
            <div class="label-set">
              <p>2.他項權利：</p>
              <div class="radio-set">
                <input class="input-short" type="text" value="" />
              </div>
            </div>
          </div>
        </div>

        <span class="md-subheading">三、使用現況</span>
        <div class="section-content">
          <div class="content-row">
            <div class="label-set">
              <p>1.使用分區：</p>
              <div class="radio-set">
                <input
                  type="radio"
                  id="land"
                  name="type"
                  value="land"
                  checked
                />
                <label for="land">都市土地</label>
              </div>
            </div>
            <div class="label-set">
              <div class="radio-set">
                <input
                  type="radio"
                  id="building"
                  name="type"
                  value="building"
                />
                <label for="building">非都市土地</label>
              </div>
            </div>
          </div>
          <div class="content-row">
            <div class="label-set"><p>2.使用強度：</p></div>
            <div class="label-set">
              <p>法定建蔽率：</p>
              <div class="radio-set">
                <input class="input-short" type="text" value="" />
              </div>
            </div>
            <div class="label-set">
              <p>法定容積率：</p>
              <div class="radio-set">
                <input class="input-short" type="text" value="" />
              </div>
            </div>
          </div>
        </div>

        <span class="md-subheading">四、勘查日期及價格日期</span>
        <div class="section-content">
          <div class="content-row">
            <div class="label-set">
              <p>1.勘查日期：</p>
              <div class="radio-set">
                <input class="input-short" type="datetime" value="" />
              </div>
            </div>
            <div class="label-set">
              <p>. 2.價格日期：</p>
              <div class="radio-set">
                <input class="input-short" type="datetime" value="" />
              </div>
            </div>
          </div>
        </div>

        <span class="md-subheading">五、估價目的</span>
        <div class="section-content">
          <div class="content-row">
            <div class="label-set">
              <div class="radio-set">
                <select>
                  <option>資產價值證明</option>
                </select>
              </div>
            </div>
            <div class="label-set">
              <div class="radio-set">
                <input class="input-long" type="text" value="" />
              </div>
            </div>
          </div>
        </div>

        <span class="md-subheading">六、價格種類及估價條件</span>
        <div class="section-content">
          <div class="content-row-aa">
            <div class="label-set-aa">
              <p>1.價格種類：</p>
              <div class="radio-set">
                <select>
                  <option>正常價格</option>
                </select>
              </div>
            </div>

            <div class="label-set-aa">
              <p>2.評估權利種類：</p>
              <div class="radio-set">
                <select>
                  <option>所有權價值評估</option>
                </select>
              </div>
            </div>

            <div class="label-set-aa">
              <p>3.評價條件：</p>
              <div class="radio-set">
                <input class="input-short" type="text" value="" />
              </div>
            </div>
          </div>
        </div>

        <span class="md-subheading">七、現場勘查情形說明</span>
        <div class="section-content">
          <div class="content-row-aa">
            <div class="label-set-aa">
              <p>1.勘領人姓名：</p>
              <div class="radio-set">
                <input class="input-short" type="text" value="" />
              </div>
            </div>

            <div class="label-set-aa">
              <p>2.勘領說明事項：</p>
              <div class="radio-set">
                <input class="input-short" type="text" value="" />
              </div>
            </div>

            <div class="label-set-aa">
              <p>3.現勘照片：</p>
              <md-field>
                <label>點此上傳檔案</label>
                <md-file v-model="transcriptFile" />
              </md-field>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button>新增</button>
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
  align-items: stretch;
  .step-container {
    width: 460px;
    padding: 5px;
    margin: 5px;
    border-width: 1px;
    border-style: solid;
    .section-container {
      padding: 5px;
      .section-content {
        margin-left: 25px;
        .content-row-aa {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .label-set-aa {
            display: flex;
            align-items: center;
          }
        }
        .content-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;

          .label-set {
            display: flex;
            align-items: center;
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
}
</style>