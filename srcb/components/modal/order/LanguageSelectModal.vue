<template>
  <modal name="LanguageSelectModal" width="400" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('LanguageSelectModal')"></button>
      </div>
      <p class="modal_title_t02">견적서 출력</p>
      <div class="modal_content a-c">
        <span>견적서의 언어를 선택해주세요.</span>
        <div class="lang_checkbox">
          <label class="chechbox_basic">
            <input type="checkbox" />
            <span class="checkmark"></span>
            영어
          </label>
          <label class="chechbox_basic">
            <input type="checkbox" />
            <span class="checkmark"></span>
            베트남어
          </label>
        </div>
        <p>
          <label class="chechbox_basic">
            <input type="checkbox" />
            <span class="checkmark"></span>
            서명을 포함합니다.
          </label>
        </p>
        <div class="modal_btn_contents_t05">
          <button class="btn_default">취소</button>
          <button class="btn_default btn_primary">출력</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'PlantSelectModal',
};
</script>

<style></style>
