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
            <span class="filter_type_title">{{ $t('message.scheduleCd') }}</span>
            <div class="form_input">
              <MultiSelect style="width: 100%" v-model="schCd" :options="schCdOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
            </div>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <input type="text" style="" id="custoer_name" :placeholder="$t('message.msgPlaceSchedule')" v-model="filter" ref="filter" @keyup.enter="[resetPageNumber(), getScheduleLog()]" />
          </label>
          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="[resetPageNumber(), getScheduleLog()]">{{ $t('message.btnSearch') }}</button>
          </div>
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
import DateRangePickerModal from '@/modal/sales/DateRangePickerModal';
export default {
  props: ['page', 'changePageNumber', 'authButton'],
  components: {
    DateRangePickerModal,
  },
  data() {
    return {
      schCd: { value: '', text: this.$t('message.all') },
      schCdOptions: [],
      filter: '',
      pageNumber: 0,
      pageSize: 20,
      pageInfo: {},
      date: {},
    };
  },
  watch: {
    changePageNumber() {
      this.pageNumber = this.changePageNumber;
      this.getScheduleLog();
    },
  },
  methods: {
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: '',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        this.schCdOptions = response.data.ds;
        this.schCdOptions.unshift({ text: this.$t('message.all'), value: '' });
      } catch (e) {
        console.log(e);
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
    async getScheduleLog() {
      this.$refs.filter.blur();
      try {
        const param = {
          filter: this.filter,
          sttDt: this.date.time[0],
          endDt: this.date.time[1],
          schCd: this.schCd.value,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        };
        const resp = await systemApi.getScheduleLog(param);
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
      this.schCd = this.schCdOptions[0];
      this.$refs.DateRange.reset();
    },
  },
  mounted() {
    this.getCommonCodeCombo('SCHEDULE_CD');
    this.getScheduleLog();
  },
};
</script>

<style></style>
