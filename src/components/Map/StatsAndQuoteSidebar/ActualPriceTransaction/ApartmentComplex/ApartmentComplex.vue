<template>
    <div class="ApartmentComplex-root">
        <Query/>
    </div>
</template>
<script>
export default {
    name: 'ApartmentComplex',
    components: {
        Query: async () => await import('./Query.vue')
    }
}
</script>
<style lang="scss" scoped>
.ApartmentComplex-root{
    display: flex;
    flex-direction: column;
}
</style>