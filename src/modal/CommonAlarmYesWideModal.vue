<template>
  <modal name="CommonAlarmYesWideModal" width="850" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('CommonAlarmYesWideModal')"></button>
      </div>
      <p class="modal_title" v-if="ment === 'Network Error'">Alert</p>
      <p class="modal_title" v-else>{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(ment)"></p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="$modal.hide('CommonAlarmYesWideModal')" v-if="ment === 'Network Error'">CONFIRM</button>
        <button class="btn_primary" @click="$modal.hide('CommonAlarmYesWideModal')" v-else>
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'CommonAlarmYesWideModal',
  props: ['ment'],
  mixins: [alarmLength],
};
</script>

<style></style>
