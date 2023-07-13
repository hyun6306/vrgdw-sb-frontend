<template>
  <modal name="DeliveryRequestModal" width="1372" height="800" :adaptive="true" :clickToClose="false" @before-open="beforeOpen" @before-close="close" @opened="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DeliveryRequestModal')"></button>
      </div>
      <p v-if="type === 'request'" class="modal_title_t02">{{ $t('message.depositoryRequsetDeliver') }}</p>
      <p v-if="type === 'delivery'" class="modal_title_t02">{{ $t('message.requestDeliver') }}</p>
      <p v-if="type === 'sample'" class="modal_title_t02">{{ $t('message.sampleRequestDeliver') }}</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <p class="search_title">{{ $t('message.addrInfo') }}</p>
          <button class="btn_select_destination btn_default btn_function" @click="chooseDelivery()">{{ $t('message.btnSelectAddr') }}</button>
          <!-- <ShippingAddressModal @sendSelectLogit="selectLogit" :page="page" /> -->
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.deliveryType') }}</span>
                  <!-- 로그인한 사람에 따라 인풋기능 변경 -->
                  <MultiSelect id="배송유형" class="essential" style="width: 100%" v-model="trnCarType" :options="carTypeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.tranCarNum') }}</span>
                  <span v-if="trnCarType.value !== 'VRGDW'" class="essential w_100">
                    <input type="text" id="payment_terms" style="width: 100%" v-model="trnCarNum" class="essential t-l" placeholder="" maxlength="20" />
                  </span>
                  <input type="text" v-if="trnCarType.value === 'VRGDW'" id="payment_terms" style="" class="essential t-l" placeholder="" />
                </label>
                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.driverNum') }}</span>
                  <div class="form_input">
                    <span :class="[trnCarType.value === 'VRGDW' ? '' : 'essential']" style="width: 30%">
                      <input type="text" id="destinations_phone_number_1_01" style="width: 100%" class="t-c three_input" v-model="driverPhoneNum[0]" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    </span>
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" v-model="driverPhoneNum[1]" maxlength="4" class="t-c three_input" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" v-model="driverPhoneNum[2]" maxlength="4" class="t-c three_input" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  </div>
                </label>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="destination_name" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.addrNm') }}</span>
                  <span class="essential w_100">
                    <input type="text" id="destination_name" style="width: 100%" v-model="logitsAlias" class="essential t-l" maxlength="100" placeholder="" />
                  </span>
                </label>
                <label for="postal_code" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.postNum') }}</span>
                  <input type="text" id="postal_code" style="" v-model="postNum" class="t-c" maxlength="20" placeholder="" oninput="this.value = this.value.replace(/[^0-9-]/g, '');" />
                </label>
                <div v-if="this.userMenuGrpCd === 'CUSTOMER' && trnCarType.value !== 'CUSTOMER'" class="filter_type">
                  <label class="chechbox_basic">
                    <input type="checkbox" v-model="mainLogits" @change="basicMainLogits()" />
                    <span class="checkmark"></span> {{ $t('message.msgSelectDefault') }}
                  </label>
                </div>
              </div>
              <div class="filter_list">
                <label for="address01" class="filter_type w_100">
                  <span class="filter_type_title">{{ $t('message.addr') }}</span>
                  <div class="form_input">
                    <MultiSelect id="address01" :class="[trnCarType.value === 'CUSTOMER' ? '' : 'essential']" style="width: 305px; flex-shrink: 0" v-model="cityCd" :options="cityOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" @input="changeCityCd()"></MultiSelect>
                    <i></i>
                    <MultiSelect id="address02" :class="[trnCarType.value === 'CUSTOMER' ? '' : 'essential']" style="width: 419px; flex-shrink: 0" v-model="distrCd" :options="distrOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" @input="changeDistrCd()"></MultiSelect>
                    <i></i>
                    <span :class="[trnCarType.value === 'CUSTOMER' ? 'w_100' : 'essential w_100']">
                      <input type="text" id="address03" style="width: 100%" class="t-l" v-model="addr" placeholder="" maxlength="100" />
                    </span>
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <label for="destinations_phone_number_1" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.picNm') }}</span>
                  <input type="text" id="담당자명" style="width: " class="t-l" v-model="logitsMngNm" placeholder="" maxlength="20" />
                </label>

                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title" style="">{{ $t('message.addrNum1') }}</span>
                  <div class="form_input">
                    <span :class="[trnCarType.value === 'CUSTOMER' ? '' : 'essential']" style="width: 30%">
                      <input type="text" id="destinations_phone_number_1_01" style="width: 100%" class="t-c three_input" v-model="logitsPhoneNum1[0]" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    </span>
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" v-model="logitsPhoneNum1[1]" class="t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" v-model="logitsPhoneNum1[2]" class="t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  </div>
                </label>
                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title" style="">{{ $t('message.addrNum2') }}</span>
                  <div class="form_input" style="">
                    <input type="text" id="destinations_phone_number_1_01" style="width: 30%" v-model="logitsPhoneNum2[0]" class="t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" v-model="logitsPhoneNum2[1]" class="t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" v-model="logitsPhoneNum2[2]" class="t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <div class="form_textarea delivery">
                  <textarea type="text" id="" style="width: 100%" v-model="trnReqRemark" class="t-l" :placeholder="[type === 'sample' ? $t('message.msgSalesComment') : $t('message.msgDeliverMemo')]" />
                </div>
              </div>
            </div>
          </div>

          <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
        </div>

        <!-- 검색 버튼 클릭시 on 클래스 추가-->
        <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid01">
          <div class="real_head">
            <div class="real_head_left">
              <small>
                {{ $t('message.totalSelection1') }} <i>{{ rowCount }}</i> {{ $t('message.totalSelection2') }}
              </small>
            </div>
          </div>
          <div class="real_top_filter">
            <div class="real_top_left">
              <span class="real_top_filter_title">{{ $t('message.minDate') }} : {{ deliveryDate | vnDateFormatD }}</span>
              <!-- <button class="btn_date_search"><img src="@/assets/img/icon_search_b.png" /></button> -->
              <!-- 데이터피커 -->
              <div class="form_calendar" style="margin-right: 10px" @click="datePicker('DatePicker')">
                <input type="text" style="width: 170px" :placeholder="$t('message.hopeDeliverMonths')" v-model="selectDateShow" />
                <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
              <DatePickerModal @selectDate="showSelectDate" :page="page" :currentDate="currentDate" :deliveryDate="deliveryDate" />
              <MultiSelect id="plant" style="width: 130px" v-model="trnHopeTiCd" :options="timeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" :placeholder="$t('message.trnHopeTiCd')"></MultiSelect>
            </div>
            <div class="real_top_right">
              <div class="form_input">
                <span>{{ $t('message.creditBalance') }}</span>
                <input type="text" style="width: 150px" class="disabled t-r" disabled v-model="credit" />
              </div>
              <button v-if="type !== 'sample'" class="btn_default btn_print_fuction" @click="debitNote()">
                <span>{{ $t('message.btnNotedebit') }}</span>
              </button>
              <button v-if="type !== 'request'" class="btn_default btn_function" @click="deleteRows()">
                <span>
                  {{ $t('message.btnSelectionDelete') }}
                  <i>({{ checkedCount }})</i>
                </span>
              </button>
            </div>
            <BookingReportLangModal @bookingPrintReport="bookingPrintReport" />
          </div>
          <div class="real_body" v-if="type === 'request'">
            <DepositDeliveryRequestGrid style="height: 100%" :gridName="'DepositDeliveryRequestGrid'" ref="DeliveryGrid" :deliveryRows="deliveryRows" :gridLang="gridLang" @totalPrice="totalPrice" @sendRowCount="sendRowCount" :type="type" :userMenuGrpCd="userMenuGrpCd" />
          </div>
          <div class="real_body" v-if="type === 'delivery'">
            <DeliveryRequestGrid style="height: 100%" :gridName="`DeliveryRequestGrid${page}`" ref="DeliveryGrid" :deliveryRows="deliveryRows" :gridLang="gridLang" @totalPrice="totalPrice" @sendRowCount="sendRowCount" @sendCheckedCount="sendCheckedCount" :type="type" @checkRowCount="checkRowCount" :userMenuGrpCd="userMenuGrpCd" />
          </div>
          <div class="real_body02" v-if="type === 'sample'">
            <SampleDeliveryRequestGrid style="height: 100%" :gridName="'SampleDeliveryRequestGrid'" ref="DeliveryGrid" :deliveryRows="deliveryRows" :gridLang="gridLang" @sendRowCount="sendRowCount" @sendCheckedCount="sendCheckedCount" :type="type" :userMenuGrpCd="userMenuGrpCd" @checked="setCheckedInfo" />
          </div>
          <div v-if="type !== 'sample'" class="real_total">
            <p>
              <span>{{ $t('message.totalAmountVatSeparately') }} :</span>
              <i>{{ totalOffrPrice }}</i>
            </p>
          </div>
          <div v-if="type !== 'sample'" class="real_total">
            <p>
              <span>VAT :</span>
              <i>{{ totalVatPrice }}</i>
            </p>
          </div>
          <div v-if="type !== 'sample'" class="real_total">
            <p>
              <span>Total :</span>
              <i>{{ totaPrice }}</i>
            </p>
          </div>
          <p class="guide_txt mt-10">{{ ment1 }} {{ ment2 }}</p>
          <div class="modal_btn_contents_t05">
            <button @click="checkCredit()" class="btn_primary">{{ $t('message.btnRequestQuote') }}</button>
          </div>
        </div>
      </div>
      <ShippingAddressModal @sendSelectLogit="selectLogit" :userCustId="userCustId" />
    </div>
  </modal>
</template>

<script>
import find from '@/mixins/style.js'; // js 추가
import { loadLanguageAsync } from '@/plugins/i18n';
import ShippingAddressModal from '@/modal/order/ShippingAddressModal';
import DepositDeliveryRequestGrid from '@/components/gridView/booking/DepositDeliveryRequestGrid';
import DeliveryRequestGrid from '@/components/gridView/booking/DeliveryRequestGrid';
import SampleDeliveryRequestGrid from '@/components/gridView/booking/SampleDeliveryRequestGrid';
import DatePickerModal from '@/modal/tran/DatePickerModal';
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
import bookingApi from '@/api/order/booking';
import languageApi from '@/api/language';
import { mapGetters } from 'vuex';
import days from 'dayjs';
import defs from '@/consts/defs';
import BookingReportLangModal from '@/modal/booking/ReportLangSelect';
import reportPrintJs from '@/mixins/reportPrint';

export default {
  components: { ShippingAddressModal, DepositDeliveryRequestGrid, DeliveryRequestGrid, SampleDeliveryRequestGrid, DatePickerModal, BookingReportLangModal },
  props: {
    deliveryRows: {
      type: Array,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    custId: {
      type: Number,
    },
    authButton: {
      type: Object,
    },
  },
  mixins: [reportPrintJs],
  data() {
    return {
      searchOpen: false,
      search_box_height: '',
      selectDate: '',
      currentDate: '',
      selectDateShow: '',
      carTypeOptions: [],
      cityOptions: [],
      distrOptions: [],
      trnCarType: {},
      cityCd: {},
      distrCd: {},
      trnCarNum: '',
      driverPhoneNum: [],
      logitsAlias: '',
      postNum: '',
      addr: '',
      logitsMngNm: '',
      logitsPhoneNum1: [],
      logitsPhoneNum2: [],
      trnReqRemark: '',
      type: '',
      deliveryList: [],
      requestList: [],
      sampleList: [],
      credit: '',
      isChecked: false,
      isOutBaseQty: false,
      ment1: '',
      ment2: '',
      ment: '',
      today: days().format('YYYY-MM-DD'),
      rowCount: '',
      totalOffrPrice: 0,
      totalVatPrice: 0,
      totaPrice: 0,
      result: '',
      checkedCount: 0,
      filter: '',
      offrId: '',
      logits: { logitsAlias: {} },
      trnClsCd: '',
      userOfferInfo: {},
      userCustId: 0,
      format: [],
      deliveryRequestList: [],
      exptRequestList: [],
      gridLang: [],
      mainLogits: false,
      deliveryDate: '',
      isCreditOver: false,
      prdtClsCd: '',
      driverPhoneNumFm: '',
      logitsPhoneNum1Fm: '',
      orgCredit: 0,
      trnHopeTiCd: '',
      timeOptions: [],
      isReSearch: false,
      isCheckedQtyAll: false,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userLocale: 'userInfo/getUserLocale',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  watch: {
    custId() {
      this.userCustId = this.custId;
      this.init();
    },
    cityCd() {
      this.getCommonCodeCombo('VNM_CITY', this.cityCd.value);
    },
    trnCarType(type) {
      if (type.value == 'VRGDW') {
        this.trnCarNum = '';
        this.driverPhoneNum = [];
        if (Object.keys(this.userOfferInfo.logits).length === 0) this.getUserOfferInfo();
        // this.$emit('resetModifyLogits');
      } else {
        this.cityCd = {};
        this.distrCd = {};
        delete this.userOfferInfo['logits'];
        this.userOfferInfo = {
          ...this.userOfferInfo,
          logits: {},
        };
        this.logitsAlias = '';
        this.postNum = '';
        this.addr = '';
        this.logitsMngNm = '';
        this.logitsPhoneNum1 = [];
        this.logitsPhoneNum2 = [];
        this.trnReqRemark = '';
      }
    },
  },
  methods: {
    validation() {
      const result = { validation: true, ment: '' };
      this.driverPhoneNumFm = this.driverPhoneNum ? this.driverPhoneNum.join('') : this.driverPhoneNum;
      this.logitsPhoneNum1Fm = this.logitsPhoneNum1 ? this.logitsPhoneNum1.join('') : this.logitsPhoneNum1;

      if (this.rowCount === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgSelectAgain');
      } else if (!this.trnCarType.value) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoDeliveryType');
        return result;
      } else if (this.trnCarType.value === 'VRGDW') {
        if (!this.logitsAlias || this.logitsAlias === '') {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoLogitsAlias');
        } else if (!this.cityCd || this.cityCd === '' || !this.distrCd || this.distrCd === '' || !this.addr || this.addr === '') {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoAddr');
        } else if (!this.logitsPhoneNum1Fm || this.logitsPhoneNum1Fm === '' || this.logitsPhoneNum1Fm.length < 8) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoLogitsPhoneNum1');
        } else if (this.isCreditOver) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgOverCredit');
        } else if ((this.totaPrice === 0 && this.type !== 'sample') || this.isChecked || this.isOutBaseQty) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgConfirmDeliveryQuantity');
        } else if (this.isCheckedQtyAll) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgValidAllQty');
        }
        return result;
      } else {
        // this.trnCarType.value === 'CUSTOMER'
        if (!this.trnCarNum || this.trnCarNum === '') {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoTrnCarNum');
        } else if (!this.driverPhoneNumFm || this.driverPhoneNumFm === '' || this.driverPhoneNumFm.length < 8) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoDriverPhoneNum');
        } else if (!this.logitsAlias || this.logitsAlias === '') {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoLogitsAlias');
        } else if (this.isCreditOver) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgOverCredit');
        } else if ((this.totaPrice === 0 && this.type !== 'sample') || this.isChecked || this.isOutBaseQty) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgConfirmDeliveryQuantity');
        } else if (this.isCheckedQtyAll) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgValidAllQty');
        }
        return result;
      }
      return result;
    },
    sendRowCount(count) {
      this.rowCount = count;
    },
    deleteRows() {
      if (!this.checkedCount) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
      } else if (this.rowCount === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgSelectAgain');
      } else {
        this.checkedCount = 0;
        this.$refs.DeliveryGrid.deleteRows();
      }
    },
    sendCheckedCount(checkedCount) {
      this.checkedCount = checkedCount;
    },
    checkRowCount(rowCount) {
      this.rowCount = rowCount;
    },
    async init() {
      this.getGridMutiLanguage();
      if (this.type === 'sample') {
        this.getCommonCodeCombo('CAR_TYPE_SAMPLE');
      } else {
        this.getCommonCodeCombo('CAR_TYPE');
      }
      this.getCommonCodeCombo('TIME_CD');
      await this.getCommonCodeCombo('VNM_CITY');
      await this.getUserOfferInfo();
      if (this.distrCd) {
        await this.availableDate();
      }
      await this.getBookingCredit();
    },
    basicMainLogits() {
      this.userOfferInfo.logits.mainLogitsYn = this.mainLogits ? 'Y' : 'N';
    },
    setData() {
      const logit = this.userOfferInfo.logits;
      this.logitsAlias = logit.logitsAlias;
      this.postNum = logit.postNum;
      this.cityCd = this.cityOptions.find(option => option.value === logit.cityCd);
      this.distrCd = this.distrOptions.find(option => option.value === logit.distrCd);
      this.addr = logit.addr;
      this.logitsMngNm = logit.trnMngNm;
      this.logitsPhoneNum1 = logit.phoneNum1 ? logit.phoneNum1.split('-') : [];
      this.logitsPhoneNum2 = logit.phoneNum2 ? logit.phoneNum2.split('-') : [];
      this.trnReqRemark = logit.logitsRemark;
      if (this.userMenuGrpCd === 'CUSTOMER') {
        logit.mainLogitsYn = this.mainLogits ? 'Y' : 'N';
      }

      if (this.type === 'request') {
        //예탁배송요청
        this.trnClsCd = defs.trnClsCd.deposit;
      } else if (this.type === 'delivery') {
        //일반배송요청
        this.deliveryRows.forEach(list => {
          if (list.bokngClsCd === defs.bokngClsCd.deposit) {
            this.trnClsCd = defs.trnClsCd.deposit;
          } else {
            this.trnClsCd = defs.trnClsCd.general;
          }
        });
      } else if (this.type === 'sample') {
        //샘플배송요청
        this.trnClsCd = defs.trnClsCd.sample;
      }
    },
    totalPrice(offr = -1, vat, tot) {
      if (offr > -1) {
        this.totalOffrPrice = offr ? offr.toLocaleString() : 0;
        this.totalVatPrice = vat ? vat.toLocaleString() : 0;
        this.totaPrice = tot ? tot.toLocaleString() : 0;
      }
      if (this.type !== 'request') {
        this.isCheckedQtyAll = this.deliveryRows.some(row => row.isCheckQtyAll);
        this.isOutBaseQty = this.deliveryRows.some(row => row.outBaseQty === 0);
        this.isChecked = this.deliveryRows.some(row => row.isCheckNum);

        if (this.isCheckedQtyAll) {
          this.ment2 = this.$t('message.msgValidAllQty');
        } else if (this.isChecked) {
          this.ment2 = this.$t('message.msgManyRequestQuantity');
        } else {
          this.ment2 = '';
        }
      }
    },
    async availableDate() {
      let prdtClsCdMdf = [];
      let prdtClsCdMfb = [];
      this.deliveryRows.forEach(list => {
        if (list.prdtClsCd === defs.prdtClsCd.MDF) {
          prdtClsCdMdf.push(list.prdtClsCd);
        } else {
          prdtClsCdMfb.push(list.prdtClsCd);
        }
      });
      const isMdf = prdtClsCdMdf[0] ? true : false;
      const isMfb = prdtClsCdMfb[0] ? true : false;

      if (isMdf && isMfb) {
        this.prdtClsCd = defs.prdtClsCd.MDF + ', ' + defs.prdtClsCd.MFB;
        this.putBookingInquiry();
      } else if (isMdf && !isMfb) {
        this.prdtClsCd = defs.prdtClsCd.MDF;
        this.putBookingInquiry();
      } else if (!isMdf && isMfb) {
        this.prdtClsCd = defs.prdtClsCd.MFB;
        this.putBookingInquiry();
      }
    },
    clear() {
      this.rowCount = 0;
      this.checkedCount = 0;
      this.trnCarType = {};
      this.cityCd = {};
      this.distrCd = {};
      this.trnCarNum = '';
      this.driverPhoneNum = [];
      this.logitsAlias = '';
      this.postNum = '';
      this.addr = '';
      this.logitsMngNm = '';
      this.logitsPhoneNum1 = [];
      this.logitsPhoneNum2 = [];
      this.trnReqRemark = '';
      this.ment1 = '';
      this.ment2 = '';
      this.selectDate = '';
      this.trnClsCd = '';
    },
    setList() {
      this.logits = {};
      this.logits = {
        reqDt: this.today,
        postNum: this.postNum,
        addr: this.addr,
        logitsPhoneNum1: this.logitsPhoneNum1.join('-'),
        logitsPhoneNum2: this.logitsPhoneNum2.join('-'),
        logitsMngNm: this.logitsMngNm,
        cityCd: this.cityCd.value,
        distrCd: this.distrCd.value,
        trnHopeDt: this.selectDate,
        trnHopeTi: this.trnHopeTiCd.value,
        trnReqRemark: this.trnReqRemark,
        trnCarType: this.trnCarType.value,
        trnCarNum: this.trnCarNum,
        driverPhoneNum: this.driverPhoneNum.join('-'),
        logitsAlias: this.logitsAlias,
        mainLogitsYn: this.userOfferInfo.logits.mainLogitsYn,
        custId: this.userOfferInfo.logits.custId,
      };
      this.logits = JSON.parse(JSON.stringify(this.logits));

      let jsonRows = this.$refs.DeliveryGrid.sendJsonRows();
      this.exptRequestList = [];

      jsonRows.forEach(list => {
        this.exptRequestList.push({
          offrClsCd: list.offrClsCd,
          trnClsCd: this.trnClsCd,
          prdtCd: list.prdtCd,
          offrDtlsId: list.offrDtlsId,
          bokngId: list.id,
          custId: list.custId,
          bokngSoNum: list.bokngSoNum,
          bokngSoItemNum: list.bokngSoItemNum.toString().padStart(6, '0'),
          trnReqBaseQty: list.outBaseQty, //출고 기본 수량
        });
      });
      this.deliveryRequestList = [];

      jsonRows.forEach(list => {
        if (list.bokngClsCd === defs.bokngClsCd.deposit) {
          this.trnClsCd = defs.trnClsCd.deposit;
        } else {
          this.trnClsCd = defs.trnClsCd.general;
        }
        if (this.type === 'sample') {
          this.trnClsCd = defs.trnClsCd.sample;
        }
        this.deliveryRequestList.push({
          trnClsCd: this.trnClsCd,
          custId: list.custId,
          prdtCd: list.prdtCd,
          offrId: list.offrId,
          offrNum: list.offrNum,
          offrDtlsId: list.offrDtlsId,
          bokngId: list.id,
          bokngSoNum: list.bokngSoNum,
          bokngSoItemNum: list.bokngSoItemNum.toString().padStart(6, '0'),
          apprId: list.apprId,
          plntCd: list.plntCd,
          savPosCd: list.savPosCd,
          trnReqBaseQty: list.outBaseQty, //출고 기본 수량
          // trnReqOrdQty: list.trnReqOrdQty,
        });
      });
    },
    async checkCredit() {
      if (this.type !== 'sample') {
        await this.getBookingCredit();
        this.totalPrice();
      }
      this.saveBookingDelivery();
    },
    async saveBookingDelivery() {
      this.$refs.DeliveryGrid.gridCommit();
      this.setList();
      try {
        const exptParam = { ...this.logits, ...{ exptRequstList: this.exptRequestList } };
        const deliveryParam = { ...this.logits, ...{ deliveryRequstList: this.deliveryRequestList } };

        this.result = this.validation();
        this.ment = '';
        if (this.result.validation) {
          if (this.type === 'request') {
            const response = await bookingApi.saveBookingRequest(exptParam);
            if (response.data.status === 500) {
              this.ment = response.data.message;
              this.$EventBus.$emit('openYesModal', this.ment);
            } else if (response.data.rs) {
              this.requestList = response.data.ds;
              this.hideModal();
            }
          } else {
            const response = await bookingApi.saveBookingDelivery(deliveryParam);
            if (response.data.status === 500) {
              this.ment = response.data.message;
              this.$EventBus.$emit('openYesModal', this.ment);
            } else if (response.data.rs) {
              this.deliveryList = response.data.ds;
              if (this.userMenuGrpCd === 'CUSTOMER') {
                if (this.mainLogits) {
                  this.logits.phoneNum1 = this.logits.logitsPhoneNum1;
                  this.logits.phoneNum2 = this.logits.logitsPhoneNum2;
                  this.logits.trnMngNm = this.logits.logitsMngNm;
                  this.logits.logitsRemark = this.logits.trnReqRemark;
                  await orderApi.saveUserLogitsBaseAddr(this.logits);
                }
              }
              this.hideModal();
            }
          }
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        }
      }
    },
    async getBookingCredit() {
      const param = {
        custId: isNaN(this.custId) ? this.userInfo.custId : this.custId,
      };
      try {
        if (this.custId !== 0) {
          const response = await bookingApi.getBookingCredit(param);
          const block = response.data.rs.block;
          this.orgCredit = response.data.rs.credit;
          if (!this.orgCredit) this.orgCredit = 0;
          this.credit = this.orgCredit ? this.orgCredit.toLocaleString() : this.orgCredit;
          const orgTot = this.totaPrice ? Number(this.totaPrice.replaceAll(',', '')) : this.totaPrice;
          this.ment1 = '';
          if (block) {
            this.isCreditOver = true;
            this.credit = 'block';
            this.ment1 = this.$t('message.msgContactSales');
            // return false;
          } else if ((this.orgCredit === '0' || this.orgCredit === 0 || orgTot > this.orgCredit) && this.type !== 'sample') {
            this.isCreditOver = true;
            this.ment1 = this.$t('message.msgNoneCredit');
            // return false;
          } else {
            this.isCreditOver = false;
            this.ment1 = '';
            // return false;
          }

          let isDepositRows = this.deliveryRows.filter(row => row.bokngClsCd === defs.bokngClsCd.deposit);
          if (isDepositRows.length === this.deliveryRows.length) {
            this.isCreditOver = false;
            this.ment1 = '';
            // return false;
          }
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async putBookingInquiry() {
      try {
        const param = {
          prdtClsCd: this.prdtClsCd,
          cityCd: this.cityCd ? this.cityCd.value : '',
          distrCd: this.distrCd ? this.distrCd.value : '',
        };
        const response = await bookingApi.putBookingInquiry(param);
        this.deliveryDate = response.data.rs.date;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
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
        if (groupCd === 'VNM_CITY') {
          if (prntCd !== '') {
            this.distrOptions = response.data.ds;
            this.distrCd = this.distrCd ? this.distrCd : this.distrOptions.find(option => (option.value = this.userOfferInfo.logits.distrCd));
          } else {
            this.cityOptions = response.data.ds;
          }
        } else if (groupCd === 'CAR_TYPE') {
          this.carTypeOptions = [];
          this.carTypeOptions = response.data.ds;
        } else if (groupCd === 'CAR_TYPE_SAMPLE') {
          this.carTypeOptions = [];
          this.carTypeOptions = response.data.ds;
        } else if (groupCd === 'TIME_CD') {
          this.timeOptions = response.data.ds;
          this.trnHopeTiCd = this.timeOptions[0];
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    showSelectDate(selectDate) {
      this.selectDate = selectDate;
      this.selectDateShow = this.$vnDateFormatD(this.selectDate);
    },
    datePicker() {
      // this.$revertDateFormatD(this.deliveryRows[0].trnHopeDt
      this.currentDate = this.selectDate;
      this.$modal.show('DatePicker', { page: 'bookingOrder' });
    },
    async chooseDelivery() {
      try {
        await loadLanguageAsync('/modal/customer/searchLogits', this.menuId);
      } catch (e) {
        console.log(e);
      }
      this.$modal.show('ShippingAddressModal');
    },
    selectLogit(logit) {
      this.userOfferInfo.logits = logit;
      this.setData();
    },
    async getUserOfferInfo() {
      try {
        if (this.custId !== 0) {
          const param = {
            custId: this.userMenuGrpCd === 'CUSTOMER' ? this.userInfo.custId : this.custId,
          };
          const response = await orderApi.getUserOfferInfo(param);
          this.userOfferInfo = response.data.rs;
          this.getCommonCodeCombo('VNM_CITY', this.userOfferInfo.logits.cityCd);
          this.mainLogits = this.userOfferInfo.logits.mainLogitsYn === 'Y' ? true : false;
        }
        this.setData();
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    changeCityCd() {
      this.getCommonCodeCombo('VNM_CITY', this.cityCd.value);
      this.distrCd = {};
    },
    changeDistrCd() {
      this.availableDate();
    },
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage('/modal/delivery', this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async debitNote() {
      const rowCount = this.$refs.DeliveryGrid.getRowCount();
      if (rowCount > 0) {
        await loadLanguageAsync('/modal/reportLangSelect', this.menuId);
        this.$modal.show('BookingReportLangModal', { signShow: false, type: 'custom' });
      } else {
        this.$EventBus.$emit('openYesModal', this.$t('message.msgNoRowData'));
      }
    },
    async bookingPrintReport(result) {
      try {
        this.$refs.DeliveryGrid.gridCommit();
        const jsonData = this.$refs.DeliveryGrid.realGrid.dataProvider.getJsonRows();
        const param = {
          debitNoteDtlsDtoList: [],
          amountSum: this.totalOffrPrice.replaceAll(',', '') * 1,
          vatSum: this.totalVatPrice === 0 ? 0 : this.totalVatPrice.replaceAll(',', '') * 1,
          totalAmount: this.totaPrice.replaceAll(',', '') * 1,
          langList: result.language,
          signYn: result.signYn,
        };
        jsonData.forEach(list => {
          const data = {
            custId: list.custId,
            bokngId: list.id,
            offrNum: list.offrNum,
            bokngSoNum: list.bokngSoNum,
            bokngNum: list.bokngNum,
            prdtCd: list.prdtCd,
            prdtNm: list.prdtNm,
            outBaseQty: list.outBaseQty,
            bokngPrdtQtyAmt: list.bokngPrdtQtyAmt,
            bokngOffrPrice: list.bokngOffrPrice,
            vatRate: list.vatRate,

            custPoNum: list.custPoNum,
            bokngSoItemNum: list.bokngSoItemNum.toString().padStart(6, '0'),
            itemNum: list.itemNum.toString().padStart(6, '0'),
          };
          param.debitNoteDtlsDtoList.push(data);
        });

        const resp = await bookingApi.postDeliveryDebitNote(param);
        this.reportPrint(resp.data.ds, 'custom');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    beforeOpen(event) {
      this.type = event.params.type;
      this.deliveryRows.forEach(list => {
        let qtyAll = list.trnEndBaseQty + list.trnIngBaseQty + list.trnReqBaseQty;
        if (list.bokngBaseQty <= qtyAll) {
          list.isCheckQtyAll = true;
        } else {
          list.isCheckQtyAll = false;
        }
      });
      this.isCheckedQtyAll = this.deliveryRows.some(row => row.isCheckQtyAll);
      if (this.isCheckedQtyAll) {
        this.ment2 = this.$t('message.msgValidAllQty');
      } else {
        this.ment2 = '';
      }
      // if (this.deliveryRows[0].trnHopeDt) {
      //   let dt = this.deliveryRows[0].trnHopeDt.split('-');
      //   if (dt[0].length === 2) {
      //     this.selectDateShow = this.deliveryRows[0].trnHopeDt;
      //     this.selectDate = this.$revertDateFormatD(this.deliveryRows[0].trnHopeDt);
      //   } else {
      //     this.selectDateShow = this.$vnDateFormatD(this.deliveryRows[0].trnHopeDt);
      //     this.selectDate = this.deliveryRows[0].trnHopeDt;
      //   }
      // }
    },
    open() {
      if (this.custId !== 0) {
        this.init();
      }
      if (this.deliveryRows[0].trnHopeDt) {
        let dt = this.deliveryRows[0].trnHopeDt.split('-');
        if (dt[0].length === 2) {
          this.selectDateShow = this.deliveryRows[0].trnHopeDt;
          this.selectDate = this.$revertDateFormatD(this.deliveryRows[0].trnHopeDt);
        } else {
          this.selectDateShow = this.$vnDateFormatD(this.deliveryRows[0].trnHopeDt);
          this.selectDate = this.deliveryRows[0].trnHopeDt;
        }
      }
    },

    close() {
      this.openFirst = 0;
      this.selectDate = '';
      this.currentDate = '';
      this.selectDateShow = '';
      this.trnHopeTiCd = this.timeOptions[0];
      this.isCreditOver = false;
      this.isCheckedQtyAll = false;
      this.clear();
    },
    async reSearch() {
      this.isReSearch = true;
      this.$emit('isReSearch', this.isReSearch);
    },
    async hideModal() {
      this.$modal.hide('DeliveryRequestModal');
      await this.reSearch();
      this.$EventBus.$emit('openYesModal', 'message.msgEndDeliveryRequest');
    },
    searchProduct() {
      find.searchProduct();
    },
    resetBtn() {
      find.resetBtn();
    },
    writeInput() {
      find.writeInput();
    },
    setCheckedInfo(checkedInfo) {
      this.isCheckedQtyAll = checkedInfo.isCheckedQtyAll;
      this.isOutBaseQty = checkedInfo.isOutBaseQty;
      this.isChecked = checkedInfo.isChecked;
      if (this.isCheckedQtyAll) {
        this.ment2 = this.$t('message.msgValidAllQty');
      } else if (this.isChecked) {
        this.ment2 = this.$t('message.msgManyRequestQuantity');
      } else {
        this.ment2 = '';
      }
    },
  },
};
</script>

<style></style>
