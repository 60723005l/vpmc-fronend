<template>
  <div class="sheet-container">
    <button @click="handleRepositoryClick">{{ optionName }}</button>

    <div class="sheet-form" v-if="mode === 'edit' || mode === 'update'">
      <div class="step-container">
        <span class="md-title">步驟一：載入勘估標的土地/建物謄本</span>
        <md-field>
          <label>點此上傳檔案</label>
          <md-file
            v-model="buildSheetData.transcriptFileName"
            @md-change="handleTranscriptFileSelect"
          />
          <button
            v-if="mode === 'update'"
            @click="
              downloadFile(
                buildSheetData.transcriptFile,
                buildSheetData.transcriptFileName
              )
            "
          >
            點此下載檔案
          </button>
        </md-field>
      </div>

      <div class="step-container">
        <span class="md-title">步驟二：輸入勘估標的基本資料</span>
        <div class="section-container">
          <span class="md-subheading">一、標的內容</span>
          <div class="section-content">
            <!-- <div class="content-row">
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
          </div> -->

            <div class="content-row">
              <div class="label-set">
                <p>1.土地標示：</p>
                <div class="radio-set">
                  <select
                    class="input-short"
                    v-model="buildSheetData.objectContent.landMark.county"
                    @change="
                      handleCountySelect(
                        buildSheetData.objectContent.landMark.county,
                        'land'
                      )
                    "
                  >
                    <option
                      v-for="(county, index) in countyData"
                      :key="index"
                      :id="index"
                    >
                      {{ county }}
                    </option>
                  </select>
                </div>
                <div class="radio-set">
                  <select
                    class="input-short"
                    v-model="buildSheetData.objectContent.landMark.village"
                  >
                    <option
                      v-for="(village, index) in landVillageData"
                      :key="index"
                      :id="index"
                    >
                      {{ village }}
                    </option>
                  </select>
                </div>
                <p>段小段：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="text"
                    v-model="buildSheetData.objectContent.landMark.name"
                    placeholder="段名"
                  />
                  <input
                    class="input-short"
                    type="text"
                    v-model="buildSheetData.objectContent.landMark.code"
                    placeholder="地號"
                  />
                </div>
              </div>
            </div>

            <div class="content-row">
              <div class="label-set">
                <p>2.建物標示：</p>
                <div class="radio-set">
                  <select
                    class="input-short"
                    v-model="buildSheetData.objectContent.buildMark.county"
                    @change="
                      handleCountySelect(
                        buildSheetData.objectContent.buildMark.county,
                        'build'
                      )
                    "
                  >
                    <option
                      v-for="(county, index) in countyData"
                      :key="index"
                      :id="index"
                    >
                      {{ county }}
                    </option>
                  </select>
                </div>
                <div class="radio-set">
                  <select
                    class="input-short"
                    v-model="buildSheetData.objectContent.buildMark.village"
                  >
                    <option
                      v-for="(village, index) in buildVillageData"
                      :key="index"
                      :id="index"
                    >
                      {{ village }}
                    </option>
                  </select>
                </div>
                <p>段小段：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="text"
                    v-model="buildSheetData.objectContent.buildMark.name"
                    placeholder="段名"
                  />
                  <input
                    class="input-short"
                    type="text"
                    v-model="buildSheetData.objectContent.buildMark.code"
                    placeholder="地號"
                  />
                </div>
              </div>
            </div>

            <div class="content-row">
              <div class="label-set">
                <p>3.建物門牌：</p>
                <div class="radio-set">
                  <select
                    class="input-short"
                    v-model="buildSheetData.objectContent.address.county"
                    @change="
                      handleCountySelect(
                        buildSheetData.objectContent.address.county,
                        'address'
                      )
                    "
                  >
                    <option
                      v-for="(county, index) in countyData"
                      :key="index"
                      :id="index"
                    >
                      {{ county }}
                    </option>
                  </select>
                </div>
                <div class="radio-set">
                  <select
                    class="input-short"
                    v-model="buildSheetData.objectContent.address.village"
                  >
                    <option
                      v-for="(village, index) in addressVillageData"
                      :key="index"
                      :id="index"
                    >
                      {{ village }}
                    </option>
                  </select>
                </div>
                <div class="radio-set">
                  <input
                    class="input-long"
                    type="text"
                    v-model="buildSheetData.objectContent.address.address"
                    placeholder="輸入範例: 一段1巷1弄1號5樓"
                  />
                </div>
              </div>
            </div>

            <div class="content-row">
              <div class="label-set">
                <p>4.土地面積：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="number"
                    value=""
                    v-model="buildSheetData.objectContent.landArea"
                  />
                </div>
                <div class="radio-set">
                  <p>
                    平方公尺, 核算為
                    {{
                      Math.round(
                        (buildSheetData.objectContent.landArea / 3.3) * 100
                      ) / 100
                    }}坪
                  </p>
                </div>
              </div>
            </div>

            <div class="content-row">
              <div class="label-set">
                <p>5.建物面積：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="number"
                    value=""
                    v-model="buildSheetData.objectContent.buildArea"
                  />
                </div>
                <div class="radio-set">
                  <p>
                    平方公尺, 核算為
                    {{
                      Math.round(
                        (buildSheetData.objectContent.buildArea / 3.3) * 100
                      ) / 100
                    }}坪
                  </p>
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
                    id="baneDownl"
                    name="lrights"
                    value="baneDownl"
                    :checked="
                      buildSheetData.propertyAnalysis.landRightsStatus ===
                      '名下全部'
                    "
                    @change="handlelandRightsStatusChange('名下全部')"
                  />
                  <label for="baneDownl">名下全部</label>
                </div>
              </div>
              <div class="label-set">
                <div class="radio-set">
                  <input
                    type="radio"
                    id="sharel"
                    name="lrights"
                    value="sharel"
                    :checked="
                      buildSheetData.propertyAnalysis.landRightsStatus ===
                      '持分產權'
                    "
                    @change="handlelandRightsStatusChange('持分產權')"
                  />
                  <label for="sharel">持分產權</label>
                </div>
              </div>
            </div>

            <div class="content-row">
              <div class="label-set">
                <p>2.建物所有權人及權利範圍：</p>
                <div class="radio-set">
                  <input
                    type="radio"
                    id="baneDownb"
                    name="brights"
                    value="baneDownb"
                    :checked="
                      buildSheetData.propertyAnalysis.buildingRightsStatus ===
                      '名下全部'
                    "
                    @change="handlebuildingRightsStatusChange('名下全部')"
                  />
                  <label for="baneDownb">名下全部</label>
                </div>
              </div>
              <div class="label-set">
                <div class="radio-set">
                  <input
                    type="radio"
                    id="shareb"
                    name="brights"
                    value="shareb"
                    :checked="
                      buildSheetData.propertyAnalysis.buildingRightsStatus ===
                      '持分產權'
                    "
                    @change="handlebuildingRightsStatusChange('持分產權')"
                  />
                  <label for="shareb">持分產權</label>
                </div>
              </div>
            </div>

            <div class="content-row">
              <div class="label-set">
                <p>2.他項權利：</p>
                <div class="radio-set">
                  <textarea
                    class="input-short"
                    type="text"
                    v-model="buildSheetData.propertyAnalysis.otherRights"
                    placeholder="限200字"
                  />
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
                    id="urbanLandb"
                    name="landUsage"
                    value="urbanLandb"
                    :checked="
                      buildSheetData.currentUsage.landUse === '都市土地'
                    "
                    @change="handleLandUsageChange('都市土地')"
                  />
                  <label for="urbanLandb">都市土地</label>
                </div>
              </div>
              <div class="label-set">
                <div class="radio-set">
                  <input
                    type="radio"
                    id="nonUrbanLandb"
                    name="landUsage"
                    value="nonUrbanLandb"
                    :checked="
                      buildSheetData.currentUsage.landUse === '非都市土地'
                    "
                    @change="handleLandUsageChange('非都市土地')"
                  />
                  <label for="nonUrbanLandb">非都市土地</label>
                </div>
              </div>
            </div>
            <div class="content-row">
              <div class="label-set"><p>2.使用強度：</p></div>
              <div class="label-set">
                <p>法定建蔽率(%)：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="number"
                    v-model="buildSheetData.currentUsage.BuildingCoverageRatio"
                  />
                </div>
              </div>
              <div class="label-set">
                <p>法定容積率(%)：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="number"
                    v-model="buildSheetData.currentUsage.floorAreaRatio"
                  />
                </div>
              </div>
            </div>

            <div class="content-row">
              <div class="label-set">
                <p>3.建物法定用途：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="text"
                    v-model="buildSheetData.currentUsage.buildingUsage"
                  />
                </div>
              </div>
            </div>
            <div class="content-row">
              <div class="label-set">
                <p>4.建物建造：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="text"
                    v-model="buildSheetData.currentUsage.buildingStructure"
                  />
                </div>
              </div>
            </div>
            <div class="content-row">
              <div class="label-set">
                <p>5.建造完成日：</p>
                <div class="radio-set">
                  <input
                    class="input-date"
                    type="date"
                    v-model="buildSheetData.currentUsage.buildingFinishDate"
                  />
                </div>
              </div>
            </div>
            <div class="content-row">
              <div class="label-set">
                <p>6.建物量體： 地上：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="number"
                    v-model="buildSheetData.currentUsage.buildingUpFloor"
                  />
                </div>
                <p>地下：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="number"
                    v-model="buildSheetData.currentUsage.buildingDownFloor"
                  />
                </div>
              </div>
            </div>
            <div class="content-row">
              <div class="label-set">
                <p>7.勘估標的座落樓層： 地上：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="number"
                    v-model="buildSheetData.currentUsage.surveyFloor"
                  />
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
                  <input
                    class="input-date"
                    type="date"
                    v-model="buildSheetData.surveyDates.inspectionDate"
                  />
                </div>
              </div>
              <div class="label-set">
                <p>2.價格日期：</p>
                <div class="radio-set">
                  <input
                    class="input-date"
                    type="date"
                    v-model="buildSheetData.surveyDates.valueOpinionDate"
                  />
                </div>
              </div>
            </div>
          </div>

          <span class="md-subheading">五、估價目的</span>
          <div class="section-content">
            <div class="content-row">
              <div class="label-set">
                <div class="radio-set">
                  <select
                    class="input-apprasail-object"
                    v-model="buildSheetData.appraisalObject.appraisalObject"
                    @change="
                      handleArrpaisalObjectChange(
                        buildSheetData.appraisalObject.appraisalObject
                      )
                    "
                  >
                    <option value="資產價值證明">資產價值證明</option>
                    <option value="金融機構貸款">金融機構貸款</option>
                    <option value="市場交易參考">市場交易參考</option>
                    <option value="會計帳資產重估">會計帳資產重估</option>
                    <option value="公司股東參考">公司股東參考</option>
                    <option value="法院拍賣參考">法院拍賣參考</option>
                    <option value="法院訴訟">法院訴訟</option>
                    <option value="經銷商抵押設定">經銷商抵押設定</option>
                    <option value="徵收補償評估">徵收補償評估</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>
              <div class="label-set">
                <div class="radio-set">
                  <input
                    class="input-long"
                    type="text"
                    v-model="
                      buildSheetData.appraisalObject.appraisalDescription
                    "
                  />
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
                  <select
                    class="input-long"
                    v-model="buildSheetData.estimateCondition.priceType"
                  >
                    <option value="正常價格">正常價格</option>
                    <option value="限定價格">限定價格</option>
                    <option value="特定價格">特定價格</option>
                    <option value="特殊價格">特殊價格</option>
                    <option value="正常租金">正常租金</option>
                    <option value="限定租金">限定租金</option>
                  </select>
                </div>
              </div>

              <div class="label-set-aa">
                <p>2.評估權利種類：</p>
                <div class="radio-set">
                  <select
                    class="input-long"
                    v-model="
                      buildSheetData.estimateCondition.evaluationRightsType
                    "
                  >
                    <option value="所有權價值評估">所有權價值評估</option>
                    <option value="地上權價值評估">地上權價值評估</option>
                    <option value="租賃權價值評估">租賃權價值評估</option>
                    <option value="租金評估">租金評估</option>
                  </select>
                </div>
              </div>

              <div class="label-set-aa">
                <p>3.評價條件：</p>
                <div class="radio-set">
                  <textarea
                    class="input-long"
                    type="text"
                    v-model="
                      buildSheetData.estimateCondition.appraisalCondition
                    "
                    placeholder="限200字"
                  />
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
                  <input
                    class="input-short"
                    type="text"
                    v-model="buildSheetData.surveyDescription.surveyorName"
                  />
                </div>
              </div>

              <div class="label-set-aa">
                <p>2.勘領說明事項：</p>
                <div class="radio-set">
                  <textarea
                    class="input-long"
                    type="text"
                    v-model="buildSheetData.surveyDescription.surveyDescription"
                    placeholder="限200字"
                  />
                </div>
              </div>

              <div class="label-set-aa">
                <p>3.現勘照片：</p>
                <md-field>
                  <label>點此上傳檔案</label>
                  <md-file
                    v-model="buildSheetData.photoFilesName"
                    @md-change="handlePhotoFiles"
                    multiple
                  />
                </md-field>
                <button
                  v-if="mode === 'update'"
                  @click="
                    downloadFiles(
                      buildSheetData.photoFiles,
                      buildSheetData.photoFilesName
                    )
                  "
                >
                  點此下載檔案
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="status">{{ statusMsg }}</p>
      <button @click="handleSubmit" v-if="mode === 'edit'">新增</button>
      <button @click="handleUpdate" v-if="mode === 'update'">更新</button>
    </div>

    <div class="list-table" v-if="mode === 'list'">
      <div v-if="listData.length === 0" class="not-found">
        <img :src="require('@/assets/emptyFolder.png')" />
        <p>尚未有已儲存之資料表</p>
      </div>
      <table v-if="listData.length !== 0" class="data-table">
        <thead>
          <tr>
            <th>現勘表ID</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sheet, index) in listData" :key="index" :id="sheet.name">
            <td>{{ sheet.sheetId }}</td>
            <td>
              <button @click="hadleEditClick(sheet.sheetId)">編輯</button>
            </td>
            <td>
              <button @click="handleDeleteClick(sheet.sheetId)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import API from "../../../../api";
import moment from "moment";
export default {
  name: "BuildingSheet",
  data() {
    return {
      statusMsg: "",
      optionName: "儲存庫",
      mode: "edit", // mode = 'edit' | 'list' | 'update'
      listData: [],
      countyData: [],
      landVillageData: [],
      buildVillageData: [],
      addressVillageData: [],
      editSheetId: "",
      buildSheetData: {
        transcriptFile: "",
        transcriptFileName: "",
        photoFiles: [],
        photoFilesName: [],
        objectContent: {
          landMark: {
            county: "",
            village: "",
            name: "",
            code: "",
          },
          buildMark: {
            county: "",
            village: "",
            name: "",
            code: "",
          },
          address: {
            county: "",
            village: "",
            address: "",
          },
          landArea: 0,
          buildArea: 0,
        },
        propertyAnalysis: {
          landRightsOwner: "",
          landRightsStatus: "名下全部",
          landRightsHolding: "",
          buildingRightsOwner: "",
          buildingRightsStatus: "名下全部",
          buildingRightsHolding: "",
          otherRights: "",
        },
        currentUsage: {
          landUse: "都市土地",
          BuildingCoverageRatio: 0,
          floorAreaRatio: 0,
          buildingUsage: "",
          buildingStructure: "",
          buildingFinishDate: "",
          buildingUpFloor: 0,
          buildingDownFloor: 0,
          surveyFloor: 0,
        },
        surveyDates: {
          inspectionDate: undefined,
          valueOpinionDate: undefined,
        },
        appraisalObject: {
          appraisalObject: "",
          appraisalDescription: "",
        },
        estimateCondition: {
          priceType: "",
          evaluationRightsType: "",
          appraisalCondition: "",
        },
        surveyDescription: {
          surveyorName: "",
          surveyDescription: "",
        },
      },
    };
  },
  async mounted() {
    const countyResponse = await (await API.Survey.listCountys()).json();
    this.countyData = countyResponse;
  },
  methods: {
    handleBtnClick: (src) => {},
    async handleRepositoryClick() {
      this.statusMsg = "";
      if (this.mode === "edit") {
        this.mode = "list";
        this.optionName = "新增";
        await this.fetchData();
        return;
      }
      if (this.mode === "list") {
        this.mode = "edit";
        this.optionName = "儲存庫";
        this.clearData();
        return;
      }
    },
    clearData() {
      this.buildSheetData = {
        transcriptFile: "",
        transcriptFileName: "",
        photoFiles: "",
        photoFilesName: "",
        objectContent: {
          landMark: {
            county: "",
            village: "",
            name: "",
            code: "",
          },
          buildMark: {
            county: "",
            village: "",
            name: "",
            code: "",
          },
          address: {
            county: "",
            village: "",
            address: "",
          },
          landArea: 0,
          buildArea: 0,
        },
        propertyAnalysis: {
          landRightsOwner: "",
          landRightsStatus: "名下全部",
          landRightsHolding: "",
          buildingRightsOwner: "",
          buildingRightsStatus: "名下全部",
          buildingRightsHolding: "",
          otherRights: "",
        },
        currentUsage: {
          landUse: "都市土地",
          BuildingCoverageRatio: 0,
          floorAreaRatio: 0,
          buildingUsage: "",
          buildingStructure: "",
          buildingFinishDate: "",
          buildingUpFloor: 0,
          buildingDownFloor: 0,
          surveyFloor: 0,
        },
        surveyDates: {
          inspectionDate: undefined,
          valueOpinionDate: undefined,
        },
        appraisalObject: {
          appraisalObject: "",
          appraisalDescription: "",
        },
        estimateCondition: {
          priceType: "",
          evaluationRightsType: "",
          appraisalCondition: "",
        },
        surveyDescription: {
          surveyorName: "",
          surveyDescription: "",
        },
      };
    },
    loadInData(dataSheet) {
      console.log(dataSheet);
      this.handleCountySelect(dataSheet.landMarkCounty, "land");
      this.handleCountySelect(dataSheet.buildMarkCounty, "build");
      this.handleCountySelect(dataSheet.buildAddressCounty, "address");
      this.buildSheetData = {
        transcriptFile: dataSheet.transcriptFileBase64,
        transcriptFileName: dataSheet.transcriptFileName,
        photoFiles: dataSheet.photoFilesBase64,
        photoFilesName: dataSheet.photoFilesName,
        objectContent: {
          landMark: {
            county: dataSheet.landMarkCounty,
            village: dataSheet.landMarkVillage,
            name: dataSheet.landMarkName,
            code: dataSheet.landMarkCode,
          },
          buildMark: {
            county: dataSheet.buildMarkCounty,
            village: dataSheet.buildMarkVillage,
            name: dataSheet.buildMarkName,
            code: dataSheet.buildMarkCode,
          },
          address: {
            county: dataSheet.buildAddressCounty,
            village: dataSheet.buildAddressVillage,
            address: dataSheet.buildAddress,
          },
          landArea: dataSheet.landArea,
          buildArea: dataSheet.buildingArea,
        },
        propertyAnalysis: {
          landRightsOwner: dataSheet.landRightsOwner,
          landRightsStatus: dataSheet.landRightsStatus,
          landRightsHolding: dataSheet.landRightsHolding,
          buildingRightsOwner: dataSheet.buildingRightsOwner,
          buildingRightsStatus: dataSheet.buildingRightsStatus,
          buildingRightsHolding: dataSheet.buildingRightsHolding,
          otherRights: dataSheet.otherRights,
        },
        currentUsage: {
          landUse: dataSheet.landUses,
          BuildingCoverageRatio: dataSheet.BuildingCoverageRatio,
          floorAreaRatio: dataSheet.floorAreaRatio,
          buildingUsage: dataSheet.buildingUsage,
          buildingStructure: dataSheet.buildingStructure,
          buildingFinishDate: moment(
            new Date(dataSheet.buildingFinishDate)
          ).format("YYYY-MM-DD"),
          buildingUpFloor: dataSheet.buildingUpFloor,
          buildingDownFloor: dataSheet.buildingDownFloor,
          surveyFloor: dataSheet.surveyFloor,
        },
        surveyDates: {
          inspectionDate: moment(new Date(dataSheet.inspectionDate)).format(
            "YYYY-MM-DD"
          ),
          valueOpinionDate: moment(new Date(dataSheet.valueOpinionDate)).format(
            "YYYY-MM-DD"
          ),
        },
        appraisalObject: {
          appraisalObject: dataSheet.appraisalObject,
          appraisalDescription: dataSheet.appraisalDescription,
        },
        estimateCondition: {
          priceType: dataSheet.priceType,
          evaluationRightsType: dataSheet.evaluationRightsType,
          appraisalCondition: dataSheet.appraisalCondition,
        },
        surveyDescription: {
          surveyorName: dataSheet.surveyorName,
          surveyDescription: dataSheet.surveyDescription,
        },
      };
    },
    async fetchData() {
      const response = await (await API.Survey.listAllByUser()).json();
      this.listData = response.building;
    },
    async hadleEditClick(sheetId) {
      this.editSheetId = sheetId;
      this.mode = "update";
      this.optionName = "儲存庫";
      await this.fetchData();
      for (let i = 0; i < this.listData.length; i++) {
        if (this.listData[i].sheetId === this.editSheetId) {
          this.loadInData(this.listData[i]);
          return;
        }
      }
    },
    async handleDeleteClick(sheetId) {
      const response = await API.Survey.deleteBuildingSheetById(sheetId);
      if (response.status === 200) {
        await this.fetchData();
      } else {
        alert("刪除失敗");
      }
    },
    handlelandRightsStatusChange(status) {
      this.buildSheetData.propertyAnalysis.landRightsStatus = status;
    },
    handlebuildingRightsStatusChange(status) {
      this.buildSheetData.propertyAnalysis.buildingRightsStatus = status;
    },
    handleLandUsageChange(landUsage) {
      this.buildSheetData.currentUsage.landUse = landUsage;
    },
    handleArrpaisalObjectChange(object) {
      this.buildSheetData.appraisalObject.appraisalObject = object;
    },
    aa() {
      alert(this.buildSheetData.estimateCondition.priceType);
    },
    async handleCountySelect(county, type) {
      const response = await (
        await API.Survey.listVillageByCounty(county)
      ).json();
      if (type === "land") {
        this.landVillageData = response;
      } else if (type === "build") {
        this.buildVillageData = response;
      } else if (type === "address") {
        this.addressVillageData = response;
      }
    },
    async handleTranscriptFileSelect(transcriptFile) {
      const reader = await this.getBase64(transcriptFile[0]);
      this.buildSheetData.transcriptFile = reader.result;
      this.buildSheetData.transcriptFileName = reader.fileName;
    },
    async handlePhotoFiles(photofiles) {
      this.buildSheetData.photoFiles = [];
      for (let i = 0; i < photofiles.length; i++) {
        const reader = await this.getBase64(photofiles[i]);
        this.buildSheetData.photoFiles.push(reader.result);
      }
      // console.log(this.landSheetData.photoFiles);
      // console.log(this.landSheetData.photoFilesName);
    },
    async handleSubmit() {
      this.statusMsg = "請求發送中...";
      const response = await API.Survey.createBuildingSheet(
        this.buildSheetData
      );
      if (response) {
        if (response.status === 200) {
          this.clearData();
          alert("資料表新增成功");
        }
        this.statusMsg = "請求發送成功";
        return;
      }
      this.statusMsg = "請求發送失敗，請聯繫Server team";
    },
    async handleUpdate() {
      this.statusMsg = "請求發送中...";
      const response = await API.Survey.editBuildingSheet(
        this.buildSheetData,
        this.editSheetId
      );
      if (response) {
        if (response.status === 200) {
          this.clearData();
          this.mode = "edit";
          alert("資料表更新成功");
        }
        this.statusMsg = "請求發送成功";
        return;
      }
      this.statusMsg = "請求發送失敗，請聯繫Server team";
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.fileName = file.name;
        reader.readAsDataURL(file);
        reader.onload = function () {
          resolve(reader);
        };
        reader.onerror = function (error) {
          reject("null");
        };
      });
    },
    downloadFile(fileBase64, fileName) {
      let arr = fileBase64.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const myFile = new File([u8arr], fileName, { type: mime });
      console.log(myFile);
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(myFile);
      downloadLink.download = fileName;
      downloadLink.click();
    },
    downloadFiles(fileBase64s, fileNames) {
      for (let i = 0; i < fileBase64s.length; i++) {
        let arr = fileBase64s[i].split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const myFile = new File([u8arr], fileNames[i], { type: mime });
        console.log(myFile);
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(myFile);
        downloadLink.download = fileNames[i];
        downloadLink.click();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sheet-container {
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .list-table {
    display: flex;
    justify-content: center;
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: fit-content;
      p {
        font-size: 24px;
        margin: 0px;
      }
      img {
        width: 150px;
      }
    }
    .data-table {
      margin-top: 20px;
      font-size: 16px;
      button {
        border-radius: 6px;
        width: 72px;
        height: 25px;
      }
    }
  }
  .sheet-form {
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .status {
      color: red;
    }
    .step-container {
      width: 460px;
      padding: 5px;
      margin: 5px;
      border-width: 1px;
      border-style: solid;
      .section-container {
        padding: 5px;
        .section-content {
          margin-bottom: 50px;
          margin-left: 10px;
          .content-row-aa {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .label-set-aa {
              display: flex;
              align-items: center;
              width: 400px;
              justify-content: space-between;
              .radio-set {
                display: flex;
                flex-direction: row;
                input[type="radio"] {
                  border: 0px;
                  width: 15px;
                  height: 15px;
                }
                .input-date {
                  margin-right: 5px;
                  border-radius: 6px;
                  width: 130px;
                  height: 25px;
                  background-color: rgb(255, 255, 255);
                }
                .input-long {
                  margin-right: 5px;
                  border-radius: 6px;
                  width: 192px;
                  height: 25px;
                  background-color: rgb(255, 255, 255);
                }
                .input-short {
                  margin-right: 5px;
                  border-radius: 6px;
                  width: 65px;
                  height: 25px;
                  background-color: rgb(255, 255, 255);
                }
                .input-apprasail-object {
                  margin-right: 5px;
                  border-radius: 6px;
                  width: 150px;
                  height: 25px;
                  background-color: rgb(255, 255, 255);
                }
              }
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
                // input {
                //   width: 65px;
                // }
                input[type="radio"] {
                  border: 0px;
                  width: 15px;
                  height: 15px;
                }
                .input-date {
                  margin-right: 5px;
                  border-radius: 6px;
                  width: 130px;
                  height: 25px;
                  background-color: rgb(255, 255, 255);
                }
                .input-long {
                  margin-right: 5px;
                  border-radius: 6px;
                  width: 192px;
                  height: 25px;
                  background-color: rgb(255, 255, 255);
                }
                .input-short {
                  margin-right: 5px;
                  border-radius: 6px;
                  width: 65px;
                  height: 25px;
                  background-color: rgb(255, 255, 255);
                }
                .input-apprasail-object {
                  margin-right: 5px;
                  border-radius: 6px;
                  width: 150px;
                  height: 25px;
                  background-color: rgb(255, 255, 255);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>