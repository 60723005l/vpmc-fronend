<template>
  <div class="vpmc-UnitInfo">
    <span class="md-subheading">{{value.units}}</span>
    <span>
      <span class="md-caption">{{value.bedNumber}}房</span>
      <span class="md-caption">{{value.hallNumber}}廳</span>
      <span class="md-caption">{{value.bathNumber}}衛</span>
    </span>
  </div>
</template>
<script>

export const UnitInfoType = {
  "units": "45838.26㎡",
  "bathNumber": 2,
  "bedNumber": 3,
  "hallNumber": 2
}

export default {
  name: 'UnitInfo',
  props: {
    value: {
      type: Object// UnitInfoType
    }
  }
}
</script>