<template>
  <div class="delivery_request_contents">
    <button class="btn_folding" :class="{ quote_open: quoteOpen }">
      <strong>{{ $t('message.orderInfo') }}</strong>
      <MultiSelect id="" style="100%" class="ml-a essential" v-model="carType" :options="carTypeOption" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text"></MultiSelect>
      <i class="in_img" @click="quoteOpen = !quoteOpen"><img src="@m/assets/img/icon_up.png" /></i>
    </button>
    <!-- 폴딩영역 기본정보 배송지 정보 -->
    <section class="default_info_section" :class="{ quote_open: quoteOpen }">
      <!-- 배송정보 -->
      <p class="select_destination" v-if="Object.keys(userInfo.logits).length < 1">
        <span class="fr">{{ $t('message.msgNoDitectory') }}</span>
        <button class="btn_destination">Select Destination</button>
      </p>
      <div class="list_form_section shipping_section">
        <ul class="list_ul">
          <li class="list_li">
            <label class="list_title">{{ $t('message.tranCarNum') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form' : 'list_form essential']">
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c disabled' : 'd_input t-c']" :disabled="carType.value === 'VRGDW'" v-model="trnCarNum" maxlength="20" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.driverPhoneNum') }}</label>
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
              <label class="chechbox_basic" v-if="userMenuGrp === 'CUSTOMER' && carType.value === 'VRGDW'"><input type="checkbox" v-model="mainLogits" @change="changeMainLogits()" /><span class="checkmark"></span>{{ $t('message.msgSelectMain') }}</label>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.addr') }}</label>
            <MultiSelect id="" style="100%" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'essential' : 'disabled']" v-model="cityCd" :options="cityCdOption" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text" @input="changeCityCd()" :disabled="carType.value === 'CUSTOMER'"></MultiSelect>
          </li>
          <li class="list_li">
            <label class="list_title not_see">{{ $t('message.deliverArea') }}</label>
            <MultiSelect id="" style="100%" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'essential' : 'disabled']" v-model="distrCd" :options="distrCdOption" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text" :disabled="carType.value === 'CUSTOMER'"></MultiSelect>
          </li>
          <li class="list_li">
            <label class="list_title not_see">{{ $t('message.deliverArea') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form essential' : 'list_form']"><input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input' : 'd_input disabled']" v-model="userInfo.logits.addr" maxlength="100" :disabled="carType.value === 'CUSTOMER'" /></span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.picNm2') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form textarea_form essential' : 'list_form textarea_form']">
              <textarea :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? '' : 'disabled']" v-model="userInfo.logits.trnMngNm" :disabled="carType.value === 'CUSTOMER'"></textarea>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.callNum1') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form phone_form essential' : 'list_form phone_form']">
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum1[0]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum1[1]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum1[2]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.callNum2') }}</label>
            <span :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'list_form phone_form' : 'list_form phone_form ']">
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum2[0]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum2[1]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
              <input type="text" :class="[carType.value === 'MAIL' || carType.value === 'SALES' ? '' : carType.value === 'VRGDW' ? 'd_input t-c' : 'd_input t-c disabled']" v-model="phoneNum2[2]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="carType.value === 'CUSTOMER'" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.logitsRemark') }}</label>
            <span class="list_form textarea_form">
              <textarea name="" id="" v-model="userInfo.logits.logitsRemark"></textarea>
            </span>
          </li>
        </ul>
      </div>
      <!-- //배송정보 -->
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
export default {
  props: ['custId'],
  data() {
    return {
      quoteOpen: false,
      selectValue: '',
      selectOptions: ['KOR', 'ENG', 'VET'],
      userInfo: { logits: {} },
      carTypeOption: [],
      cityCdOption: [],
      distrCdOption: [],
      carType: { value: '' },
      cityCd: {},
      distrCd: {},
      phoneNum1: [],
      phoneNum2: [],
      driverPhoneNum: [],
      trnCarNum: '',
      credit: {},
      mainLogits: false,
    };
  },
  watch: {
    distrCd() {
      if (this.distrCd?.value) this.$emit('cityCdAndDistrCd', { cityCd: this.cityCd, distrCd: this.distrCd });
    },
  },
  computed: {
    ...mapGetters({
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
    }),
  },
  methods: {
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
            // this.distrCd = this.distrCdOption.find(option => (option.value = this.userInfo.logits.distrCd));
          } else {
            this.cityCdOption = response.data.ds;
            // this.cityCd = this.cityCdOption.find(option => (option.value = this.userInfo.logits.cityCd));
          }
        } else if (groupCd === 'TIME_CD') {
          this.$emit('onTimeOptions', response.data.ds);
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
    async getUserOfferInfo() {
      try {
        const param = {
          custId: this.custId,
        };
        const resp = await orderApi.getUserOfferInfo(param);
        this.userInfo = resp.data.rs;

        await this.getCommonCodeCombo('VNM_CITY', this.userInfo.logits.cityCd);
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
      this.cityCd = this.cityCdOption.find(option => (option.value = this.userInfo.logits.cityCd));
      this.distrCd = this.distrCdOption.find(option => (option.value = this.userInfo.logits.distrCd));
      this.phoneNum1 = this.userInfo.logits.phoneNum1 ? this.userInfo.logits.phoneNum1.split('-') : [];
      this.phoneNum2 = this.userInfo.logits.phoneNum2 ? this.userInfo.logits.phoneNum2.split('-') : [];
      this.mainLogits = this.userInfo.logits.mainLogitsYn === 'Y';
    },
    async getCredit() {
      try {
        const param = {
          custId: this.custId,
        };
        const resp = await commonApi.getCredit(param);
        this.credit = resp.data.rs;
        this.$emit('onCredit', { credit: this.credit });
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
      this.getCommonCodeCombo('VNM_CITY', this.cityCd.value);
      this.distrCd = {};
    },
    getLogits() {
      this.userInfo.logits.cityCd = this.cityCd;
      this.userInfo.logits.distrCd = this.distrCd;
      this.userInfo.logits.trnCarType = this.carType;
      let logits = this.userInfo.logits;
      if (!logits.trnCarType.value) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCarType');
        return false;
      } else if (logits.trnCarType.value === 'CUSTOMER') {
        if (!logits.driverPhoneNum || logits.driverPhoneNum === '' || !logits.trnCarNum || logits.trnCarNum === '') {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCarVrgdwInfo');
          return false;
        }
      } else if (logits.trnCarType.value === 'VRGDW') {
        if (!logits.logitsAlias || logits.logitsAlias === '' || !logits.cityCd || logits.cityCd === '' || !logits.distrCd || logits.distrCd === '' || !logits.addr || logits.addr === '' || !logits.phoneNum1 || logits.phoneNum1 === '--') {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCarCustomerInfo');
          return false;
        }
      }
      logits.mainLogitsYn = this.mainLogits;
      return logits;
    },
  },
  mounted() {
    this.getCommonCodeCombo('VNM_CITY');
    this.getCommonCodeCombo('CAR_TYPE');
    this.getCommonCodeCombo('TIME_CD');
  },
};
</script>

<style></style>
