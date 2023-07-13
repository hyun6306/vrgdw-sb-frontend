<template>
  <div>
    <ShippingAddressModal @sendSelectLogit="selectLogit" :userCustId="custId" :id="userOfferInfo.logits.id" />
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box" ref="search_box_height" :class="[searchOpen ? '' : 'search_close']" :style="`height:${search_box_height}`">
        <div class="search_box_title always_exposure">
          <span>{{ $t('message.customerInfo') }}</span>
        </div>
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="custoer_name" class="filter_type">
              <span class="filter_type_title">{{ $t('message.custNm') }}</span>
              <input v-if="authButton.schAuth === 'N'" type="text" id="custoer_name" style="" class="t-l disabled" disabled :placeholder="userOfferInfo.custNm" />
              <div class="form_inputnbtn essential" v-if="authButton.schAuth === 'Y'">
                <input type="text" style="" id="custoer_name" placeholder="" v-model="custNm" @keyup.enter="clientSearch" ref="custNm" />
                <button class="btn_search_basic_info" @click="clientSearch">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
            </label>
            <label for="quotation_date" class="filter_type">
              <span class="filter_type_title">{{ $t('message.orderDate') }}</span>
              <input type="text" style="" class="t-c disabled" disabled :placeholder="userOfferInfo.offrDt | vnDateFormatD" />
            </label>
          </div>
        </div>
        <div class="search_box_filter f_action f_action01">
          <div class="filter_list">
            <label for="customers_p/o_no" class="filter_type">
              <span class="filter_type_title">{{ $t('message.poNo') }}</span>
              <span class="essential" style="width: 100%">
                <input type="text" id="customers_p/o_no" style="" class="t-l" placeholder="" maxlength="35" v-model="userOfferInfo.custPoNum" />
              </span>
            </label>

            <label for="payment_terms" class="filter_type" v-if="page === 'order'">
              <span class="filter_type_title">{{ $t('message.paymentMethod') }}</span>
              <input type="text" id="payment_terms" style="" class="t-l disabled" disabled :placeholder="credit.apprCond" />
            </label>
            <label for="credit_balance" class="filter_type" v-if="page === 'order'">
              <span class="filter_type_title">{{ $t('message.creditBalance') }}</span>
              <input type="text" id="credit_balance" style="" class="t-r disabled" disabled :placeholder="credit.credit | priceFormat" />
            </label>
          </div>
        </div>
        <div class="search_box_filter f_action f_action02">
          <div class="filter_list">
            <label for="special_request" class="filter_type w_100">
              <span class="filter_type_title">{{ $t('message.cusRequest') }}</span>
              <input type="text" id="special_request" style="width: 100%" class="t-l" placeholder="" v-model="userOfferInfo.custReqRemark" />
            </label>
          </div>
        </div>
        <div class="search_box_title f_action f_action03">
          <span class="filter_type_title">{{ $t('message.addrInfo') }}</span>
          <button class="btn_default btn_function m-l-a" @click="openSelectLogits()">
            {{ $t('message.btnSelectAddr') }}
          </button>
        </div>
        <div class="search_box_filter f_action f_action04">
          <div class="filter_list">
            <label for="delivery_type" class="filter_type">
              <span class="filter_type_title">{{ $t('message.deliveryType') }}</span>
              <MultiSelect id="delivery_type" style="width: 100%" class="essential" v-model="carType" :options="carTypeOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value" :allow-empty="false"></MultiSelect>
            </label>
            <label for="truck_no" class="filter_type">
              <span class="filter_type_title">{{ $t('message.tranCarNum') }}</span>
              <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? '' : 'essential']" style="width: 100%">
                <input type="text" v-model="trnCarNum" id="truck_no" style="" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? 'w_100' : carType.value === 'VRGDW' ? 't-c w_100' : 't-c essential w_100']" placeholder="" maxlength="20" />
              </span>
            </label>
            <label for="drivers_mobile_phone_number" class="filter_type">
              <span class="filter_type_title" style="">{{ $t('message.driverNum') }}</span>
              <div class="form_input">
                <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? '' : 'essential']" style="width: 100%">
                  <input type="text" id="destinations_phone_number_1_01" class="t-c" maxlength="14" v-model="driverPhoneNum" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/^(\d{3,4})(\d{3,4})(\d{4})$/, `$1-$2-$3`);" />
                </span>

                <!-- <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? '' : 'essential']" style="width: 30%">
                  <input type="text" id="drivers_mobile_phone_number01" v-model="driverPhoneNum[0]" style="width: 100%" class="t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                </span>
                <i>-</i>
                <input type="text" id="drivers_mobile_phone_number02" v-model="driverPhoneNum[1]" style="width: 30%" class="t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                <i>-</i>
                <input type="text" id="drivers_mobile_phone_number03" v-model="driverPhoneNum[2]" style="width: 30%" class="t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" /> -->
              </div>
            </label>
          </div>
        </div>
        <div class="search_box_filter f_action f_action05">
          <div class="filter_list">
            <label for="destination_name" class="filter_type">
              <span class="filter_type_title">{{ $t('message.addrNm') }}</span>
              <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'CUSTOMER' ? '' : 'essential']" style="width: 100%">
                <input type="text" id="destination_name" style="" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? 'w_100' : carType.value === 'CUSTOMER' ? 'w_100' : 'essential w_100']" v-model="userOfferInfo.logits.logitsAlias" maxlength="100" />
              </span>
            </label>
            <label for="postal_code" class="filter_type">
              <span class="filter_type_title">{{ $t('message.postNum') }}</span>
              <input type="text" id="postal_code" style="" class="t-c" v-model="userOfferInfo.logits.postNum" maxlength="20" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'CUSTOMER' ? '' : 'essential']" />
            </label>
            <!-- 20230217 Remember my last address 기능 제거 요청 -->
            <!-- <div class="filter_type">
              <label class="chechbox_basic" v-if="carType.value === 'VRGDW' && authButton.schAuth === 'N'">
                <input type="checkbox" v-model="mainLogits" @change="changeMainLogits()" />
                <span class="checkmark"></span>
                {{ $t('message.msgSelectDefault') }}
              </label>
            </div>-->
            <!-- <label for="special_note" class="special_note filter_type m-l-a">
              <span class="filter_type_title" style="">{{ $t('message.noteRemark') }}</span>
              <button class="btn_download">
                <img src="@/assets/img/icon_note.png" alt="note" @click="openSpecialNote()" />
              </button>
            </label> -->
          </div>
        </div>
        <div class="search_box_filter f_action f_action06">
          <div class="filter_list">
            <label for="address01" class="filter_type w_100">
              <span class="filter_type_title">{{ $t('message.addr') }}</span>
              <div class="form_input">
                <MultiSelect id="address01" style="width: 305px; flex-shrink: 0" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'CUSTOMER' ? '' : 'essential']" v-model="cityCd" :options="cityCdOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" @input="changeCityCd()" :allow-empty="false"></MultiSelect>
                <i></i>
                <MultiSelect id="address02" style="width: 436px; flex-shrink: 0" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'CUSTOMER' ? '' : 'essential']" v-model="distrCd" :options="distrCdOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false"></MultiSelect>
                <i></i>
                <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? 'w_100' : carType.value === 'CUSTOMER' ? 'w_100' : 'w_100 essential']" class="w_100">
                  <input type="text" id="address03" style="width: 100%" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'CUSTOMER' ? 't-l' : 't-l essential']" placeholder="" v-model="userOfferInfo.logits.addr" maxlength="100" />
                </span>
              </div>
            </label>
          </div>
        </div>
        <div class="search_box_filter f_action f_action07">
          <div class="filter_list">
            <label for="destinations_phone_number_1" class="filter_type">
              <span class="filter_type_title">{{ $t('message.picNm') }}</span>
              <input type="text" id="담당자명" v-model="userOfferInfo.logits.trnMngNm" style="" class="'t-l'" maxlength="20" />
            </label>
            <label for="destinations_phone_number_1" class="filter_type">
              <span class="filter_type_title" style="">{{ $t('message.addrNum1') }}</span>
              <div class="form_input">
                <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'CUSTOMER' ? '' : 'essential']" style="width: 100%">
                  <input type="text" id="destinations_phone_number_1_01" class="t-c" maxlength="14" v-model="phoneNum1" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/^(\d{3,4})(\d{3,4})(\d{4})$/, `$1-$2-$3`);" />
                </span>

                <!-- <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'CUSTOMER' ? '' : 'essential']" style="width: 30%">
                  <input type="text" id="destinations_phone_number_1_01" style="width: 100%" class="t-c three_input" maxlength="4" v-model="phoneNum1[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                </span>
                <i>-</i>
                <input type="text" id="destinations_phone_number_1_02" style="width: 30%" class="t-c three_input" maxlength="4" v-model="phoneNum1[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                <i>-</i>
                <input type="text" id="destinations_phone_number_1_03" style="width: 30%" class="t-c three_input" maxlength="4" v-model="phoneNum1[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" /> -->
              </div>
            </label>
            <label for="destinations_phone_number_1" class="filter_type">
              <span class="filter_type_title" style="">{{ $t('message.addrNum2') }}</span>
              <div class="form_input">
                <input type="text" id="destinations_phone_number_1_01" class="t-c" maxlength="14" v-model="phoneNum2" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/^(\d{3,4})(\d{3,4})(\d{4})$/, `$1-$2-$3`);" />

                <!-- <input type="text" id="destinations_phone_number_1_01" style="width: 30%" class="t-c three_input" maxlength="4" v-model="phoneNum2[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                <i>-</i>
                <input type="text" id="destinations_phone_number_1_02" style="width: 30%" class="t-c three_input" maxlength="4" v-model="phoneNum2[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                <i>-</i>
                <input type="text" id="destinations_phone_number_1_03" style="width: 30%" class="t-c three_input" maxlength="4" v-model="phoneNum2[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" /> -->
              </div>
            </label>

            <ShippingSpecificsModal :specialNote="userOfferInfo.logits.logitsRemark" @sendLogitsRemark="sendLogitsRemark" />
          </div>
        </div>
      </div>
      <button class="btn_search_content" @click="searchOpen = !searchOpen">
        <i :class="{ close: searchOpen }"></i>
      </button>
    </div>
    <ClientSearchModal @sendCustId="sendCustId" :custNm="custNm" ref="ClientSearchModal" />
    <OrderAlarmModal :ment="ment" :whatIs="whatIs" @okOrNo="okOrNo" :name="name" />
    <!-- //검색필터 영역 -->
  </div>
</template>

<script>
import { loadLanguageAsync } from '@/plugins/i18n';
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
import ShippingAddressModal from '@/modal/order/ShippingAddressModal';
import ShippingSpecificsModal from '@/modal/order/ShippingSpecificsModal';
import ClientSearchModal from '@/modal/order/ClientSearchModal';
import OrderAlarmModal from '@/modal/order/AlarmModal';

export default {
  name: 'OrderInfoInput',
  components: {
    ShippingAddressModal,
    ShippingSpecificsModal,
    ClientSearchModal,
    OrderAlarmModal,
  },
  props: ['menuId', 'authButton', 'custId', 'page', 'modifyLogits'],
  watch: {
    searchOpen() {
      this.$emit('searchOpenChange', this.searchOpen);
    },
    custId() {
      if (this.custId > 0) {
        this.getUserOfferInfo();
        this.getCredit();
      }
    },
    carType(type) {
      if (type.value == 'VRGDW') {
        this.trnCarNum = '';
        this.driverPhoneNum = '';
        if (Object.keys(this.userOfferInfo.logits).length === 0 && this.custId > 0) {
          this.getUserOfferInfo();
        }
        this.$emit('resetModifyLogits');
      } else {
        this.cityCd = {};
        this.distrCd = {};
        delete this.userOfferInfo['logits'];

        this.userOfferInfo = {
          ...this.userOfferInfo,
          logits: {},
        };
        this.phoneNum1 = '';
        this.phoneNum2 = '';
      }
    },
    modifyLogits() {
      // this.userOfferInfo.custReqRemark = this.modifyLogits.custReqRemark;
      // this.userOfferInfo.custPoNum = this.modifyLogits.custPoNum;
      // this.userOfferInfo.logits = this.modifyLogits;
      if (Object.keys(this.modifyLogits).length > 0) {
        this.setCd();
      }
    },
  },
  data() {
    return {
      name: 'Cust',
      searchOpen: true,
      userOfferInfo: { logits: {} },
      selectValue: '',
      carTypeOption: [],
      cityCdOption: [],
      distrCdOption: [],
      carType: {},
      search_box_height: '',
      cityCd: {},
      distrCd: {},
      driverPhoneNum: '',
      // driverPhoneNum: [],
      phoneNum1: '',
      phoneNum2: '',
      // phoneNum1: [],
      // phoneNum2: [],
      mainLogits: false,
      trnCarNum: '',
      custNm: '',
      ment: '',
      whatIs: '',
      credit: {},
      selectLogits: false,
    };
  },
  computed: {},
  methods: {
    resetInfo() {
      this.trnCarNum = '';
      this.driverPhoneNum = '';
      // this.driverPhoneNum = [];
      this.carType = {};
      this.cityCd = {};
      this.distrCd = {};
      this.userOfferInfo = { logits: {} };
      this.phoneNum1 = '';
      this.phoneNum2 = '';
      // this.phoneNum1 = [];
      // this.phoneNum2 = [];
      this.credit = {};
    },
    resetInfoSales() {
      this.custNm = '';
    },
    clientSearch() {
      this.$refs.custNm.blur();
      this.$refs.ClientSearchModal.customerList(this.custNm, 'info');
      if (this.custNm === '') {
        this.$modal.show('ClientSearchModal');
      }
    },
    sendOrderInfo() {
      const userOfferInfo = this.userOfferInfo;
      userOfferInfo.logits.phoneNum1 = this.phoneNum1;
      userOfferInfo.logits.phoneNum2 = this.phoneNum2;
      // userOfferInfo.logits.phoneNum1 = this.phoneNum1.join('-');
      // userOfferInfo.logits.phoneNum2 = this.phoneNum2.join('-');
      userOfferInfo.logits.driverPhoneNum = this.carType.value === 'VRGDW' ? '' : this.driverPhoneNum;
      // userOfferInfo.logits.driverPhoneNum = this.driverPhoneNum.join('-');
      userOfferInfo.logits.carType = this.carType;
      userOfferInfo.logits.trnCarNum = this.carType.value === 'VRGDW' ? '' : this.trnCarNum;
      userOfferInfo.cityCd = this.cityCd.value;
      userOfferInfo.distrCd = this.distrCd.value;
      return JSON.parse(JSON.stringify(userOfferInfo));
    },
    getInfoHeight() {
      let val = this.$refs.search_box_height.scrollHeight + 5;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
    async getCredit() {
      try {
        const param = {
          custId: this.custId,
        };
        const resp = await commonApi.getCredit(param);
        this.credit = resp.data.rs;
        this.$emit('sendPrdtCdListAndCredit', { prdtCdList: this.userOfferInfo.prdtCdList, credit: this.credit });
      } catch (e) {
        console.log(e);
        this.$EventBus.$emit('openYesModal', e.err.data.message);
      }
    },
    async getUserOfferInfo() {
      try {
        const param = { custId: this.custId };
        const response = await orderApi.getUserOfferInfo(param);
        this.userOfferInfo = response.data.rs;

        await this.getCommonCodeCombo('VNM_CITY', this.userOfferInfo.logits.cityCd);

        this.setCd();
      } catch (e) {
        console.log(e);
      }
    },
    setCd() {
      if (Object.keys(this.modifyLogits).length > 0 && this.userOfferInfo.logits !== this.modifyLogits && !this.selectLogits) {
        this.userOfferInfo.custReqRemark = this.modifyLogits.custReqRemark;
        this.userOfferInfo.custPoNum = this.modifyLogits.custPoNum;
        this.userOfferInfo.logits = this.modifyLogits;
        // delete this.userOfferInfo.logits['custPoNum'];
        this.trnCarNum = this.modifyLogits.trnCarNum;
        this.carType = this.carTypeOption.find(option => option.value === this.modifyLogits.trnCarType);
        this.driverPhoneNum = this.userOfferInfo.logits.driverPhoneNum;
        // this.driverPhoneNum = this.userOfferInfo.logits.driverPhoneNum ? this.userOfferInfo.logits.driverPhoneNum.split('-') : [];
        this.cityCd = this.cityCdOption.find(option => option.value === this.modifyLogits.cityCd);
        if (this.cityCd) this.getCommonCodeCombo('VNM_CITY', this.cityCd.value);
        // this.distrCd = this.distrCdOption.find(option => option.value === this.userOfferInfo.distrCd);
      } else if (this.selectLogits) {
        this.cityCd = this.cityCdOption.find(option => option.value === this.userOfferInfo.logits.cityCd);
        this.changeCityCd();
      } else {
        this.cityCd = this.cityCdOption.find(option => option.value === this.userOfferInfo.logits.cityCd);
        this.distrCd = this.distrCdOption.find(option => option.value === this.userOfferInfo.logits.distrCd);
      }
      // this.distrCd = { text: this.userOfferInfo.logits.distrCd };
      this.phoneNum1 = this.userOfferInfo.logits.phoneNum1;
      this.phoneNum2 = this.userOfferInfo.logits.phoneNum2;
      // this.phoneNum1 = this.userOfferInfo.logits.phoneNum1 ? this.userOfferInfo.logits.phoneNum1.split('-') : [];
      // this.phoneNum2 = this.userOfferInfo.logits.phoneNum2 ? this.userOfferInfo.logits.phoneNum2.split('-') : [];
      // this.mainLogits = this.userOfferInfo.logits.mainLogitsYn === 'Y';
      this.custNm = this.userOfferInfo.custNm;
      this.$emit('sendPrdtCdListAndCredit', { prdtCdList: this.userOfferInfo.prdtCdList, credit: this.credit });
      // this.userOfferInfo.offrDt = this.$vnDateFormatD(this.userOfferInfo.offrDt);
    },
    phoneNumCheck() {
      let indexList = [];
      this.phoneNum1.forEach((num, index) => {
        if (num === '' && !num) {
          indexList.push(index);
        }
      });
      indexList.sort((num1, num2) => {
        return num2 - num1;
      });

      this.phoneNum1.forEach(num => {
        this.phoneNum1.splice(num, 1);
      });

      indexList = [];
      this.phoneNum2.forEach((num, index) => {
        if (num === '' && !num) {
          indexList.push(index);
        }
      });
      indexList.sort((num1, num2) => {
        return num2 - num1;
      });

      this.phoneNum2.forEach(num => {
        this.phoneNum2.splice(num, 1);
      });
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
            this.distrCdOption = response.data.ds;
            if (Object.keys(this.modifyLogits).length > 0 && !this.selectLogits) {
              this.distrCd = this.distrCdOption.find(option => option.value === this.modifyLogits.distrCd);
            } else if (this.selectLogits) {
              this.distrCd = this.distrCdOption.find(option => option.value === this.userOfferInfo.logits.distrCd);
            }
          } else {
            this.cityCdOption = response.data.ds;
            if (Object.keys(this.userOfferInfo).length > 0) {
              // this.cityCd = this.cityCdOption.find(option => (option.value = this.userOfferInfo.logits.cityCd));
            }
          }
        } else {
          this.carTypeOption = response.data.ds;
        }
      } catch (e) {
        console.log(e);
      }
    },
    changeMainLogits() {
      this.userOfferInfo.logits.mainLogitsYn = this.mainLogits ? 'Y' : 'N';
    },
    async openSelectLogits() {
      if (this.custId > 0) {
        try {
          await loadLanguageAsync('/modal/customer/searchLogits', this.menuId);
        } catch (e) {
          console.log(e);
        }
        this.$modal.show('ShippingAddressModal');
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      }
    },
    selectLogit(logit) {
      if (logit && Object.keys(logit).length !== 0) {
        this.userOfferInfo.logits = JSON.parse(JSON.stringify(logit));
        this.selectLogits = true;
        this.setCd();
      }
    },
    changeCityCd() {
      this.distrCd = {};
      this.getCommonCodeCombo('VNM_CITY', this.cityCd.value);
      // this.distrCd = {};
    },
    async openSpecialNote() {
      try {
        await loadLanguageAsync('/modal/customer/searchLogits', this.menuId);
      } catch (e) {
        console.log(e);
      }
      this.$modal.show('ShippingSpecificsModal');
    },
    sendLogitsRemark(logitsRemark) {
      this.userOfferInfo.logits.logitsRemark = logitsRemark;
    },
    sendCustId(id) {
      this.$parent.gridCommit();
      if (typeof id === 'object') {
        if (id.length > 1 || id.length === 0) {
          this.$modal.show('ClientSearchModal', { custNm: this.custNm });
        } else {
          let custId = id[0].custId;
          let totalRowCount = this.$parent.getTotalRowCount();
          if (this.custId !== custId && totalRowCount > 0) {
            // 모달
            this.ment = 'message.msgChangeCustId';
            this.whatIs = 'updateCustId';
            this.$modal.show(`OrderAlarmModalCust`, { custId });
          } else if (this.custId !== custId) {
            this.$emit('sendCustId', custId);
          } else {
            this.setCd();
          }
        }
      } else if (id !== '' && this.custId !== id) {
        let totalRowCount = this.$parent.getTotalRowCount();
        if (totalRowCount > 0) {
          // 모달
          this.ment = 'message.msgChangeCustId';
          this.whatIs = 'updateCustId';
          this.$modal.show(`OrderAlarmModalCust`, { id });
        } else {
          this.$emit('sendCustId', id);
        }
      } else {
        this.setCd();
      }
    },
    okOrNo(result, whatIs) {
      if (result) {
        const custId = whatIs.split('/');
        this.$emit('sendCustId', custId[1]);
        this.$parent.clearProductList();
      } else {
        this.setCd();
      }
    },
  },
  mounted() {
    if (this.custId > 0) {
      this.getUserOfferInfo();
      this.getCredit();
    }
    this.getInfoHeight();
  },
  created() {
    this.getCommonCodeCombo('VNM_CITY');
    if (this.page === 'order') this.getCommonCodeCombo('CAR_TYPE');
    if (this.page === 'sample') this.getCommonCodeCombo('CAR_TYPE_SAMPLE');
  },
};
</script>

<style></style>
