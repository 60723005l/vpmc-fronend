<template>
  <div class="sheet-container">
    <div class="submit-button" @click="handleRepositoryClick">
      {{ optionName }}
    </div>

    <div class="sheet-form" v-if="mode === 'edit' || mode === 'update'">
      <div class="step-container">
        <span class="md-title">步驟一：載入勘估標的土地/建物謄本</span>
        <md-field>
          <label>點此上傳檔案</label>
          <md-file
            v-model="landSheetData.transcriptFileName"
            @md-change="handleTranscriptFileSelect"
          />
          <button
            v-if="mode === 'update'"
            @click="
              downloadFile(
                landSheetData.transcriptFile,
                landSheetData.transcriptFileName
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
                    v-model="landSheetData.objectContent.landMark.county"
                    @change="
                      handleCountySelect(
                        landSheetData.objectContent.landMark.county,
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
                    v-model="landSheetData.objectContent.landMark.village"
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
                    v-model="landSheetData.objectContent.landMark.name"
                    placeholder="段名"
                  />
                  <input
                    class="input-short"
                    type="text"
                    v-model="landSheetData.objectContent.landMark.code"
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
                    v-model="landSheetData.objectContent.buildMark.county"
                    @change="
                      handleCountySelect(
                        landSheetData.objectContent.buildMark.county,
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
                    v-model="landSheetData.objectContent.buildMark.village"
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
                    v-model="landSheetData.objectContent.buildMark.name"
                    placeholder="段名"
                  />
                  <input
                    class="input-short"
                    type="text"
                    v-model="landSheetData.objectContent.buildMark.code"
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
                    v-model="landSheetData.objectContent.address.county"
                    @change="
                      handleCountySelect(
                        landSheetData.objectContent.address.county,
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
                    v-model="landSheetData.objectContent.address.village"
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
                    v-model="landSheetData.objectContent.address.address"
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
                    v-model="landSheetData.objectContent.landArea"
                    placeholder=""
                  />
                </div>
                <div class="radio-set">
                  <p>
                    平方公尺, 核算為
                    {{
                      Math.round(
                        (landSheetData.objectContent.landArea / 3.3) * 100
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
                    id="baneDown"
                    name="rights"
                    value="baneDown"
                    :checked="
                      landSheetData.propertyAnalysis.rightStatus === '名下全部'
                    "
                    @change="handleRightStatusChange('名下全部')"
                  />
                  <label for="baneDown">名下全部</label>
                </div>
              </div>
              <div class="label-set">
                <div class="radio-set">
                  <input
                    type="radio"
                    id="share"
                    name="rights"
                    value="share"
                    :checked="
                      landSheetData.propertyAnalysis.rightStatus === '持分產權'
                    "
                    @change="handleRightStatusChange('持分產權')"
                  />
                  <label for="share">持分產權</label>
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
                    v-model="landSheetData.propertyAnalysis.otherRights"
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
                    id="urbanLand"
                    name="landUsage"
                    value="urbanLand"
                    :checked="landSheetData.currentUsage.landUse === '都市土地'"
                    @change="handleLandUsageChange('都市土地')"
                  />
                  <label for="urbanLand">都市土地</label>
                </div>
              </div>
              <div class="label-set">
                <div class="radio-set">
                  <input
                    type="radio"
                    id="nonUrbanLand"
                    name="landUsage"
                    value="nonUrbanLand"
                    :checked="
                      landSheetData.currentUsage.landUse === '非都市土地'
                    "
                    @change="handleLandUsageChange('非都市土地')"
                  />
                  <label for="nonUrbanLand">非都市土地</label>
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
                    v-model="landSheetData.currentUsage.coverageRatio"
                  />
                </div>
              </div>
              <div class="label-set">
                <p>法定容積率(%)：</p>
                <div class="radio-set">
                  <input
                    class="input-short"
                    type="number"
                    v-model="landSheetData.currentUsage.floorAreaRatio"
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
                    v-model="landSheetData.surveyDates.inspectionDate"
                  />
                </div>
              </div>
              <div class="label-set">
                <p>2.價格日期：</p>
                <div class="radio-set">
                  <input
                    class="input-date"
                    type="date"
                    v-model="landSheetData.surveyDates.valueOpinionDate"
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
                    v-model="landSheetData.appraisalObject.appraisalObject"
                    @change="
                      handleArrpaisalObjectChange(
                        landSheetData.appraisalObject.appraisalObject
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
                    v-model="landSheetData.appraisalObject.appraisalDescription"
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
                    v-model="landSheetData.estimateCondition.priceType"
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
                      landSheetData.estimateCondition.evaluationRightsType
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
                    v-model="landSheetData.estimateCondition.appraisalCondition"
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
                    v-model="landSheetData.surveyDescription.surveyorName"
                  />
                </div>
              </div>

              <div class="label-set-aa">
                <p>2.勘領說明事項：</p>
                <div class="radio-set">
                  <textarea
                    class="input-long"
                    type="text"
                    v-model="landSheetData.surveyDescription.surveyDescription"
                    placeholder="限200字"
                  />
                </div>
              </div>

              <div class="label-set-aa">
                <p>3.現勘照片：</p>
                <md-field>
                  <label>點此上傳檔案</label>
                  <md-file
                    v-model="landSheetData.photoFilesName"
                    @md-change="handlePhotoFiles"
                    multiple
                  />
                  <button
                    v-if="mode === 'update'"
                    @click="
                      downloadFiles(
                        landSheetData.photoFiles,
                        landSheetData.photoFilesName
                      )
                    "
                  >
                    點此下載檔案
                  </button>
                </md-field>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="status">{{ statusMsg }}</p>
      <div class="submit-button" @click="handleSubmit" v-if="mode === 'edit'">
        新增
      </div>
      <div class="submit-button" @click="handleUpdate" v-if="mode === 'update'">
        更新
      </div>
    </div>

    <div class="list-table" v-show="mode === 'list'">
      <div v-if="listData.length === 0" class="not-found">
        <img :src="require('@/assets/emptyFolder.png')" />
        <p>尚未有已儲存之資料表</p>
      </div>
      <table v-show="listData.length !== 0" class="data-table">
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
  name: "LandSheet",
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
      landSheetData: {
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
        },
        propertyAnalysis: {
          rightOwner: "",
          rightStatus: "名下全部",
          rightHolding: "",
          otherRights: "",
        },
        currentUsage: {
          landUse: "都市土地",
          coverageRatio: 0,
          floorAreaRatio: 0,
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
      this.landSheetData = {
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
        },
        propertyAnalysis: {
          rightOwner: "",
          rightStatus: "名下全部",
          rightHolding: "",
          otherRights: "",
        },
        currentUsage: {
          landUse: "都市土地",
          coverageRatio: 0,
          floorAreaRatio: 0,
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
      this.landSheetData.objectContent.landMark.county =
        dataSheet.landMarkCounty;
      this.landSheetData.objectContent.landMark.village =
        dataSheet.landMarkVillage;
      this.landSheetData.objectContent.landMark.name = dataSheet.landMarkName;
      this.landSheetData.objectContent.landMark.code = dataSheet.landMarkCode;
      this.landSheetData.objectContent.buildMark.county =
        dataSheet.buildMarkCounty;
      this.landSheetData.objectContent.buildMark.village =
        dataSheet.buildMarkVillage;
      this.landSheetData.objectContent.buildMark.name = dataSheet.buildMarkName;
      this.landSheetData.objectContent.buildMark.code = dataSheet.buildMarkCode;
      this.landSheetData.objectContent.address.county =
        dataSheet.buildAddressCounty;
      this.landSheetData.objectContent.address.village =
        dataSheet.buildAddressVillage;
      this.landSheetData.objectContent.address.address = dataSheet.buildAddress;
      this.landSheetData.objectContent.landArea = dataSheet.landArea;
      this.landSheetData.propertyAnalysis.rightOwner =
        dataSheet.landRightsOwner;
      this.landSheetData.propertyAnalysis.rightStatus =
        dataSheet.landRightsStatus;
      this.landSheetData.propertyAnalysis.rightHolding =
        dataSheet.landRightsHolding;
      this.landSheetData.propertyAnalysis.otherRights = dataSheet.otherRights;
      this.landSheetData.currentUsage.landUse = dataSheet.landUses;
      this.landSheetData.currentUsage.coverageRatio =
        dataSheet.BuildingCoverageRatio;
      this.landSheetData.currentUsage.floorAreaRatio = dataSheet.floorAreaRatio;

      this.landSheetData.surveyDates.inspectionDate = moment(
        new Date(dataSheet.inspectionDate)
      ).format("YYYY-MM-DD");

      this.landSheetData.surveyDates.valueOpinionDate = moment(
        new Date(dataSheet.valueOpinionDate)
      ).format("YYYY-MM-DD");

      this.landSheetData.appraisalObject.appraisalObject =
        dataSheet.appraisalObject;
      this.landSheetData.appraisalObject.appraisalDescription =
        dataSheet.appraisalDescription;
      this.landSheetData.estimateCondition.priceType = dataSheet.priceType;
      this.landSheetData.estimateCondition.evaluationRightsType =
        dataSheet.evaluationRightsType;
      this.landSheetData.estimateCondition.appraisalCondition =
        dataSheet.appraisalCondition;
      this.landSheetData.surveyDescription.surveyorName =
        dataSheet.surveyorName;
      this.landSheetData.surveyDescription.surveyDescription =
        dataSheet.surveyDescription;
      this.landSheetData.transcriptFile = dataSheet.transcriptFileBase64;
      this.landSheetData.photoFiles = dataSheet.photoFilesBase64;
      this.landSheetData.transcriptFileName = dataSheet.transcriptFileName;
      this.landSheetData.photoFilesName = dataSheet.photoFilesName;
    },
    async fetchData() {
      const response = await (await API.Survey.listAllByUser()).json();
      this.listData = response.land;
      console.log(this.listData);
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
      const response = await API.Survey.deleteLandSheetById(sheetId);
      if (response.status === 200) {
        await this.fetchData();
      } else {
        alert("刪除失敗");
      }
    },
    handleRightStatusChange(status) {
      this.landSheetData.propertyAnalysis.rightStatus = status;
    },
    handleLandUsageChange(landUsage) {
      this.landSheetData.currentUsage.landUse = landUsage;
    },
    handleArrpaisalObjectChange(object) {
      this.landSheetData.appraisalObject.appraisalObject = object;
    },
    aa() {
      alert(this.landSheetData.estimateCondition.priceType);
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
      this.landSheetData.transcriptFile = reader.result;
      this.landSheetData.transcriptFileName = reader.fileName;
    },
    async handlePhotoFiles(photofiles) {
      this.landSheetData.photoFiles = [];
      if (photofiles.length > 4) {
        this.landSheetData.photoFiles = [];
        this.landSheetData.photoFilesName = [];
        alert("照片限制4張為上限");
        return;
      }
      for (let i = 0; i < photofiles.length; i++) {
        const reader = await this.getBase64(photofiles[i]);
        this.landSheetData.photoFiles.push(reader.result);
      }
      // console.log(this.landSheetData.photoFiles);
      // console.log(this.landSheetData.photoFilesName);
    },
    async handleSubmit() {
      this.statusMsg = "請求發送中...";
      const response = await API.Survey.createLandSheet(this.landSheetData);
      if (response) {
        if (response.status === 200) {
          this.clearData();
          alert("資料表新增成功");
          this.statusMsg = "請求發送成功";
          return;
        } else if (response.status === 401) {
          alert("權限不足");
          this.statusMsg = "權限不足";
          return;
        }
        return;
      }
      this.statusMsg = "請求發送失敗，請聯繫Server team";
    },
    async handleUpdate() {
      this.statusMsg = "請求發送中...";
      const response = await API.Survey.editLandSheet(
        this.landSheetData,
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
  align-items: center;
  .submit-button {
    background-color: rgba(0, 0, 0, 0);
    padding: 2px;
    border-radius: 5px;
    border-color: rgb(0, 0, 0);
    border-width: 1px;
    border-style: solid;
    text-align: center;
    color: rgb(0, 0, 0);
    width: 100%;
    height: fit-content;
    cursor: pointer;
    &:hover {
      background-color: rgb(0, 0, 0);
      color: white;
      transition: 0.3s;
    }
  }
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
    height: 1650px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .status {
      color: red;
    }
    .step-container {
      border-radius: 5px;
      width: 100%;
      padding: 5px;
      margin-top: 5px;
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
                .input-otherRight {
                  height: 100px;
                  width: 260px;
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