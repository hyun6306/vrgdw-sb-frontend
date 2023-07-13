<template>
  <modal name="MyPageAlarmModal" width="400" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('MyPageAlarmModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p class="txt_onboard">
          {{ $t('message.msgPwdError') }}
        </p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_deep_gray" @click="select(false)">
          {{ $t('message.btnLogin') }}
        </button>
        <button class="btn_primary" @click="select(true)">
          {{ $t('message.btnFindPwd') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'MyPageAlarmModal',
  methods: {
    select(result) {
      this.$emit('okOrNo', result);
      this.$modal.hide('MyPageAlarmModal');
    },
  },
};
</script>

<style></style>
