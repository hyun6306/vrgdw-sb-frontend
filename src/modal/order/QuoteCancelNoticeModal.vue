<template>
  <modal name="QuoteCancelNoticeModal" width="850" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('QuoteCancelNoticeModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <div>
          <p class="txt_onboard">{{ $t('message.msgCancelMent1') }}</p>
          <p class="txt_onboard">{{ $t('message.msgCancelMent2') }}</p>
          <p class="txt_onboard">{{ $t('message.msgCancelMent3') }}</p>
          <p class="txt_onboard">{{ $t('message.msgCancelMent4') }}</p>
          <p class="txt_onboard">{{ $t('message.msgCancelMent5') }}</p>
          <p class="txt_onboard">{{ $t('message.msgCancelMent6') }}</p>
          <p class="txt_onboard">{{ $t('message.msgCancelMent7') }}</p>
        </div>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="$modal.hide('QuoteCancelNoticeModal')">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'QuoteCancelNoticeModal',
  // props: ['ment'],
  mixins: [alarmLength],
  watch: {},
  methods: {},
};
</script>

<style></style>
