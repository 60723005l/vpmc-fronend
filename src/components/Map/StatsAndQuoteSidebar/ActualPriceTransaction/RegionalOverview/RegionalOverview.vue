<template>
    <div class="RegionalOverview-root">
        <Query/>
    </div>
</template>
<script>
export default {
    name: 'RegionalOverview',
    components:
    {
        Query: async () => await import('./Query.vue')
    }
}
</script>
<style lang="scss" scoped>
.RegionalOverview-root{
    display: flex;
    flex-direction: column;
}
</style>