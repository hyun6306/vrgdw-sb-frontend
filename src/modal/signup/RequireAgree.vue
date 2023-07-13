<template>
  <modal name="RequireAgree" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('RequireAgree')"></button>
      </div>
      <!-- <p class="modal_title">알림</p> -->
      <div class="modal_content">
        <p class="txt_onboard">{{ $t('message.msgRequiredCheck') }}</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="$modal.hide('RequireAgree')">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'RequireAgree',
};
</script>

<style></style>
