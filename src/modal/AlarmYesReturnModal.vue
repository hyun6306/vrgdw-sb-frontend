<template>
  <modal :name="`AlarmYesReturnModal${page}`" width="480" height="auto" :adaptive="true" :clickToClose="false" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('AlarmYesModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(message)"></p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="confirm">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'AlarmYesReturnModal',
  props: ['page'],
  mixins: [alarmLength],
  data() {
    return {
      message: '',
    };
  },
  methods: {
    open(event) {
      this.message = event.params.message;
    },
    confirm() {
      this.$emit('confirm');
      this.$modal.hide(`AlarmYesReturnModal${this.page}`);
    },
  },
};
</script>

<style></style>
