<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div class="search_box">
      <div class="search_box_filter">
        <div class="filter_list">
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.rangeDt') }}</span>
            <!-- 데이터피커 -->
            <div class="form_calendar w_100" @click="$modal.show('PriceDateRangePicker')">
              <input type="text" placeholder="" v-model="date.show" />
              <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.resultYn') }}</span>
            <MultiSelect id="Material_Group" style="width: 100%" v-model="result" :options="resultOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <!-- 데이터피커 -->
            <input type="text" style="" id="custoer_name" :placeholder="$t('message.msgPlaceIf')" v-model="filter" ref="filter" @keyup.enter="[resetPageNumber(), getInterfaceLog()]" />
          </label>
          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="[resetPageNumber(), getInterfaceLog()]">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
    </div>
    <DateRangePickerModal :after="true" :maxDays="365" :default="`thisYear`" @selectDateRange="selectDateRange" ref="DateRange" />
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import systemApi from '@/api/system/system';
import DateRangePickerModal from '@/modal/sales/DateRangePickerModal';
export default {
  props: ['page', 'changePageNumber', 'authButton'],
  components: {
    DateRangePickerModal,
  },
  data() {
    return {
      filter: '',
      pageNumber: 0,
      pageSize: 30,
      pageInfo: {},
      date: {},
      resultOptions: [
        { text: this.$t('message.all'), value: '' },
        { text: this.$t('message.success'), value: 'SUCCESS' },
        { text: this.$t('message.fail'), value: 'FAIL' },
      ],
      result: {},
    };
  },
  watch: {
    result() {
      if (this.result.value == '') {
        this.result.value = '';
      } else if (this.result.value == 'SUCCESS') {
        this.result.value = 'Y';
      } else if (this.result.value == 'FAIL') {
        this.result.value = 'N';
      }
    },
    changePageNumber() {
      this.pageNumber = this.changePageNumber;
      this.getInterfaceLog();
    },
  },
  methods: {
    selectDateRange(date) {
      this.date = date;
    },
    async getInterfaceLog() {
      this.$refs.filter.blur();
      try {
        const param = {
          filter: this.filter,
          sttDt: this.date.time[0],
          endDt: this.date.time[1],
          result: this.result.value,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        };
        const resp = await systemApi.getInterfaceLog(param);
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
      this.result = this.resultOptions[0];
      this.$refs.DateRange.reset();
    },
  },
  mounted() {
    this.getInterfaceLog();
    this.result = this.resultOptions[0];
  },
};
</script>

<style></style>
