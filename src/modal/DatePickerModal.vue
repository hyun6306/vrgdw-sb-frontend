<template>
  <modal name="DatePicker" width="340" height="auto" :adaptive="true" :clickToClose="false" @before-open="beforeOpen" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DatePicker')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.chooseDate') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="selectDate" />
        </span>
        <VDatePicker v-model="time" type="date" value-type="format" format="YYYY-MM-DD" inline @input="chooseDate" :disabled-date="disableDate" :disabledDates="disabledDates" :default-value="defaultDate" @calendar-change="changePicker"></VDatePicker>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary" @click="confirm()">{{ $t('message.btnCheck') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import days from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
days.extend(weekday);
import masterApi from '@/api/master/master';

export default {
  props: {
    oldDate: {
      type: String,
    },
    isDefault: {
      type: Boolean,
      default: true,
    },
    afterDate: {
      type: String,
    },
  },
  data() {
    return {
      selectDate: this.isDefault ? this.$vnDateFormatD(days()) : '',
      time: '',
      page: '',
      type: '',
      defaultDate: '',
      disabledDates: ['2023-01-28'],
    };
  },
  watch: {
    oldDate() {
      this.time = this.oldDate;
      this.selectDate = this.$vnDateFormatD(this.time);
    },
  },
  methods: {
    disableDate(date) {
      const day = new Date();
      const today = days(day).format('YYYY-MM-DD');
      const selectDays = days(date).format('YYYY-MM-DD');
      const excess = days(day).add(90, 'day').format('YYYY-MM-DD');

      if (this.page === 'costCenter' || this.page === 'productionDate' || this.page === 'poForwardingRequest' || this.page === 'etcRegist') {
        return today > selectDays;
      } else if (this.page === 'bookingOrder') {
        return today > selectDays || excess < selectDays;
      } else if (this.page === 'order' && this.afterDate !== '') {
        let afterDate = days(this.afterDate).add(1, 'day').format('YYYY-MM-DD');
        this.defaultDate = afterDate;
        return afterDate > selectDays;
      } else if (this.page === 'ForwardingReqManage') {
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
        return;
      }
    },
    confirm() {
      if (this.page === 'productionDate') {
        if (this.type === 'mfbSttDt') {
          this.$emit('mfbSttDt', { show: this.selectDate, time: this.time });
        } else if (this.type === 'mfbPropDt') {
          this.$emit('mfbPropDt', { show: this.selectDate, time: this.time });
        }
      } else if (this.page === 'order') {
        if (this.type === 'allHopeMonth') {
          this.$emit('chooseAllDate', this.selectDate);
        } else {
          this.$emit('chooseDate', this.selectDate);
        }
      } else if (this.page == 'holiday') {
        if (this.type == 'startDt') {
          this.$emit('startDate', { show: this.selectDate, time: this.time });
        } else if (this.type === 'endDt') {
          this.$emit('endDate', { show: this.selectDate, time: this.time });
        }
      } else if (this.page == 'trnBlock') {
        this.$emit('selectDate', { show: this.selectDate, time: this.time });
      } else if (this.page === 'etcRegist') {
        this.$emit('selectDate', { show: this.selectDate, time: this.time });
      } else if (this.page === 'ForwardingReqManage' || this.page == 'orderMonth') {
        this.$emit('chooseDate', this.selectDate, this.type);
      } else if (this.selectDate) {
        this.$emit('selectDate', this.selectDate);
      }
      this.$modal.hide('DatePicker');
    },
    chooseDate() {
      this.selectDate = '';
      this.selectDate = this.$vnDateFormatD(this.time);
    },
    beforeOpen(event) {
      this.page = event.params.page;
      this.type = event.params.type;
      if (this.page === 'productionDate' || this.page === 'etcRegist') {
        let timeInfo = event.params.timeInfo;
        if (Object.keys(timeInfo).length !== 0) {
          this.selectDate = timeInfo.show;
          this.time = timeInfo.time;
        }
      } else if (this.page === 'order') {
        let currentDate = event.params.currentDate;
        this.selectDate = currentDate;
        let date = [];
        if (currentDate && currentDate !== '') {
          date = currentDate.split('-');
        }
        if (date.length === 2) {
          this.time = this.$revertDateFormatM(currentDate);
        } else if (date.length === 3) {
          this.time = this.$revertDateFormatD(currentDate);
        }
      } else if (this.page === 'ForwardingReqManage' || this.page == 'orderMonth') {
        let currentDate = event.params.currentDate;
        this.selectDate = currentDate;
        if (currentDate) this.time = this.$revertDateFormatD(currentDate);
      } else if (this.selectDate === '') {
        this.selectDate = this.$vnDateFormatD(this.time);
      }
      if (this.page === 'ForwardingReqManage') {
        this.trnBlockList();
      }
    },
    close() {
      this.time = this.oldDate;
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
      if (this.page === 'ForwardingReqManage') {
        const month = days(date).format('YYYY-MM');
        this.trnBlockList(month);
      }
    },
  },
};
</script>

<style></style>
