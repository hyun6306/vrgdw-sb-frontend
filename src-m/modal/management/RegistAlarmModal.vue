<template>
  <modal name="RegistAlarmModal" width="90%" height="auto" :adaptive="true" @before-open="open" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('RegistAlarmModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p class="txt_onboard">
          {{ $t(this.ment1) }}
          <br /><br />{{ $t(this.ment2) }}
        </p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_cancle" @click="okOrNo(false)">{{ $t('message.btnCancel') }}</button>
        <button class="btn_ok" @click="okOrNo(true)">{{ $t('message.btnYes') }}</button>
      </div>
    </div>
  </modal>
</template>
<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'alarmModal',
  data() {
    return {
      type: '',
      ment1: '',
      ment2: '',
    };
  },
  mixins: [alarmLength],
  watch: {
    type(type) {
      if (type == 'chg') {
        this.ment1 = 'message.msgChangeShipping';
        this.ment2 = 'message.msgChangeShipping2';
      } else if (type == 'close') {
        this.ment1 = 'message.msgNoReflect';
        this.ment2 = 'message.msgNoReflect2';
      }
    },
  },
  methods: {
    open(event) {
      this.type = event.params.type;
    },
    okOrNo(result) {
      this.$emit('okOrNo', { result, type: this.type });
      this.$modal.hide('RegistAlarmModal');
    },
    close() {
      this.type = '';
      this.ment1 = '';
      this.ment2 = '';
    },
  },
};
</script>

<style></style>
