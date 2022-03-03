<template>
  <div class="vpmc-PriceInfo">
    <span class="md-subheading">{{value.totalPrice/10000}}萬</span>
    <span class="md-caption">{{Math.floor((value.unitPrice / 10000) * 3.3 * 100) / 100}}萬/坪</span>
  </div>
</template>
<script>

export const PriceInfoType = {
  "totalPrice": 9400000,
  "unitPrice": 57704.113,
}
export default {
  name: 'PriceInfo',
  props: {
    value: {
      type: Object// PriceInfoType
    }
  }
}
</script>