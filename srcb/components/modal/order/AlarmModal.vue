<template>
  <modal name="AlarmModal" width="480" height="auto" :adaptive="true">
    <div class="modal modal_new">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('AlarmModal')"></button>
      </div>
      <p class="modal_title">{{ $t('label.alarmTitle') }}</p>
      <div class="modal_content">
        <div class="txt_onboard">
          <!-- 
            .txt_onboard 텍스트 왼쪽정렬
             글자수가 많아 질 경우 .t-c 클래스 삭제(가운데정렬)
             <div class="txt_onboard">
           -->
          <p>{{ $t('msg.alarmContent1') }}</p>
          <p>{{ $t('msg.alarmContent2') }}</p>
        </div>
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
  name: 'AlarmModal',
};
</script>

<style></style>
