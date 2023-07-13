<template>
  <modal name="MoveLoginModal" width="90%" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('MoveLoginModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t('message.msgPwdError')"></p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_cancle" @click="okOrNo(false)">{{ $t('message.btnLogin') }}</button>
        <button class="btn_ok" @click="okOrNo(true)">{{ $t('message.btnFindPwd') }}</button>
      </div>
    </div>
  </modal>
</template>
<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'MoveLoginModal',
  data() {
    return {};
  },
  mixins: [alarmLength],
  methods: {
    okOrNo(result) {
      this.$emit('okOrNo', result);
      this.$modal.hide('MoveLoginModal');
    },
  },
};
</script>

<style></style>
