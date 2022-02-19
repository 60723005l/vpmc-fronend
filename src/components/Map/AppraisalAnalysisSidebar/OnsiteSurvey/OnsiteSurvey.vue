<template>
    <md-tabs class="custom-tabs">
        <md-tab v-for="(tab, index) in tabs" :key="index" :id="tab.name" :md-label="tab.name">
            <div class="frame-wrapper">
                <iframe width="100%" height="100%" :src="tab.frameSrc"></iframe>
            </div>
        </md-tab>
    </md-tabs>
</template>
<script>

const tabs = [
    {name:'土地', frameSrc:'http://140.122.82.98/Land/Create'},
    {name:'建物', frameSrc:'http://140.122.82.98/Building/Create'},
    {name:'車位', frameSrc:'http://140.122.82.98/Park/Create'},
]
export default {
    name: 'OnsiteSurvey',
    data()
        {
            return {
                currentTab: tabs[0],
                tabs: tabs
            }
        },
}
</script>
<style lang="scss" scoped>
.frame-wrapper{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 300px);
    iframe{
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