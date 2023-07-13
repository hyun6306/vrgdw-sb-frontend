<template>
  <modal name="IdPwModal" width="480" height="auto" :adaptive="true">
    <div class="modal modal_new">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('IdPwModal')"></button>
      </div>
      <p class="modal_title">알림</p>
      <div class="modal_content">
        <p class="txt_onboard">{{ $t('msg.alarmContent4') }}<br />{{ $t('msg.alarmContent5') }}</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary">{{ $t('button.ok') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'IdPwModal',
};
</script>

<style></style>
