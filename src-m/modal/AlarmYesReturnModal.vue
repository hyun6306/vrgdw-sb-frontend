<template>
  <modal name="AlarmYesReturnModal" width="90%" height="auto" :adaptive="true" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="confirm"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(message)"></p>
        <!-- <p class="txt_onboard">{{ message }}</p> -->
      </div>
      <div class="modal_btn_contents">
        <button class="btn_ok" @click="confirm">{{ $t('message.btnYes') }}</button>
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
      message: '',
      type: '',
    };
  },
  mixins: [alarmLength],
  methods: {
    open(event) {
      this.message = event.params.message;
      this.type = event.params.type;
    },
    confirm() {
      this.$emit('confirm', this.type);
      this.$modal.hide('AlarmYesReturnModal');
    },
  },
};
</script>

<style></style>
