<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.tranNm') }}</span>
              <!-- 운송사 로그인시 선택 불가 -->
              <input type="text" id="담당자명" style="" class="disabled t-l" v-if="userMenuGrpCd == 'TRANSCUS'" disabled v-model="trnCustNm" />
              <!-- 물류담당자 로그인시 선택 가능 -->
              <MultiSelect id="Material_Group" style="width: 100%" v-else v-model="trnCustNm" :options="trnCustOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </label>
            <!-- <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.compNm') }}</span>
              <input type="text" id="담당자명" style="" class="disabled t-l" disabled placeholder="" v-model="compCd.text" />
            </label> -->
            <label for="" class="filter_type filter_type_double">
              <span class="filter_type_title filter_type_title_multiselect">
                <MultiSelect id="" style="width: 100%" v-model="dateSelect" :options="dateSelectOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              </span>
              <!-- 데이터피커 -->
              <div class="form_calendar w_100 essential">
                <input type="text" placeholder="" v-model="showDate.show" />
                <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
            <div v-if="authButton.schAuth === 'Y'" style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" v-if="this.authButton.schAuth == 'Y'" @click="listSearch('search')">{{ $t('message.search') }}</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button> -->
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container_row">
      <div class="realgrid_container realgrid_container_half" style="height: 300px">
        <div class="real_head">
          <div class="real_head_left">
            <small>
              <!-- {{ $t('message.trncusCost') }} -->
              {{ $t('message.totalSelection1') }}<i>{{ compRowCount }}</i>
              {{ $t('message.totalSelection2') }}
            </small>
          </div>
          <div class="real_head_right"></div>
        </div>
        <div class="real_top_filter"></div>
        <div class="real_body real_body08">
          <CompTranCostMangeGrid style="height: 100%" :gridName="'TranCostComp'" ref="CompGrid" :gridLang="gridLang" @sendCompRowCount="sendCompRowCount" @sendCompTrncusCd="sendCompTrncusCd" />
        </div>
        <div class="real_footer">
          <div class="footer_left">
            <button v-if="authButton.exlAuth == 'Y'" class="btn_default btn_function" @click="excelDL('comp')">{{ $t('message.btnDownloadExcel') }}</button>
          </div>
          <div class="footer_right"></div>
        </div>
      </div>
      <div class="realgrid_container realgrid_container_half" style="height: 300px">
        <div class="real_head">
          <div class="real_head_left">
            <small>
              <!-- {{ $t('message.dailyTrnCost') }} -->
              {{ $t('message.totalSelection1') }}<i>{{ dailyRowCount }}</i>
              {{ $t('message.totalSelection2') }}
            </small>
          </div>
          <div class="real_head_right"></div>
        </div>
        <div class="real_top_filter"></div>
        <div class="real_body real_body09">
          <DailyTranCostManageGrid style="height: 100%" :gridName="'TranCostDaily'" ref="DailyGrid" :gridLang="gridLang" @sendDailyRowCount="sendDailyRowCount" @sendDailyTrnDt="sendDailyTrnDt" @sentTotal="sentTotal" />
        </div>
        <div class="real_total">
          <p>
            <span>{{ $t('message.totalTranCost') }} :</span>
            <i>{{ totalTranCost }}</i>
          </p>
          <p>
            <span>{{ $t('message.totalCarCount') }} :</span>
            <i>{{ totalCarCount }}</i>
          </p>
        </div>
        <div class="real_footer">
          <div class="footer_left">
            <button v-if="authButton.exlAuth == 'Y'" class="btn_default btn_function" @click="excelDL('daily')">{{ $t('message.btnDownloadExcel') }}</button>
          </div>
          <div class="footer_right"></div>
        </div>
      </div>
    </div>
    <div class="realgrid_container realgrid_container13">
      <div class="real_head">
        <div class="real_head_left">
          <small>
            <!-- {{ $t('message.dailyDispt') }} -->
            {{ $t('message.totalSelection1') }}<i>{{ disptRowCount }}</i>
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
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="layoutValue" :options="layoutOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="layoutBtn" label="text"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body08">
        <DisptTranCostManageGrid style="height: 100%" :gridName="'TranCostDispt'" ref="DisptGrid" :menuId="menuId" :savePage="savePage" :layoutData="layoutData" :gridLang="gridLang" :authButton="authButton" @sendDisptRowCount="sendDisptRowCount" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth == 'Y'" class="btn_default btn_function" @click="excelDL('dispt')">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <button v-if="authButton.fn1Auth === 'Y'" class="btn_default btn_process" @click="tranCostSave">{{ $t('message.trnCostChg') }}</button>
          <button v-if="authButton.fn2Auth === 'Y'" class="btn_default btn_critical_process" @click="tranCostClose">{{ $t('message.btnDeadline') }}</button>
          <div v-if="authButton.fn2Auth === 'Y'" class="btn_default btn_process btn_deadline">
            <div class="form_calendar" @click="datePicker('DateMonthPicker')">
              <input type="text" readonly placeholder="" v-model="closeMonth" />
              <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
          </div>
          <button v-if="authButton.fn2Auth === 'Y'" class="btn_default btn_process" @click="tranCostCancel">{{ $t('message.finishCan') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <DateRangePickerModal :page="this.page" @selectDateRange="getDate" :after="true" :maxDays="this.maxDays" :changeDate="this.showDate.time" ref="DateRangePicker" />
    <DateMonthPicker :currentMonth="closeMonth" @chooseMonth="chooseMonth" />
    <!-- <DateRangePickerModal @selectDateRange="getDate" :after="true" :default="this.default" :maxDays="this.maxDays" :changeDate="this.showDate.time" /> -->
    <TranAlarmModal @okOrNo="okOrNo" :ment="ment" :type="layoutData" />
    <TranAlarmYesModal :ment="ment" />
    <DispatchReleaseDetailModal :menuId="menuId" />
    <TranCostEmitModal />
  </div>
</template>

<script>
import { loadLanguageAsync } from '@/plugins/i18n';
import tranApi from '@/api/tran/tran';
import DisptTranCostManageGrid from '@/components/gridView/tran/DisptTranCostManageGrid.vue';
import CompTranCostMangeGrid from '@/components/gridView/tran/CompTranCostMangeGrid.vue';
import DailyTranCostManageGrid from '@/components/gridView/tran/DailyTranCostManageGrid.vue';
import DateRangePickerModal from '@/modal/sales/DateRangePickerModal.vue';
import TranAlarmModal from '@/modal/tran/TranAlarmModal';
import TranAlarmYesModal from '@/modal/tran/TranAlarmYesModal';
import TranCostEmitModal from '@/modal/tran/TranCostEmitModal';
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import DispatchReleaseDetailModal from '@/modal/tran/DispatchReleaseDetailModal';
import DateMonthPicker from '@/modal/DateMonthPickerModal';
import commonApi from '@/api/common';

export default {
  components: {
    DisptTranCostManageGrid,
    CompTranCostMangeGrid,
    DailyTranCostManageGrid,
    TranAlarmYesModal,
    TranAlarmModal,
    DateRangePickerModal,
    DispatchReleaseDetailModal,
    TranCostEmitModal,
    DateMonthPicker,
  },
  data() {
    return {
      filterOn: true,
      gridLang: [],
      ment: '',
      //일자
      default: 'today',
      maxDays: 62,
      dateSelect: { value: 'dispt', text: this.$t('message.trnCfmDt') },
      dateSelectOptions: [
        { value: 'dispt', text: this.$t('message.trnCfmDt') },
        { value: 'exit', text: this.$t('message.outDt') },
      ],
      showDate: '',
      disptDate: '', //배차 dispt
      exitDate: '', //출차 exit
      //운송사 목록
      trnCustNm: { text: this.$t('message.all'), value: '' },
      trnCustOptions: [],
      //엑셀다운로드
      excelData: '',
      //레이아웃 저장
      layoutValue: { value: '', text: this.$t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$t('message.btnSave') },
        { value: 'reset', text: this.$t('message.btnInit') },
      ],
      layoutData: '',
      //행,열고정
      isFixColumn: false,
      isFixRow: false,
      //row count
      compRowCount: 0,
      dailyRowCount: 0,
      disptRowCount: 0,
      //검색
      trncusCd: '',
      dateCls: 'cfmDt',
      compTrncusCd: '',
      //합계
      totalTranCost: 0,
      totalCarCount: 0,
      //
      disptCheckedData: [],
      //
      closeMonth: '',
      //
      compCd: '',
      compCdOptions: [],
    };
  },
  props: {
    savePage: {
      type: Array,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    openInfo: {
      type: Object,
    },
    routerPath: {
      type: String,
    },
    authButton: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      trncusId: 'userInfo/getTrncusId',
    }),
  },
  watch: {
    dateSelect(type) {
      // this.default = 'today';
      this.default = 'change';
      if (type.value == 'dispt') {
        this.showDate = this.disptDate;
        this.dateCls = 'cfmDt';
      } else {
        this.showDate = this.exitDate;
        this.dateCls = 'outDt';
      }
    },
  },
  methods: {
    datePicker(type) {
      // this.oldDate = this.time;
      if (type == 'DatePicker') {
        this.$modal.show('PriceDateRangePicker');
      } else {
        this.$modal.show('DateMonthPicker', { type: 'costManage' });
      }
    },
    getDate(date) {
      this.default = '';
      if (this.dateSelect.value == 'dispt') {
        //배차
        this.disptDate = date;
        this.showDate = date;
        if (this.exitDate == '') {
          this.exitDate = date;
        }
      } else {
        //출차
        this.exitDate = date;
        this.showDate = date;
      }
    },
    chooseMonth(month) {
      this.closeMonth = month;
    },
    //row count
    sendCompRowCount(count) {
      this.compRowCount = count;
    },
    sendDailyRowCount(count) {
      this.dailyRowCount = count;
    },
    sendDisptRowCount(count) {
      this.disptRowCount = count;
    },
    sentTotal(total) {
      //합계
      this.totalTranCost = total.tranCost.toLocaleString('en-US');
      this.totalCarCount = total.carCount.toLocaleString('en-US');
    },
    async listSearch(type) {
      //검색
      this.compSearch(type);
      this.dailySearch(type);
      this.disptSearch(type);
    },
    showModal(data) {
      if (data.type == 'checkedNull') {
        this.ment = 'message.msgNoProduct';
      } else if (data.type == 'saveSuss') {
        this.ment = 'message.msgResultSave';
        this.listSearch('refresh');
      } else if (data.type == 'saveFail') {
        this.ment = data.error;
      }
      this.$modal.show('TranAlarmYesModal');
    },
    compSearch(type) {
      let compParam = {
        trncusId: this.trnCustNm.value,
        dateCls: this.dateCls,
        sttDt: this.showDate.time[0],
        endDt: this.showDate.time[1],
        compCd: this.compCd.value,
      };
      if (type == 'search') {
        this.$refs.CompGrid.resetRow();
        this.$refs.CompGrid.getList(compParam);
      } else {
        this.$refs.CompGrid.getList(compParam, 'refresh');
      }
    },
    dailySearch(type) {
      let dailyParam = {
        trncusCd: this.compTrncusCd,
        dateCls: this.dateCls,
        sttDt: this.showDate.time[0],
        endDt: this.showDate.time[1],
        compCd: this.compCd.value,
      };
      if (type == 'search') {
        this.$refs.DailyGrid.resetRow();
        this.$refs.DailyGrid.getList(dailyParam);
      } else {
        this.$refs.DailyGrid.getList(dailyParam, 'refresh');
      }
    },
    async disptSearch(type) {
      let dailyParam = {
        trncusCd: this.compTrncusCd,
        dateCls: this.dateCls,
        sttDt: this.dailyTrnDt,
        endDt: this.dailyTrnDt,
        // compCd: this.compCd.value,
      };
      if (type == 'search') {
        this.$refs.DisptGrid.resetRow();
        this.$refs.DisptGrid.getList(dailyParam);
      } else {
        this.$refs.DisptGrid.getList(dailyParam, 'refresh');
      }
    },
    sendCompTrncusCd(cd) {
      //클릭한 운송사로 일별 운송비 조회
      this.compTrncusCd = cd;
      this.dailySearch('search');
      this.disptSearch('search');
    },
    sendDailyTrnDt(dt) {
      const splitDt = dt.split('-');
      if (splitDt[0].length == 4) {
        this.dailyTrnDt = dt;
      } else {
        this.dailyTrnDt = splitDt[2] + '-' + splitDt[1] + '-' + splitDt[0];
      }
      //클릭한 날짜로 배차내역 조회
      this.disptSearch('search');
    },
    async tranCostSave() {
      //운송비 조정 버튼
      this.disptCheckedData = this.$refs.DisptGrid.sendCheckedData();
      if (this.disptCheckedData.length == 0) {
        this.showModal({ type: 'checkedNull' });
      } else if (this.disptCheckedData.length > 1) {
        this.ment = 'message.msgModiOne';
        this.$modal.show('TranAlarmYesModal');
      } else if (this.disptCheckedData.some(row => row.closeYn === 'Y')) {
        this.ment = 'message.msgIncludeCloseY';
        this.$modal.show('TranAlarmYesModal');
      } else {
        this.disptCheckedData = this.disptCheckedData[0];
        this.$modal.show('TranCostEmitModal', { costInfo: this.disptCheckedData });
      }
    },
    async tranCostClose() {
      this.disptCheckedData = this.$refs.DisptGrid.sendCheckedData();
      if (this.disptCheckedData.length == 0) {
        this.showModal({ type: 'checkedNull' });
      } else {
        let trnPlnNumList = [];
        this.disptCheckedData.forEach(row => {
          trnPlnNumList.push(row.trnPlnNum);
        });
        if (trnPlnNumList.lenth == 0) {
          this.ment = 'message.msgTrnPlnNumNull';
          this.$modal.show('TranAlarmYesModal');
        } else if (this.disptCheckedData.some(row => row.closeYn === 'Y')) {
          this.ment = 'message.msgIncludeCloseY';
        } else if (this.closeMonth == '') {
          this.ment = 'message.msgCloseMonthNull';
          this.$modal.show('TranAlarmYesModal');
        } else {
          let param = {
            closeMonth: this.$revertDateFormatM(this.closeMonth),
            trncusId: Number(this.disptCheckedData[0].trncusId),
            trnPlnNums: trnPlnNumList,
          };
          try {
            const response = await tranApi.putTranCostClose(param);
            if (response.data.status == 200) {
              await this.disptSearch();
              this.closeMonth = '';
              this.ment = 'message.msgCloseCmpl';
              this.$modal.show('TranAlarmYesModal');
            }
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        }
      }
    },
    async tranCostCancel() {
      this.disptCheckedData = this.$refs.DisptGrid.sendCheckedData();
      if (this.disptCheckedData.length == 0) {
        this.showModal({ type: 'checkedNull' });
      } else if (this.disptCheckedData.some(row => row.closeYn === 'N')) {
        this.ment = 'message.msgIncludeCloseN';
        this.$modal.show('TranAlarmYesModal');
      } else {
        let trnCloseList = [];
        this.disptCheckedData.forEach(row => {
          trnCloseList.push(row.deliveryCloseId);
        });
        let param = {
          trnCloseIds: trnCloseList,
        };
        try {
          const response = await tranApi.putTranCostCancel(param);
          if (response.data.status == 200) {
            this.disptSearch();
            this.closeMonth = '';
            this.ment = 'message.msgCloseCancel';
            this.$modal.show('TranAlarmYesModal');
          }
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async tranList() {
      //운송사목록
      try {
        const response = await tranApi.getTranList();
        this.trnCustOptions = response.data.ds;
        const all = { text: this.$t('message.all'), value: '' };
        this.trnCustOptions.splice(0, 0, all);
        if (this.userInfo.menuGrpCd == 'TRANSCUS') {
          this.trnCustOptions.forEach(list => {
            if (this.trncusId == list.value) {
              this.trnCustNm = list.text;
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
    async getCompNmList() {
      try {
        const param = {
          groupCd: 'COMP_CD',
          useYn: 'Y',
          prntCd: '',
        };
        const resp = await commonApi.getCommonCodeCombo(param);
        this.compCdOptions = resp.data.ds;
        this.compCd = this.compCdOptions[0];
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },

    layoutBtn(status) {
      this.ment = '';
      this.layoutData = status.value;
      if (status.value === 'save') {
        this.ment = 'message.msgAskSave';
        this.$modal.show('TranAlarmModal');
      } else {
        this.ment = 'message.msgAskRefresh';
        this.$modal.show('TranAlarmModal');
      }
      this.layoutValue = { text: this.$t('message.btnLayout'), value: '' };
    },
    okOrNo(Yn) {
      if (Yn) {
        this.$refs.DisptGrid.saveLayout(this.layoutData);
      }
    },
    disptDetailModal(data) {
      //출고상세 모달
      if (data.type == 'trnplnNum') {
        this.$modal.show('DispatchReleaseDetailModal', { param: data.param });
      } else {
        this.$modal.show('TranCostEmitModal', { costInfo: data.costInfo });
      }
    },
    fixGrid(type) {
      //열,행 고정
      if (this.$refs.DisptGrid.focusCheck()) {
        const rows = this.$refs.DisptGrid.sendJsonRows();
        if (rows.length > 0) {
          this.$refs.DisptGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.showModal({ type: 'checkedNull' });
        }
      } else {
        this.ment = 'message.msgNoSelection';
        this.$modal.show('TranAlarmYesModal');
      }
    },
    excelDL(type) {
      this.excelData = {
        showProgress: true,
        progressMessage: 'Exporting..',
        indicator: 'hidden',
        header: 'default',
        footer: 'hidden',
        compatibility: true,
      };
      let fileNm = '';
      if (type == 'comp') {
        fileNm = { fileNm: `CompTranCost.xlsx` };
        this.excelData = { ...fileNm, ...this.excelData };
        this.$refs.CompGrid.compExcelExport(this.excelData);
      } else if (type == 'daily') {
        fileNm = { fileNm: `DailyTranCost.xlsx` };
        this.excelData = { ...fileNm, ...this.excelData };
        this.$refs.DailyGrid.dailyExcelExport(this.excelData);
      } else if (type == 'dispt') {
        fileNm = { fileNm: `disptTranCost.xlsx` };
        this.excelData = { ...fileNm, ...this.excelData };
        this.$refs.DisptGrid.disptExcelExport(this.excelData);
      }
    },
    async openPopup(modalNm) {
      let url = '/modal/tranCostModal';
      if (url !== '') {
        try {
          const resp = await loadLanguageAsync(url, this.menuId);
          resp;
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
      this.$modal.show(modalNm);
    },
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
      if (this.userMenuGrpCd !== 'TRANSCUS') this.trnCustNm = this.trnCustOptions[0];
      this.dateSelect = this.dateSelectOptions[0];
      this.$refs.DateRangePicker.init();
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.DisptGrid.setFilter(this.filterOn);
    },
  },
  created() {
    this.tranList();
    this.getGridMutiLanguage();
    this.getCompNmList();
  },
  mounted() {
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
