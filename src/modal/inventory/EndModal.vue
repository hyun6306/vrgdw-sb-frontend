<template>
  <modal name="EndModal" width="540" height="auto" :clickToClose="false">
    <div class="modal" id="">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('EndModal')"></button>
      </div>
      <p class="modal_title_t03">선택하신 제품이 잔량종료 처리 되었습니다.</p>
      <div class="modal_content a-c">
        <div class="plant_radio_box">
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            고객 희망
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            생산차질
          </label>
        </div>
        <div class="form_textarea" style="height: 120px">
          <textarea placeholder="잔량종료 사유를 입력해주세요." />
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default btn_primary">잔량종료</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'EndModal',
  data() {
    return {
      active: false,
    };
  },
  methods: {},
};
</script>

<style></style>
