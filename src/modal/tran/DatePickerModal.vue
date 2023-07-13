<template>
  <modal :adaptive="true" :clickToClose="false" :name="`DatePicker${name}`" height="auto" width="340" @before-open="beforeOpen" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide(`DatePicker${name}`)"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.chooseDate') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input v-model="selectDateShow" disabled type="text" />
        </span>
        <VDatePicker v-model="time" :disabled-date="disableDate" format="YYYY-MM-DD" inline type="date" value-type="format" @input="chooseDate" @calendar-change="changePicker"></VDatePicker>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary" @click="confirm()">{{ $t('message.btnCheck') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import days from 'dayjs';
import masterApi from '@/api/master/master';

export default {
  props: {
    currentDate: {
      type: String,
    },
    name: {
      type: String,
      default: '',
    },
    deliveryDate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectDate: '',
      time: '',
      page: '',
      selectDateShow: '',
      disabledDates: [],
    };
  },
  watch: {
    currentDate() {
      if (this.page === 'bookingOrder' || this.page === 'poForwardingRequestModal') {
        this.time = this.currentDate;
        this.selectDateShow = this.$vnDateFormatD(this.time);
      } else {
        if (this.currentDate) {
          this.time = this.currentDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1');
        } else {
          if (this.page === 'bookingOrder') {
            this.time = this.deliveryDate;
          } else {
            this.time = days().format('YYYY-MM-DD');
          }
        }
      }
      this.setDate();
    },
  },
  methods: {
    disableDate(date) {
      const day = new Date();
      const today = days(day).format('YYYY-MM-DD');
      const selectDays = days(date).format('YYYY-MM-DD');
      const excess = days(day).add(90, 'day').format('YYYY-MM-DD');

      if (this.page === 'bookingOrder') {
        return this.deliveryDate > selectDays || excess < selectDays;
      } else if (this.page === 'dispatchReqManage') {
        let disabledTrueFalse = false;
        const weekend = days(date).day() === 0;
        this.disabledDates.forEach(disabled => {
          if (weekend && disabled.trnPsbYn === 'Y' && disabled.trnDt === selectDays) {
            disabledTrueFalse = false;
          } else if (weekend) {
            disabledTrueFalse = true;
          } else if (disabled.trnPsbYn === 'N' && disabled.trnDt === selectDays) {
            disabledTrueFalse = true;
          }
        });
        if (today > selectDays) {
          disabledTrueFalse = true;
        }
        return disabledTrueFalse;
      } else {
        return today > selectDays;
      }
    },
    confirm() {
      if (this.selectDate.length > 0) {
        this.$emit('selectDate', this.selectDate);
      }
      this.$modal.hide(`DatePicker${this.name}`);
    },
    chooseDate() {
      this.selectDate = '';
      this.setDate();
    },
    setDate() {
      this.selectDate = this.time;
      this.selectDateShow = this.$vnDateFormatD(this.selectDate);
    },
    beforeOpen(event) {
      this.page = event.params.page;
      if (this.page === 'bookingOrder' || this.page === 'poForwardingRequestModal') {
        if (!this.selectDate || !this.currentDate) {
          if (this.page === 'bookingOrder') {
            this.time = this.deliveryDate;
          } else {
            this.time = days().format('YYYY-MM-DD');
          }
        } else {
          this.time = this.currentDate;
        }
        this.setDate();
      } else {
        if (this.currentDate) {
          this.time = this.currentDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1');
        } else {
          this.time = days().format('YYYY-MM-DD');
        }
        this.setDate();
      }
      if (this.page === 'dispatchReqManage') {
        this.trnBlockList();
      }
    },
    close() {
      if (this.page === 'bookingOrder' || this.page === 'poForwardingRequestModal') {
        this.time = this.currentDate;
      } else {
        this.time = this.currentDate ? this.currentDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1') : this.currentDate;
      }
      this.setDate();
    },
    async trnBlockList(month = '') {
      this.disabledDates = [];
      if (month === '') {
        month = days(this.time).format('YYYY-MM');
      }
      let param = {
        stdYm: month,
      };
      try {
        const response = await masterApi.getTtrnBlockList(param);
        this.disabledDates = response.data.ds;
        this.disableDate();
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    changePicker(date) {
      if (this.page === 'dispatchReqManage') {
        const month = days(date).format('YYYY-MM');
        this.trnBlockList(month);
      }
    },
  },
};
</script>

<style></style>
