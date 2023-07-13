<template>
  <modal name="DatePicker" width="340" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('DatePicker')"></button>
      </div>
      <p class="modal_title">{{ $t('label.chooseDate') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="selectDate" />
        </span>
        <VDatePicker v-model="time2" type="date" inline @input="test"></VDatePicker>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="chooseDay()">{{ $t('button.ok') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
import days from 'dayjs';

export default {
  data() {
    return {
      selectDate: '',
      active: false,
    };
  },
  methods: {
    test() {
      this.selectDate = days(this.time2).format('YYYY.MM.DD');
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    chooseDay() {
      console.log('chooseDay');
      this.$emit('chooseDay', this.selectDate);
      this.$modal.hide('DatePicker');
    },
  },
};
</script>

<style></style>
