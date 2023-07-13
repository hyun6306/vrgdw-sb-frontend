<template>
  <modal name="DateMonthPicker" width="340" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DateMonthPicker')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('label.chooseMonth') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="selectMonth" />
        </span>
        <VDatePicker v-model="valueMonth" type="month" inline @input="test" :lang="lang"></VDatePicker>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary">{{ $t('button.ok') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import days from 'dayjs';

export default {
  data() {
    return {
      valueMonth: null,
      selectMonth: '',
      lang: {
        // the locale of formatting and parsing function
        formatLocale: {
          // MMMM
          months: ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'],
          monthsShort: ['thá', 'Th02', 'Th03', 'Th04', 'Th05', 'Th06', 'Th07', 'Th08', 'Th09', 'Th10', 'Th11', 'Th12'],
          weekdays: ['chủ nhật', 'thứ hai', 'thứ ba', 'thứ tư', 'thứ năm', 'thứ sáu', 'thứ bảy'],
          weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
          weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
          firstDayOfWeek: 1,
          firstWeekContainsDate: 4,
        },
      },
    };
  },
  methods: {
    test() {
      // this.selectDate = days(this.time2).format('YYYY/MM/DD');
      // this.selectDateShow = this.selectDate.join(' - ');
      console.log(this.valueMonth);
      this.selectMonth = days(this.valueMonth).format('MM');
    },
  },
};
</script>

<style></style>
