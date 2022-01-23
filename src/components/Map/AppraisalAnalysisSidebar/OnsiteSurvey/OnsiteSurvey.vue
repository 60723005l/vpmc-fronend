<template>
    <md-tabs class="custom-tabs">
        <md-tab v-for="(tab, index) in tabs" :key="index" :id="tab.name" :md-label="tab.name">
            <iframe :src="tab.frameSrc"></iframe>
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