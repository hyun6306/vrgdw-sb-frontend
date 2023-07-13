<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <!-- 운송사 -->
              <span class="filter_type_title t-l">{{ $t('message.tranNm') }}</span>
              <!-- 운송사 로그인시 선택 불가 -->
              <input type="text" id="담당자명" v-model="tranNm" v-if="userMenuGrpCd == 'TRANSCUS'" style="" class="disabled t-l" disabled placeholder="" />
              <!-- 물류담당자 로그인시 선택 가능 -->
              <MultipleSelect v-else :selectAll="false" :options="tranCusList" :all="true" @select="setTranCusCd" track-by="text" label="text" ref="tranCusList" />
            </label>
            <!-- 사업부 -->
            <!-- <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.compNm') }}</span>
              <input v-model="bizDepartment" type="text" id="담당자명" style="" class="disabled t-l" disabled placeholder="" />
            </label> -->
            <label for="" class="filter_type filter_type_double">
              <span class="filter_type_title filter_type_title_multiselect">
                <MultiSelect id="" style="width: 100%" v-model="dateClsCd" :options="searchDate" class="t-l" :searchable="false" :allow-empty="false" :close-on-select="true" :show-labels="false" track-by="text" label="text" />
              </span>
              <div class="form_calendar w_100 essential ml-25" @click="datePicker('DatePicker')">
                <input type="text" v-model="datesDtls" readonly />
                <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
            <div v-if="authButton.schAuth === 'Y'" style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="searchList">{{ $t('message.search') }}</button>
            </div>
          </div>
          <!-- 데이트피커 -->
          <!--          <div class="filter_list">-->
          <!--            -->
          <!--          </div>-->
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
            <i> {{ totalCount }} </i>
            {{ $t('message.totalSelection2') }}
          </small>
        </div>
        <div class="real_head_right">
          <button v-if="authButton.fn1Auth === 'Y'" class="btn_default btn_print_fuction" @click="validation('invoice')">{{ $t('message.btnInvoiceNum') }}</button>
        </div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <button class="btn_default btn_filter" @click="setFilter">
            <!-- <img src="@/assets/img/icon_vertical.png" /> -->
            <span v-if="!filterOn">{{ $t('message.btnFilterOn') }}</span>
            <span v-else>{{ $t('message.btnFilterOff') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('column')">
            <img src="@/assets/img/icon_vertical.png" />
            <span v-if="isFixColumn">{{ $t('message.btnUnfixColumn') }}</span>
            <span v-else>{{ $t('message.btnFixColumn') }}</span>
          </button>
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
        <TranCostListGrid :menuId="menuId" @openPriceDetail="openPriceDetail" :savePage="savePage" @count="setCount" :costList="costList" style="height: 100%" @openForwardingDetail="openForwardingDetail" :gridLang="gridLang" ref="TranCostList" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="excelDownload">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right"></div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <DateRangePickerModal :page="page" @selectDate="showSelectDate" @setDefaultDates="setDefaultDates" :oldDate="oldDate" ref="DateRangePicker" />
    <TranCostDetailModal :priceInfo="priceInfo" :ment="ment" />
    <NoticeModal :ment="ment" />
    <BookingAlarmModal :ment="ment" @okOrNo="okOrNo" :page="page" />
    <ForwardingDetailModal :menuId="menuId" :page="page" />
    <DeliveryInfoModal :page="page" :menuId="menuId" />
  </div>
</template>

<script>
import TranCostDetailModal from '@/modal/tran/TranCostDetailModal.vue';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import BookingAlarmModal from '@/modal/booking/BookingAlarmModal';
import commonApi from '@/api/common';
import DateRangePickerModal from '@/modal/DateRangePickerModal.vue';
import TranCostListGrid from '@/components/gridView/tran/TranCostListGrid.vue';
import languageApi from '@/api/language';
import tranApi from '@/api/tran/tran.js';
import { mapGetters } from 'vuex';
import NoticeModal from '@/modal/order/NoticeModal.vue';
// import { EventBus } from '@/views/devPage/tabTest/EventBus';
import DeliveryInfoModal from '@/modal/tran/DeliveryInfoModal';
import ForwardingDetailModal from '@/modal/tran/ForwardingDetailModal';

export default {
  components: {
    TranCostDetailModal,
    MultipleSelect,
    TranCostListGrid,
    DateRangePickerModal,
    BookingAlarmModal,
    NoticeModal,
    DeliveryInfoModal,
    ForwardingDetailModal,
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
      tranNm: '',
      // trncusId: '',
      layoutValue: { value: '', text: this.$t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$t('message.btnSave') },
        { value: 'reset', text: this.$t('message.btnInit') },
      ],
      priceInfo: {},
      oldDate: [],
      sttDt: '',
      endDt: '',
      datesDtls: '',
      tranCusCd: [],
      bizDepartment: [],
      tranCusList: [],
      ment: '',
      whatIs: '',
      isFixColumn: false,
      isFixRow: false,
      costList: [], // 운송비조회 목록
      gridLang: [],
      totalCount: 0,
      dateClsCd: [],
      searchDate: [
        { value: 'cfmDt', text: this.$t('message.trnCfmDt') },
        { value: 'outDt', text: this.$t('message.outDt') },
      ],
      value: [],
      checkedRows: [],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
      trncusId: 'userInfo/getTrncusId',
    }),
  },
  watch: {
    dateClsCd(dc) {
      dc.value == 'cfmDt' ? (this.dateClsCd = this.searchDate[0]) : (this.dateClsCd = this.searchDate[1]);
    },
  },
  methods: {
    openForwardingDetail(trnPlnInfo) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: true });
    },
    fwdDtlsModal(trnPlnNum) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnNum, readOnly: true });
    },
    deliveryInfoModal(trnNum) {
      this.$modal.show(`DeliveryInfoModal${this.page}`, { trnNum: trnNum });
    },
    okOrNo(result, type) {
      if (result) {
        if (type === 'reset') {
          this.$refs.TranCostList.resetLayout();
        } else {
          this.$refs.TranCostList.saveLayout();
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
    // 금액상세 모달 열기
    openPriceDetail(priceInfo) {
      this.priceInfo = priceInfo;
      this.$modal.show('TranCostDetailModal');
    },
    // 운송사조회 목록 검색
    searchList() {
      this.getList();
    },
    // 엑셀다운로드
    async excelDownload() {
      if (this.itemCount === 0) {
        this.ment = 'message.msgCannotExport';
        this.$modal.show('NoticeModal');
      } else {
        const excelData = {
          fileNm: 'Trancost_List-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
        };
        this.$refs.TranCostList.excelExport(excelData);
      }
    },
    // 접속일 기준 지난 365일 설정
    setDefaultDates(time) {
      if (time) {
        this.time = time;
        this.sttDt = time[0];
        this.endDt = time[1];
        this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      }
    },
    // 달력
    datePicker() {
      this.oldDate = this.time;
      this.$modal.show('DateRangePicker');
    },
    // 달력 선택 날짜 노출
    showSelectDate(selectDate) {
      this.time = selectDate;
      this.oldDate = selectDate;
      this.sttDt = this.time[0];
      this.endDt = this.time[1];
      this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
    },
    // MultipleSelect, 진행상태 다중 선택
    setTranCusCd(tranList) {
      this.tranCusCd = [];
      tranList.forEach(list => {
        if (list.value !== '00') this.tranCusCd.push(list.value);
      });
    },
    // 운송사목록 공통코드
    async getTranCusList() {
      const allGroup = { text: this.$t('message.all'), value: '00' };
      try {
        const response = await tranApi.getTranList();
        this.tranCusList = response.data.ds;
        this.tranCusList.unshift(allGroup);

        if (response) {
          const param = {
            groupCd: 'COMP_CD',
            useYn: 'Y',
            prntCd: '',
          };

          const response = await commonApi.getCommonCodeCombo(param);
          this.bizDepartment = response.data.ds[0].text;
        }
        if (this.userMenuGrpCd === 'TRANSCUS') {
          this.tranCusList.forEach(list => {
            if (this.trncusId == list.value) {
              this.tranNm = list.text;
            }
          });
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 행고정, 열고정
    fixGrid(type) {
      this.$refs.TranCostList.isChooseCell();
      if (this.$refs.TranCostList.isChooseCell() == true) {
        this.$refs.TranCostList.fixGrid(type, this.isFixColumn, this.isFixRow);
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
    // 아이템카운트 확인
    setCount(itemCount) {
      if (itemCount) this.totalCount = itemCount;
    },
    // 운송비조회
    async getList() {
      this.$refs.TranCostList.clearCurrent();
      if (this.tranCusCd.length == 0) {
        this.tranCusList.forEach(list => {
          if (list.value !== '00') this.tranCusCd.push(list.value);
        });
      } else {
        this.tranCusCd;
      }
      const param = {
        trncusId: this.userMenuGrpCd === 'TRANSCUS' ? this.trncusId : this.tranCusCd,
        dateCls: this.dateClsCd.value,
        sttDt: this.sttDt,
        endDt: this.endDt,
      };
      try {
        const response = await tranApi.getTranCostList(param);
        this.costList = response.data.ds;
        if (this.costList.length == 0) this.totalCount = 0;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
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
    reset() {
      this.dateClsCd = this.searchDate[0];
      this.$refs.tranCusList.select({ value: 'reset' });
      this.$refs.DateRangePicker.init();
    },
    validation(is = '') {
      const rows = this.$refs.TranCostList.sendJsonRows();
      const isChecked = this.$refs.TranCostList.sendChecked();
      this.checkedRows = this.$refs.TranCostList.sendCheckedData();
      if (rows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        return false;
      } else if (!isChecked && is !== '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoItem');
        return false;
      } else if (is === 'invoice') {
        let trnPlnNum = '';
        let notSameTrnPlnNum = false;
        let trnPlnNumIsNull = false;
        this.checkedRows.forEach((row, index) => {
          if (index === 0) {
            trnPlnNum = row.trnPlnNum;
          } else if (trnPlnNum == null || trnPlnNum == '') {
            trnPlnNumIsNull = true;
          } else if (trnPlnNum !== row.trnPlnNum) {
            notSameTrnPlnNum = true;
          }
        });
        if (trnPlnNumIsNull) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidTrnPlnNum2');
          return false;
        } else if (notSameTrnPlnNum) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidOnePlnInvoice');
          return false;
        }
        this.saveInvoiceNum();
      } else {
        return true;
      }
    },
    async saveInvoiceNum() {
      try {
        const param = {
          trnPlnNum: this.checkedRows[0].trnPlnNum,
        };
        await tranApi.saveInvoiceNum(param);
        await this.getList();
        this.$EventBus.$emit('openYesModal', 'message.msgSaveInvoiceNum');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.TranCostList.setFilter(this.filterOn);
    },
  },
  created() {
    this.getGridMutiLanguage();
  },
  async mounted() {
    // 기간 검색 기준, 배차확정일 Default로 설정
    this.dateClsCd = this.searchDate[0];
    await this.getTranCusList();
    await this.getList();
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
