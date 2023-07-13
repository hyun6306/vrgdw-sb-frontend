<template>
  <modal name="DatePicker" width="340" height="auto" :adaptive="true" :clickToClose="false" @before-open="beforeOpen">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="close()"></button>
      </div>
      <p class="modal_title">{{ $t('message.chooseDate') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="show" />
        </span>
        <VDatePicker v-model="date" type="date" value-type="format" format="YYYY-MM-DD" inline @input="chooseDate" :disabled-date="disableDate" :default-value="defaultDate"></VDatePicker>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="confirm()">{{ $t('message.btnCheck') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
import days from 'dayjs';

export default {
  props: {
    isDefault: {
      type: Boolean,
      default: true,
    },
    before: {
      type: Boolean,
      default: false,
    },
    after: {
      type: Boolean,
      default: false,
    },
    afterDate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: this.isDefault ? this.$vnDateFormatD(days()) : '',
      date: '',
      page: '',
      type: '',
      afterDay: '',
      defaultDate: '',
      index: -1,
    };
  },
  methods: {
    disableDate(date) {
      const day = new Date();
      const today = days(day).format('YYYY-MM-DD');
      const selectDays = days(date).format('YYYY-MM-DD');

      if (this.before && this.after && this.afterDate === '') {
        let excess = days(day).add(this.afterDay, 'day').format('YYYY-MM-DD');
        return today > selectDays || excess < selectDays;
      } else if (this.afterDate !== '') {
        let afterDate = days(this.afterDate).add(1, 'day').format('YYYY-MM-DD');
        this.defaultDate = afterDate;
        return afterDate > selectDays;
      } else if (this.before) {
        return today > selectDays;
      } else {
        return;
      }
    },
    confirm() {
      if (this.page === 'order') {
        if (this.type === 'allHopeMonth') {
          this.$emit('chooseAllMonth', { show: this.show, date: this.date });
        } else {
          this.$emit('chooseMonth', { show: this.show, date: this.date, index: this.index });
        }
      } else {
        this.$emit('onSelectDate', { show: this.show, date: this.date });
      }
      if (this.date === '') {
        if (this.$DWAPI) {
          this.$DWAPI.post(['setPopToast', 'message.msgNoneChoose'], res => this.respo(res));
        }
      }
      this.close();
    },
    close() {
      this.show = '';
      this.date = '';
      this.$modal.hide('DatePicker');
    },
    chooseDate() {
      this.show = '';
      this.show = this.$vnDateFormatD(this.date);
    },
    beforeOpen(event) {
      this.page = event.params.page;
      this.type = event.params.type;
      this.afterDay = event.params.afterDay;
      let currentDate = event.params.currentDate;
      if (this.page === 'order') {
        currentDate = event.params.currentDate.date;
        this.index = event.params.index;
        /*        let date = [];
        if (currentDate && currentDate !== '' && Object.keys(currentDate).length > 0) {
          date = currentDate.split('-');
        }*/
        // if (date.length === 2) {
        //   this.date = this.$revertDateFormatM(currentDate);
        // } else if (date.length === 3) {
        //   this.date = this.$revertDateFormatD(currentDate);
        // }
        this.date = currentDate;
        this.show = this.$vnDateFormatD(currentDate);
      } else if (this.show === '') {
        if (currentDate) {
          this.show = currentDate.show;
          this.date = currentDate.date;
        }
      }
    },
  },
};
</script>

<style></style>
