<template>
  <modal name="NoticeModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('NoticeModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p class="txt_onboard">{{ $t(ment) }}</p>
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
export default {
  name: 'NoticeModal',
  props: ['ment'],
};
</script>

<style></style>
