<template>
  <div class="vpmc-HistroyCard">
    <DateTime class="vpmc-HistroyCard-item" :value="dateTime"/>
    <div class="vpmc-HistroyCard-item vpmc-HistroyCard-level">{{level}}樓</div>
    <UnitInfo class="vpmc-HistroyCard-item" :value="unitInfo"/>
    <PriceInfo class="vpmc-HistroyCard-item" :value="priceInfo"/>
  </div>
</template>
<script>

export const UnitInfoType = {
  "units": "45838.26㎡",
  "bathNumber": 2,
  "bedNumber": 3,
  "hallNumber": 2
}

export const PriceInfoType = {
  "totalPrice": 9400000,
  "unitPrice": 57704.113,
}

export default {
  name: 'HistroyCard',
  components: {
    DateTime: async () => await import('./DateTime.vue'),
    PriceInfo: async () => await import('./PriceInfo.vue'),
    UnitInfo: async () => await import('./UnitInfo.vue')
  },
  props: {
    dateTime: {
      type: String
    },
    level: {
      type: Number
    },
    unitInfo: {
      type: Object// UnitInfoType
    },
    priceInfo: {
      type: Object// PriceInfoType
    }
  }
}
</script>
<style lang="scss">
.vpmc-HistroyCard{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.233);
  .vpmc-HistroyCard-item{
    margin: 5px;
    display: flex;
    flex-direction: column;
  }
}
</style>