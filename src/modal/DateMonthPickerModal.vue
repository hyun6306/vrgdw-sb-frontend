<template>
  <modal name="DateMonthPicker" width="340" height="auto" :adaptive="true" @before-close="close" @before-open="open" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DateMonthPicker')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.chooseMonth') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="selectMonth" />
        </span>
        <VDatePicker v-model="valueMonth" type="month" value-type="format" format="YYYY-MM" inline @input="test" :disabled-date="disableDate"></VDatePicker>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary" @click="chooseMonth">
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
  props: ['currentMonth'],
  watch: {
    currentMonth() {
      let current = JSON.stringify(this.currentMonth).replaceAll('"', '');
      if (current !== 'undefined') {
        this.selectMonth = current;
        this.valueMonth = this.$revertDateFormatM(current);
      }
    },
  },
  data() {
    return {
      valueMonth: null,
      selectMonth: '',
      type: '',
    };
  },
  methods: {
    disableDate(date) {
      const day = new Date();
      const today = days(day).format('YYYY-MM');
      const selectDate = days(date).format('YYYY-MM');
      if (this.type === 'monthClosing') {
        return selectDate > today;
      } else if (this.type === 'calendar') {
        return;
      } else if (this.type === 'costManage') {
        return;
      } else {
        return today > selectDate;
      }
    },
    test() {
      this.selectMonth = this.$vnDateFormatM(this.valueMonth);
    },
    chooseMonth() {
      if (this.type === 'allHopeMonth') {
        this.$emit('chooseAllMonth', this.selectMonth);
      } else {
        this.$emit('chooseMonth', this.selectMonth);
      }

      this.$modal.hide('DateMonthPicker');
    },
    close() {},
    open(event) {
      this.type = event.params.type;
    },
    setDefaultMonth() {
      const day = new Date();
      const month = days(day).format('YYYY-MM');
      const defaultMonth = this.$vnDateFormatM(month);
      this.$emit('setMonth', defaultMonth);
    },
  },
};
</script>

<style></style>
