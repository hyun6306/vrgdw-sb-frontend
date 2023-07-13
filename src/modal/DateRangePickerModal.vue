<template>
  <modal name="DateRangePicker" width="900" height="auto" :adaptive="true" @before-close="close" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DateRangePicker')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.selectPeriod') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="selectDateShow" />
        </span>
        <VDatePicker v-model="time" type="date" value-type="format" format="YYYY-MM-DD" range inline @input="chooseDate" :disabled-date="disableDate"></VDatePicker>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary" @click="[confirm(), $modal.hide('DateRangePicker')]">
            {{ $t('message.btnCheck') }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import days from 'dayjs';

export default {
  props: {
    oldDate: {
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
      tranDate: [],
      selectDateShow: '',
    };
  },
  watch: {
    oldDate() {
      this.time = this.oldDate;
      this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
    },
  },
  methods: {
    disableDate(date) {
      if (this.page !== 'forwardingReq' && this.page !== 'deliveryList' && this.page !== 'forwardingStatList' && this.page !== 'tranCostList' && this.page !== 'carInOutManage' && this.page !== 'takeOverManage') {
        const day = new Date();
        const today = days(day).format('YYYY-MM-DD');
        const selectDays = days(date).format('YYYY-MM-DD');

        return today < selectDays;
      }
      return;
    },
    init() {
      if (this.page == 'tranCostList' || this.page == 'forwardingStatList') {
        this.time[0] = days().add(-62, 'day').format('YYYY-MM-DD');
        this.time[1] = days().format('YYYY-MM-DD');
        this.setDefaultDates();
        this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      } else if (this.page === 'carInOutManage' || this.page === 'deliveryList' || this.page == 'forwardingReq') {
        this.time[0] = days().subtract(1, 'month').format('YYYY-MM-DD');
        this.time[1] = days().add(1, 'month').format('YYYY-MM-DD');
        this.setDefaultDates();
        this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      } else if (this.page === 'takeOverManage') {
        this.time[0] = days().subtract(1, 'month').format('YYYY-MM-DD');
        this.time[1] = days().format('YYYY-MM-DD');
        this.setDefaultDates();
        this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      } else {
        this.time[0] = days().add(-1, 'year').format('YYYY-MM-DD');
        this.time[1] = days().format('YYYY-MM-DD');
        this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
        this.setDefaultDates();
      }
    },
    setDefaultDates() {
      this.$emit('setDefaultDates', this.time);
    },
    confirm() {
      if (this.selectDate.length > 0) {
        this.$emit('selectDate', this.selectDate);
      }
    },
    chooseDate() {
      this.selectDate = [];
      this.selectDate = this.time;
      if (this.page == 'tranCostList' || this.page == 'forwardingStatList' || this.page === 'takeOverManage' || this.page == 'carInOutManage') {
        this.tranDate = this.time;
        const diff = days(this.tranDate[0]).diff(days(this.tranDate[1]), 'day');
        if (diff < -62) {
          this.tranDate[0] = days(this.tranDate[1]).subtract(62, 'days').format('YYYY-MM-DD');
          this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
          this.$EventBus.$emit('openYesModal', 'message.msgSearchDays');
        } else {
          this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
        }
        // 운송비조회 외 페이지
      } else {
        // 만약 최초선택날짜가 최종선택날짜보다 작다면 1년을 빼라 형식은 yyyy-mm-dd로 만들고
        if (days(this.selectDate[0]).isBefore(days(this.selectDate[1]).subtract(1, 'year').format('YYYY-MM-DD'))) {
          this.selectDate[0] = days(this.selectDate[1]).subtract(1, 'year').format('YYYY-MM-DD');
          this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
          this.$EventBus.$emit('openYesModal', 'message.msgSearchYear');
        } else {
          this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
        }
      }
    },
    close() {
      this.time = this.oldDate;
      this.selectDateShow = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
    },
  },
  mounted() {},
  created() {
    this.init();
  },
};
</script>

<style></style>
