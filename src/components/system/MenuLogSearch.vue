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
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <!-- 데이터피커 -->
            <input type="text" style="" id="custoer_name" :placeholder="$t('message.msgPlaceMenuLog')" v-model="filter" ref="filter" @keyup.enter="[resetPageNumber(), getMenuLog()]" />
          </label>
          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="[resetPageNumber(), getMenuLog()]">{{ $t('message.btnSearch') }}</button>
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
    };
  },
  watch: {
    changePageNumber() {
      this.pageNumber = this.changePageNumber;
      this.getMenuLog();
    },
  },
  methods: {
    selectDateRange(date) {
      this.date = date;
    },
    async getMenuLog() {
      this.$refs.filter.blur();
      try {
        const param = {
          filter: this.filter,
          sttDt: this.date.time[0],
          endDt: this.date.time[1],
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        };
        const resp = await systemApi.getMenuLog(param);
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
      this.$refs.DateRange.reset();
    },
  },
  mounted() {
    this.getMenuLog();
  },
};
</script>

<style></style>
