<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div class="search_box">
      <div class="search_box_filter">
        <div class="filter_list">
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.selectPeriod') }}</span>
            <!-- 데이터피커 -->
            <div class="form_calendar w_100" @click="$modal.show('PriceDateRangePicker')">
              <input type="text" placeholder="" v-model="date.show" />
              <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.alarmCd') }}</span>
            <MultiSelect label="text" v-model="alarmCd" :options="alarmCdOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false"></MultiSelect>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.sendType') }}</span>
            <MultiSelect label="text" v-model="sendType" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false"></MultiSelect>
          </label>
          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="[resetPageNumber(), getSendLog()]">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
        <div class="filter_list">
          <label for="" class="filter_type filter_type_double">
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <input type="text" :placeholder="$t('message.msgPlaceAlertLog')" v-model="filter" ref="filter" @keyup.enter="[resetPageNumber(), getSendLog()]" />
          </label>
        </div>
      </div>
    </div>
    <DateRangePickerModal :after="true" :maxDays="365" :default="`thisYear`" @selectDateRange="selectDateRange" ref="DateRange" />
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import commonApi from '@/api/common';
import systemApi from '@/api/system/system';
// import DateRangePickerModal from '@/modal/DateRangePickerModal';
import DateRangePickerModal from '@/modal/sales/DateRangePickerModal';

export default {
  props: ['page', 'changePageNumber', 'authButton'],
  components: {
    DateRangePickerModal,
  },
  data() {
    return {
      date: {},
      alarmCd: { text: this.$t('message.all'), value: '' },
      alarmCdOptions: [],
      sendType: { text: this.$t('message.all'), value: '' },
      selectOptions: [
        { value: '', text: this.$t('message.all') },
        { value: 'EMAIL', text: 'EMAIL' },
        { value: 'APP PUSH', text: 'APP PUSH' },
      ],
      filter: '',
      pageNumber: 0,
      pageSize: 20,
      pageInfo: {},
    };
  },
  watch: {
    changePageNumber() {
      this.pageNumber = this.changePageNumber;
      this.getSendLog();
    },
  },
  methods: {
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        this.alarmCdOptions = [{ text: this.$t('message.all'), value: '' }, ...response.data.ds];
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    selectDateRange(date) {
      this.date = date;
    },
    async getSendLog() {
      this.$refs.filter.blur();
      try {
        const param = {
          sttDt: this.date.time[0],
          endDt: this.date.time[1],
          alarmCd: this.alarmCd.value,
          sendType: this.sendType.value,
          filter: this.filter,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        };

        const resp = await systemApi.getSendLog(param);

        this.$emit('sendSearchList', resp.data.ds);
        this.pageInfo = resp.data.page;
        this.$emit('sendPageInfo', this.pageInfo);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    resetPageNumber() {
      this.pageNumber = 0;
      this.$emit('resetPageNumber', 0);
    },
    reset() {
      this.filter = '';
      this.alarmCd = { text: this.$t('message.all'), value: '' };
      this.sendType = { text: this.$t('message.all'), value: '' };
      this.$refs.DateRange.reset();
    },
  },
  mounted() {
    this.getSendLog();
  },
  created() {
    this.getCommonCodeCombo('ALARM_CD');
  },
};
</script>

<style></style>
