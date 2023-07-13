<template>
  <modal :name="`AlarmModal${name}`" width="90%" height="auto" :adaptive="true" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide(`AlarmModal${name}`)"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(message)"></p>
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
  props: ['name'],
  name: 'alarmModal',
  data() {
    return {
      message: '',
      type: '',
      index: -1,
    };
  },
  mixins: [alarmLength],
  methods: {
    open(event) {
      this.message = event.params.message;
      this.type = event.params.type;
      this.index = event.params.index;
    },
    okOrNo(result) {
      this.$emit('okOrNo', { result, type: this.type, index: this.index });
      this.$modal.hide(`AlarmModal${this.name}`);
    },
  },
};
</script>

<style></style>
