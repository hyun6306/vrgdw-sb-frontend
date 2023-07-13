<template>
  <modal name="ProductAlarmModal" width="90%" height="auto" :adaptive="true" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('ProductAlarmModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p class="txt_onboard">{{ message }}</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_cancle" @click="okOrNo(false)">{{ $t('message.btnCancel') }}</button>
        <button class="btn_ok" @click="okOrNo(true)">{{ $t('message.btnYes') }}</button>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  name: 'alarmModal',
  data() {
    return {
      message: '',
    };
  },
  methods: {
    open(event) {
      this.message = event.params.message;
    },
    okOrNo(result) {
      this.$emit('okOrNo', result);
      this.$modal.hide('ProductAlarmModal');
    },
  },
};
</script>

<style></style>
