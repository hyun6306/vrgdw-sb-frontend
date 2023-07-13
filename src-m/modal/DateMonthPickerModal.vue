<template>
  <modal name="DateMonthPicker" width="340" height="auto" :adaptive="true" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DateMonthPicker')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.chooseMonth') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="show" />
        </span>
        <VDatePicker v-model="month" type="month" value-type="format" format="YYYY-MM" inline @input="selectMonth" :disabled-date="disableDate"></VDatePicker>
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
  data() {
    return {
      month: null,
      show: '',
      type: '',
      currentMonth: '',
      index: -1,
    };
  },
  methods: {
    disableDate(date) {
      const day = new Date();
      const today = days(day).format('YYYY-MM');
      const selectDate = days(date).format('YYYY-MM');
      return today > selectDate;
    },
    selectMonth() {
      this.show = this.$vnDateFormatM(this.month);
    },
    chooseMonth() {
      if (this.type === 'allHopeMonth') {
        this.$emit('chooseAllMonth', { show: this.show, month: this.month });
      } else {
        this.$emit('chooseMonth', { show: this.show, month: this.month, index: this.index });
      }

      this.$modal.hide('DateMonthPicker');
    },
    close() {
      this.show = '';
      this.month = '';
    },
    open(event) {
      this.type = event.params.type;
      this.current = event.params.current;
      this.index = event.params.index;
      this.show = this.current.show;
      if (this.current) this.month = this.current.month;
    },
  },
};
</script>

<style></style>
