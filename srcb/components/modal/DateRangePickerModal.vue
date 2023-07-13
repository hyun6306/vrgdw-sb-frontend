<template>
  <modal name="DateRangePicker" width="900" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DateRangePicker')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('label.chooseDateRange') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="selectDateShow" />
        </span>
        <VDatePicker v-model="time2" type="date" range inline @input="test"></VDatePicker>
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
      selectDate: [],
      selectDateShow: '',
    };
  },
  methods: {
    test() {
      this.selectDate = [];
      this.selectDate.push(days(this.time2[0]).format('YYYY/MM/DD'));
      this.selectDate.push(days(this.time2[1]).format('YYYY/MM/DD'));
      // this.selectDate = days(this.time2).format('YYYY/MM/DD');
      this.selectDateShow = this.selectDate.join(' - ');
    },
  },
};
</script>

<style></style>
