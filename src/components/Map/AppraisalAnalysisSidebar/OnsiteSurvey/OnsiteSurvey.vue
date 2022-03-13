<template>
  <md-tabs class="custom-tabs">
    <md-tab
      v-for="(tab, index) in tabs"
      :key="index"
      :id="tab.name"
      :md-label="tab.name"
    >
      <LandSheet v-if="index === 0"></LandSheet>
      <BuildingSheet v-if="index === 1"></BuildingSheet>
      <!-- <div class="frame-wrapper">
        <iframe width="100%" height="100%" :src="tab.frameSrc"></iframe>
      </div>
      <button @click="handleBtnClick(tab.editSrc)">現勘資料表儲存庫</button> -->
    </md-tab>
  </md-tabs>
</template>
<script>
import LandSheet from "./LandSheet.vue";
import BuildingSheet from "./BuildingSheet.vue";
const tabs = [
  {
    name: "土地",
    frameSrc: "http://140.122.82.98/Land/Create",
    editSrc: "http://140.122.82.98/Land/Index",
  },
  {
    name: "建物",
    frameSrc: "http://140.122.82.98/Building/Create",
    editSrc: "http://140.122.82.98/Building/Index",
  },
  {
    name: "車位",
    frameSrc: "http://140.122.82.98/Park/Create",
    editSrc: "http://140.122.82.98/Park/Index",
  },
];
export default {
  name: "OnsiteSurvey",
  data() {
    return {
      currentTab: tabs[0],
      tabs: tabs,
    };
  },
  methods: {
    handleBtnClick: (src) => {
      //   console.log(src);
      window.open(src, "_blank");
    },
  },
  components: {
    LandSheet,
    BuildingSheet,
  },
};
</script>
<style lang="scss" scoped>
.frame-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 300px);
  iframe {
    // position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
}
</style>