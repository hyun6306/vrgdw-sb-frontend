<template>
  <modal name="DeleteModal" width="400" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('DeleteModal')"></button>
      </div>
      <p class="modal_title">삭제하시겠습니까?</p>
      <div class="modal_content">
        <p class="txt_onboard">선택된 공지사항을 삭제하시겠습니까?</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_deep_gray">{{ $t('button.no') }}</button>
        <button class="btn_primary">{{ $t('button.yes') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'DeleteModal',
};
</script>

<style></style>
