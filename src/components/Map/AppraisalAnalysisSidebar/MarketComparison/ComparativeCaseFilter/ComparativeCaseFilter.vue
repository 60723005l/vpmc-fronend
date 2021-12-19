<template>
    <div>
        <StepOne></StepOne>
        <StepTwo></StepTwo>
    </div>
</template>
<script>
export default {
    name: 'ComparativeCaseFilter',
    components:
        {
            StepOne: async () => await import('./StepOne.vue'),
            StepTwo: async () => await import('./StepTwo.vue')
        }
}
</script>