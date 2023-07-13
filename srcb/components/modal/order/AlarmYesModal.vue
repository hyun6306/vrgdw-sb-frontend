<template>
  <modal name="AlarmYesModal" width="480" height="auto" :adaptive="true">
    <div class="modal modal_new">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('AlarmYesModal')"></button>
      </div>
      <p class="modal_title">{{ $t('label.alarmTitle') }}</p>
      <div class="modal_content">
        <p class="txt_onboard">{{ $t('msg.alarmContent3') }}</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary">{{ $t('button.ok') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'AlarmYesModal',
};
</script>

<style></style>
