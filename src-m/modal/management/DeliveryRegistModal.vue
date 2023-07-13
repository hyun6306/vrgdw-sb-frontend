<template>
  <modal name="DeliveryRegistModal" width="100%" height="100%" :adaptive="true" @before-close="close" @before-open="open">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.registDelivery') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="beforeClose"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="quote_search_contents">
          <div class="delivery_default">
            <label class="chechbox_basic">
              <input type="checkbox" v-model="mainLogitsYn" true-value="Y" false-value="N" />
              <span class="checkmark"></span>
              {{ $t('message.mainLogits') }}
            </label>
          </div>
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">{{ $t('message.logitsNm') }}</label>
                <span class="list_form"><input type="text" class="d_input" v-model="logitsAlias" placeholder="" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.postNum') }}</label>
                <span class="list_form"><input type="text" class="d_input" v-model="postNum" placeholder="" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '');" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.logitsArea') }}</label>
                <div class="list_form phone_form">
                  <MultiSelect id="Material_Group" v-model="cityValue" :options="cityOption" @input="changeCityCd()" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </div>
              </li>
              <li class="list_li">
                <label class="list_title"></label>
                <div class="list_form phone_form">
                  <MultiSelect id="Material_Group" v-model="distrValue" :options="distrOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </div>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.addrDtls') }}</label>
                <span class="list_form"><input type="text" class="d_input" v-model="addr" placeholder="" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.chargNm') }}</label>
                <span class="list_form"><input type="text" class="d_input" v-model="trnMngNm" placeholder="" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.callNum1') }}</label>
                <span class="list_form phone_form">
                  <input type="text" class="d_input" v-model="phoneNum1[0]" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  <input type="text" class="d_input" v-model="phoneNum1[1]" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  <input type="text" class="d_input" v-model="phoneNum1[2]" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.callNum2') }}</label>
                <span class="list_form phone_form">
                  <input type="text" class="d_input" v-model="phoneNum2[0]" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  <input type="text" class="d_input" v-model="phoneNum2[1]" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  <input type="text" class="d_input" v-model="phoneNum2[2]" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.noteRemark') }}</label>
                <span class="list_form textarea_form">
                  <textarea v-model="logitsRemark"></textarea>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_cancle" @click="beforeClose">{{ $t('message.btnCancel') }}</button>
            <button class="btn_add" v-if="authButton.savAuth == 'Y'" @click="logitsSave">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
    <RegistAlarmModal @okOrNo="okOrNo" />
  </modal>
</template>
<script>
import commonApi from '@/api/common';
import orderApi from '@/api/order/order.js';
import { mapGetters } from 'vuex';
import RegistAlarmModal from '@m/modal/management/RegistAlarmModal';

export default {
  //  name: 'ProductSearchModal',
  components: { RegistAlarmModal },
  data() {
    return {
      name: 'DeliveryRegist',
      id: null,
      custId: -1,
      mainLogitsYn: 'N',
      logitsAlias: '',
      postNum: '',
      addr: '',
      trnMngNm: '',
      //번호
      phoneNum1: [],
      phoneNum2: [],
      //권역
      cityValue: { value: '', text: this.$t('message.choice') },
      cityOption: [],
      distrValue: { value: '', text: this.$t('message.choice') },
      distrOption: [],
      //특이사항
      logitsRemark: '',
    };
  },
  computed: {
    ...mapGetters({
      userCustId: 'userInfo/getUserCustId',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      authButton: 'userInfo/getAuthButton',
    }),
  },
  props: ['mainYn'],
  watch: {
    mainLogitsYn(Yn) {
      if (Yn == 'Y' && this.mainYn == true) {
        this.$modal.show('RegistAlarmModal', { type: 'chg' });
      }
    },
  },
  methods: {
    okOrNo(modal) {
      if (modal.result) {
        if (modal.type == 'close') {
          this.$modal.hide('DeliveryRegistModal');
        }
      } else {
        if (modal.type == 'chg') {
          this.mainLogitsYn = 'N';
        }
      }
    },
    vaild() {
      let vaildCheck = true;
      if (this.custId == null || this.custId == -1) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
        vaildCheck = false;
      } else if (this.logitsAlias == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildLogitsNm');
        vaildCheck = false;
      } else if (this.cityValue.value == '' || this.distrValue.value == '' || this.cityValue == undefined || this.distrValue == undefined) {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildCity');
        vaildCheck = false;
      } else if (this.postNum == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildPostNum');
        vaildCheck = false;
      } else if (this.addr == '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoAddr');
        vaildCheck = false;
      } else if (this.trnMngNm == '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoLogitsMngNm');
        vaildCheck = false;
      }

      return vaildCheck;
    },
    async logitsSave() {
      //배송지저장
      if (this.vaild()) {
        try {
          let param = {
            custId: this.custId,
            logitsAlias: this.logitsAlias,
            cityCd: this.cityValue.value,
            distrCd: this.distrValue.value,
            postNum: this.postNum,
            addr: this.addr,
            phoneNum1: this.phoneNum1.join('-'),
            phoneNum2: this.phoneNum2.join('-'),
            trnMngNm: this.trnMngNm,
            logitsRemark: this.logitsRemark,
            mainLogitsYn: this.mainLogitsYn,
          };
          param = this.id == null ? param : { ...param, ...{ id: this.id } };
          await orderApi.saveUserLogitsBaseAddr(param);
          let result = {
            result: true,
            type: 'save',
          };
          this.$parent.okOrNo(result);
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
    async dataSetting(data) {
      this.id = data.id;
      this.mainLogitsYn = data.mainLogitsYn;
      this.logitsAlias = data.logitsAlias;
      this.postNum = data.postNum;
      this.addr = data.addr;
      this.trnMngNm = data.trnMngNm;
      this.phoneNum1 = data.phoneNum1.split('-');
      this.phoneNum2 = data.phoneNum2.split('-');
      this.cityValue = this.cityOption.find(option => option.value == data.cityCd);
      await this.changeCityCd();
      this.distrValue = this.distrOption.find(option => option.value == data.distrCd);
      this.logitsRemark = data.logitsRemark;
    },
    beforeClose() {
      this.$modal.show('RegistAlarmModal', { type: 'close' });
    },
    open(event) {
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.custId = this.userCustId;
      } else {
        this.custId = event.params.custId;
      }
    },
    close() {
      this.id = null;
      this.mainLogitsYn = 'N';
      this.logitsAlias = '';
      this.postNum = '';
      this.addr = '';
      this.trnMngNm = '';
      this.phoneNum1 = [];
      this.phoneNum2 = [];
      this.cityValue = { value: '', text: this.$t('message.choice') };
      this.distrValue = { value: '', text: this.$t('message.choice') };
      this.logitsRemark = '';
    },
    async changeCityCd() {
      await this.getCommonCodeCombo('VNM_CITY', this.cityValue.value);
      this.distrValue = { value: '', text: this.$t('message.choice') };
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
            this.distrOption = response.data.ds;
            this.distrOption.unshift({ text: this.$t('message.choice'), value: '' });
          } else {
            this.cityOption = response.data.ds;
            this.cityOption.unshift({ text: this.$t('message.choice'), value: '' });
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
  },
  async mounted() {
    await this.getCommonCodeCombo('VNM_CITY');
  },
};
</script>

<style></style>
