<template>
  <modal name="PriceDateRangePicker" width="900" height="auto" :adaptive="true" @before-open="beforeOpen" @before-close="close" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="closeNotConfirm"></button>
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
  props: {
    maxDays: {
      type: Number,
      default: 180,
    },
    after: {
      type: Boolean,
      default: false,
    },
    default: {
      type: String,
      default: 'maxDays',
    },
    changeDate: {
      type: Array,
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
  watch: {
    changeDate(date) {
      if (this.default == 'change') {
        this.time[0] = date[0];
        this.time[1] = date[1];
      }
    },
  },
  methods: {
    disableDate(date) {
      if (this.after && this.page !== 'tranCostManage') {
        const day = new Date();
        const today = dayjs(day).format('YYYY-MM-DD');
        const selectDays = dayjs(date).format('YYYY-MM-DD');
        return today < selectDays;
      } else if (this.after && this.page == 'tranCostManage') {
        const day = new Date();
        const selectDays = dayjs(date).format('YYYY-MM-DD');
        // 현재 월의 마지막 일자 계산, 포맷팅
        const lastDay = new Date(day.getFullYear(), day.getMonth() + 1, 0);
        const setLastDay = dayjs(lastDay).format('YYYY-MM-DD');
        return setLastDay < selectDays;
      }
    },
    confirm() {
      if (this.excess) {
        this.backUpTime = JSON.parse(JSON.stringify(this.time));
        this.$emit('selectDateRange', { show: this.selectDateShow, time: this.time });
        this.$modal.hide('PriceDateRangePicker');
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
      if (this.default == 'today' && this.page !== 'tranCostManage') {
        this.time[0] = dayjs().format('YYYY-MM-DD');
        this.time[1] = dayjs().format('YYYY-MM-DD');
      } else if (this.default === 'thisYear') {
        this.time[0] = dayjs().startOf('year').format('YYYY-MM-DD');
        this.time[1] = dayjs().format('YYYY-MM-DD');
        this.$emit('selectDateRange', { show: this.selectDateShow, time: this.time });
      } else if (this.default == 'maxDays' && this.page == 'tranCostManage') {
        const day = new Date();
        const lastDay = new Date(day.getFullYear(), day.getMonth() + 1, 0);
        // const setLastDay = dayjs(lastDay).format('YYYY-MM-DD');
        this.time[0] = dayjs(lastDay).subtract(62, 'day').format('YYYY-MM-DD');
        this.time[1] = dayjs(lastDay).format('YYYY-MM-DD');
      } else if (this.default == '14') {
        this.time[0] = dayjs().format('YYYY-MM-DD');
        this.time[1] = dayjs()
          .add(+(this.default * 1), 'day')
          .format('YYYY-MM-DD');
        // PO출고요청관리 defualt 기간 설정, 접속일 전 날 기준으로 지난 한달 ex) 접속일 22-11-28 => stt: 22-10-29 end: 22-11-27
      } else if (this.default == 'month') {
        this.time[0] = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
        this.time[1] = dayjs().format('YYYY-MM-DD');
      } else if (this.default == 'aroundMonth') {
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
      this.$modal.hide('PriceDateRangePicker');
    },
    close() {},
    beforeOpen() {
      if (this.default == 'today') {
        this.time[0] = dayjs().format('YYYY-MM-DD');
        this.time[1] = dayjs().format('YYYY-MM-DD');
      } else if (this.default == 'change') {
        this.time[0] = this.changeDate[0];
        this.time[1] = this.changeDate[1];
      } else if (this.default == '14') {
        this.time[0] = dayjs().format('YYYY-MM-DD');
        this.time[1] = dayjs().add(14, 'day').format('YYYY-MM-DD');
      }
    },
    reset() {
      if (this.default === 'thisYear') {
        this.time[0] = dayjs().startOf('year').format('YYYY-MM-DD');
        this.time[1] = dayjs().format('YYYY-MM-DD');
        this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
        this.$emit('selectDateRange', { show: this.selectDateShow, time: this.time });
      }
    },
  },
  mounted() {},
  created() {
    this.init();
  },
};
</script>

<style></style>
