<template>
    <md-menu md-size="small" md-align-trigger>
        <md-button md-menu-trigger>{{placeholder}}</md-button>

        <md-menu-content class="banner-menu-content">
        <md-menu-item v-for="(item, index) in MarketComparisonList" :key="index"
                    @click="handleSelect(item)">{{item.name}}</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>
<script>

const MarketComparisonList = [
    {
        name: '設定價格因素調整表'
    },
    {
        name: '比較案例篩選(人工/智慧)'
    },
    {
        name: '比較價格智慧分析'
    }
]

export default {
    name: 'MarketComparison',
    data: () => ({
        placeholder: '市場比較法',
        MarketComparisonList
    }),
    methods:
        {
            handleSelect(item) {
                console.log(item)
            }
        }
}
</script>