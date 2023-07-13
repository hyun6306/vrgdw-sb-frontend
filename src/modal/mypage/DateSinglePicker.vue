<template>
  <modal name="DateSinglePicker" width="340" height="auto" :adaptive="true" @before-open="checkFlag" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DateSinglePicker')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.selectPeriod') }}</p>
      <div class="modal_content a-c">
        <span class="date_title">
          <input type="text" disabled v-model="selectDate" />
        </span>
        <VDatePicker v-model="time" type="day" value-type="format" format="YYYY-MM-DD" inline @input="chooseDate"></VDatePicker>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary" @click="[confirm(), $modal.hide('DateSinglePicker')]">
            {{ $t('message.btnCheck') }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import days from 'dayjs';

export default {
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  props: {
    oldDate: {
      type: Array,
    },
  },
  data() {
    return {
      time: '',
      selectDate: '',
      dateFlag: '',
    };
  },
  watch: {
    oldDate() {
      this.time = this.oldDate;
      this.selectDateShow = this.$vnDateFormatD(this.time);
    },
  },
  methods: {
    checkFlag(event) {
      this.dateFlag = event.params;
    },
    disableDate(date) {
      const day = new Date();
      const today = days(day).format('YYYY-MM-DD');
      const selectDays = days(date).format('YYYY-MM-DD');

      return today < selectDays;
    },
    init() {
      this.time = days().format('YYYY-MM-DD');
      this.selectDateShow = this.$vnDateFormatD(this.time);
    },
    confirm() {
      if (this.selectDate.length > 0) {
        this.$emit('selectDate', this.selectDate, this.dateFlag);
      }
    },
    chooseDate() {
      this.selectDate = '';
      this.selectDate = this.time;
      this.selectDateShow = this.$vnDateFormatD(this.time);
    },
    close() {
      this.time = this.oldDate;
      this.selectDateShow = this.$vnDateFormatD(this.time);
    },
  },
  mounted() {},
  created() {
    this.init();
  },
};
</script>

<style></style>
