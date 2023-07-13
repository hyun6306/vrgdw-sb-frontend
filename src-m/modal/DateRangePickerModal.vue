<template>
  <modal name="DateRangePicker" width="90%" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="closeNotConfirm"></button>
      </div>
      <p class="modal_title" style="height: 1%">{{ $t('message.selectPeriod') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="selectDateShow" />
        </span>
        <VDatePicker v-model="time" type="date" value-type="format" format="YYYY-MM-DD" range inline @input="chooseDate" :disabled-date="disableDate"></VDatePicker>
        <div class="modal_btn_contents">
          <button class="btn_primary" @click="confirm()">{{ $t('message.btnCheck') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    maxDays: {
      type: Number,
      default: 180,
    },
    page: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      time: [],
      selectDate: [],
      selectDateShow: '',
      excess: true,
      backUpTime: [],
    };
  },
  watch: {},
  methods: {
    disableDate(date) {
      date;
      // 미래일 선택 불가 시 주석 해제
      // if (this.page == 'deliveryStatus') {
      //   const day = new Date();
      //   const today = dayjs(day).format('YYYY-MM-DD');
      //   const selectDays = dayjs(date).format('YYYY-MM-DD');
      //   return today < selectDays;
      // }
    },
    confirm() {
      if (this.excess) {
        this.backUpTime = JSON.parse(JSON.stringify(this.time));
        this.$emit('selectDateRange', { show: this.selectDateShow, time: this.time });
        this.$modal.hide('DateRangePicker');
      } else {
        this.$EventBus.$emit('openYesModal', `${this.maxDays}일을 초과하여 선택할 수 없습니다.`);
      }
    },
    chooseDate() {
      const startDt = dayjs(this.time[0]);
      const endDt = dayjs(this.time[1]);
      const excessDays = endDt.diff(startDt, 'd');
      this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      if (excessDays > this.maxDays) {
        this.excess = false;
      } else {
        this.excess = true;
      }
    },
    init() {
      if (this.page == 'deliveryStatus') {
        this.time[0] = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
        this.time[1] = dayjs().add(1, 'month').format('YYYY-MM-DD');
      } else {
        this.time[0] = dayjs().add(-this.maxDays, 'day').format('YYYY-MM-DD');
        this.time[1] = dayjs().format('YYYY-MM-DD');
      }
      this.backUpTime = JSON.parse(JSON.stringify(this.time));
      this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      this.$emit('selectDateRange', { show: this.selectDateShow, time: this.time });
    },
    closeNotConfirm() {
      this.time = JSON.parse(JSON.stringify(this.backUpTime));
      this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      this.$modal.hide('DateRangePicker');
    },
    close() {},
  },
  mounted() {},
  created() {
    this.init();
  },
};
</script>

<style></style>
