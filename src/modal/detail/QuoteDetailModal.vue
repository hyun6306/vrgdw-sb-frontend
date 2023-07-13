<template>
  <modal name="QuoteDetailModal" width="480" height="auto" :adaptive="true" @closed="closedEvent" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('QuoteDetailModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <div class="txt_onboard">
          <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(ment)">
            <!-- {{ $t(ment) }} -->
          </p>
          <p v-if="this.modalData"><br />{{ $t(modalData) }}</p>
        </div>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="confirmBtn()">{{ $t('message.btnYes') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'QuoteDetailModal',
  data() {
    return {};
  },
  mixins: [alarmLength],
  props: ['ment', 'modalData', 'type'],
  methods: {
    confirmBtn() {
      if (this.ment == 'message.msgCancelQuotation') {
        if (this.type == 'orderDtls') {
          this.$parent.loadOrderPage('generalList');
        } else if (this.type == 'sampleDtls') {
          this.$parent.loadOrderPage('sampleList');
        }
      }
      this.$modal.hide('QuoteDetailModal');
    },
    closedEvent() {
      this.$emit('modalReturn', true);
    },
  },
};
</script>

<style></style>
