<template>
  <modal name="AlarmYesModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('AlarmYesModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(ment)"></p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="$modal.hide('AlarmYesModal')">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'AlarmYesModal',
  props: ['ment'],
  mixins: [alarmLength],
};
</script>

<style></style>
