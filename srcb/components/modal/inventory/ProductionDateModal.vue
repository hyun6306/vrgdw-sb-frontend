<template>
  <modal name="ProductionDateModal" width="400" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ProductionDateModal')"></button>
      </div>
      <p class="modal_title_t02">생산일 지정</p>
      <div class="modal_content a-c">
        <div class="form_production_date">
          <span class="">MFB 생산시작일</span>
          <div class="form_calendar">
            <input type="text" placeholder="기간 선택" />
            <button class="icon_calendar" @click="datePicker('DateRangePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
        </div>
        <div class="form_production_date">
          <span class="">MFB 생산예정일</span>
          <div class="form_calendar">
            <input type="text" placeholder="기간 선택" />
            <button class="icon_calendar" @click="datePicker('DateRangePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
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
  name: 'ProductionDateModal',
};
</script>

<style></style>
