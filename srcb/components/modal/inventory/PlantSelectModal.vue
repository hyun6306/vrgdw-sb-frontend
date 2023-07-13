<template>
  <modal name="PlantSelectModal" width="400" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('PlantSelectModal')"></button>
      </div>
      <p class="modal_title_t02">플랜트 지정</p>
      <div class="modal_content a-c">
        <span>플랜트</span>
        <div class="plant_radio_box">
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            PARAMS
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            PARAMS
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            PARAMS
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            PARAMS
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            PARAMS
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            PARAMS
          </label>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default">취소</button>
          <button class="btn_default btn_primary">확인</button>
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
