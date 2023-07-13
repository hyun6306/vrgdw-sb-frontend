<template>
  <modal name="UtilDateRangePicker" width="900" height="auto" :adaptive="true" @before-close="close" @before-open="open" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('UtilDateRangePicker')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.selectPeriod') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="selectDateShow" />
        </span>
        <VDatePicker v-model="time" type="date" value-type="format" format="YYYY-MM-DD" range inline @input="chooseDate" :disabled-date="disableDate"></VDatePicker>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary" @click="confirm()">
            {{ $t('message.btnCheck') }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: ['setTime'],
  data() {
    return {
      time: [],
      selectDate: [],
      selectDateShow: '',
      excess: true,
    };
  },
  watch: {},
  methods: {
    disableDate(date) {
      date;
    },
    confirm() {
      if (this.excess) {
        this.$emit('selectDateRange', { show: this.selectDateShow, time: this.time });
        this.$modal.hide('UtilDateRangePicker');
      } else {
        this.$EventBus.$emit('openYesModal', '180일을 초과하여 선택할 수 없습니다.');
      }
    },
    chooseDate() {
      const startDt = dayjs(this.time[0]);
      const endDt = dayjs(this.time[1]);
      const excessDays = endDt.diff(startDt, 'd');
      this.selectDateShow = this.time.join(' ~ ');
      if (excessDays > 180) {
        this.excess = false;
      }
    },
    open(event) {
      this.time = event.params.time;
      this.selectDateShow = event.params.showDate;
    },
    close() {},
  },
  mounted() {},
  created() {},
};
</script>

<style></style>
