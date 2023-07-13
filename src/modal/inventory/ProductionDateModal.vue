<template>
  <modal name="ProductionDateModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close"></button>
      </div>
      <p class="modal_title_t02">생산일 지정</p>
      <div class="modal_content a-c">
        <div class="form_production_date">
          <span class="">MFB 생산시작일</span>
          <div class="form_calendar">
            <input type="text" placeholder="기간 선택" v-model="mfbSttDt.show" />
            <button class="icon_calendar" @click="openDatePicker('mfbSttDt')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
        </div>
        <div class="form_production_date">
          <span class="">MFB 생산예정일</span>
          <div class="form_calendar">
            <input type="text" placeholder="기간 선택" v-model="mfbPropDt.show" />
            <button class="icon_calendar" @click="openDatePicker('mfbPropDt')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="close">취소</button>
          <button class="btn_default btn_primary" @click="sendStockAssignDt">확인</button>
        </div>
      </div>
    </div>
    <DatePickerModal @mfbSttDt="getMfbSttDt" @mfbPropDt="getMfbPropDt" />
  </modal>
</template>

<script>
import DatePickerModal from '@/modal/DatePickerModal';
export default {
  components: {
    DatePickerModal,
  },
  data() {
    return {
      mfbPropDt: {},
      mfbSttDt: {},
    };
  },
  name: 'ProductionDateModal',
  methods: {
    openDatePicker(type) {
      if (type === 'mfbSttDt') {
        this.$modal.show('DatePicker', { page: 'productionDate', type, timeInfo: this.mfbSttDt });
      } else if (type === 'mfbPropDt') {
        this.$modal.show('DatePicker', { page: 'productionDate', type, timeInfo: this.mfbPropDt });
      }
    },
    getMfbSttDt(timeInfo) {
      this.mfbSttDt = timeInfo;
    },
    getMfbPropDt(timeInfo) {
      this.mfbPropDt = timeInfo;
    },
    close() {
      this.mfbPropDt = {};
      this.mfbSttDt = {};
      this.$modal.hide('ProductionDateModal');
    },
    sendStockAssignDt() {
      if (this.mfbSttDt.time && this.mfbPropDt.time) {
        const data = {
          prdcExpctDt: this.mfbSttDt.time, // 생산 예정일
          prdcSttDt: this.mfbPropDt.time, // 생산 시작일
        };
        this.$emit('sendStockAssignDt', data);
        this.close();
      } else {
        this.$EventBus.$emit('openYesModal', '일자를 모두 선택해야합니다.');
      }
    },
  },
};
</script>

<style></style>
