<template>
  <div class="vpmc-DateTime">
    <span class="md-subheading">{{value}}</span>
    <span class="md-caption">{{dueTime}}個月前</span>
  </div>
</template>
<script>
export default {
  name: 'DateTime',
  props: {
    value: String
  },
  computed: {
    dueTime() {
      const rawDueTime = (new Date() - new Date(this.value)) / (60*60*24*1000*30)
      return Math.floor(rawDueTime)// Math.floor(rawDueTime*10)/10
    }
  }
}
</script>
<style lang="scss" scoped>
.vpmc-DateTime{

}
</style>