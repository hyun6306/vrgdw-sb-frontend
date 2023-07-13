<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <!-- 사업부 -->
            <!-- 운송사 로그인시 선택 불가 -->
            <!-- <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.compNm') }}</span>
              <input type="text" style="" v-model="bizNm" class="disabled t-l" disabled placeholder="" />
            </label> -->
            <label for="" class="filter_type">
              <!-- 마감년월 -->
              <span class="filter_type_title">{{ $t('message.closeYearMonth') }}</span>
              <div class="form_inputnbtn">
                <!-- 데이터피커 -->
                <div class="form_calendar w_100 essential" @click="datePicker()">
                  <input type="text" v-model="selectMonth" class="t-l disalbed" />
                  <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
                </div>
              </div>
            </label>
            <label for="" class="filter_type">
              <!-- 마감번호 -->
              <span class="filter_type_title">{{ $t('message.closeNum') }}</span>
              <input type="text" ref="filter" id="담당자명" @keyup.enter="getList" v-model="filter" style="" class="t-l" placeholder="" />
            </label>
            <div v-if="authButton.schAuth === 'Y'" style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
              <!-- 검색 -->
              <button class="btn_search_text" @click="getList">{{ $t('message.search') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container09">
      <div class="real_head">
        <div class="real_head_left">
          <small>
            {{ $t('message.totalSelection1') }}
            <i>{{ totalCount }}</i>
            {{ $t('message.totalSelection2') }}
          </small>
        </div>
        <div class="real_head_right"></div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <button class="btn_default btn_filter" @click="setFilter">
            <!-- <img src="@/assets/img/icon_vertical.png" /> -->
            <span v-if="!filterOn">{{ $t('message.btnFilterOn') }}</span>
            <span v-else>{{ $t('message.btnFilterOff') }}</span>
          </button>
          <!-- 열고정 -->
          <button class="btn_default btn_filter" @click="fixGrid('column')">
            <img src="@/assets/img/icon_vertical.png" />
            <span v-if="isFixColumn">{{ $t('message.btnUnfixColumn') }}</span>
            <span v-else>{{ $t('message.btnFixColumn') }}</span>
          </button>
          <!-- 행고정 -->
          <button class="btn_default btn_filter" @click="fixGrid('row')">
            <img src="@/assets/img/icon_hori.png" />
            <span v-if="isFixRow">{{ $t('message.btnUnfixRow') }}</span>
            <span v-else>{{ $t('message.btnFixRow') }}</span>
          </button>
          <!-- 레이아웃!!!! -->
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="layoutValue" :options="layoutOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="layoutBtn" label="text"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body04">
        <MonthCloseGrid :gridLang="gridLang" :closeList="closeList" @count="setCount" :menuId="menuId" :savePage="savePage" ref="MonthClose" style="height: 100%" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="excelDownload">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right"></div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <DateMonthPicker @setMonth="setMonth" ref="DateMonthPicker" @chooseMonth="chooseMonth" :currentMonth="currentMonth" />
    <BookingAlarmModal :ment="ment" @okOrNo="okOrNo" :page="page" />
    <NoticeModal :ment="ment" />
  </div>
</template>

<script>
import MonthCloseGrid from '@/components/gridView/tran/MonthCloseGrid.vue';
import languageApi from '@/api/language';
import DateMonthPicker from '@/modal/DateMonthPickerModal';
import BookingAlarmModal from '@/modal/booking/BookingAlarmModal';
import NoticeModal from '@/modal/order/NoticeModal.vue';
import commonApi from '@/api/common';
import { mapGetters } from 'vuex';
import tranApi from '@/api/tran/tran.js';
// import { EventBus } from '@/views/devPage/tabTest/EventBus';

export default {
  components: {
    MonthCloseGrid,
    DateMonthPicker,
    BookingAlarmModal,
    NoticeModal,
  },
  props: {
    openInfo: {
      type: Object,
    },
    authButton: {
      type: Object,
    },
    savePage: {
      type: Array,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    routerPath: {
      type: String,
    },
  },
  data() {
    return {
      filterOn: true,
      filter: '',
      ment: '',
      bizNm: '',
      totalCount: 0,
      gridLang: [],
      closeList: [],
      isFixColumn: false,
      isFixRow: false,
      layoutValue: { value: '', text: this.$t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$t('message.btnSave') },
        { value: 'reset', text: this.$t('message.btnInit') },
      ],
      currentMonth: '',
      selectMonth: '',
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  methods: {
    setMonth(defaultMonth) {
      this.selectMonth = defaultMonth;
      this.currentMonth = defaultMonth;
    },
    // 달력
    datePicker() {
      this.$modal.show('DateMonthPicker', { type: 'monthClosing' });
    },
    chooseMonth(month) {
      this.selectMonth = month;
    },
    openSingleCalendar(currentMonth) {
      this.currentMonth = currentMonth;
      this.$modal.show('DateMonthPicker');
    },
    // 그리드 다국어
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage(this.routerPath, this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 사업자 공통코드
    async getBizCd() {
      // const allGroup = { text: this.$t('message.all'), value: '' };
      const param = {
        groupCd: 'COMP_CD',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const response = await commonApi.getCommonCodeCombo(param);
        if (response) {
          this.bizNm = response.data.ds[0].text;
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 아이템카운트 확인
    setCount(itemCount) {
      if (itemCount) this.totalCount = itemCount;
    },
    // 운송비월마감 목록 조회
    async getList() {
      if (this.authButton.schAuth === 'Y') {
        this.$refs.filter.blur();
        this.getBizCd();
        this.$refs.MonthClose.clearCurrent();

        const param = {
          compCd: this.compCd,
          closeMonth: this.selectMonth,
          filter: this.filter,
        };
        try {
          const response = await tranApi.getMonthCloseList(param);
          this.closeList = response.data.ds;
          if (this.closeList.length == 0) this.totalCount = 0;
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    // 엑셀다운로드
    async excelDownload() {
      if (this.totalCount === 0) {
        this.ment = 'message.msgCannotExport';
        this.$modal.show('NoticeModal');
      } else {
        const excelData = {
          fileNm: 'Month_Closing-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
        };
        this.$refs.MonthClose.excelExport(excelData);
      }
    },
    // 행고정, 열고정
    fixGrid(type) {
      this.$refs.MonthClose.isChooseCell();
      if (this.$refs.MonthClose.isChooseCell() == true) {
        this.$refs.MonthClose.fixGrid(type, this.isFixColumn, this.isFixRow);
        if (type === 'column') {
          this.isFixColumn = !this.isFixColumn;
        } else if (type === 'row') {
          this.isFixRow = !this.isFixRow;
        }
      } else {
        this.ment = 'message.msgNoSelection';
        this.$modal.show('NoticeModal');
      }
    },
    okOrNo(result, type) {
      if (result) {
        if (type === 'reset') {
          this.$refs.MonthClose.resetLayout();
        } else {
          this.$refs.MonthClose.saveLayout();
        }
      }
    },
    layoutBtn(status) {
      this.ment = '';
      if (status.value === 'save') {
        this.ment = 'message.msgAskSave';
        this.$modal.show(`BookingAlarmModal${this.page}`, { type: 'save' });
      } else {
        this.ment = 'message.msgAskRefresh';
        this.$modal.show(`BookingAlarmModal${this.page}`, { type: 'reset' });
      }
      this.layoutValue = { text: this.$t('message.btnLayout'), value: '' };
    },
    reset() {
      this.filter = '';
      this.$refs.DateMonthPicker.setDefaultMonth();
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.MonthClose.setFilter(this.filterOn);
    },
  },
  created() {
    this.getGridMutiLanguage();
  },
  mounted() {
    this.$refs.DateMonthPicker.setDefaultMonth();
    this.getList();
    this.setFilter();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
