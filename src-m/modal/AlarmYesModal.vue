<template>
  <modal name="AlarmYesModal" width="90%" height="auto" :adaptive="true" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="confirm"></button>
      </div>
      <p class="modal_title">{{ $t(title) }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(message)"></p>
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
      title: '',
      message: '',
      type: '',
    };
  },
  mixins: [alarmLength],
  methods: {
    open(event) {
      this.message = event.params.message;
      this.type = event.params.type;
      this.title = event.params.title;
    },
    confirm() {
      this.$modal.hide('AlarmYesModal');
    },
  },
};
</script>

<style></style>
