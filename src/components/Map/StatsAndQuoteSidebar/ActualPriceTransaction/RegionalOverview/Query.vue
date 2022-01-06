<template>
    <form class="Query-root" @submit="handleSubmit">
        <select>
            <option value="視窗範圍內">視窗範圍內</option>
            <option value="行政區統計">行政區統計</option>
            <option value="自行劃定範圍">自行劃定範圍</option>
        </select>
        <select>
            <option value="" disabled selected>行政區</option>
        </select>
        <select>
            <option value="" disabled selected>鄉鎮市區</option>
        </select>
        <select>
            <option value="" disabled selected>村里別</option>
        </select>
        <md-button type="submit" class="vpmc-btn">查詢</md-button>
    </form>
</template>
<script>
export default {
    name: 'Query',
    methods:
        {
            async handleSubmit(){
                await $emit('submit')
            }
        }
}
</script>
<style lang="scss" scoped>
.Query-root{
    display: flex;
    align-items: center;
    select{
        height: min-content;
        padding: 5px;
    }
}
</style>d