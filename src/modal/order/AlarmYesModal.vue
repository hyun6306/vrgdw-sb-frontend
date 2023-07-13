<template>
  <modal name="OrderAlarmYesModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('OrderAlarmYesModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(ment)"></p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="$modal.hide('OrderAlarmYesModal')">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'OrderAlarmYesModal',
  props: ['ment'],
  mixins: [alarmLength],
};
</script>

<style></style>
