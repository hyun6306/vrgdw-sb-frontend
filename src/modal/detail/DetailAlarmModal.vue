<template>
  <modal name="DetailAlarmModal" width="480" height="auto" :adaptive="true" @closed="closedEvent" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('DetailAlarmModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(ment)">
          <!-- {{ $t(ment) }} -->
        </p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_deep_gray" @click="$modal.hide('DetailAlarmModal')">
          {{ $t('message.btnCancel') }}
        </button>
        <button class="btn_primary" @click="confirmBtn">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'DetailAlarmModal',
  data() {
    return {
      text: '',
    };
  },
  mixins: [alarmLength],
  props: ['ment', 'type'],
  methods: {
    confirmBtn() {
      if (this.ment == 'message.msgMoveRequest') {
        if (this.type == 'order') {
          this.$parent.loadOrderPage('generalOrder');
        } else if (this.type == 'sample') {
          this.$parent.loadOrderPage('sampleOrder');
        }
      } else if (this.ment == 'message.msgAskSave') {
        this.$emit('modalReturn', 'save');
      } else if (this.ment == 'message.msgAskRefresh') {
        this.$emit('modalReturn', 'reset');
      }
      this.$modal.hide('DetailAlarmModal');
    },
    closedEvent() {},
  },
  mounted() {},
};
</script>

<style></style>
