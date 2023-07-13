<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type" v-if="authButton.fn4Auth === 'Y'">
              <span class="filter_type_title t-l">{{ $t('message.custName') }}</span>
              <div class="form_inputnbtn">
                <input type="text" @keyup.enter="clientSearch" id="clientSearch" v-model="custNm" class="t-l" />
                <button class="btn_search_basic_info" @click="clientSearch"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>

            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.requestDate') }}</span>
              <!-- 데이터피커 -->
              <div class="form_calendar w_100" @click="datePicker('DatePicker')">
                <input type="text" v-model="datesDtls" class="t-l disalbed" />
                <button class="icon_calendar">
                  <img src="@/assets/img/icon_calendar.png" />
                </button>
              </div>
            </label>
            <!-- 상품선택 -->
            <label for="" class="filter_type">
              <span class="filter_type_title t-l">{{ $t('message.categorySubject') }}</span>
              <MultiSelect :allow-empty="false" style="width: 100%" id="Material_Group" v-model="prdtClsCd" :options="selectPrdt" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value" />
            </label>
            <!-- 진행상태 -->
            <label for="" class="filter_type" v-if="authButton.fn4Auth === 'N'">
              <span class="filter_type_title t-l">{{ $t('message.status') }}</span>
              <MultipleSelect :default="this.default" :selectAll="false" :options="selectStatus" :all="true" @select="setStatus" ref="statusOptions" />
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset" v-if="authButton.schAuth === 'Y'">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="searchProductList" v-if="authButton.schAuth === 'Y'">{{ $t('message.btnSearch') }}</button>
            </div>
            <!-- 검색 -->
            <label for="" class="filter_type filter_type_double" v-if="authButton.fn4Auth === 'N'">
              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
              <div class="form_input">
                <input ref="filter" id="keyWord" v-model="filter" @keyup.enter="searchProductList" class="t-l" />
              </div>
            </label>
          </div>
          <div class="filter_list" v-if="authButton.fn4Auth === 'Y'">
            <label for="" class="filter_type">
              <span class="filter_type_title t-l">{{ $t('message.status') }}</span>
              <MultipleSelect :default="this.default" :selectAll="false" :options="selectStatus" :all="true" @select="setStatus" ref="statusOptions" />
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.sales') }}</span>
              <MultipleSelect :options="staffOptions" :default="userInfo.userCd" :all="true" @select="cds => setCd(cds, 'staff')" ref="staffOptions" />
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
              <div class="form_input">
                <input ref="filter" id="keyWord" v-model="filter" @keyup.enter="searchProductList" class="t-l" :placeholder="$t('message.placeholderOrderList')" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container02">
      <div class="real_head">
        <div class="real_head_left">
          <small
            >{{ $t('message.totalSelection1') }} <i>{{ itemCount }}</i> {{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right">
          <button v-if="this.authButton.fn1Auth == 'Y'" class="btn_default btn_print_fuction" @click="getDownloadBank">
            {{ $t('message.btnBankAccount') }}
          </button>
          <button v-if="this.authButton.fn1Auth == 'Y'" class="btn_default btn_print_fuction" @click="getPrintQuotation">
            {{ $t('message.btnPrintQuotation') }}
          </button>
          <button v-if="this.authButton.fn1Auth == 'Y'" class="btn_default btn_print_fuction" @click="getPrintContratct">
            {{ $t('message.btnPrintContract') }}
          </button>
          <button v-if="this.authButton.fn2Auth == 'Y'" class="btn_default btn_process" @click="sendQuotation">
            {{ $t('message.btnSendQuotation') }}
          </button>
          <button v-if="this.authButton.savAuth == 'Y'" class="btn_default btn_function" @click="saveCopyRegist">
            {{ $t('message.btnRegistCopy') }}
          </button>
          <button v-if="this.authButton.delAuth == 'Y'" class="btn_default btn_function" @click="saveDeleteProductSelection">
            {{ $t('message.btnSelectionDelete') }}
          </button>
          <button v-if="this.authButton.delAuth == 'Y'" class="btn_default btn_function" @click="beforeCancel">
            {{ $t('message.btnCancelQuotation') }}
          </button>
        </div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <button class="btn_default btn_filter" @click="setFilter">
            <!--            <img src="@/assets/img/icon_vertical.png" />-->
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
      <div v-if="userInfo.menuGrpCd == 'CUSTOMER'" class="real_body real_body02">
        <GeneralListGrid :menuId="menuId" :savePage="savePage" style="height: 100%" :pcUnit="pcUnit" :bdlUnit="bdlUnit" :cancelId="cancelId" :refreshGrid="refreshGrid" :gridLang="gridLang" @openMemo="setCustMemo" @salesMemo="setSalesMemo" @sendCustIdInfo="setCustExcelInfo" @setClickInfos="setClickInfos" @setOfrrIds="setOfrrIds" @clickInfo="setClickInfo" @offrId="offrId" @openAddrInfo="openAddrInfo" :newSearchResult="newSearchResult" :emitPrdtList="emitPrdtList" :userCustId="this.userCustId" :prdtClsCd="prdtClsCd" gridName="'GeneralListGrid'" ref="GeneralGrid" @emitCount="emitCount" @setProductRows="setProductRows" @setObject="setObject" />
      </div>
      <div v-if="userInfo.menuGrpCd !== 'CUSTOMER'" class="real_body real_body02">
        <GeneralSalesListGrid :menuId="menuId" :savePage="savePage" style="height: 100%" :pcUnit="pcUnit" :bdlUnit="bdlUnit" :cancelId="cancelId" :gridLang="gridLang" :refreshGrid="refreshGrid" @openMemo="setCustMemo" @salesMemo="setSalesMemo" @setClickInfos="setClickInfos" @clickInfo="setClickInfo" @sendCustIdInfo="setCustExcelInfo" @setOfrrIds="setOfrrIds" @offrId="offrId" @openAddrInfo="openAddrInfo" :newSearchResult="newSearchResult" :emitPrdtList="emitPrdtList" :userCustId="this.userCustId" :prdtClsCd="prdtClsCd" gridName="'GeneralSalesListGrid'" ref="GeneralSales" @emitCount="emitCount" @setProductRows="setProductRows" @setObject="setObject" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <MultiSelect id="Material_Group" class="btn_select" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="changeUnit" label="text"></MultiSelect>
          <!-- 단위변경 MultiSelect -->
          <button v-if="this.authButton.exlAuth == 'Y'" class="btn_default btn_function" @click="excelDownload">
            {{ $t('message.btnDownloadExcel') }}
          </button>
        </div>
        <!-- 결재문서번호등록, 확정, 결재상신, 결재확인 -->
        <div class="footer_right">
          <button v-if="this.authButton.fn3Auth == 'Y'" @click="confirmQuote" class="btn_default btn_critical_process">
            {{ $t('message.btnConfirm') }}
          </button>
          <!-- <button v-if="this.authButton.fn1Auth == 'Y'" @click="openDocs" class="btn_default btn_deep_gray">
            {{ $t('message.btnApprDocNumAdd') }}
          </button> -->
          <!-- <button v-if="this.authButton.fn1Auth == 'Y'" @click="submitApproval" class="btn_default btn_deep_gray">
            {{ $t('message.btnPayment') }}
          </button> -->
          <!-- <button v-if="this.authButton.fn1Auth == 'Y'" @click="checkApproval" class="btn_default btn_deep_gray">
            {{ $t('message.btnApprCheck') }}
          </button> -->
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <ClientSearchModal @sendCustId="sendCustId" @sendInfoInput="sendInfoInput" ref="ClientSearchModal" />
    <DateRangePickerModal @selectDate="showSelectDate" @setDefaultDates="setDefaultDates" :oldDate="oldDate" ref="rangeDate" />
    <!-- <DraftDocumentListModal /> -->
    <DraftDocumentModal />
    <NoticeModal :ment="ment" />
    <AddressInfoModal :page="page" :addrOffrId="addrOffrId" />
    <CommentModal :custMemoParam="custMemoParam" :userMenuGrpCd="userMenuGrpCd" />
    <SalesMemoModal @savelSalesMemo="salesMemoStatus" @nullSalesMemo="salesMemoStatus" @registSalesMemo="salesMemoStatus" :salesMemoParam="salesMemoParam" :registYn="registYn" />
    <ReportLangSelectModal @printReport="printReport" />
    <BookingAlarmModal :ment="ment" @okOrNo="okOrNo" :page="page" />
    <QuoteCancelNoticeModal />
  </div>
</template>

<script>
import { loadLanguageAsync } from '@/plugins/i18n';
// import DraftDocumentListModal from '@/modal/sales/DraftDocumentListModal.vue';
import DraftDocumentModal from '@/modal/sales/DraftDocumentModal.vue';
import BookingAlarmModal from '@/modal/booking/BookingAlarmModal';
import ClientSearchModal from '@/modal/order/ClientSearchModal.vue';
import defs from '@/consts/defs.js';
import SalesMemoModal from '@/modal/order/SalesMemoModal.vue';
import CommentModal from '@/modal/order/CommentModal.vue';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import GeneralSalesListGrid from '@/components/gridView/order/GeneralSalesListGrid';
import GeneralListGrid from '@/components/gridView/order/GeneralListGrid';
import DateRangePickerModal from '@/modal/DateRangePickerModal.vue';
import productApi from '@/api/order/product';
import orderApi from '@/api/order/order.js';
import commonApi from '@/api/common';
import fileDownload from '@/mixins/fileDownload';
import AddressInfoModal from '@/modal/order/AddressInfoModal.vue';
import NoticeModal from '@/modal/order/NoticeModal.vue';
import languageApi from '@/api/language';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import reportPrintJs from '@/mixins/reportPrint';
import ReportLangSelectModal from '@/modal/ReportLangSelect';
import QuoteCancelNoticeModal from '@/modal/order/QuoteCancelNoticeModal.vue';
import fileApi from '@/api/file';

export default {
  components: {
    ClientSearchModal,
    // DraftDocumentListModal,
    DraftDocumentModal,
    BookingAlarmModal,
    SalesMemoModal,
    MultipleSelect,
    GeneralSalesListGrid,
    GeneralListGrid,
    DateRangePickerModal,
    AddressInfoModal,
    NoticeModal,
    CommentModal,
    ReportLangSelectModal,
    QuoteCancelNoticeModal,
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
  mixins: [reportPrintJs],
  data() {
    return {
      filterOn: true,
      selectValue: { text: this.$t('message.order') },
      selectOptions: [
        { value: false, text: this.$t('message.order') },
        { value: true, text: this.$t('message.base') },
      ],
      layoutValue: { value: '', text: this.$t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$t('message.btnSave') },
        { value: 'reset', text: this.$t('message.btnInit') },
      ],
      staffOptions: [],
      staff: [],
      staffCd: [],
      pcUnit: '',
      bdlUnit: '',
      custNm: '',
      cancelId: null,
      whatIs: '',
      changeMemoText: '',
      changeRegistYn: null,
      registYn: null,
      addrOffrId: null,
      custFilter: '',
      gridLang: [],
      refreshGrid: [],
      oldDate: [],
      custMemoParam: {},
      salesMemoParam: {},
      filter: '',
      ment: '',
      offrId: '',
      selectStatus: [],
      isFixColumn: false,
      isFixRow: false,
      selectPrdt: [],
      custId: this.$store.state.userInfo.custId,
      sttDt: '',
      endDt: '',
      prdtClsCd: [],
      datesDtls: '',
      emitPrdtList: [],
      id: '',
      newSearchResult: [],
      setSelectProductRows: [],
      itemCount: '',
      ids: [],
      language: this.$store.state.userInfo.locale,
      offrStatusCd: [],
      clickInfo: [],
      setCheckedClickInfos: [],
      custExcelInfos: [],
      offrClsCd: defs.offrClsCd,
      cancelMentList: [{ ment: 'message.msgCancelMent1' }, { ment: 'message.msgCancelMent2' }, { ment: 'message.msgCancelMent3' }, { ment: 'message.msgCancelMent4' }, { ment: 'message.msgCancelMent5' }, { ment: 'message.msgCancelMent6' }, { ment: 'message.msgCancelMent7' }],
      intervalId: '',
      default: {},
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  watch: {
    // 진행상태, 전체 선택 시, 배열 비우기
    offrStatusCd(select) {
      if (select[0] == 'OS00') this.offrStatusCd = '';
    },
    itemCount(itemCounts) {
      this.itemCount = itemCounts;
    },
    async openInfo(data) {
      await this.reset();
      if (data.etcData !== null) {
        this.cancelId = data.id;
        this.default = data.etcData.offrStatCd ?? '';
        this.setRefreshGrid(this.default);
      }
    },
  },
  methods: {
    async getStaffCombo() {
      if (this.userMenuGrpCd !== 'CUSTOMER') {
        try {
          const resp = await commonApi.getStaffCombo();

          this.staffOptions = resp.data.ds;
          this.staffOptions.unshift({ text: this.$t('message.all'), value: '00' });
          this.staffCd = this.staffOptions[0];
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
    setCd(cds, type) {
      if (type === 'staff') {
        this.staffCd = cds;
        this.staff = [];
        this.staffCd.forEach(cd => {
          this.staff.push(cd.value);
        });
        if (this.staff.some(one => one.includes('00') && !one.includes('D'))) {
          this.staff = [];
        }
      } else if (type === 'state') {
        this.offrStatusCd.push(this.selectStatus.find(option => option.value === cds)?.value);
      }
    },
    async beforeCancel() {
      if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.GeneralSales.getCheckedRowsData();
        this.$refs.GeneralSales.getCheckedClickInfos();
      } else if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.GeneralGrid.getCheckedRowsData();
        this.$refs.GeneralGrid.getCheckedClickInfos();
      }
      // 공통 멘트, 선택한 견적이 없는 경우 return
      if (this.setSelectProductRows.length == 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      }
      // 공통 멘트, 선택한 견적 중 완료, 취소, 초안만 있는 경우 => 확정, 진행중은 별도 처리, 요청은 가능
      let every = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.end || data == defs.offrStatCd.cancel || data == defs.offrStatCd.temp);
      // 완료, 취소, 초안
      if (every == true) {
        this.$modal.show('QuoteCancelNoticeModal');
        return;
        // 진행중, 확정 포함 시
      } else {
        const checkCancelStat = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.confirm || data == defs.offrStatCd.proceed);
        if (this.userMenuGrpCd == 'CUSTOMER' && checkCancelStat == true) {
          this.$EventBus.$emit('openYesModal', 'message.errorsCancelOnlySales');
          return;
        }
        const param = [];
        this.setSelectProductRows.forEach(row => {
          param.push({ custId: row.custId, id: row.id });
        });
        try {
          const response = await orderApi.putCancelCheck(param);
          if (response.data.rs.isVerified == true) {
            await this.saveCancelProduct(param);
          } else {
            this.$modal.show('QuoteCancelNoticeModal');
            return;
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
    changeUnit(type) {
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.GeneralGrid.layoutState(type.value);
      } else {
        this.$refs.GeneralSales.layoutState(type.value);
      }
    },
    okOrNo(result, type) {
      if (result) {
        if (this.userMenuGrpCd == 'CUSTOMER') {
          if (type === 'reset') {
            this.$refs.GeneralGrid.resetLayout();
          } else {
            this.$refs.GeneralGrid.saveLayout();
          }
        } else {
          if (type === 'reset') {
            this.$refs.GeneralSales.resetLayout();
          } else {
            this.$refs.GeneralSales.saveLayout();
          }
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
    async getUnitCode() {
      const param = {
        groupCd: 'UNIT_CD',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const response = await commonApi.getCommonCodeCombo(param);
        response.data.ds.forEach(code => {
          if (code.value == 'PC') {
            this.pcUnit = code.text;
          } else if (code.value == 'BDL') {
            this.bdlUnit = code.text;
          }
        });
        this.pcUnit;
        this.bdlUnit;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getUserOfferInfo() {
      try {
        const param = this.userInfo.menuGrpCd === 'CUSTOMER' ? { custId: this.userInfo.custId } : { custId: this.custId };
        const response = await orderApi.getUserOfferInfo(param);
        const userOfferInfo = response.data.rs;
        this.custNm = userOfferInfo.custNm;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    clientSearch() {
      this.userMenuGrpCd === 'CUSTOMER' ? (this.custId = this.userInfo.custId) : this.custId;
      this.$refs.ClientSearchModal.customerList(this.custNm, 'info');
      if (this.custNm === '') {
        this.$modal.show('ClientSearchModal');
      }
    },
    sendInfoInput(result) {
      if (result.length === 1) {
        this.sendCustId(result[0].custId);
      } else {
        this.$modal.show('ClientSearchModal', { custNm: this.custNm });
      }
    },
    sendCustId(id) {
      if (typeof id === 'object') {
        if (id.length > 1 || id.length === 0) {
          this.$modal.show('ClientSearchModal', { custNm: this.custNm });
        } else {
          this.custId = id[0].custId;
          this.getUserOfferInfo();
        }
      } else if (id !== '') {
        this.custId = id;
        this.getUserOfferInfo();
      }
    },
    async salesMemoStatus(changeRegistYn, memoText, ment) {
      this.changeRegistYn = changeRegistYn;
      this.changeMemoText = memoText;

      // 메모 등록
      if (memoText && changeRegistYn == 'Y') {
        await this.searchProductList();
        this.ment = 'message.msgResultRegister';
        this.$modal.show('NoticeModal');
        // 메모 저장(update)
      } else if (ment && changeRegistYn == 'Y') {
        await this.searchProductList();
        this.ment = 'message.msgResultSave';
        this.$modal.show('NoticeModal');
      }
    },
    // 견적서발송, 다중 건 불가, 확정 건만 가능
    async sendQuotation() {
      this.$refs.GeneralSales.getCheckedRowsData();
      this.$refs.GeneralSales.getCheckedClickInfos();

      if (this.setSelectProductRows.length <= 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      } else if (this.setSelectProductRows.length > 1) {
        this.ment = 'message.msgSendQuotNotice';
        this.$modal.show('NoticeModal');
        return;
      }
      const some = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.request || data == defs.offrStatCd.temp || data == defs.offrStatCd.cancel);
      if (some == true) {
        this.ment = 'message.msgSendQuotRequire';
        this.$modal.show('NoticeModal');
        return;
      }
      await loadLanguageAsync('/modal/reportLangSelect', this.menuId);
      this.$modal.show('ReportLangSelectModal', { signShow: false, type: 'quoteMail' });
    },
    // 결재확인
    // checkApproval() {
    //   this.ment = '결재 상세 내용 팝업 화면 안 나옴';
    //   this.$modal.show('NoticeModal');
    // },
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
    // 상태값 변경되는 기능 수행 후 견적 목록 다시 조회
    async setRefreshGrid(statusDefault = '') {
      this.refreshGrid = [];
      const param = {
        custId: this.custId,
        sttDt: this.sttDt,
        endDt: this.endDt,
        prdtClsCd: this.prdtClsCd.value,
        offrStatusCds: statusDefault !== '' ? statusDefault : this.offrStatusCd,
        offrClsCd: defs.offrClsCd.order,
        filter: this.filter,
        pageNumber: '',
        pageSize: '',
        salesUsers: this.staff,
      };
      try {
        const response = await productApi.getSearchResult(param);
        this.refreshGrid = response.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 영업의견 메모
    setSalesMemo(param, registYn) {
      if (registYn == 'N') {
        this.registYn = false;
      } else {
        this.registYn = true;
      }
      this.salesMemoParam = param;
      this.$modal.show('SalesMemoModal');
    },
    // 고객의견 메모
    setCustMemo(param) {
      this.custMemoParam = param;
      this.$modal.show('CommentModal');
    },
    // 고객 엑셀 다운로드를 위한 offrId 저장
    setCustExcelInfo(custExcelInfos) {
      this.custExcelInfos = custExcelInfos;
    },
    // 다중 체크된 Row의 진행상태, offrStatNm 확인
    setClickInfos(setCheckedClickInfos) {
      this.setCheckedClickInfos = setCheckedClickInfos;
    },
    // 체크한 Row의 data(컬럼) 확인
    setClickInfo(clickInfo) {
      this.clickInfo = clickInfo;
    },
    // setPrdtCls(prdt) {
    //   const setPrdtCls = [];
    //   prdt.forEach(selectPrdt => {
    //     const d = selectPrdt.value;
    //     setPrdtCls.push(d);
    //   });
    //   this.prdtClsCd = setPrdtCls;
    // },
    // MultipleSelect, 진행상태 다중 선택
    setStatus(statCd) {
      const setStatus = [];
      statCd.forEach(selectStauts => {
        const d = selectStauts.value;
        setStatus.push(d);
      });
      this.offrStatusCd = setStatus;
      this.offrStatusCd[0] == 'OF00' ? (this.offrStatusCd = '') : this.offrStatusCd;
    },
    // 공통 코드 콤보 조회, 진행상태(작성중, 요청, 확정, 진행, 완료, 취소)
    async getOfferStatus() {
      const param = {
        groupCd: 'OFFER_STATUS',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const response = await commonApi.getCommonCodeCombo(param);
        const allGroup = { text: this.$t('message.all'), value: 'OF00' };
        this.selectStatus = response.data.ds;
        this.selectStatus.unshift(allGroup);
        this.setCd(this.openInfo.etcData, 'state');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 공통 코드 콤보 조회, 품목 구분(MDF, MFB), 접속 유저에게 할당된 품목만 노출시킴
    async getProductCls() {
      try {
        const param = {
          groupCd: 'PRDT_CLS_CD',
          useYn: 'Y',
          prntCd: '',
        };
        // 1. API 조회를 통해 MDF, MFB를 담음
        const response = await commonApi.getCommonCodeCombo(param);
        this.selectPrdt = response.data.ds;
        const allGroup = { text: this.$t('message.all'), value: '' };
        this.selectPrdt.unshift(allGroup);
        this.prdtClsCd = this.selectPrdt[0];
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 확정, 요청 상태에서만 가능, (작성중, 확정, 진행, 완료, 취소 상태에서는 불가)
    async confirmQuote() {
      this.$refs.GeneralSales.getCheckedRowsData();
      const param = [];

      // 선택 견적 없을 경우 return
      if (this.setSelectProductRows.length == 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      }
      for (let i = 0; i < this.setSelectProductRows.length; i++) {
        // 선택된 견적 중 한 건이라도 진행상태가 요청이 아니라면 return
        if (this.setSelectProductRows[i].offrStatCd !== defs.offrStatCd.request) {
          this.ment = 'message.msgUnableConfirm';
          this.$modal.show('NoticeModal');
          return;
          // 선택된 견적 중 한 건이라도 진행상태가 요청이지만 결재필요가 Y라면 return
        } else if (this.setSelectProductRows[i].offrStatCd === defs.offrStatCd.request && this.setSelectProductRows[i].apprCfmYn === 'Y') {
          this.ment = 'message.msgRequireAppr';
          this.$modal.show('NoticeModal');
          return;
        }
        param.push({
          custId: this.setSelectProductRows[i].custId,
          id: this.setSelectProductRows[i].id,
          offrNum: this.setSelectProductRows[i].offrNum,
          offrClsCd: this.setSelectProductRows[i].offrClsCd,
        });
      }

      param.forEach(list => {
        list.offrClsCd = this.offrClsCd.order;
        list.apprCfmYn !== null ? list.apprCfmYn : (list.apprCfmYn = '');
      });
      try {
        await productApi.confirmQuote(param);
        await this.searchProductList();
        this.ment = 'message.msgCompleteConfirm';
        this.$modal.show('NoticeModal');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 현재 Grid에 뿌려진 Row의 갯수를 itemCount에 담음
    emitCount(count) {
      this.itemCount = count;
    },
    setOfrrIds(offrIds) {
      this.offrIds = JSON.parse(JSON.stringify(offrIds));
    },
    idInfo(idInfo) {
      this.idInfo = idInfo;
    },
    // 엑셀다운로드
    async excelDownload() {
      if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.GeneralSales.getCheckedRowsData();
        this.$refs.GeneralSales.getCheckedClickInfos();
        this.$refs.GeneralSales.getCustIdInfo();
      } else if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.GeneralGrid.getCheckedRowsData();
        this.$refs.GeneralGrid.getCheckedClickInfos();
        this.$refs.GeneralGrid.getCustIdInfo();
      }
      if (this.custExcelInfos.length == 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      }
      const fileNm = 'GeneralList-Excel.xlsx';
      const param = this.custExcelInfos;
      try {
        const response = await orderApi.postQuoteExcel(param, fileNm);
        fileDownload.downloadFile(response, fileNm);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 배송지 정보 모달
    openAddrInfo(clickInfo, offrId) {
      this.addrOffrId = Number(offrId);
      const fieldName = clickInfo.column.fieldName;
      if (fieldName == 'addrInfo') {
        this.$modal.show(`AddressInfoModal${this.page}`);
      }
    },
    // 계약서 출력
    async getPrintContratct() {
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.GeneralGrid.getCheckedRowsData();
        this.$refs.GeneralGrid.getCheckedClickInfos();
        const some = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.request || data == defs.offrStatCd.temp || data == defs.offrStatCd.cancel);
        if (some == true) {
          this.ment = 'message.msgRequireConfirm';
          this.$modal.show('NoticeModal');
          return;
        }
      } else if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.GeneralSales.getCheckedRowsData();
        this.$refs.GeneralSales.getCheckedClickInfos();
        const some = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.request || data == defs.offrStatCd.temp || data == defs.offrStatCd.cancel);
        if (some == true) {
          this.ment = 'message.msgRequireConfirm';
          this.$modal.show('NoticeModal');
          return;
        }
      }
      if (this.setSelectProductRows.length == 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      }
      if (this.setSelectProductRows.length > 1) {
        this.ment = 'message.msgContractNotice';
        this.$modal.show('NoticeModal');
        return;
      }
      await loadLanguageAsync('/modal/reportLangSelect', this.menuId);
      this.$modal.show('ReportLangSelectModal', { signShow: false, type: 'contract' });
    },
    // 견적서 출력
    async getPrintQuotation() {
      if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.GeneralSales.getCheckedRowsData();
        this.$refs.GeneralSales.getCheckedClickInfos();
        const some = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.request || data == defs.offrStatCd.temp || data == defs.offrStatCd.cancel);
        if (some == true) {
          this.ment = 'message.msgRequireConfirm';
          this.$modal.show('NoticeModal');
          return;
        }
      } else if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.GeneralGrid.getCheckedRowsData();
        this.$refs.GeneralGrid.getCheckedClickInfos();
        const some = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.request || data == defs.offrStatCd.temp || data == defs.offrStatCd.cancel);
        if (some == true) {
          this.ment = 'message.msgRequireConfirm';
          this.$modal.show('NoticeModal');
          return;
        }
      }
      if (this.setSelectProductRows.length == 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      }
      if (this.setSelectProductRows.length > 1) {
        this.ment = 'message.msgSendQuotNotice';
        this.$modal.show('NoticeModal');
        return;
      }
      this.$modal.show('ReportLangSelectModal', { signShow: false, type: 'quote' });
    },
    async printReport(data) {
      if (data.result) {
        try {
          const paramData = {
            id: this.setSelectProductRows[0].id,
            langList: data.langList,
            // signYn: data.signYn,
          };
          let response = '';
          if (data.type === 'quote') {
            response = await productApi.getPrintQuotation(paramData);
          } else if (data.type === 'contract') {
            paramData['signYn'] = data.signYn;
            response = await productApi.getPrintContratct(paramData);
          } else if (data.type === 'quoteMail') {
            paramData['signYn'] = data.signYn;
            response = await productApi.sendQuotation(paramData);
          }
          if (data.type !== 'quoteMail') {
            this.reportPrint(response.data.ds, data.type);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSendQuotationSuccess');
          }
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
    setProductRows(setSelectProductRows) {
      this.setSelectProductRows = setSelectProductRows;
    },
    // 복사등록, 단일 선택만 가능
    async saveCopyRegist() {
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.GeneralGrid.getCheckedRowsData();
      } else if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.GeneralSales.getCheckedRowsData();
      }
      // 선택 견적 없을 경우 return
      if (this.setSelectProductRows.length == 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      }
      // 다중 건 선택 후 복사등록시 return => 복사등록은 단일 선택임
      if (this.setSelectProductRows.length > 1) {
        this.ment = 'message.msgNoticeCopy';
        this.$modal.show('NoticeModal');
        return;
      }
      // 진행상태 임시저장인 건 복사등록시 reutrn;
      if (this.setSelectProductRows[0].offrStatCd === defs.offrStatCd.temp) {
        this.ment = 'message.msgCannotCopy';
        this.$modal.show('NoticeModal');
        return;
      }
      const param = {};
      param.custId = this.setSelectProductRows[0].custId;
      param.id = this.setSelectProductRows[0].id;
      try {
        await productApi.saveCopyRegist(param);

        await this.searchProductList();
        this.ment = 'message.msgQuoteCopy';
        this.$modal.show('NoticeModal');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 견적취소, 다중 가능, 요청, 확정, 작성중 상태만 가능, (진행, 완료, 취소) => 불가
    async saveCancelProduct(rowData) {
      try {
        const param = rowData;
        await productApi.saveCancelProduct(param);
        await this.searchProductList();
        this.ment = 'message.msgFinishCancel';
        this.$modal.show('NoticeModal');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 선택삭제, 취소, 작성중만 가능 그 외 값은 불가
    async saveDeleteProductSelection() {
      if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.GeneralSales.getCheckedRowsData();
        this.$refs.GeneralSales.getCheckedClickInfos();
        // 선택견적 없을 경우
        if (this.setSelectProductRows.length == 0) {
          this.ment = 'message.msgEmptyQuotation';
          this.$modal.show('NoticeModal');
          return;
        }
        // 선택 견적 중 진행상태가 취소 작성중 외인 경우
        const some = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.proceed || data == defs.offrStatCd.end || data == defs.offrStatCd.request || data == defs.offrStatCd.confirm);
        this.ment = 'message.msgCannotDelete2';
        if (some == true) {
          this.$modal.show('NoticeModal');
          return;
        }
      } else if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.GeneralGrid.getCheckedRowsData();
        this.$refs.GeneralGrid.getCheckedClickInfos();
        // 선택견적 없을 경우
        if (this.setSelectProductRows.length == 0) {
          this.ment = 'message.msgEmptyQuotation';
          this.$modal.show('NoticeModal');
          return;
        }
        // 진행상태가 취소, 작성중 외인 경우
        const some = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.proceed || data == defs.offrStatCd.end || data == defs.offrStatCd.request || data == defs.offrStatCd.confirm);
        if (some == true) {
          this.ment = 'message.msgCannotDelete2';
          this.$modal.show('NoticeModal');
          return;
        }
      }
      const param = JSON.parse(JSON.stringify(this.setSelectProductRows));
      try {
        await productApi.saveDeleteProductSelection(param);

        if (this.userMenuGrpCd == 'CUSTOMER') {
          this.$refs.GeneralGrid.deleteSelectRows();
          await this.searchProductList();
        } else if (this.userMenuGrpCd !== 'CUSTOMER') {
          this.$refs.GeneralSales.deleteSelectRows();
          await this.searchProductList();
        }
        this.ment = 'message.msgDeleteQuote';
        this.$modal.show('NoticeModal');
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
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.GeneralGrid.isChooseCell();
        if (this.$refs.GeneralGrid.isChooseCell() == true) {
          this.$refs.GeneralGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.ment = 'message.msgNoSelection';
          this.$modal.show('NoticeModal');
        }
      } else if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.GeneralSales.isChooseCell();
        if (this.$refs.GeneralSales.isChooseCell() == true) {
          this.$refs.GeneralSales.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.ment = 'message.msgNoSelection';
          this.$modal.show('NoticeModal');
        }
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
    // 접속일 기준 지난 365일 설정
    setDefaultDates(time) {
      if (time) {
        this.time = time;
        this.sttDt = time[0];
        this.endDt = time[1];
        this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      }
    },
    // 견적 검색, MDF/MFB가 견적관리 목록에서 내려오지 않고 있기에 MDF/MFB를 포함하여 검색 시, 해당하는 검색결과가 없어 전체 조회된다.
    async searchProductList() {
      if (this.authButton.schAuth === 'Y') {
        try {
          await this.getUnitCode();
          if (this.userMenuGrpCd == 'CUSTOMER') {
            this.$refs.GeneralGrid.clearCurrent();
          } else {
            this.$refs.GeneralSales.clearCurrent();
          }
          this.$refs.filter.blur();
          this.custNm ? this.custId : (this.custId = this.userInfo.custId);
          this.newSearchResult = [];
          // this.prdtClsCd = this.prdtClsCd.value;

          const param = {
            custId: this.custId,
            sttDt: this.sttDt,
            endDt: this.endDt,
            prdtClsCd: this.prdtClsCd.value,
            offrStatusCds: this.offrStatusCd,
            offrClsCd: defs.offrClsCd.order,
            filter: this.filter,
            pageNumber: '',
            pageSize: '',
            salesUsers: this.staff,
          };
          const response = await productApi.getSearchResult(param);
          // 검색 결과를 변수에 담는다.
          const searchResult = response.data.ds;
          searchResult.forEach(searchList => {
            let list = searchList;
            let customerInfo = list.customerInfo;
            let item = { ...list, ...customerInfo };
            const row = item;
            // 진행상태에 따른 priceInfo visible 처리
            if (this.userMenuGrpCd == 'CUSTOMER') {
              if (row.offrStatCd == 'REQ' || row.offrStatCd == 'TMP') {
                row.offrTotal = '';
                row.offrTotPrice = '';
                row.offrTotVat = '';
              }
            }
            row.offrDt = this.$vnDateFormatD(row.offrDt);
            if (row.offrEndDt) row.offrEndDt = this.$vnDateFormatD(row.offrEndDt);
            row.updatedAt = this.$vnDateFormatD(row.updatedAt);
            if (row.trnHopeDt) row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
            row.ordUnitNm = this.bdlUnit;
            row.baseUnitNm = this.pcUnit;
            row.paymentCond = row.paymentCondNm;
            this.newSearchResult.push(item);
          });
          if (this.userMenuGrpCd == 'CUSTOMER') {
            this.$refs.GeneralGrid.setNewSearchResult();
            this.$refs.GeneralGrid.clearCurrent();
          } else if (this.userMenuGrpCd !== 'CUSTOMER') {
            this.$refs.GeneralSales.setNewSearchResult();
            this.$refs.GeneralSales.clearCurrent();
          }
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
    // 견적관리 접속 시 목록 조회
    async getProductManageList() {
      try {
        await this.getUnitCode();
        this.custNm ? this.custId : (this.custId = this.userInfo.custId);
        const param = {
          custId: this.custId,
          sttDt: this.sttDt,
          endDt: this.endDt,
          prdtClsCd: this.prdtClsCd.value,
          offrStatusCds: this.offrStatusCd,
          offrClsCd: defs.offrClsCd.order,
          filter: this.filter,
          pageNumber: '',
          pageSize: '',
          salesUsers: this.staff,
        };
        const response = await productApi.getProductManageList(param);
        this.emitPrdtList = response.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setObject(pageObj, id, custId) {
      const vm = this;
      this.sendEmit(vm, pageObj, id, custId);
    },
    sendEmit: _.debounce((vm, obj, id = '', custId = '') => {
      vm.$emit('setNewObject', obj, id, custId);
    }, 700),
    async reset() {
      this.filter = '';
      this.default = '';
      this.prdtClsCd = this.selectPrdt[0];
      await this.$refs.rangeDate.init();
      this.custId = this.$store.state.userInfo.custId !== 0 ? this.$store.state.userInfo.custId : '';
      this.custNm = '';
      await this.$refs.staffOptions?.select({ value: 'reset' });
      this.$refs.statusOptions.select({ value: 'reset' });
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      if (this.userMenuGrpCd === 'CUSTOMER') {
        this.$refs.GeneralGrid.setFilter(this.filterOn);
      } else {
        this.$refs.GeneralSales.setFilter(this.filterOn);
      }
    },
    async getDownloadBank() {
      try {
        const fileNm = 'VRGDW_Bank Account List_EN_20221216.pdf';
        const savePath = '/upload/202212/lnGzZQRRR.pdf';
        const response = await fileApi.download(savePath, fileNm);
        fileDownload.downloadFile(response, fileNm);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    searchReady() {
      if (this.selectPrdt.length > 0 && this.selectStatus.length > 0 && this.selectOptions.length > 0 && this.staffOptions.length > 0 && this.userMenuGrpCd !== 'CUSTOMER') {
        this.getProductManageList();
        clearInterval(this.intervalId);
      } else if (this.selectPrdt.length > 0 && this.selectStatus.length > 0 && this.selectOptions.length > 0 && this.userMenuGrpCd === 'CUSTOMER') {
        this.getProductManageList();
        clearInterval(this.intervalId);
      }
    },
  },
  created() {
    this.getGridMutiLanguage();
  },
  async mounted() {
    this.default = this.openInfo.etcData.offrStatCd ?? '';
    await this.getOfferStatus();
    await this.getProductCls();
    this.selectValue = this.selectOptions[0];
    this.changeUnit(this.selectValue);
    this.setFilter();
    this.getStaffCombo();
    this.intervalId = setInterval(this.searchReady, 100);
  },
  destroyed() {},
};
</script>

<style></style>
