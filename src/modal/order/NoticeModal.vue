<template>
  <modal name="NoticeModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('NoticeModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']">{{ $t(ment) }}</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="$modal.hide('NoticeModal')">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'NoticeModal',
  props: ['ment'],
  mixins: [alarmLength],
  watch: {},
  methods: {
    close() {
      // ment가 마이페이지에서 props로 받은 수정 완료 ment라면 탭 닫고, 메인으로 이동
      if (this.ment == 'message.msgModifiedInfo') {
        this.$modal.hide('NoticeModal');
        this.$parent.moveMain();
      } else {
        this.$modal.hide('NoticeModal');
      }
    },
  },
};
</script>

<style></style>
