<template>
  <div>
    <!-- 검색필터 영역  -->
    <div class="search_content">
      <div ref="search_box_height" :class="{ search_close: searchOpen }" :style="`height:${search_box_height}`" class="search_box">
        <div class="search_box_filter always_exposure"></div>

        <div class="search_box_filter">
          <div class="filter_list">
            <label class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.bookingDate') }}</span>
              <div class="form_calendar w_100" @click="datePicker('DatePicker')">
                <input v-model="datesDtls" :placeholder="$t('message.msgSelectPeriod')" type="text" />
                <button class="icon_calendar">
                  <img src="@/assets/img/icon_calendar.png" />
                </button>
              </div>
            </label>
            <label v-if="this.authButton.fn5Auth === 'Y'" class="filter_type" for="custoer_name">
              <span class="filter_type_title">{{ $t('message.custNm') }}</span>
              <div class="form_inputnbtn">
                <input id="custoer_name" v-model="custNm" style="width: 100%" type="text" @keyup.enter="clientSearch" />
                <button class="btn_search_basic_info" @click="clientSearch">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
            </label>
            <!-- 품목 -->
            <label class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.categorySubject') }}</span>
              <MultiSelect id="Material_Group" v-model="group" :allow-empty="false" :close-on-select="true" :options="groupOptions" :searchable="false" :show-labels="false" label="text" placeholder="Pick a value" style="width: 100%" track-by="text"></MultiSelect>
            </label>
            <!-- 진행상태 -->
            <label v-if="authButton.fn5Auth === 'N'" class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.bokngStatNm') }}</span>
              <MultipleSelect ref="statusOptions" :all="true" :default="this.default" :options="statusOptions" @select="cds => setSelect(cds, 'status')" />
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset" v-if="authButton.schAuth === 'Y'">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="search()" v-if="authButton.schAuth === 'Y'">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
          <div v-if="authButton.fn5Auth === 'N'" class="filter_list">
            <label class="filter_type filter_type_double" for="">
              <span class="filter_type_title">{{ $t('message.keyword') }}</span>
              <div class="form_input">
                <input id="postal_code" ref="filter" v-model="filter" :placeholder="[this.userMenuGrpCd === 'CUSTOMER' ? $t('message.msgInputNum2') : $t('message.msgInputNum')]" class="t-l" style="width: 100%" type="text" @keyup.enter="search()" />
              </div>
            </label>
          </div>
          <div v-if="authButton.fn5Auth === 'Y'" class="filter_list">
            <!-- 진행상태 -->
            <label class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.bokngStatNm') }}</span>
              <MultipleSelect ref="statusOptions" :all="true" :default="this.default" :options="statusOptions" @select="cds => setSelect(cds, 'status')" />
            </label>
            <!-- 영업사원 -->
            <label v-if="authButton.fn5Auth === 'Y'" class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.sales') }}</span>
              <MultipleSelect ref="staffOptions" :all="true" :default="userInfo.userCd" :options="staffOptions" @select="cds => setSelect(cds, 'staff')" />
            </label>
            <label class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.keyword') }}</span>
              <div class="form_input">
                <input id="postal_code" ref="filter" v-model="filter" :placeholder="$t('message.placeholderBkngList')" class="t-l" style="width: 100%" type="text" @keyup.enter="search()" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- 검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container07">
      <div class="real_head">
        <div class="real_head_left">
          <small>
            {{ $t('message.totalSelection1') }}
            <i>{{ bookingData.length }}</i>
            {{ $t('message.totalSelection2') }}
          </small>
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_print_fuction" v-if="authButton.fn1Auth === 'Y'" @click="getDownloadBank">
            {{ $t('message.btnBankAccount') }}
          </button>
          <button v-if="authButton.fn4Auth === 'Y'" class="btn_default btn_process" @click="selectOneRow('change')">
            {{ $t('message.btnDepositoryTransform') }}
          </button>
          <button v-if="authButton.fn4Auth === 'Y'" class="btn_default btn_process" @click="openDeliveryRequest('request')">
            {{ $t('message.btnDepositoryRequest') }}
          </button>
          <button v-if="this.authButton.savAuth === 'Y'" class="btn_default btn_function" @click="selectRows('save')">
            {{ $t('message.btnSave') }}
          </button>
          <!-- <button class="btn_default btn_deep_green" @click="selectRows('quotePrint')">
            {{ $t('message.btnBookingPrint') }}
          </button> -->
          <button v-if="this.authButton.delAuth === 'Y'" class="btn_default btn_function" @click="selectRows('delete')">
            {{ $t('message.btnDelete') }}
          </button>
          <button v-if="this.authButton.delAuth === 'Y'" class="btn_default btn_function" @click="selectRows('cancel')">
            {{ $t('message.btnCancel') }}
          </button>
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
          <!-- MultiSelect -->
          <MultiSelect id="Material_Group" v-model="layoutValue" :allow-empty="false" :close-on-select="true" :options="layoutOptions" :searchable="false" :show-labels="false" class="btn_select_layout" label="text" style="width: 100%" @input="layoutBtn"></MultiSelect>
        </div>
      </div>

      <div v-if="this.userMenuGrpCd === 'CUSTOMER'" class="real_body real_body04">
        <BookingCustGrid ref="BookingGrid" :bookingData="bookingData" :gridLang="gridLang" :gridName="'BookingCustGrid'" :menuId="menuId" :page="page" :savePage="savePage" :userInfo="userInfo" style="height: 100%" @openAddrInfo="openAddrInfo" />
      </div>
      <div v-else class="real_body real_body05">
        <BookingOrderGrid ref="BookingGrid" :bookingData="bookingData" :gridLang="gridLang" :gridName="'BookingOrderGrid'" :menuId="menuId" :page="page" :savePage="savePage" :userInfo="userInfo" style="height: 100%" @openAddrInfo="openAddrInfo" @sendApprRowInfo="sendApprRowInfo" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <MultiSelect id="Material_Group" v-model="selectValue" :allow-empty="false" :close-on-select="true" :options="selectOptions" :searchable="false" :show-labels="false" class="btn_select" label="text" style="width: 100%" @input="changeUnit"></MultiSelect>
          <!-- //drop down -->
          <button v-if="this.authButton.exlAuth === 'Y' && this.userMenuGrpCd !== 'CUSTOMER'" class="btn_default btn_function" @click="openExcelUpload()">
            {{ $t('message.btnUploadBooking') }}
          </button>
          <button v-if="this.authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="excelDownload()">
            {{ $t('message.btnDownloadExcel') }}
          </button>
          <!-- <button class="btn_default btn_white" @click="selectRows('debitSend')">
            {{ $t('message.btnSendNotedebit') }}
          </button> -->
        </div>
        <div class="footer_right">
          <button v-if="authButton.fn3Auth === 'Y'" class="btn_default btn_critical_process" @click="selectRows('apprDoc')">
            {{ $t('message.btnApprDocNumAdd') }}
          </button>
          <button v-if="authButton.fn3Auth === 'Y'" class="btn_default btn_critical_process" @click="selectRows('confirm')">
            {{ $t('message.btnBookingConfirmation') }}
          </button>
          <button v-if="authButton.fn3Auth === 'Y'" class="btn_default btn_critical_process" @click="selectRows('assign')">
            {{ $t('message.btnAskInventAllocation') }}
          </button>
          <button class="btn_default btn_print_fuction" v-if="authButton.fn1Auth === 'Y'" @click="selectRows('debitPrint')">
            {{ $t('message.btnPrintNotedebit') }}
          </button>
          <button class="btn_default btn_critical_process" v-if="authButton.fn2Auth === 'Y'" @click="openDeliveryRequest('delivery')">
            {{ $t('message.btnRequestDeliver') }}
          </button>
          <!--          <button v-if="this.userMenuGrpCd !== 'CUSTOMER'" @click="selectRows('apprReq')" class="btn_default btn_deep_gray">-->
          <!--            {{ $t('message.btnPayment') }}-->
          <!--          </button>-->
          <button v-if="authButton.fn4Auth === 'Y'" class="btn_default btn_process" @click="selectRows('bookingEnd')">
            {{ $t('message.btnCloseRemain') }}
          </button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <ClientSearchModal ref="ClientSearchModal" @sendCustId="sendCustId" @sendInfoInput="sendInfoInput" />
    <DateRangePickerModal ref="rangeDate" :oldDate="oldDate" @selectDate="showSelectDate" @setDefaultDates="setDefaultDates" />
    <ExcelUploadModal @downloadExcel="excelDownload" />
    <DeliveryRequestModal :authButton="authButton" :custId="custId" :deliveryRows="deliveryRows" :menuId="menuId" :page="page" @isReSearch="isReSearch" />
    <AddressInfoModal :addrOffrId="addrOffrId" :page="page" />
    <RemainEndModal :remarkData="remarkData" @isReSearch="isReSearch" />
    <DepositoryChangeModal :checkList="checkList" :menuId="menuId" :page="page" @isReSearch="isReSearch" @pageMove="pageMove" />
    <BookingAlarmModal :authButton="authButton" :ment="ment" :page="page" @okOrNo="okOrNo" />
    <ReportLangSelectModal @printReport="printReport" />
    <PriceDraftDocumentModal @saveApprDocNum="saveApprDocNum" />
  </div>
</template>

<script>
import { loadLanguageAsync } from '@/plugins/i18n';
import BookingCustGrid from '@/components/gridView/booking/BookingCustGrid';
import BookingOrderGrid from '@/components/gridView/booking/BookingOrderGrid';
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
import bookingApi from '@/api/order/booking';
import languageApi from '@/api/language';
import { mapGetters } from 'vuex';
import ExcelUploadModal from '@/modal/booking/ExcelUploadModal';
import ClientSearchModal from '@/modal/order/ClientSearchModal';
import AddressInfoModal from '@/modal/order/AddressInfoModal';
import DateRangePickerModal from '@/modal/DateRangePickerModal';
import DeliveryRequestModal from '@/modal/booking/DeliveryRequestModal';
import RemainEndModal from '@/modal/booking/RemainEndModal';
import DepositoryChangeModal from '@/modal/booking/DepositoryChangeModal';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import BookingAlarmModal from '@/modal/booking/BookingAlarmModal';
import defs from '@/consts/defs';
import reportPrintJs from '@/mixins/reportPrint';
import ReportLangSelectModal from '@/modal/ReportLangSelect';
import PriceDraftDocumentModal from '@/modal/sales/DraftDocumentModal';
import fileApi from '@/api/file';
import fileDownload from '@/mixins/fileDownload';

export default {
  name: 'BookingOrder',
  components: {
    BookingCustGrid,
    BookingOrderGrid,
    DateRangePickerModal,
    ExcelUploadModal,
    ClientSearchModal,
    AddressInfoModal,
    DeliveryRequestModal,
    RemainEndModal,
    DepositoryChangeModal,
    MultipleSelect,
    BookingAlarmModal,
    ReportLangSelectModal,
    PriceDraftDocumentModal,
  },
  props: {
    routerPath: {
      type: String,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    authButton: {
      type: Object,
    },
    savePage: {
      type: Array,
    },
    openInfo: {
      type: Object,
    },
  },
  mixins: [reportPrintJs],
  data() {
    return {
      filterOn: true,
      addrOffrId: 0,
      prdtClsCd: '',
      sttDt: '',
      endDt: '',
      filter: '',
      custNm: '',
      time: [],
      datesDtls: '',
      isFixColumn: false,
      isFixRow: false,
      unitData: false,
      searchOpen: false,
      layoutOpen: false,
      search_box_height: '',
      groupOptions: [],
      statusOptions: [],
      staffOptions: [],
      group: '',
      status: [],
      statusCd: [],
      staff: [],
      staffCd: [],
      bookingData: [],
      apprId: '',
      id: [],
      ment: '',
      remarkData: [],
      selectProductRows: [],
      checkList: [],
      isOffrId: false,
      isOffrNum: false,
      isOffrClsCd: false,
      isPrdtClsCd: false,
      isCustId: false,
      confirmRows: [],
      oldDate: [],
      deliveryRows: [],
      gridLang: [],
      result: '',
      offrIds: [],
      selectCustId: [],
      custId: 0,
      userCustId: 0,
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
      apprRowInfo: [],
      trnApprNum: '',
      intervalId: '',
      default: {},
    };
  },
  watch: {
    openInfo(info) {
      this.reset();
      this.default = info.etcData.bokngStatCd ?? '';

      if (this.intervalId === '') {
        this.intervalId = setInterval(this.searchReady, 100);
      }
    },
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userLocale: 'userInfo/getUserLocale',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      email: 'userInfo/getUserEmail',
    }),
  },
  methods: {
    saveApprDocNum(num) {
      this.trnApprNum = num;
      this.apprListSave();
    },
    async apprListSave() {
      //결재문서번호 저장
      const offerDtlsList = [];
      this.apprRowInfo.forEach(row => {
        offerDtlsList.push({
          id: row.id,
          apprId: row.apprId,
          apprDocNum: this.trnApprNum,
        });
      });
      let custId = { custId: this.apprRowInfo[0].custId };
      let param = { ...custId, ...{ offerDtlsList: offerDtlsList } };
      try {
        await bookingApi.saveBookingAppr(param);

        await this.search();
        this.$EventBus.$emit('openYesModal', 'message.msgSaveChange');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    sendApprRowInfo(apprInfo) {
      this.apprRowInfo.push(apprInfo);
      this.$modal.show('PriceDraftDocumentModal');
    },
    isReSearch() {
      this.search();
    },
    async getRouterLanguage() {
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
    pageMove() {
      this.deliveryRows = [];
      this.custId = Number(this.checkList.custId);
      this.deliveryRows.push(this.checkList);
      this.requestModal();
    },
    async requestModal() {
      await loadLanguageAsync('/modal/delivery', this.menuId);
      this.$modal.show('DeliveryRequestModal', { type: 'request' });
    },
    checkData() {
      this.confirmRows = [];
      this.selectProductRows.forEach(list => {
        this.confirmRows.push({
          id: list.id,
          offrId: list.offrId,
          offrNum: list.offrNum,
          offrDtlsId: list.offrDtlsId,
          apprId: list.apprId,
          offrClsCd: list.offrClsCd,
        });
      });
      let selectOffrId = [];
      let selectOffrNum = [];
      let selectOffrClsCd = [];
      let selcetPrdtClsCd = [];
      this.confirmRows.forEach(item => {
        selectOffrId.push(item.offrId);
        selectOffrNum.push(item.offrNum);
        selectOffrClsCd.push(item.offrClsCd);
        selcetPrdtClsCd.push(item.prdtClsCd);
      });

      this.isOffrId = selectOffrId.every(v => v === selectOffrId[0]);
      this.isOffrNum = selectOffrNum.every(v => v === selectOffrNum[0]);
      this.isOffrClsCd = selectOffrClsCd.every(v => v === selectOffrClsCd[0]);
      this.isPrdtClsCd = selectOffrClsCd.every(v => v === selcetPrdtClsCd[0]);
    },
    async checkDeliveryData(modalTp) {
      this.checkList = [];
      this.selectProductRows.forEach(list => {
        this.checkList.push({ custId: list.custId });
      });
      this.selectCustId = [];
      this.checkList.forEach(item => {
        this.selectCustId.push(item.custId);
      });
      this.isCustId = this.selectCustId.every(v => v === this.selectCustId[0]);
      this.isCustId ? (this.custId = Number(this.selectCustId[0])) : this.custId;

      if (!this.isCustId) {
        this.$EventBus.$emit('openYesModal', 'message.msgSameCustId');
        return false;
      } else {
        if (modalTp === 'request') {
          //예탁배송요청
          this.result = this.validation('request');
          if (this.result.validation) {
            this.requestModal();
          }
        } else if (modalTp === 'delivery') {
          //배송요청
          this.checkData();
          this.result = this.validation('delivery');
          this.result.validation = true;
          if (this.result.validation) {
            if (this.deliveryRows[0].offrClsCd === defs.offrClsCd.order) {
              await loadLanguageAsync('/modal/delivery', this.menuId);
              if (modalTp === 'delivery') {
                this.$modal.show('DeliveryRequestModal', { type: 'delivery' });
              }
            } else {
              this.$modal.show('DeliveryRequestModal', { type: 'sample' });
            }
          } //validation
        }
      }
    },
    dfcEndData(typeCd, remark) {
      this.dfcEndTypeCd = typeCd;
      this.dfcEndRemark = remark;
    },
    openAddrInfo(clickInfo) {
      const fieldName = clickInfo.column.fieldName;
      const clickInfoData = this.bookingData[clickInfo.dataRow];
      this.remarkData = [];
      this.remarkData.push({
        addrInfoNum: clickInfoData.offrId,
        dfcEndTypeCd: clickInfoData.dfcEndTypeCd,
        dfcEndRemark: clickInfoData.dfcEndRemark,
      });
      this.addrOffrId = Number(this.remarkData[0].addrInfoNum);
      if (fieldName === 'addrInfo') {
        this.openAddressInfo();
      } else if (fieldName === 'dfcEndTypeCd') {
        if (this.remarkData[0].dfcEndTypeCd && this.remarkData[0].dfcEndRemark !== '') {
          this.$modal.show('RemainEndModal', { type: 'read' });
        }
      }
    },
    openDeliveryRequest(modalTp) {
      this.selectProductRows = this.$refs.BookingGrid.sendCheckedData();
      //예탁배송요청 / 배송요청
      this.deliveryRows = this.selectProductRows;
      if (this.bookingData.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else {
        if (this.deliveryRows.length > 0) {
          this.checkDeliveryData(modalTp);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        }
      }
    },
    clear() {
      //초기화
      this.bookingData = [];
      this.prdtClsCd = '';
      this.statusCd = [];
      this.staffCd = [];
    },
    setSelect(cd, type) {
      if (type === 'status') {
        this.status = cd;
        if (this.statusOptions.length === this.status.length) {
          this.status = [];
        }
      } else if (type === 'staff') {
        this.staff = cd;
        if (this.staffOptions.length === this.staff.length) {
          this.staff = [];
        }
      }
    },
    setCd(bokngStatCd = '') {
      if (this.group) {
        this.prdtClsCd = this.group.value;
      }
      this.status.forEach(item => {
        this.statusCd.push(item.value);
      });
      this.staff.forEach(item => {
        this.staffCd.push(item.value);
      });
      if (this.staff.length === 0) {
        this.$refs.staffOptions?.select({ value: '', checked: true });
      }
      if (bokngStatCd !== '') {
        this.statusCd.push(this.statusOptions.find(option => option.value === bokngStatCd)?.value);
      }
    },
    async search() {
      if (this.authButton.schAuth === 'Y') {
        this.clear();
        this.$refs.filter.blur();
        this.$refs.BookingGrid.clearCheckCount();
        this.setCd();

        this.custNm ? this.custId : (this.custId = this.userInfo.custId);
        this.getBookingList();
      }
    },
    okOrNo(result, type) {
      if (result) {
        if (type === 'reset') {
          this.$refs.BookingGrid.resetLayout();
        } else {
          this.$refs.BookingGrid.saveLayout();
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
    fixGrid(type) {
      const rows = this.$refs.BookingGrid.sendJsonRows();
      const isChooseCell = this.$refs.BookingGrid.isChooseCell();
      if (this.bookingData.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (!isChooseCell) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
      } else {
        if (rows.length > 0) {
          this.$refs.BookingGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        }
      }
    },
    changeUnit(type) {
      this.$refs.BookingGrid.layoutState(type.value);
    },
    async openAddressInfo() {
      // await loadLanguageAsync('/modal/addressInfoList', this.menuId);
      this.$modal.show(`AddressInfoModal${this.page}`);
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
    datePicker() {
      this.oldDate = this.time;
      this.$modal.show('DateRangePicker');
    },
    showSelectDate(selectDate) {
      this.time = selectDate;
      this.oldDate = selectDate;
      this.sttDt = this.time[0];
      this.endDt = this.time[1];
      this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
    },
    setDefaultDates(time) {
      if (time) {
        this.time = time;
        this.sttDt = this.time[0];
        this.endDt = this.time[1];
        this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      }
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'BOOKING_STATUS') {
          this.statusOptions = response.data.ds;
          this.statusOptions.unshift({ text: this.$t('message.all'), value: '00' });
          if (this.openInfo.etcData !== '') {
            let bokngStatCd = this.openInfo.etcData.bokngStatCd;
            this.setCd(bokngStatCd);
            // this.search();
          } else {
            // this.search();
          }
        } else if (groupCd === 'PRDT_CLS_CD') {
          this.groupOptions = [];
          this.groupOptions = response.data.ds;
          // if (this.userMenuGrpCd === 'CUSTOMER') {
          //   const isMDF = this.userInfo.prdtCdList.filter(v => v === defs.prdtClsCd.MDF) ? true : false;
          //   const isMFB = this.userInfo.prdtCdList.filter(v => v === defs.prdtClsCd.MFB) ? true : false;

          //   if (isMDF && !isMFB) {
          //     this.groupOptions = this.groupOptions.filter(v => v.value === defs.prdtClsCd.MDF);
          //   } else if (!isMDF && isMFB) {
          //     this.groupOptions = this.groupOptions.filter(v => v.value === defs.prdtClsCd.MFB);
          //   } else {
          //     let allGroup = { text: this.$t('message.all'), value: '' };
          //     this.groupOptions.unshift(allGroup);
          //   }
          // } else {
          this.groupOptions.unshift({ text: this.$t('message.all'), value: '' });
          // }

          if (this.group.length === 0) {
            this.group = this.groupOptions[0];
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
    async getStaffCombo() {
      try {
        const resp = await commonApi.getStaffCombo();
        this.staffOptions = resp.data.ds;
        this.staffOptions.unshift({ text: this.$t('message.all'), value: '00' });
        this.setCd();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async openExcelUpload() {
      await loadLanguageAsync('/modal/bookingExcelUpload', this.menuId);
      this.$modal.show('BookingExcelUploadModal');
    },
    async getBookingList() {
      try {
        this.userMenuGrpCd === 'CUSTOMER' ? (this.custId = this.userInfo.custId) : this.custId;
        const param = {
          custId: this.custId === 0 ? '' : this.custId,
          prdtClsCd: this.prdtClsCd,
          bokngStatCd: this.statusCd.length === 0 ? '' : this.statusCd,
          filter: this.filter,
          sttDt: this.sttDt,
          endDt: this.endDt,
          plant: '',
          prdcReqYn: '',
          sttCfmDt: '',
          endCfmDt: '',
          soYn: '',
          pageNumber: '',
          pageSize: '',
          salesUsers: this.staffCd.length === 0 ? '' : this.staffCd,
        };
        const response = await bookingApi.getBookingList(param);
        const paramData = response.data.ds;

        paramData.forEach(list => {
          if (list.asgnProgDays !== null) {
            list.asgnProgDays = this.$t('message.requestDates') + ' + ' + list.asgnProgDays;
          }

          let bookingList = list;
          let customerList = bookingList.customerInfo;
          let productList = bookingList.productInfo;
          // delete bookingList[('customerInfo', 'productInfo')];
          delete bookingList['customerInfo'];
          delete bookingList['productInfo'];
          let totalList = { ...bookingList, ...customerList, ...productList };

          this.bookingData.push(totalList);
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
    validation(type) {
      const result = { validation: true, ment: '' };
      if (type === 'apprDoc') {
        //결재문서번호
        this.selectProductRows.forEach(row => {
          // row.apprStatCd !== defs.apprStatCd.need 결재 필요일때만 결재번호 입력 가능
          if (!row.apprStatCd || row.apprStatCd === '') {
            // 결재필요 상태가 없으면 결재번호 입력 불가
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoPaymentItem');
          } else if (this.selectProductRows[0].custId !== row.custId) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgCheckCustId');
          }
        });
        return result;
      } else if (type === 'quotePrint') {
        //부킹견적출력
        this.checkData();
        result.validation = true;
        this.selectProductRows.forEach(row => {
          if (!this.isOffrId || !this.isOffrNum) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgSameOffer');
          } else if (row.bokngStatCd !== defs.bokngStatCd.bokngConfirm) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoBookingConfirmItem');
          } else if (row.bokngStatCd === defs.bokngStatCd.cancel) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoPrintCancelItem');
          }
        });
        return result;
      } else if (type === 'delete') {
        //삭제
        this.selectProductRows.forEach(row => {
          if (row.bokngStatCd !== defs.bokngStatCd.payNeed && row.bokngStatCd !== defs.bokngStatCd.confirmNeed) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgCheckStatus');
          }
          // else if (row.apprStatCd) {
          //   result.validation = false;
          //   this.$EventBus.$emit('openYesModal', 'message.msgConfirmApprStatus');
          // }
        });
        return result;
      } else if (type === 'cancel') {
        //취소
        this.selectProductRows.forEach(row => {
          if (row.bokngStatCd !== defs.bokngStatCd.bokngConfirm && row.bokngStatCd !== defs.bokngStatCd.request) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoStatusConfirmRequest2');
          } else if (row.trnPsbBaseQty !== 0 && row.trnPsbOrdQty !== 0) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmDeliveryQuantity');
          }
        });
        return result;
      } else if (type === 'debitPrint') {
        //DEBITNOTE 출력
        this.checkData();
        result.validation = true;
        this.selectProductRows.forEach((row, index) => {
          if (index === 0) result.custId = row.custId;
          if (result.custId !== row.custId) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgCheckCustId');
            // } else if (!this.isOffrId) {
            //   result.validation = false;
            //   this.$EventBus.$emit('openYesModal', 'message.msgSameOffer');
          } else if (row.offrClsCd == 'SMPL') {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.errorsSampleDebit');
          } else if (row.trnPsbBaseQty <= 0 && row.trnPsbBaseQty <= 0) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgCannotDeliver');
          }
        });

        return result;
      } else if (type === 'change') {
        //예탁전환
        const row = this.checkList;
        if (row.offrClsCd !== defs.offrClsCd.order) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgValidOffrOrder');
        } else if (row.bokngClsCd === defs.bokngClsCd.deposit) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgConfirmExptStatCd');
          // } else if (row.bokngStatCd !== defs.bokngStatCd.assiIng || row.bokngStatCd !== defs.bokngStatCd.assiEnd) {
          //   result.validation = false;
          //   this.$EventBus.$emit('openYesModal', 'message.msgConfirmBokngStatCd');
        } else if (row.trnPsbBaseQty <= 0 && row.trnPsbOrdQty <= 0) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgConfirmTrnPsbQty');
        }
        return result;
      } else if (type === 'request') {
        //예탁배송요청
        this.checkData();
        this.selectProductRows.forEach(row => {
          if (row.trnPsbBaseQty <= 0 || row.trnPsbOrdQty <= 0) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmPossibleDelivery');
          } else if (!row.exptStatCd) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgCheckCategoryQuantity');
          } else if (row.exptStatCd === defs.exptStatCd.request) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgAlreadyDepositoryRequest');
          } else if (row.exptStatCd === defs.exptStatCd.confirm) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgAlreadyDepositoryCompletion');
          }
        });
        return result;
      } else if (type === 'delivery') {
        //배송요청
        this.selectProductRows.forEach(row => {
          if (row.offrClsCd === defs.offrClsCd.order && row.exptStatCd) {
            if (row.exptStatCd !== defs.exptStatCd.confirm) {
              this.$EventBus.$emit('openYesModal', 'message.msgConfirmExptStatCd');
              result.validation = false;
            } else if (row.trnPsbBaseQty <= 0 && row.trnPsbOrdQty <= 0) {
              result.validation = false;
              this.$EventBus.$emit('openYesModal', 'message.msgConfirmPossibleDelivery');
            }
          } else if (row.trnPsbBaseQty <= 0 && row.trnPsbOrdQty <= 0) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmPossibleDelivery');
          } else if (this.selectProductRows[0].offrClsCd !== row.offrClsCd) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmSameCategory');
          }
        });
        return result;
      } else if (type === 'save') {
        //저장
        this.selectProductRows.forEach(row => {
          if (row.bokngStatCd !== defs.bokngStatCd.payNeed && row.bokngStatCd !== defs.bokngStatCd.confirmNeed) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoConfirmNeed');
          }
        });
        return result;
      } else if (type === 'apprReq') {
        //결재상신
        this.checkData();
        this.selectProductRows.forEach(row => {
          if (!this.isOffrId || !this.isOffrNum) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgSameOffer');
          } else if (row.apprStatCd === defs.apprStatCd.report) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgAlreadyPayment');
          } else if (row.bokngStatCd !== defs.bokngStatCd.payNeed) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoPaymentItem');
          } else if (row.apprStatCd === defs.apprStatCd.report || row.apprStatCd === defs.apprStatCd.end) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgExceptUnnecessary');
          }
        });
        return result;
      } else if (type === 'confirm') {
        //부킹확정
        this.checkData();
        this.selectProductRows.forEach(row => {
          if (row.bokngStatCd === defs.bokngStatCd.bokngConfirm) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgAlreadyBookingConfirm');
          }
          // else if (!this.isOffrId || !this.isOffrNum) {
          //   result.validation = false;
          //   this.$EventBus.$emit('openYesModal', 'message.msgSameOfferItem');
          // }
          else if (row.bokngStatCd !== defs.bokngStatCd.confirmNeed) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoConfirmNeed');
          } else if (row.apprStatCd !== null && row.apprStatCd !== '' && row.apprStatCd !== defs.apprStatCd.end) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoPaymentBookingConfirm');
          }
        });
        return result;
      } else if (type === 'assign') {
        //재고할당요청
        this.selectProductRows.forEach(row => {
          if (row.bokngStatCd === defs.bokngStatCd.request) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgAlreadyAllocationRequest');
          } else if (row.bokngStatCd !== defs.bokngStatCd.bokngConfirm) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoBookingConfirm');
            // } else if (row.offrClsCd === defs.offrClsCd.sample) {
            //   if (!row.erpOrdNum || row.erpOrdNum === '') {
            //     result.validation = false;
            //     this.$EventBus.$emit('openYesModal', 'message.msgNoSoNum2');
            //   }
          }
        });
        return result;
      } else if (type === 'bookingEnd') {
        //잔량종료
        this.selectProductRows.forEach(row => {
          if (row.bokngStatCd !== defs.bokngStatCd.assiEnd) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoEndItem');
          } else if ((row.trnIngBaseQty !== 0 && row.trnIngOrdQty !== 0) || (row.trnPsbBaseQty > 0 && row.trnPsbOrdQty > 0) || (row.trnReqBaseQty > 0 && row.trnReqOrdQty > 0)) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmRemainAmount');
          }
        });
        return result;
      }
    },
    async selectOneRow(type) {
      this.selectProductRows = this.$refs.BookingGrid.sendCheckedData();
      const selectList = this.selectProductRows;
      this.checkList = selectList[0];

      if (this.bookingData.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (selectList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
      } else if (selectList.length === 1) {
        if (type === 'change') {
          //예탁전환
          this.result = this.validation('change');
          if (this.result.validation) {
            await loadLanguageAsync('/modal/depositoryChange', this.menuId);
            this.$modal.show('DepositoryChangeModal');
          }
        }
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgSelectOnlyOne');
      }
    },
    async selectRows(type) {
      this.selectProductRows = this.$refs.BookingGrid.sendCheckedData();
      if (this.bookingData.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (this.selectProductRows.length > 0) {
        if (type === 'apprDoc') {
          //결재문서번호
          this.result = this.validation('apprDoc');
          if (this.result.validation) {
            this.apprRowInfo = this.selectProductRows;
            this.$modal.show('PriceDraftDocumentModal');
          }
        } else if (type === 'quotePrint') {
          //부킹견적출력
          this.result = this.validation('quotePrint');
          if (this.result.validation) {
            await loadLanguageAsync('/modal/reportLangSelect', this.menuId);
            this.$modal.show('ReportLangSelectModal', { signShow: false, type: 'quote' });
          }
        } else if (type === 'delete') {
          //삭제
          this.result = this.validation('delete');
          if (this.result.validation) {
            const paramData = [];
            this.selectProductRows.forEach(list => {
              paramData.push({
                id: list.id,
                offrId: list.offrId,
                offrNum: list.offrNum,
                offrDtlsId: list.offrDtlsId,
              });
            });
            const param = JSON.parse(JSON.stringify(paramData));
            try {
              // const response =
              await bookingApi.saveBookingRemove(param);
              this.ment = '';

              // if (response.data.message) {
              //   this.ment = response.data.message;
              //   await this.search();
              //   this.$EventBus.$emit('openYesModal', this.ment);
              // } else {
              //response.data.rs
              await this.search();
              this.$EventBus.$emit('openYesModal', 'message.msgSelectDelete');
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
        } else if (type === 'cancel') {
          //취소
          this.result = this.validation('cancel');
          if (this.result.validation) {
            const paramData = [];
            this.selectProductRows.forEach(list => {
              paramData.push({
                id: list.id,
                offrId: list.offrId,
                offrNum: list.offrNum,
                bokngStatCd: list.bokngStatCd,
                offrDtlsId: list.offrDtlsId,
              });
            });
            const param = JSON.parse(JSON.stringify(paramData));
            try {
              const response = await bookingApi.saveBookingCancel(param);
              this.ment = '';
              if (response.data.rs) {
                await this.search();
                this.$EventBus.$emit('openYesModal', 'message.msgChangeBookingUpload');
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
        } else if (type === 'debitPrint') {
          //DEBITNOTE 출력
          this.result = this.validation('debitPrint');
          if (this.result.validation) {
            await loadLanguageAsync('/modal/reportLangSelect', this.menuId);
            this.$modal.show('ReportLangSelectModal', { signShow: false, type: 'debit' });
          }
        } else if (type === 'save') {
          //저장
          this.result = this.validation('save');
          if (this.result.validation) {
            try {
              const param = [];
              this.selectProductRows.forEach(row => {
                param.push({
                  id: row.id,
                  offrDtlsId: row.offrDtlsId,
                  offrNum: row.offrNum,
                  bokngStatCd: row.bokngStatCd,
                  bokngBaseQty: row.bokngBaseQty,
                  bokngOrdQty: row.bokngOrdQty,
                  bokngQtyAmt: row.bokngQtyAmt,
                  bokngTrnAddAmt: row.bokngTrnAddAmt,
                });
              });
              await bookingApi.saveBookingPrice(param);

              await this.search();
              this.$EventBus.$emit('openYesModal', 'message.msgSaveChange');
            } catch (e) {
              console.log(e);
              if (e && e.err && e.err.data && e.err.data.message) {
                this.$EventBus.$emit('openYesModal', e.err.data.message);
              } else {
                this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
              }
            }
          }
        } else if (type === 'apprReq') {
          //결재상신
          this.result = this.validation('apprReq');
          if (this.result.validation) {
            let apprIds = [];
            this.selectProductRows.forEach(data => {
              apprIds.push(data.apprId);
            });
            try {
              const param = {
                custId: this.custId,
                apprIds: apprIds,
              };
              const response = await bookingApi.saveApprReq(param);
              this.ment = '';
              if (response.data.rs) {
                await this.search();
                this.$EventBus.$emit('openYesModal', 'message.msgSelectApproval');
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
        } else if (type === 'confirm') {
          //부킹확정
          this.checkData();
          this.result = this.validation('confirm');
          if (this.result.validation) {
            const paramData = [];
            this.selectProductRows.forEach(list => {
              paramData.push({
                id: list.id,
                offrId: list.offrId,
                offrNum: list.offrNum,
                offrDtlsId: list.offrDtlsId,
                apprId: list.apprId,
                bokngNum: list.bokngNum,
                custId: list.custId,
              });
            });
            const param = JSON.parse(JSON.stringify(paramData));
            try {
              const response = await bookingApi.saveBookingConfirm(param);
              this.ment = '';
              if (response.data.rs) {
                await this.search();
                this.$EventBus.$emit('openYesModal', 'message.msgSelectBookingConfirm');
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
        } else if (type === 'assign') {
          //재고할당요청
          this.result = this.validation('assign');
          if (this.result.validation) {
            const paramData = [];
            this.selectProductRows.forEach(list => {
              paramData.push({
                id: list.id,
                offrId: list.offrId,
                offrNum: list.offrNum,
              });
            });
            const param = JSON.parse(JSON.stringify(paramData));
            try {
              const response = await bookingApi.saveBookingAssign(param);
              this.ment = '';
              if (response.data.rs) {
                await this.search();
                this.$EventBus.$emit('openYesModal', 'message.msgSelectAllocationRequest');
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
        } else if (type === 'bookingEnd') {
          //잔량종료
          this.result = this.validation('bookingEnd');
          if (this.result.validation) {
            this.remarkData = [];
            this.remarkData = this.selectProductRows;
            this.$modal.show('RemainEndModal', { type: 'write' });
          }
        }
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
      }
    },
    async getUserOfferInfo() {
      try {
        const param = this.userMenuGrpCd === 'CUSTOMER' ? { custId: this.userInfo.custId } : { custId: this.custId };
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
    async excelDownload() {
      if (this.bookingData.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else {
        const excelData = {
          fileNm: 'Booking-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
        };
        this.$refs.BookingGrid.excelExport(excelData);
      }
    },
    async printReport(data) {
      if (data.result) {
        try {
          const bokngIdList = [];
          const offrIdList = [];
          this.selectProductRows.forEach(list => {
            bokngIdList.push(list.id);
            offrIdList.push(list.offrId);
          });
          const paramData = {
            // custId: this.result.custId,
            bokngIdList,
            langList: data.langList,
            signYn: data.signYn,
          };
          let response = '';
          if (data.type === 'quote') {
            paramData['offrIdList'] = offrIdList;
            response = await bookingApi.getBookingOffrPrint(paramData);
          } else if (data.type === 'debit') {
            paramData['custId'] = this.result.custId;
            response = await bookingApi.getDebitNote(paramData);
          }
          this.reportPrint(response.data.ds, data.type);
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
    async reset() {
      this.default = '';
      this.filter = '';
      this.group = this.groupOptions[0];
      this.$refs.statusOptions.select({ value: 'reset' });
      await this.$refs.staffOptions?.select({ value: 'reset' });
      await this.$refs.rangeDate.init();
      this.userMenuGrpCd === 'CUSTOMER' ? (this.custId = this.userInfo.custId) : '';
      this.custNm = '';
      // this.$refs.staffOptions.select({ value: 'reset' });
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.BookingGrid.setFilter(this.filterOn);
    },
    searchReady() {
      if (this.statusOptions.length > 0 && this.groupOptions.length > 0 && this.staffOptions.length > 0 && this.userMenuGrpCd !== 'CUSTOMER') {
        this.search();
        clearInterval(this.intervalId);
        this.intervalId = '';
      } else if (this.statusOptions.length > 0 && this.groupOptions.length > 0 && this.userMenuGrpCd === 'CUSTOMER') {
        this.search();
        clearInterval(this.intervalId);
        this.intervalId = '';
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
  },
  created() {
    this.setDefaultDates();
    if (this.userMenuGrpCd !== 'CUSTOMER') {
      this.getStaffCombo();
    }
    this.getCommonCodeCombo('BOOKING_STATUS');
    this.getCommonCodeCombo('PRDT_CLS_CD');
    this.getRouterLanguage();
  },
  mounted() {
    this.selectValue = this.selectOptions[0];
    this.changeUnit(this.selectValue);
    this.setFilter();
    this.intervalId = setInterval(this.searchReady, 100);
    this.default = this.openInfo.etcData.bokngStatCd ?? '';
  },
};
</script>

<style></style>
