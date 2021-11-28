<template>
  <div>
    <md-dialog :md-active.sync="active" :md-click-outside-to-close="false" :md-close-on-esc="false">
      <md-dialog-title class="title">{{payload.title}}</md-dialog-title>
      <md-content class="content">{{payload.text}}</md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="handleConfirm">確認</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>

const defaultPayload = () => ({
    text:'',
    title: '',
    confirm: () => {}
})

export default {
    name: 'VpmcAlert',
    data: () => ({
      payload: defaultPayload(),
      active: false
    }),
    created()
        {
            this.$bus.$on("alert:message", payload => {
                this.payload = {...defaultPayload(), ...payload}
                this.showAlert();
            });
        },
    beforeDestroy()
        {
            this.$bus.$off("alert:message")
        },
    methods:
        {
            showAlert()
            {
                this.active = true
            },
            handleConfirm()
            {
                this.payload.confirm()
                this.active = false
            }
        }
  }
</script>
<style lang="scss" scoped>
.title{
    color: $vpmc-color-primary
}
.content{
    color: $vpmc-color-primary;
    min-height: 100px;
    padding: 10px;
}
</style>