<template>
  <modal name="CompleteModal" width="540" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CompleteModal')"></button>
      </div>
      <p class="modal_title_t02">완료처리</p>
      <div class="modal_content a-c">
        <div class="plant_radio_box">
          <span>배송유형</span>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            우편
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            영업방문
          </label>
        </div>
        <div class="form_textarea" style="height: 120px">
          <textarea placeholder="" />
        </div>
        <span class="sub_txt"> * 물류선택 시 기타출고요청 처리 됩니다 </span>
        <div class="modal_btn_contents_t05">
          <button class="btn_default btn_primary">완료</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'CompleteModal',
};
</script>

<style></style>
