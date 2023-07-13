<template>
  <div class="default_info_contents">
    <!-- <button class="btn_folding" @click="quoteOpen = !quoteOpen" :class="{ quote_open: quoteOpen }">
      <strong>{{ $t('message.defaultOrder') }}</strong>
      <span>{{ userInfo.offrDt | vnDateFormatD }}</span>
      <i class="in_img"><img src="@m/assets/img/icon_up.png" /></i>
    </button> -->
    <!-- 폴딩영역 기본정보 배송지 정보 -->
    <section class="default_info_section" :class="{ quote_open: quoteOpen }">
      <!-- 기본정보 -->
      <div class="list_form_section">
        <ul class="list_ul">
          <li class="list_li">
            <label class="list_title">{{ $t('message.custNm') }}</label>
            <span class="list_form" v-if="authButton.schAuth === 'N'"><input type="text" class="d_input disabled" disabled v-model="userInfo.custNm" /></span>
            <!-- 영업로그인 시 -->
            <div class="form_searchm" v-else>
              <span class="list_form essential"><input type="text" placeholder="" v-model="custNm" /></span>
              <button class="icon_search in_img" @click="searchCustomer"><img src="@m/assets/img/icon_search_w.png" /></button>
            </div>
            <!-- //영업로그인 시 -->
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.poNo') }}</label>
            <span class="list_form essential"><input type="text" class="d_input t-l" v-model="userInfo.custPoNum" maxlength="35" /></span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.paymentMethod') }}</label>
            <span class="list_form"><input type="text" class="d_input t-l disabled" disabled :placeholder="credit.apprCond" /></span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.creditBalance') }}</label>
            <span class="list_form"><input type="text" class="d_input t-r disabled" disabled :placeholder="credit.credit | priceFormat" /></span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.trnReqRemark') }}</label>
            <span class="list_form textarea_form">
              <textarea name="" id="" v-model="userInfo.custReqRemark"></textarea>
            </span>
          </li>
        </ul>
      </div>
      <!-- //기본정보 -->
      <!-- 배송정보 -->
      <p class="select_destination">
        <span>{{ $t('message.addrInfo') }}</span>
        <button class="btn_destination" @click="deliverySelect">{{ $t('message.btnSelectAddr') }}</button>
      </p>
      <div class="list_form_section shipping_section">
        <ul class="list_ul">
          <li class="list_li">
            <label class="list_title">{{ $t('message.trnCarNm') }}</label>
            <MultiSelect id="" style="100%" class="essential" v-model="carType" :options="carTypeOption" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text"></MultiSelect>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.tranCarNum') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form' : 'list_form essential']">
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c disabled' : 'd_input t-c']" :disabled="carType.value === 'VRGDW'" v-model="trnCarNum" maxlength="20" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.driverNum') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form phone_form' : 'list_form phone_form essential']">
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c disabled' : 'd_input t-c']" v-model="driverPhoneNum[0]" :disabled="carType.value === 'VRGDW'" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c disabled' : 'd_input t-c']" v-model="driverPhoneNum[1]" :disabled="carType.value === 'VRGDW'" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c disabled' : 'd_input t-c']" v-model="driverPhoneNum[2]" :disabled="carType.value === 'VRGDW'" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
            </span>
          </li>
          <!-- <li class="list_li">
          <label class="list_title">배송형태</label>
          <MultiSelect id="" style="100%" class="essential" v-model="cityCd" :options="cityCdOption" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="" track-by="text" label="text"></MultiSelect>
        </li> -->
          <li class="list_li">
            <label class="list_title">{{ $t('message.addrNm') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form essential' : 'list_form']"><input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-l' : 'd_input t-l disabled']" v-model="userInfo.logits.logitsAlias" maxlength="100" :disabled="carType.value === 'CUSTOMER'" /></span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.postNum') }}</label>
            <span class="list_form post_form">
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="userInfo.logits.postNum" maxlength="20" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
              <label class="chechbox_basic" v-if="authButton.schAuth === 'N' && carType.value === 'VRGDW'"><input type="checkbox" v-model="mainLogits" @change="changeMainLogits()" /><span class="checkmark"></span>{{ $t('message.msgSelectMain') }}</label>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.addr') }}</label>
            <MultiSelect id="" style="100%" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'essential' : 'disabled']" v-model="cityCd" :options="cityCdOption" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text" @input="changeCityCd()" :disabled="carType.value === 'CUSTOMER'"></MultiSelect>
          </li>
          <li class="list_li">
            <label class="list_title not_see">{{ $t('message.defaultOrder') }}</label>
            <MultiSelect id="" style="100%" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'essential' : 'disabled']" v-model="distrCd" :options="distrCdOption" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text" :disabled="carType.value === 'CUSTOMER'"></MultiSelect>
          </li>
          <li class="list_li">
            <label class="list_title not_see">{{ $t('message.defaultOrder') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form textarea_form essential' : 'list_form textarea_form']">
              <textarea :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? '' : 'disabled']" v-model="userInfo.logits.addr" :disabled="carType.value === 'CUSTOMER'" maxlength="100"></textarea>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.picNm') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form essential' : 'list_form']">
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input' : 'd_input disabled']" v-model="userInfo.logits.trnMngNm" maxlength="20" :disabled="carType.value === 'CUSTOMER'" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.addrNum1') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form phone_form essential' : 'list_form phone_form']">
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum1[0]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum1[1]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum1[2]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.addrNum2') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form phone_form' : 'list_form phone_form ']">
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum2[0]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum2[1]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum2[2]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
            </span>
          </li>
          <!-- <li class="list_li">
            <label class="list_title">특이사항</label>
            <span class="list_form textarea_form">
              <textarea name="" id="" v-model="userInfo.logits.logitsRemark"></textarea>
            </span>
          </li> -->
        </ul>
      </div>
      <!-- //배송정보 -->
      <CustomerSearchModal ref="CustomerSearch" @sendCustInfo="getCustInfo" />
      <DeliverySelectModal :custId="custId" @selectLogits="selectLogits" :id="userInfo.logits.id" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomerSearchModal from '@m/modal/order/CustomerSearchModal';
import DeliverySelectModal from '@m/modal/order/DeliverySelectModal';

import orderApi from '@/api/order/order';
import commonApi from '@/api/common';

export default {
  props: ['custId', 'modifyLogits'],
  components: {
    CustomerSearchModal,
    DeliverySelectModal,
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
    }),
  },
  data() {
    return {
      quoteOpen: true,
      userInfo: { logits: {} },
      carTypeOption: [],
      cityCdOption: [],
      distrCdOption: [],
      phoneNum1: [],
      phoneNum2: [],
      carType: { value: '' },
      cityCd: { value: '' },
      distrCd: {},
      driverPhoneNum: [],
      trnCarNum: '',
      mainLogits: false,
      custNm: '',
      credit: {},
    };
  },
  watch: {
    custId() {
      this.getUserOfferInfo();
      this.getCredit();
    },
    modifyLogits() {
      if (Object.keys(this.modifyLogits).length > 0) {
        this.setCd();
      }
    },
  },
  methods: {
    deliverySelect() {
      let custCheck = true;
      if (this.authButton.schAuth === 'Y' && this.custNm == '') {
        custCheck = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      }
      if (custCheck) this.$modal.show('DeliverySelectModal');
    },
    async getCredit() {
      try {
        const param = {
          custId: this.custId,
        };
        const resp = await commonApi.getCredit(param);
        this.credit = resp.data.rs;
        this.$emit('sendPrdtCdListAndCredit', { prdtCdList: this.userInfo.prdtCdList, credit: this.credit });
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
        const param = {
          custId: this.custId,
        };
        const resp = await orderApi.getUserOfferInfo(param);
        this.userInfo = resp.data.rs;
        this.$emit('offtDt', this.userInfo.offrDt);
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
    setCd() {
      if (Object.keys(this.modifyLogits).length > 0) {
        this.userInfo.custReqRemark = this.modifyLogits.custReqRemark;
        this.userInfo.custPoNum = this.modifyLogits.custPoNum;
        this.userInfo.logits = this.modifyLogits;
        this.trnCarNum = this.modifyLogits.trnCarNum;
        this.carType = this.carTypeOption.find(option => (option.value = this.modifyLogits.trnCarType));
        this.driverPhoneNum = this.userInfo.logits.driverPhoneNum ? this.userInfo.logits.driverPhoneNum.split('-') : [];
      }
      let cityCd = this.cityCdOption.find(option => option.value === this.userInfo.logits.cityCd);
      // debugger;
      if (this.cityCd?.value !== cityCd?.value) {
        this.cityCd = cityCd;
        this.changeCityCd();
      }
      this.phoneNum1 = this.userInfo.logits.phoneNum1 ? this.userInfo.logits.phoneNum1.split('-') : [];
      this.phoneNum2 = this.userInfo.logits.phoneNum2 ? this.userInfo.logits.phoneNum2.split('-') : [];
      this.mainLogits = this.userInfo.logits.mainLogitsYn === 'Y';
      this.custNm = this.userInfo.custNm;
      this.$emit('sendPrdtCdListAndCredit', { prdtCdList: this.userInfo.prdtCdList, credit: this.credit });
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '', elseValue = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'VNM_CITY') {
          if (prntCd !== '') {
            if (elseValue === '') {
              this.distrCdOption = response.data.ds;
              this.distrCd = this.distrCdOption.find(option => option.value === this.userInfo.logits.distrCd);
            } else {
              this.distrCdOption = response.data.ds;
              this.distrCd = this.distrCdOption.find(option => option.value === this.userInfo.logits.distrCd);
            }
          } else {
            this.cityCdOption = response.data.ds;
            this.cityCd = this.cityCdOption.find(option => option.value === this.userInfo.logits.cityCd);
          }
        } else {
          this.carTypeOption = response.data.ds;
          this.carType = this.carTypeOption[0];
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
    changeCityCd() {
      this.distrCd = {};
      if (this.cityCd !== null && this.cityCd !== undefined) {
        this.getCommonCodeCombo('VNM_CITY', this.cityCd?.value, 'changeCityCd');
      }
    },
    searchCustomer() {
      if (this.custNm === '') {
        this.$modal.show('CustomerSearchModal');
      } else {
        this.$refs.CustomerSearch.custSearch(this.custNm, 'info');
      }
    },
    getCustInfo(selectCust) {
      if (selectCust.length && selectCust.length === 1) {
        this.$emit('sendCustInfo', selectCust[0]);
      } else if (selectCust.length && (selectCust.length > 1 || selectCust.length === 0)) {
        this.$modal.show('CustomerSearchModal', { filter: this.custNm });
      } else if (Object.keys(selectCust).length > 0) {
        this.$emit('sendCustInfo', selectCust);
      } else {
        this.custNm = this.userInfo.custNm;
      }
    },
    sendOrderInfo() {
      const userOfferInfo = this.userInfo;
      userOfferInfo.logits.phoneNum1 = this.phoneNum1.join('-');
      userOfferInfo.logits.phoneNum2 = this.phoneNum2.join('-');
      userOfferInfo.logits.driverPhoneNum = this.driverPhoneNum.join('-');
      userOfferInfo.logits.carType = this.carType;
      userOfferInfo.logits.trnCarNum = this.trnCarNum;
      userOfferInfo.cityCd = this.cityCd.value;
      userOfferInfo.distrCd = this.distrCd.value;
      return JSON.parse(JSON.stringify(userOfferInfo));
    },
    selectLogits(logit) {
      this.userInfo.logits = JSON.parse(JSON.stringify(logit));
      this.setCd();
    },
  },
  mounted() {
    this.getCommonCodeCombo('VNM_CITY');
    this.getCommonCodeCombo('CAR_TYPE');
    if (this.custId !== -1) {
      this.getUserOfferInfo();
      this.getCredit();
    }
  },
};
</script>

<style></style>
