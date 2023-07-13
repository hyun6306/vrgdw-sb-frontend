<template>
  <div>
    <OrderInfoInput :menuId="menuId" :authButton="authButton" :custId="custId" ref="OrderInfoInput" @sendCustId="sendCustId" @searchOpenChange="searchOpenChange" @sendPrdtCdListAndCredit="sendPrdtCdListAndCredit" :page="page" :modifyLogits="modifyLogits" />
    <!-- 리얼그리드 -->
    <div :class="[searchOpen ? 'realgrid_container padding-on' : 'realgrid_container']">
      <div class="real_head">
        <div class="real_head_left">
          <span class="real_title">{{ $t('message.prdtList') }}</span>
          <small
            >{{ $t('message.totalSelection1') }} <i>{{ totalRowCount }}</i> {{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_process" @click="openConfirmModal()">
            {{ $t('message.btnInit') }}
          </button>
          <button class="btn_default btn_critical_process" @click="openPopup('ProductSearchModal', 'addPrdt')">
            {{ $t('message.btnAddPrdt') }}
          </button>
          <!-- <button class="btn_default btn_deep_green" v-if="this.authButton.fn1Auth == 'Y'" @click="openPopup('ProductSearchModal', 'addFavorite')">
            {{ $t('message.btnFavorite') }}
          </button> -->
        </div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left">
          <span class="real_top_filter_title"
            >{{ $t('message.applyMonth') }} <i>({{ checkedCount }})</i></span
          >
          <!-- 데이터피커 -->
          <div class="form_calendar" @click="openSingleCalendar(allHopeMonth, 'allHopeMonth')">
            <input type="text" placeholder="" v-model="allHopeMonth" style="text-align: center" />
            <button class="icon_calendar">
              <img src="@/assets/img/icon_calendar.png" />
            </button>
          </div>
        </div>
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
          <!-- <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_filter.png" />
            <span>{{ $t('message.btnFilter') }}</span>
          </button> -->
          <button class="btn_default btn_filter" @click="deleteRows()" v-if="authButton.delAuth === 'Y'">
            <img src="@/assets/img/icon_trace.png" />
            <span>
              {{ $t('message.btnSelectionDelete') }}
              <i> ({{ checkedCount }}) </i>
            </span>
          </button>
        </div>
      </div>
      <div class="real_body real_body03" v-if="page === 'order'">
        <!-- 합계 금액 있을 때는 real_body03 지워야함.-->
        <OrderGeneralGrid ref="OrderGrid" style="height: 100%" @openSingleCalendar="openSingleCalendar" :selectMonth="selectMonth" :allHopeMonth="allHopeMonth" :selectProductRows="selectProductRows" @sendRowCount="sendRowCount" @sendCheckedCount="sendCheckedCount" @changeTotalPrice="changeTotalPrice" :gridLang="gridLang" @gridSendModal="gridSendModal" @searchProduct="searchProduct" />
      </div>
      <div class="real_body real_body03" v-else-if="page === 'sample'">
        <SampleOrderGrid ref="OrderGrid" style="height: 100%" @openSingleCalendar="openSingleCalendar" :selectMonth="selectMonth" :allHopeMonth="allHopeMonth" :selectProductRows="selectProductRows" @sendRowCount="sendRowCount" @sendCheckedCount="sendCheckedCount" @searchProduct="searchProduct" @gridSendModal="gridSendModal" :gridLang="gridLang" />
      </div>
      <!-- <div class="real_total" v-if="page !== 'sample'">
        <p>
          <span>{{ $t('message.priceTotal') }} :</span>
          <i>{{ totalPrice }}</i>
        </p>
      </div> -->
      <div class="real_footer">
        <div class="footer_left">
          <!-- <button class="btn_default btn_white" @click="openConfirmModal()">
            {{ $t('message.btnInit') }}
          </button> -->
          <button class="btn_default btn_function" @click="openPopup('ExcelUploadModal')" v-if="this.authButton.exlAuth == 'Y'">
            {{ $t('message.btnExcelUpload') }}
          </button>
          <button class="btn_default btn_function" @click="excelDownload()" v-if="this.authButton.exlAuth == 'Y'">
            {{ $t('message.btnExcelTemplate') }}
          </button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_critical_process" @click="saveBefore('temp')" v-if="!isReqQuotation && authButton.savAuth === 'Y'">
            {{ $t('message.btnTemporarySave') }}
          </button>
          <button class="btn_default btn_critical_process" @click="saveBefore('req')">
            <div v-if="this.page === 'order' && this.authButton.savAuth == 'Y'">
              {{ $t('message.btnRequestQuote') }}
            </div>
            <div v-if="this.page === 'sample' && this.authButton.savAuth == 'Y'">
              {{ $t('message.btnRequestSample') }}
            </div>
          </button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <ProductSearchModal :gridYn="gridYn" :prdtCdList="prdtCdList" :addPrdtType="addPrdtType" @resetAddrPrdt="resetAddrPrdt" :userMenuGrpCd="userMenuGrpCd" :userCustId="custId" @sendSelectProducts="sendSelectProducts" :page="page" :menuId="menuId" :searchData="changePrdtCd" @openYesModal="openYesModal" :savePage="savePage" @gridSendModal="gridSendModal" />
    <ExcelUploadModal @downloadExcel="excelDownload()" :userCustId="custId" />
    <DatePickerModal @chooseDate="chooseDate" @chooseAllDate="chooseAllDate" :currentMonth="currentMonth" :isDefault="false" :afterDate="afterDate" />
    <OrderAlarmYesModal :ment="ment" />
    <OrderAlarmModal :ment="ment" :whatIs="whatIs" @okOrNo="okOrNo" />
  </div>
</template>

<script>
import { loadLanguageAsync } from '@/plugins/i18n';
import OrderInfoInput from '@/components/order/OrderInfoInput';
import ProductSearchModal from '@/modal/order/ProductSearchModal';
import fileApi from '@/api/file';
import fileDownload from '@/mixins/fileDownload';
import ExcelUploadModal from '@/modal/order/ExcelUploadModal';
import OrderGeneralGrid from '@/components/gridView/order/OrderGeneralGrid';
import SampleOrderGrid from '@/components/gridView/order/SampleOrderGrid';
import DatePickerModal from '@/modal/DatePickerModal';
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order';
import defs from '@/consts/defs';
import OrderAlarmYesModal from '@/modal/order/AlarmYesModal';
import OrderAlarmModal from '@/modal/order/AlarmModal';
import languageApi from '@/api/language';
import productApi from '@/api/order/product';

export default {
  components: {
    OrderInfoInput,
    ProductSearchModal,
    ExcelUploadModal,
    OrderGeneralGrid,
    DatePickerModal,
    OrderAlarmYesModal,
    SampleOrderGrid,
    OrderAlarmModal,
  },
  data() {
    return {
      filterOn: true,
      searchOpen: true,
      addPrdtType: '',
      selectMonth: '',
      currentMonth: '',
      allHopeMonth: '',
      totalPrice: '0',
      productRows: [],
      userInfo: {},
      isFixColumn: false,
      isFixRow: false,
      checkedCount: 0,
      selectProductRows: [],
      totalRowCount: 0,
      ment: '',
      result: '',
      // custId: '',
      // userCustId: '',
      selectId: 0,
      gridLang: [],
      changePrdtCd: {},
      whatIs: '',
      removeOffrDtlsIds: [],
      popupResult: false,
      prdtCdList: [],
      credit: {},
      isReqQuotation: false,
      modifyLogits: {},
      afterDate: '',
      gridYn: 'N',
    };
  },
  props: {
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
    openInfo: {
      type: Object,
    },
    routerPath: {
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
      userLocale: 'userInfo/getUserLocale',
    }),
    custId() {
      if (this.userCustId > 0) {
        if (this.selectId > 0) {
          return this.selectId;
        } else {
          return this.userCustId;
        }
      } else if (this.userCustId === 0 && this.selectId > 0) {
        return this.selectId;
      } else {
        return -1;
      }
    },
  },
  watch: {
    openInfo() {
      this.$refs.OrderGrid.gridCommit();
      const rows = this.$refs.OrderGrid.sendJsonRows();
      if (rows.length > 0) {
        this.ment = 'message.msgClearProduct';
        this.whatIs = 'clearProductOpenInfo';
        this.openPopup('OrderAlarmModal');
      } else {
        // this.$refs.OrderInfoInput.getUserOfferInfo();
        if (this.openInfo.id) {
          this.getOfferDetail(this.openInfo.id);
          this.selectId = this.openInfo.custId * 1;
        } else {
          this.modifyLogits = {};

          if (this.userCustId === 0) {
            this.selectId = this.userCustId;
            this.$refs.OrderInfoInput.resetInfoSales();
          } else {
            this.$refs.OrderInfoInput.getUserOfferInfo();
          }
          this.$refs.OrderInfoInput.resetInfo();
        }
      }
    },
  },
  methods: {
    gridCommit() {
      this.$refs.OrderGrid.gridCommit();
    },
    getTotalRowCount() {
      return this.totalRowCount;
    },
    deleteRows() {
      if (this.totalRowCount === 0) {
        this.ment = 'message.msgNoProduct';
        this.openPopup('OrderAlarmYesModal');
      } else if (this.checkedCount == 0) {
        this.ment = 'message.msgNoItem';
        this.openPopup('OrderAlarmYesModal');
      } else {
        this.$refs.OrderGrid.deleteRows();
        if (this.totalRowCount == 0) {
          this.allHopeMonth = '';
        }
      }
    },
    sendCheckedCount(checkedCount) {
      this.checkedCount = checkedCount;
    },
    fixGrid(type) {
      const rows = this.$refs.OrderGrid.sendJsonRows();
      if (rows.length > 0) {
        this.$refs.OrderGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
        if (type === 'column') {
          this.isFixColumn = !this.isFixColumn;
        } else if (type === 'row') {
          this.isFixRow = !this.isFixRow;
        }
      } else {
        this.ment = 'message.msgNoProduct';
        this.openPopup('OrderAlarmYesModal');
      }
    },
    changeTotalPrice(totalPrice) {
      this.totalPrice = totalPrice.toLocaleString('en-US');
    },
    chooseDate(month) {
      this.selectMonth = new String(month);
    },
    chooseAllDate(month) {
      const check = this.$refs.OrderGrid.isCheckedItem();
      if (check.isHopeMonthExist) {
        this.ment = 'message.msgExistHopeMonth';
        this.whatIs = `changeAllMonth/${month}`;
        this.openPopup('OrderAlarmModal');
      } else {
        this.allHopeMonth = month;
      }
    },
    openSingleCalendar(currentDate, type = '') {
      this.currentMonth = new String(currentDate);
      if (type === 'allHopeMonth') {
        const check = this.$refs.OrderGrid.isCheckedItem();
        if (this.totalRowCount === 0) {
          this.ment = 'message.msgNoProduct';
          this.openPopup('OrderAlarmYesModal');
        } else if (check.isCheckedItem) {
          this.$modal.show('DatePicker', { type: type, currentDate, page: 'order' });
        } else {
          this.ment = 'message.msgNoItem';
          this.openPopup('OrderAlarmYesModal');
        }
      } else {
        this.$modal.show('DatePicker', { type: type, currentDate, page: 'order' });
      }
    },
    async openPopup(modalNm, type, data = {}) {
      let url = '';
      if (this.custId <= 0) {
        this.ment = 'message.msgNoCustId';
        modalNm = 'OrderAlarmYesModal';
      } else if (modalNm === 'ProductSearchModal') {
        this.$refs.OrderGrid.gridCommit();
        url = '/modal/product/add';
        this.addPrdtType = type;
        this.changePrdtCd = data;
      } else if (modalNm === 'ExcelUploadModal') {
        // if (this.credit.block !== '') {
        //   this.$EventBus.$emit('openYesModal', 'message.msgCreditBlock');
        //   return;
        // }
        url = '/modal/excelUpload';
      }

      if (url !== '') {
        try {
          await loadLanguageAsync(url, this.menuId);
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
    resetAddrPrdt() {
      this.addPrdtType = '';
      this.changePrdtCd = {};
    },
    async excelDownload() {
      const fileNm = 'Offer-Upload.xlsx';
      const savePath = '/upload/templete/Offer-Upload.xlsx';
      const response = await fileApi.download(savePath, fileNm);
      fileDownload.downloadFile(response, fileNm);
    },
    async upload(file) {
      const formData = new FormData();
      //   formData.append('file', this.setFile);
      formData.append('custId', this.custId);
      formData.append('file', file);
      const resp = await fileApi.upload(formData);
      resp;
    },
    saveBefore(type) {
      this.$refs.OrderGrid.gridCommit();
      this.userInfo = this.$refs.OrderInfoInput.sendOrderInfo();
      this.productRows = this.$refs.OrderGrid.sendJsonRows();
      this.removeOffrDtlsIds = this.$refs.OrderGrid.sendRemoveOffrDtlsIds();
      delete this.userInfo.logits['updatedAt'];

      if (this.page == 'order') {
        this.result = this.validation();
      } else if (this.page == 'sample') {
        this.result = this.validationSample();
      }
      // this.result.validation = false;
      if (this.result.validation) {
        if (this.result.updwn) {
          this.ment = this.result.ment;
          this.whatIs = `saveAfter/${type}`;
          this.openPopup('OrderAlarmModal');
        }
        // else if (this.result.mfb) {
        //   this.ment = this.result.ment;
        //   this.whatIs = `saveAfter/${type}`;
        //   this.openPopup('OrderAlarmModal');
        // }
        else {
          this.saveAfter(type);
        }
      } else {
        this.ment = this.result.ment;
        this.openPopup('OrderAlarmYesModal');
      }
    },
    async saveAfter(type) {
      try {
        if (!this.userInfo.logits.custId) this.userInfo.logits.custId = this.custId;
        if (this.userInfo.logits.carType.value === 'VRGDW' && this.userInfo.logits.mainLogitsYn === 'Y' && this.authButton.schAuth === 'N') {
          this.userInfo.logits.cityCd = this.userInfo.cityCd;
          this.userInfo.logits.distrCd = this.userInfo.distrCd;
          await orderApi.saveUserLogitsBaseAddr(this.userInfo.logits);
        }
        if (this.userInfo.logits.carType.value === 'MAIL' || this.userInfo.logits.carType.value === 'SALES') this.userInfo.custId = this.custId;
        this.userInfo.trnCarType = this.userInfo.logits.carType.value;
        let logits = {};

        if (this.userInfo.trnCarType === 'CUSTOMER') {
          logits.trnCarNum = this.userInfo.logits.trnCarNum;
          logits.driverPhoneNum = this.userInfo.logits.driverPhoneNum;
          logits.custId = this.userInfo.logits.custId;
        } else {
          logits = this.userInfo.logits;
        }
        delete this.userInfo['logits'];
        delete logits['id'];
        if (this.page == 'order') {
          this.userInfo.offrClsCd = defs.offrClsCd.order;
        } else if (this.page == 'sample') {
          this.userInfo.offrClsCd = defs.offrClsCd.sample;
        }

        let offrStatCd = '';

        if (type === 'temp') {
          offrStatCd = defs.offrStatCd.temp;
        } else if (type === 'req') {
          offrStatCd = defs.offrStatCd.request;
        }

        this.productRows.forEach(row => {
          row.offrDtlsStatCd = offrStatCd;
          if (row.trnPropDt) row.trnPropDt = this.$revertDateFormatD(row.trnPropDt);
          if (!row.trnHopeDt) {
            if (row.trnPropDt) row.trnHopeDt = row.trnPropDt;
          } else {
            if (row.trnHopeDt) row.trnHopeDt = this.$revertDateFormatD(row.trnHopeDt);
          }
          if (row.prdtClsCd === 'MDF') {
            this.userInfo.prdtClsCd = 'ADM0_MDF';
          } else if (row.prdtClsCd === 'MFB') {
            this.userInfo.prdtClsCd = 'AMN0_MFB';
          }
        });

        this.userInfo.offrStatCd = offrStatCd;
        if (this.page == 'order') {
          this.userInfo.paymentCond = this.credit?.apprCond;
        }
        const param = {
          ...logits,
          ...this.userInfo,
        };
        param['offerDtlsDtoList'] = this.productRows;
        if (Object.keys(this.modifyLogits).length > 0) {
          param['id'] = this.modifyLogits.id;
        }
        param['removeOffrDtlsIds'] = this.removeOffrDtlsIds;
        const resp = await orderApi.saveOffer(param);

        if (type === 'req') {
          this.clearProductList();
          this.ment = 'message.msgPassRequest';
          this.resetModifyLogits();
        } else if (type === 'temp') {
          this.getOfferDetail(resp.data.rs.id);
          this.ment = 'message.msgPassTempRequest';
        }
        this.isReqQuotation = false;
        this.openPopup('OrderAlarmYesModal');
        this.$refs.OrderGrid.resetRemoveOffrDtlsIds();
        this.allHopeMonth = '';
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    sendSelectProducts(products) {
      if (products.prdtClsCd) {
        products.selectProductRows[0].searchGrid = true;
        products.selectProductRows[0].dataRow = products.dataRow;
        this.selectProductRows = products.selectProductRows;
      } else {
        this.selectProductRows = products.selectProductRows;
      }
      this.afterDate = this.$revertDateFormatD(products.selectProductRows[0].trnExptDt);
    },
    sendRowCount(count) {
      this.totalRowCount = count;
    },
    openConfirmModal() {
      const rows = this.$refs.OrderGrid.sendJsonRows();
      if (rows.length > 0) {
        this.ment = 'message.msgClearProduct';
        this.whatIs = 'clearProductList';
        this.openPopup('OrderAlarmModal');
      } else {
        this.ment = 'message.msgNoProduct';
        this.openPopup('OrderAlarmYesModal');
      }
      this.allHopeMonth = '';
    },
    clearProductList() {
      this.$refs.OrderGrid.clearProductList();
    },
    validation() {
      const result = { validation: true, ment: '', updwn: false, mfb: false };
      if (this.custId <= 0) {
        result.validation = false;
        result.ment = 'message.msgNoCustId';
        return result;
      }
      // if (this.credit.block !== '') {
      //   result.validation = false;
      //   result.ment = 'message.msgCreditBlock';
      //   return result;
      // }
      if (this.productRows.length === 0) {
        result.validation = false;
        result.ment = 'message.msgNoProduct';
        return result;
      }
      this.productRows.forEach(row => {
        if (row.priceStat.applyPrice === 0) {
          result.validation = false;
          result.ment = 'message.msgProductNoPrice';
        } else if (row.priceStat.disbleYn === 'Y') {
          result.validation = false;
          result.ment = 'message.msgUnsellableProduct';
        } else if (row.reqBaseQty === 0) {
          result.validation = false;
          result.ment = 'message.msgRequireRowPrice';
        } else if (!row.trnHopeDt || row.trnHopeDt === '') {
          result.validation = false;
          result.ment = 'message.msgNoTrnHopeDt';
          // } else if (row.priceStat.updwn !== 'N/A') {
          //   result.updwn = true;
          //   result.ment = 'message.msgChangeStandard';
        } else if (row.prdtClsCd === 'MFB') {
          result.mfb = true;
          result.ment = 'message.msgCheckPattern';
        }
      });

      if (!result.validation) {
        return result;
      }

      const logits = this.userInfo.logits;
      if (!logits.carType.value) {
        result.validation = false;
        result.ment = 'message.msgNoCarType';
        return result;
      } else if (logits.carType.value === 'CUSTOMER') {
        if (!logits.driverPhoneNum || logits.driverPhoneNum === '' || !logits.trnCarNum || logits.trnCarNum === '') {
          result.validation = false;
          result.ment = 'message.msgNoCarVrgdwInfo';
          return result;
        }
      } else if (logits.carType.value === 'VRGDW') {
        if (!logits.logitsAlias || logits.logitsAlias === '' || !logits.cityCd || logits.cityCd === '' || !logits.distrCd || logits.distrCd === '' || !logits.addr || logits.addr === '' || !logits.phoneNum1 || logits.phoneNum1 === '--') {
          result.validation = false;
          result.ment = 'message.msgNoCarCustomerInfo';
          return result;
        }
      }
      if (!this.userInfo.custPoNum || this.userInfo.custPoNum === '') {
        result.validation = false;
        result.ment = 'message.msgNoPoNum';
        return result;
      }

      return result;
    },
    validationSample() {
      const result = { validation: true, ment: '' };

      this.productRows.forEach(row => {
        if (row.reqBaseQty === 0) {
          result.validation = false;
          result.ment = 'message.msgRequireRowPrice';
        } else if (row.smplHrsnSize > row.hrsnSpec || row.smplVtclSize > row.vtclSpec) {
          result.validation = false;
          result.ment = 'message.msgOverSize';
        } else if (row.smplTsk > row.tskSpec) {
          result.validation = false;
          result.ment = 'message.msgOverThick';
        } else if (row.smplHrsnSize == 0 || row.smplVtclSize == 0 || row.smplTsk == 0) {
          result.validation = false;
          result.ment = 'message.msgRequireSize';
        } else if (!row.trnHopeDt || row.trnHopeDt === '') {
          result.validation = false;
          result.ment = 'message.msgNoTrnHopeDt';
        }
      });

      if (this.productRows.length === 0) {
        result.validation = false;
        result.ment = 'message.msgNoProduct';
      }
      const logits = this.userInfo.logits;
      if (!logits.carType.value) {
        result.validation = false;
        result.ment = 'message.msgNoCarType';
        return result;
      } else if (logits.carType.value === 'CUSTOMER') {
        if (!logits.driverPhoneNum || logits.driverPhoneNum === '' || !logits.trnCarNum || logits.trnCarNum === '') {
          result.validation = false;
          result.ment = 'message.msgNoCarVrgdwInfo';
          return result;
        }
      } else if (logits.carType.value === 'VRGDW') {
        if (!logits.logitsAlias || logits.logitsAlias === '' || !logits.cityCd || logits.cityCd === '' || !logits.distrCd || logits.distrCd === '' || !logits.addr || logits.addr === '' || !logits.phoneNum1 || logits.phoneNum1 === '--') {
          result.validation = false;
          result.ment = 'message.msgNoCarCustomerInfo';
          return result;
        }
      }
      if (!this.userInfo.custPoNum || this.userInfo.custPoNum === '') {
        result.validation = false;
        result.ment = 'message.msgNoPoNum';
        return result;
      }

      if (!result.validation) {
        return result;
      }
      return result;
    },
    sendCustId(id) {
      this.modifyLogits = {};
      this.selectId = id;
    },
    // custPopup(id) {
    //   if (this.custId !== id) {
    //     //팝업띄운다.
    //     this.ment = 'message.msgChangeCustId';
    //     this.whatIs = 'updateCustId';
    //     this.openPopup('OrderAlarmModal');
    //   }
    // },
    async getOfferDetail(id) {
      try {
        const param = {
          id,
          custId: this.openInfo.custId ? this.openInfo.custId : this.custId,
          pageNumber: '',
          pageSize: '',
        };
        const resp = await orderApi.getOfferDetail(param);
        // resp.data.ds.forEach(list => {
        //   list.id = this.openInfo.id;
        // });
        this.selectProductRows = resp.data.ds;
        this.modifyLogits = resp.data.rs;
        this.modifyLogits.id = id;
        if (this.selectProductRows.length > 0) {
          this.modifyLogits['custReqRemark'] = this.selectProductRows[0].custReqRemark;
          this.modifyLogits['custPoNum'] = this.selectProductRows[0].custPoNum;
        }
        this.isReqQuotation = this.selectProductRows.some(row => row.offrStatCd === defs.offrStatCd.request);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
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
    searchOpenChange(searchOpen) {
      this.searchOpen = searchOpen;
    },
    gridSendModal(ment) {
      this.ment = ment;
      this.openPopup('OrderAlarmYesModal');
    },
    async searchProduct(data) {
      this.gridYn = data.type == 'grid' ? 'Y' : 'N';
      if (data.prdtData.prdtClsCd === 'MDF') {
        data.prdtData.prdtClsCd = 'ADM0_MDF';
      } else if (data.prdtData.prdtClsCd === 'MFB') {
        data.prdtData.prdtClsCd = 'AMN0_MFB';
      }
      if (data.prdtData.dbClick) {
        this.openPopup('ProductSearchModal', 'addPrdt', data.prdtData);
      } else {
        try {
          const param = {
            prdtClsCd: data.prdtData.prdtClsCd, // MDF or MFB
            prdtSpecs: '', //가로세로, 콤마연결
            filter: data.prdtData.prdtCd,
            tskSpecs: '', //두께
            brandCds: '',
            ecoCds: '',
            brdGrades: '',
            custId: this.custId,
            dnstTypes: '',
            pageNumber: '',
            pageSize: '',
          };
          const resp = await productApi.searchProductCode(param);
          const productInfo = resp.data.ds;
          if (productInfo.length === 1) {
            productInfo[0].searchGrid = true;
            productInfo[0].dataRow = data.prdtData.dataRow;
            this.selectProductRows = productInfo;
          } else {
            this.openPopup('ProductSearchModal', 'addPrdt', data.prdtData);
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
    openYesModal(msg) {
      this.ment = msg;
      this.$modal.show('OrderAlarmYesModal');
    },
    okOrNo(result, whatIs) {
      if (result) {
        if (whatIs === 'clearProductList') {
          this.clearProductList();
          // this.resetModifyLogits();
        } else if (whatIs.includes('changeAllMonth')) {
          const month = whatIs.split('/');
          this.allHopeMonth = new String(month[1]);
        } else if (whatIs.includes('saveAfter')) {
          const type = whatIs.split('/');
          this.saveAfter(type[1]);
        } else if (whatIs === 'clearProductOpenInfo') {
          this.clearProductList();
          if (this.openInfo.id) {
            this.getOfferDetail(this.openInfo.id);
            this.selectId = this.openInfo.custId * 1;
          } else {
            this.modifyLogits = {};

            if (this.userCustId === 0) {
              this.selectId = this.userCustId;
              this.$refs.OrderInfoInput.resetInfoSales();
            } else {
              this.$refs.OrderInfoInput.getUserOfferInfo();
            }
            this.$refs.OrderInfoInput.resetInfo();
          }
        }
      }
    },
    sendPrdtCdListAndCredit(data) {
      this.prdtCdList = data.prdtCdList;
      this.credit = data.credit;
    },
    resetModifyLogits() {
      this.modifyLogits = {};
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.OrderGrid.setFilter(this.filterOn);
    },
  },
  created() {
    if (this.openInfo.id && this.openInfo.id !== '') {
      this.selectId = this.openInfo.custId * 1;
      this.getOfferDetail(this.openInfo.id);
    }
    this.getGridMutiLanguage();
  },
  mounted() {
    this.setFilter();
    // this.$refs.OrderInfoInput.getUserOfferInfo();
  },
};
</script>

<style></style>
