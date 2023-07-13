<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title t-l">{{ $t('message.cust') }}</span>
              <!-- 영업일 때 고객사 검색 모달 뜸 -->
              <div class="form_inputnbtn" v-if="authButton.fn1Auth == 'Y'">
                <!-- 영업일 때 input -->
                <input type="text" @keyup.enter="clientSearch" id="clientSearch" v-model="custNm" class="t-l" />
                <button class="btn_search_basic_info" @click="clientSearch"><img src="@/assets/img/icon_search.png" /></button>
              </div>
              <!-- 고객일 때 custNm 있는 회색 disable 구간 -->
              <div class="form_inputnbtn" v-if="authButton.fn1Auth == 'N'">
                <input type="text" id="custNm" class="t-l disabled" disalbed v-model="custNm" />
                <!-- 버튼 css 또는 input 태그 disable css 필요 -->
                <!-- <button class="btn_search_basic_info" disabled /> -->
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.requestDate') }}</span>
              <!-- 데이터피커 -->
              <div class="form_calendar w_100" @click="datePicker('DatePicker')">
                <input class="t-l disalbed" type="text" v-model="datesDtls" />
                <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
            <!-- 상품선택 -->
            <label for="" class="filter_type">
              <span class="filter_type_title t-l">{{ $t('message.categorySubject') }}</span>
              <MultiSelect :allow-empty="false" style="width: 100%" id="Material_Group" v-model="prdtClsCd" :options="selectPrdt" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value" />
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="searchProductList" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>

          <!-- 진행 상태 -->
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title t-l">{{ $t('message.status') }}</span>
              <MultipleSelect :options="selectStatus" :all="true" @select="setStatus" ref="statusOptions" />
            </label>
            <!-- 검색 -->
            <label for="" class="filter_type" v-if="authButton.fn1Auth == 'Y'">
              <span class="filter_type_title">{{ $t('message.sales') }}</span>
              <MultipleSelect :options="staffOptions" :all="true" :default="userInfo.userCd" @select="cds => setCd(cds, 'staff')" ref="staffOptions" />
            </label>
            <label for="" class="filter_type" v-if="authButton.fn1Auth == 'Y'">
              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
              <div class="form_input">
                <input ref="filter" class="t-l" type="text" id="keyWord" @keyup.enter="searchProductList" v-model="filter" :placeholder="$t('message.placeholderOrderList')" />
              </div>
            </label>
            <label for="" class="filter_type filter_type_double" v-if="authButton.fn1Auth == 'N'">
              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
              <div class="form_input">
                <input ref="filter" class="t-l" type="text" id="keyWord" @keyup.enter="searchProductList" v-model="filter" :placeholder="$t('message.placeholderOrderList')" />
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
          <button v-if="this.authButton.savAuth == 'Y'" class="btn_default btn_function" @click="saveCopyRegist">
            {{ $t('message.btnRegistCopy') }}
          </button>
          <button v-if="this.authButton.delAuth == 'Y'" class="btn_default btn_function" @click="saveDeleteProductSelection">
            {{ $t('message.btnSelectionDelete') }}
          </button>
          <button v-if="this.authButton.delAuth == 'Y'" class="btn_default btn_function" @click="beforeCancel">{{ $t('message.btnCancelSample') }}</button>
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
      <div class="real_body real_body02" v-if="userInfo.menuGrpCd == 'CUSTOMER'">
        <SampleListGrid :menuId="menuId" :savePage="savePage" style="height: 100%" :pcUnit="pcUnit" :bdlUnit="bdlUnit" :cancelId="cancelId" :refreshGrid="refreshGrid" @setClickInfos="setClickInfos" :gridLang="gridLang" @openMemo="setCustMemo" @setOfrrIds="setOfrrIds" @offrId="offrId" @openAddrInfo="openAddrInfo" @emitCount="emitCount" :newSearchResult="newSearchResult" :emitPrdtList="emitPrdtList" :userCustId="this.userCustId" :prdtClsCd="prdtClsCd" gridName="'SampleListGrid'" ref="SampleList" @setProductRows="setProductRows" @setObject="setObject" />
      </div>
      <div class="real_body real_body02" v-if="userInfo.menuGrpCd !== 'CUSTOMER'">
        <SampleSalesListGrid :menuId="menuId" :savePage="savePage" style="height: 100%" :pcUnit="pcUnit" :bdlUnit="bdlUnit" :cancelId="cancelId" :refreshGrid="refreshGrid" @setClickInfos="setClickInfos" :gridLang="gridLang" @openMemo="setCustMemo" @setOfrrIds="setOfrrIds" @offrId="offrId" @openAddrInfo="openAddrInfo" @emitCount="emitCount" :newSearchResult="newSearchResult" :emitPrdtList="emitPrdtList" :userCustId="this.userCustId" :prdtClsCd="prdtClsCd" gridName="'SampleSalesListGrid'" ref="SampleSales" @setProductRows="setProductRows" @setObject="setObject" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <!-- 단위변경 MultiSelect -->
          <MultiSelect id="Material_Group" class="btn_select" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="changeUnit" label="text"></MultiSelect>
          <button v-if="this.authButton.exlAuth == 'Y'" class="btn_default btn_function" @click="excelDownload">
            {{ $t('message.btnDownloadExcel') }}
          </button>
        </div>
        <div class="footer_right"></div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <ClientSearchModal @sendCustId="sendCustId" @sendInfoInput="sendInfoInput" ref="ClientSearchModal" />
    <DateRangePickerModal @selectDate="showSelectDate" @setDefaultDates="setDefaultDates" :oldDate="oldDate" ref="rangeDate" />
    <NoticeModal :ment="ment" />
    <SampleCommentModal :custMemoParam="custMemoParam" :userMenuGrpCd="userMenuGrpCd" />
    <SampleAddressInfoModal :addrOffrId="addrOffrId" />
    <BookingAlarmModal :ment="ment" @okOrNo="okOrNo" :page="page" />
    <QuoteCancelNoticeModal />
  </div>
</template>

<script>
import commonGridJs from '@/mixins/commonGrid.js';
import BookingAlarmModal from '@/modal/booking/BookingAlarmModal';
import ClientSearchModal from '@/modal/order/ClientSearchModal.vue';
import SampleAddressInfoModal from '@/modal/order/SampleAddressInfoModal.vue';
import SampleCommentModal from '@/modal/order/SampleCommentModal.vue';
import languageApi from '@/api/language';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import SampleListGrid from '@/components/gridView/sample/SampleListGrid.vue';
import SampleSalesListGrid from '@/components/gridView/sample/SampleSalesListGrid.vue';
import DateRangePickerModal from '@/modal/DateRangePickerModal.vue';
import productApi from '@/api/order/product';
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
// import fileDownload from '@/mixins/fileDownload';
import QuoteCancelNoticeModal from '@/modal/order/QuoteCancelNoticeModal.vue';
import NoticeModal from '@/modal/order/NoticeModal.vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import defs from '@/consts/defs';

export default {
  components: {
    ClientSearchModal,
    BookingAlarmModal,
    SampleSalesListGrid,
    SampleListGrid,
    DateRangePickerModal,
    SampleAddressInfoModal,
    NoticeModal,
    MultipleSelect,
    SampleCommentModal,
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
      whatIs: '',
      addrOffrId: null,
      refreshGrid: [],
      setCheckedClickInfos: [],
      custFilter: '',
      custNm: '',
      oldDate: [],
      gridLang: [],
      custMemoParam: {},
      salesMemoParam: {},
      changeMemoText: '',
      changeRegistYn: null,
      registYn: null,
      filter: '',
      ment: '',
      offrIds: [],
      offrId: '',
      selectStatus: [],
      isFixColumn: false,
      isFixRow: false,
      selectPrdt: [],
      custId: this.$store.state.userInfo.custId,
      sttDt: '',
      endDt: '',
      prdtClsCd: [],
      selectStauts: [],
      datesDtls: '',
      emitPrdtList: [],
      id: '',
      newSearchResult: [],
      setSelectProductRows: [],
      itemCount: '',
      ids: [],
      language: this.$store.state.userInfo.locale,
      offrStatusCd: [],
      custExcelInfos: [],
      cancelId: null,
      intervalId: '',
    };
  },
  mixins: [commonGridJs],
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
    openInfo(data) {
      if (data.etcData !== null) {
        this.cancelId = data.id;
        this.setRefreshGrid();
      }
    },
  },
  methods: {
    async saveCancelSample(rowData) {
      try {
        const param = rowData;
        await productApi.cancelSample(param);
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
      }
    },
    changeUnit(type) {
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.SampleList.layoutState(type.value);
      } else {
        this.$refs.SampleSales.layoutState(type.value);
      }
    },
    okOrNo(result, type) {
      if (result) {
        if (this.userMenuGrpCd == 'CUSTOMER') {
          if (type === 'reset') {
            this.$refs.SampleList.resetLayout();
          } else {
            this.$refs.SampleList.saveLayout();
          }
        } else {
          if (type === 'reset') {
            this.$refs.SampleSales.resetLayout();
          } else {
            this.$refs.SampleSales.saveLayout();
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
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async excelDownload() {
      if (this.itemCount === 0) {
        this.ment = 'message.msgNoInquireItem';
        this.$modal.show('NoticeModal');
      } else {
        const excelData = {
          fileNm: 'Sample-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
        };
        this.userMenuGrpCd == 'CUSTOMER' ? this.$refs.SampleList.excelExport(excelData) : this.$refs.SampleSales.excelExport(excelData);
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
    // 체크된 Row의 진행상태, offrStatNm 확인
    setClickInfos(setCheckedClickInfos) {
      this.setCheckedClickInfos = setCheckedClickInfos;
    },
    // 고객사 명 노출
    async setCustNm() {
      try {
        if (this.userMenuGrpCd == 'CUSTOMER') {
          const param = {
            custId: this.userCustId,
          };
          const response = await orderApi.getUserOfferInfo(param);
          if (response.data.rs) {
            this.custNm = response.data.rs.custNm;
          }
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 그리드 다국어 설정
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
    async setRefreshGrid() {
      this.refreshGrid = [];
      const param = {
        custId: this.custId,
        sttDt: this.sttDt,
        endDt: this.endDt,
        prdtClsCd: this.prdtClsCd.value,
        offrStatusCds: '',
        offrClsCd: defs.offrClsCd.sample,
        filter: '',
        pageNumber: '',
        pageSize: '',
        salesUsers: this.staff,
      };
      try {
        const response = await productApi.getProductManageList(param);
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
    // 고객의견 메모
    setCustMemo(param) {
      this.custMemoParam = param;
      this.$modal.show('SampleCommentModal');
    },
    setStatus(statCd) {
      const setStatus = [];
      statCd.forEach(selectStauts => {
        const d = selectStauts.value;
        setStatus.push(d);
      });
      this.offrStatusCd = setStatus;
      this.offrStatusCd[0] == 'OS00' ? (this.offrStatusCd = '') : this.offrStatusCd;
    },
    async getOfferStatus() {
      const param = {
        groupCd: 'OFFER_STATUS',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const response = await commonApi.getCommonCodeCombo(param);
        const allGroup = { text: this.$t('message.all'), value: 'OS00' };
        this.selectStatus = response.data.ds;
        this.selectStatus.unshift(allGroup);
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
        // 2. 접속 유저에게 할당된 MDF, MFB 확인
        // const userPrdt = this.userInfo.prdtCdList;
        // const mdf = userPrdt.some(prdt => prdt == 'ADM0_MDF');
        // const mfb = userPrdt.some(prdt => prdt == 'AMN0_MFB');

        // if (this.userMenuGrpCd == 'CUSTOMER') {
        //   // 221017/11:32 기준 CUSTOMER 대상으로만 판별
        //   if (mdf == true && mfb == true) {
        //     // MDF, MFB 존재
        //     this.selectPrdt = prdt;
        //   } else if (mdf == false && mfb == false) {
        //     // 존재하는 값 없음
        //     this.selectPrdt = '';
        //   }

        //   if (mdf == true && mfb == false) {
        //     // MDF만 존재
        //     prdt.filter(prdt => prdt.value == 'ADM0_MDF');
        //     this.selectPrdt = prdt;
        //   } else if (mdf == false && mfb == true) {
        //     // MFB만 존재
        //     prdt.filter(prdt => prdt.value == 'AMN0_MFB');
        //     this.selectPrdt = prdt;
        //   }
        //   if (this.prdtClsCd.length === 0) {
        //     this.prdtClsCd = prdt[0];
        //   }
        // } else {
        //   this.selectPrdt = response.data.ds;
        //   this.selectPrdt.unshift(allGroup);

        //   if (this.prdtClsCd.length === 0) {
        //     this.prdtClsCd = prdt[0];
        //   }
        // }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 샘플취소, 다중 가능, 요청, 확정 가능, (진행, 완료, 취소, 작성중) 불가
    async beforeCancel() {
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.SampleList.getCheckedRowsData();
        this.$refs.SampleList.getCheckedClickInfos();
      } else if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.SampleSales.getCheckedRowsData();
        this.$refs.SampleSales.getCheckedClickInfos();
      }
      if (this.setSelectProductRows.length == 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      }
      // this.setCheckedClickInfos.forEach(stat => {
      //   if (stat == 'TMP') {
      //     this.ment = 'message.msgDraftNotice';
      //     this.$modal.show('NoticeModal');
      //     return;
      //   }
      // });
      const some = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.temp || data == defs.offrStatCd.end || data == defs.offrStatCd.cancel);
      // 완료, 취소, 초안
      if (some == true) {
        this.$modal.show('QuoteCancelNoticeModal');
        return;
        // this.ment = 'message.msgExceptQuote2';
        // this.$modal.show('NoticeModal');
        // return;
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
            await this.saveCancelSample(param);
          } else {
            this.$modal.show('QuoteCancelNoticeModal');
            return;
          }
          // await productApi.cancelSample(param);
          // if (response.data.status == 200) {
          //   await this.searchProductList();
          //   this.ment = 'message.msgFinishCancel';
          //   this.$modal.show('NoticeModal');
          // }
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
    setOfrrIds(offrIds) {
      this.offrIds = JSON.parse(JSON.stringify(offrIds));
    },
    idInfo(idInfo) {
      this.idInfo = idInfo;
    },
    // 배송지 정보 모달
    openAddrInfo(clickInfo, offrId) {
      this.addrOffrId = Number(offrId);
      const fieldName = clickInfo.column.fieldName;
      if (fieldName == 'addrInfo') {
        this.$modal.show('SampleAddressInfoModal');
      }
    },
    // 카운트 1
    emitCount(count) {
      this.itemCount = count;
    },
    // 카운트 3
    itemCounts(count) {
      this.itemCount = count;
    },
    setProductRows(setSelectProductRows) {
      this.setSelectProductRows = setSelectProductRows;
    },
    // 복사등록, 단일 선택만 가능
    async saveCopyRegist() {
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.SampleList.getCheckedRowsData();
      } else if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.SampleSales.getCheckedRowsData();
      }
      if (this.setSelectProductRows.length == 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      }
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
        const response = await productApi.saveCopyRegist(param);
        if (response.data.status == 200) {
          await this.searchProductList();
          this.ment = 'message.msgQuoteCopy';
          this.$modal.show('NoticeModal');
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 선택삭제, 취소, 작성중만 가능
    async saveDeleteProductSelection() {
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.$refs.SampleList.getCheckedRowsData();
        this.$refs.SampleList.getCheckedClickInfos();
      } else if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.$refs.SampleSales.getCheckedRowsData();
        this.$refs.SampleSales.getCheckedClickInfos();
      }
      if (this.setSelectProductRows.length == 0) {
        this.ment = 'message.msgEmptyQuotation';
        this.$modal.show('NoticeModal');
        return;
      }
      const some = this.setCheckedClickInfos.some(data => data == defs.offrStatCd.proceed || data == defs.offrStatCd.end || data == defs.offrStatCd.request || data == defs.offrStatCd.confirm);
      if (some == true) {
        this.ment = 'message.msgCannotDelete2';
        this.$modal.show('NoticeModal');
        return;
      }
      const param = JSON.parse(JSON.stringify(this.setSelectProductRows));
      try {
        const response = await productApi.saveDeleteProductSelection(param);
        if (response.data.status == 200) {
          if (this.userMenuGrpCd == 'CUSTOMER') {
            this.$refs.SampleList.deleteSelectRows();
            await this.searchProductList();
          } else if (this.userMenuGrpCd !== 'CUSTOMER') {
            this.$refs.SampleSales.deleteSelectRows();
            await this.searchProductList();
          }
          this.ment = 'message.msgDeleteQuote';
          this.$modal.show('NoticeModal');
        }
      } catch (e) {
        console.log(e);
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
        this.$refs.SampleList.isChooseCell();
        if (this.$refs.SampleList.isChooseCell() == true) {
          this.$refs.SampleList.fixGrid(type, this.isFixColumn, this.isFixRow);
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
        this.$refs.SampleSales.isChooseCell();
        if (this.$refs.SampleSales.isChooseCell() == true) {
          this.$refs.SampleSales.fixGrid(type, this.isFixColumn, this.isFixRow);
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
    // 데이트피커
    datePicker() {
      this.$modal.show('DateRangePicker');
    },
    // 날짜 선택시 노출
    showSelectDate(selectDate) {
      this.time = selectDate;
      this.oldDate = selectDate;
      this.sttDt = this.time[0];
      this.endDt = this.time[1];
      this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
    },
    // 접속일 기준 지난 1년 설정
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
        await this.getUnitCode();
        if (this.userMenuGrpCd == 'CUSTOMER') {
          this.$refs.SampleList.clearCurrent();
        } else {
          this.$refs.SampleSales.clearCurrent();
        }
        this.$refs.filter.blur();
        this.custNm ? this.custId : (this.custId = this.userInfo.custId);
        this.newSearchResult = [];
        const param = {
          custId: this.custId,
          sttDt: this.sttDt,
          endDt: this.endDt,
          prdtClsCd: this.prdtClsCd.value,
          offrStatusCds: this.offrStatusCd,
          offrClsCd: defs.offrClsCd.sample,
          filter: this.filter,
          pageNumber: '',
          pageSize: '',
          salesUsers: this.staff,
        };
        try {
          const response = await productApi.getSearchResult(param);
          // 검색 결과를 변수에 담는다.
          const searchResult = response.data.ds;
          searchResult.forEach(searchList => {
            let list = searchList;
            let customerInfo = list.customerInfo;
            let item = { ...list, ...customerInfo };
            const row = item;
            row.offrDt = this.$vnDateFormatD(row.offrDt);
            row.updatedAt = this.$vnDateFormatD(row.updatedAt);
            if (row.offrEndDt) row.offrEndDt = this.$vnDateFormatD(row.offrEndDt);
            row.ordUnitNm = this.bdlUnit;
            row.baseUnitNm = this.pcUnit;
            this.newSearchResult.push(item);
          });
          if (this.userMenuGrpCd == 'CUSTOMER') {
            this.$refs.SampleList.setNewSearchResult();
            this.$refs.SampleList.clearCurrent();
          } else if (this.userMenuGrpCd !== 'CUSTOMER') {
            this.$refs.SampleSales.setNewSearchResult();
            this.$refs.SampleSales.clearCurrent();
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
    // 샘플관리 접속 시 목록 조회
    async getProductManageList() {
      try {
        await this.getUnitCode();
        this.custNm ? this.custId : (this.custId = this.userInfo.custId);
        const param = {
          custId: this.custId,
          sttDt: this.sttDt,
          endDt: this.endDt,
          prdtClsCd: this.prdtClsCd.value ? this.prdtClsCd.value : '',
          offrStatusCds: '',
          offrClsCd: defs.offrClsCd.sample,
          filter: '',
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
    reset() {
      this.filter = '';
      this.prdtClsCd = this.selectPrdt[0];
      this.$refs.statusOptions.select({ value: 'reset' });
      this.$refs.rangeDate.init();
      this.custId = this.$store.state.userInfo.custId !== 0 ? this.$store.state.userInfo.custId : '';
      this.custNm = this.$store.state.userInfo.custId !== 0 ? this.$store.state.userInfo.custNm : '';
      this.$refs.staffOptions.select({ value: 'reset' });
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      if (this.userMenuGrpCd === 'CUSTOMER') {
        this.$refs.SampleList.setFilter(this.filterOn);
      } else {
        this.$refs.SampleSales.setFilter(this.filterOn);
      }
    },
    searchReady() {
      if (this.selectPrdt.length > 0 && this.selectStatus.length > 0 && this.staffOptions.length > 0 && this.userMenuGrpCd !== 'CUSTOMER') {
        this.getProductManageList();
        clearInterval(this.intervalId);
      } else if (this.selectPrdt.length > 0 && this.selectStatus.length > 0 && this.userMenuGrpCd === 'CUSTOMER') {
        this.getProductManageList();
        clearInterval(this.intervalId);
      }
    },
  },
  created() {
    this.getGridMutiLanguage();
  },
  mounted() {
    // if (this.authButton.schAuth === 'Y') {
    //   this.getProductManageList();
    // }
    this.getOfferStatus();
    this.getProductCls();
    this.selectValue = this.selectOptions[0];
    this.changeUnit(this.selectValue);
    this.setCustNm();
    this.setFilter();
    this.getStaffCombo();
    this.intervalId = setInterval(this.searchReady, 100);
  },
  destroyed() {},
};
</script>

<style></style>
