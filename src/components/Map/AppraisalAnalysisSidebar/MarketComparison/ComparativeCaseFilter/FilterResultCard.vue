<template>
  <div class="FilterResultCard">
    <div class="title">{{name.replace('管理委員會', '')}}</div>
    <div class="subtitle">
      <span class="subitem">{{type}}</span>
      <span class="subitem">{{new Date().getFullYear() - new Date(year).getFullYear()}}年</span>
      <span class="subitem">{{unitNumber}}</span>
    </div>
    <div class="body">
      <span class="bodyitem">
        {{totalPrice/10000}}萬
      </span>
      <span class="bodyitem">
        {{Math.floor(unitPrice/10000 * 3.3)}}萬/坪
      </span>
    </div>
  </div>
</template>

<script>
new Date().getFullYear()
export default {
  name: 'FilterResultCard',
  props: {
    name: {
      type: String,
      default: '未命名'
    },
    type: {
      type: String,
      default: '無類別'
    },
    year: {
      type: Number,
      default: NaN
    },
    unitNumber: {
      type: String,
      default: NaN
    },
    totalPrice: {
      type: Number,
      default: NaN
    },
    unitPrice: {
      type: Number,
      default: NaN
    }
  }
}
</script>
<style lang="scss" scoped>
.FilterResultCard{
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
  border: 1px solid rgba(128, 128, 128, 0.377);
  border-radius: 5px;
  background: #ffffffaf;
  box-shadow: 1px 1px 5px 0px #0000005e;
  transition: 0.3s all;

  &:hover{
    background: #ffffffd8;
    box-shadow: 2px 2px 5px 0px #0000005e;
  }
  & > * {
    margin: 5px 0px;
  }
  .title{
    font-size: 20px;
    font-weight: bold;
  }
  .subtitle{
    display: flex;
    .subitem{
      margin-right: 5px;
      margin-left: 5px;
    }
  }
  .body{
    display: flex;
    .bodyitem{
      flex: 1;
      color: rgb(179, 48, 48);
      font-size: 25px;
      font-weight: bold;
    }
  }
}
</style>