<template>
  <div>
    <div class="master_btns_box">
      <button class="btn_s_default btn_critical_process" v-if="listData && authButton.fn1Auth == 'Y'" @click="loadErpInfo(erpCustCd)">{{ $t('message.infoUpdate') }}</button>
      <button class="btn_s_default btn_function" v-if="authButton.fn1Auth == 'Y'" @click="resetInfo">{{ $t('message.btnInit') }}</button>
    </div>
    <div class="mypage_form_table">
      <table>
        <colgroup>
          <col style="width: 13.3%" />
          <col style="width: 20%" />
          <col style="width: 13.3%" />
          <col style="width: 20%" />
          <col style="width: 13.3%" />
          <col style="width: 20%" />
        </colgroup>
        <tr>
          <!-- 신규등록 시 -->
          <th v-if="!listData">
            <!-- erp코드 및 불러오기 -->
            <label class="list_title" for="">{{ $t('message.erpCustCd') }}</label>
          </th>
          <td v-if="!listData">
            <div class="form_input">
              <span class="essential" style="width: 100%">
                <input type="text" id="" style="width: 100%" class="t-l solo_input" placeholder="" v-model="erpCustCd" />
              </span>
              <button class="btn_intable" @click="loadErpInfo(erpCustCd)" v-if="authButton.fn1Auth == 'Y'">{{ $t('message.btnLoad') }}</button>
            </div>
          </td>
          <th v-if="listData">
            <!-- 대리점코드 -->
            <label class="list_title" for="">{{ $t('message.erpCustCd') }}</label>
          </th>
          <td v-if="listData">
            <div class="form_input">
              <input type="text" id="" style="width: 100%" class="t-l solo_input disabled" disabled placeholder="" v-model="erpCustCd" />
            </div>
          </td>
          <th>
            <!-- 사업자번호 -->
            <label class="list_title" for="">{{ $t('message.bizNum') }}</label>
          </th>
          <td>
            <div class="form_input">
              <span class="essential" style="width: 100%">
                <input type="text" id="" style="width: 100%" class="t-l solo_input" placeholder="" v-model="bizNum" maxlength="30" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              </span>
            </div>
          </td>
          <th>
            <!-- 초기화 버튼 -->
          </th>
          <!--          <td class="t-r">-->
          <!--            <button class="btn_intable b-g ml-5" @click="loadErpInfo(erpCustCd)">{{ $t('message.infoUpdate') }}</button>-->
          <!--            <button class="btn_intable b-w ml-5" @click="resetInfo">{{ $t('message.btnInit') }}</button>-->
          <!--          </td>-->
        </tr>
        <tr>
          <th>
            <!-- 결제조건 -->
            <label class="list_title" for="">{{ $t('message.paymentMethod') }}</label>
          </th>
          <td>
            <div class="form_input">
              <MultiSelect id="Material_Group" class="disabled" disabled v-model="paymentValue" :options="paymentOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </div>
          </td>
          <th>
            <!-- 고객사코드 -->
            <label class="list_title" for="">{{ $t('message.custCd') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="" v-model="custCd" /></div>
          </td>
          <!-- 파트너구분 -->
          <!-- <label class="list_title" for="">{{ $t('message.clientCls') }}</label>
          </th>
          <td>
            <div class="form_input">
              <MultiSelect id="Material_Group" v-model="clientClsValue" :options="clientClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </div> -->
          <!-- </td> -->
          <th>
            <!-- 구분1 -->
            <label class="list_title" for="">{{ $t('message.custClsNm') }}</label>
          </th>
          <td>
            <div class="form_input">
              <span class="essential" style="width: 100%">
                <MultiSelect id="Material_Group" v-model="custClsValue" :options="custClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <!-- 구분2 -->
            <label class="list_title" for="">{{ $t('message.custType') }}</label>
          </th>
          <td>
            <div class="form_input">
              <MultiSelect id="Material_Group" v-model="custTypeValue" :options="custTypeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </div>
          </td>
          <th>
            <!-- 운영구분 -->
            <label class="list_title" for="">{{ $t('message.manageCls') }}</label>
          </th>
          <td>
            <div class="form_input">
              <span class="essential" style="width: 100%">
                <MultiSelect id="Material_Group" v-model="manageClsValue" :options="manageClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              </span>
            </div>
          </td>
          <th>
            <!-- 분석유형 -->
            <label class="list_title" for="">{{ $t('message.analType') }}</label>
          </th>
          <td>
            <div class="form_input">
              <MultiSelect id="Material_Group" v-model="analTypeValue" :options="analTypeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <!-- 세금 -->
            <label class="list_title" for="">{{ $t('message.tax') }}</label>
          </th>
          <td>
            <div class="form_input">
              <MultiSelect id="Material_Group" class="disabled" disabled v-model="taxValue" :options="taxOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </div>
          </td>
          <th>
            <!-- 업태 -->
            <label class="list_title" for="">{{ $t('message.biztype') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" v-model="biztype" /></div>
          </td>
          <th>
            <!-- 종목 -->
            <label class="list_title" for="">{{ $t('message.events') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" v-model="bizcate" /></div>
          </td>
        </tr>
        <tr>
          <th>
            <!-- 대표자 직위 -->
            <label class="list_title" for="">{{ $t('message.ceoPost') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" v-model="ceoPost" /></div>
          </td>
          <th>
            <!-- 전화번호 -->
            <label class="list_title" for="">{{ $t('message.phoneNum') }}</label>
          </th>
          <td>
            <div class="form_input" style="width: 100%">
              <MultiSelect id="Material_Group" v-model="numValue[0]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              <!-- <MultiSelect id="" style="width: 100%" class="" v-model="numValue[0]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
            </div>
          </td>
          <td style="width: 100%; text-align: center" colspan="2">
            <div class="form_input" style="width: 100%">
              <input type="text" style="width: 31%" id="phone-number01" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" style="width: 31%" id="phone-number02" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" style="width: 31%" id="phone-number03" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <!-- 사업장권역 -->
            <label class="list_title" for="">{{ $t('message.bizArea') }}</label>
          </th>
          <td>
            <div class="form_input" style="width: 100%">
              <span class="essential" style="width: 50%">
                <MultiSelect id="Material_Group" v-model="cityValue" :options="cityOption" @input="changeCityCd('input')" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              </span>
              <span class="essential" style="width: 50%">
                <MultiSelect id="Material_Group" v-model="distrValue" :options="distrOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              </span>
            </div>
          </td>
          <th>
            <!-- 휴대폰번호 -->
            <label class="list_title" for="">{{ $t('message.cellNum') }}</label>
          </th>
          <td>
            <div class="form_input" style="width: 100%">
              <MultiSelect id="Material_Group" v-model="numValue[1]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              <!-- <MultiSelect id="" style="width: 100%" class="" v-model="numValue[0]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
            </div>
          </td>
          <td style="width: 100%; text-align: center" colspan="2">
            <div class="form_input" style="width: 100%">
              <input type="text" style="width: 31%" id="phone-number01" class="t-c" placeholder="" maxlength="4" v-model="mobileNum[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" style="width: 31%" id="phone-number02" class="t-c" placeholder="" maxlength="4" v-model="mobileNum[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" style="width: 31%" id="phone-number03" class="t-c" placeholder="" maxlength="4" v-model="mobileNum[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <!-- 우편번호 -->
            <label class="list_title" for="">{{ $t('message.postNum') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" v-model="postNum" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '');" /></div>
          </td>
          <th>
            <!-- 팩스번호 -->
            <label class="list_title" for="">{{ $t('message.faxNumber') }}</label>
          </th>
          <td>
            <div class="form_input" style="width: 100%">
              <MultiSelect id="Material_Group" v-model="numValue[2]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              <!-- <MultiSelect id="" style="width: 100%" class="" v-model="numValue[0]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
            </div>
          </td>
          <td style="width: 100%; text-align: center" colspan="2">
            <div class="form_input" style="width: 100%">
              <input type="text" style="width: 31%" id="phone-number01" class="t-c" placeholder="" maxlength="4" v-model="faxNum[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" style="width: 31%" id="phone-number02" class="t-c" placeholder="" maxlength="4" v-model="faxNum[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" style="width: 31%" id="phone-number03" class="t-c" placeholder="" maxlength="4" v-model="faxNum[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <!-- 이메일 -->
            <label class="list_title" for="address">{{ $t('message.email') }}</label>
          </th>
          <td style="width: 100%; text-align: center" colspan="3">
            <div class="form_input" style="width: 100%">
              <input type="text" id="mobile-number01" class="t-c" placeholder="" v-model="email[0]" oninput="this.value = this.value.replace(/[^0-9a-zA-Z_-.]/g, '');" />
              <i>@ </i>
              <MultiSelect id="" class="t-c" v-model="domainValue" :options="domainOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              <input type="text" id="mobile-number03" :class="this.domainValue.value !== 'EAIL02' ? 't-c disabled' : 't-c'" v-model="domain" :disabled="this.domainValue.value !== 'EAIL02'" oninput="this.value = this.value.replace(/[^0-9a-zA-Z.]/g, '');" />
            </div>
          </td>
          <th>
            <!-- 홈페이지 -->
            <label class="list_title" for="address">{{ $t('message.homepageUrl') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" v-model="homepageUrl" /></div>
          </td>
        </tr>
        <tr>
          <th>
            <!-- 은행명 -->
            <label class="list_title" for="">{{ $t('message.bankNm') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" v-model="bankNm" /></div>
          </td>
          <th>
            <!-- 예금주 -->
            <label class="list_title" for="">{{ $t('message.depositor') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" v-model="accntNm" /></div>
          </td>
          <th>
            <!-- 계좌번호 -->
            <label class="list_title" for="">{{ $t('message.bankAccount') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" v-model="accountNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" /></div>
          </td>
        </tr>
        <tr>
          <th>
            <!-- 회사코드 -->
            <label class="list_title" for="postal-code">{{ $t('message.companyCode') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="" v-model="compCd" /></div>
          </td>
          <th>
            <!-- 대표대리점 -->
            <label class="list_title" for="postal-code">{{ $t('message.repreAgency') }}</label>
          </th>
          <td>
            <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" v-model="repDist" /></div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import commonApi from '@/api/common';
// import masterApi from '@/api/master/master';

export default {
  data() {
    return {
      id: null,
      //erp코드
      erpCustCd: '',
      erpCustNm: '',
      //대리점코드
      custCd: '',
      //사업자번호
      bizNum: '',
      //결제조건
      paymentValue: { value: '', text: this.$t('message.choice') },
      paymentOptions: [],
      //파트너구분
      // clientClsValue: { value: '', text: this.$t('message.choice') },
      // clientClsOptions: [
      //   { value: '대리점', text: '대리점' },
      //   { value: '외주업체', text: '외주업체' },
      // ],
      //구분1
      custClsValue: { value: '', text: this.$t('message.choice') },
      custClsOptions: [],
      //구분2
      custTypeValue: { value: '', text: this.$t('message.choice') },
      custTypeOptions: [],
      //운영구분
      manageClsValue: { value: '', text: this.$t('message.choice') },
      manageClsOptions: [],
      //분석유형
      analTypeValue: { value: '', text: this.$t('message.choice') },
      analTypeOptions: [],
      //세금
      taxValue: { value: '', text: this.$t('message.choice') },
      taxOptions: [],
      //업태
      biztype: '',
      //종목
      bizcate: '',
      //대표자 직위
      ceoPost: '',
      //번호
      numValue: [],
      numOptions: [],
      phoneNum: [],
      mobileNum: [],
      faxNum: [],
      //권역
      cityValue: { value: '', text: this.$t('message.choice') },
      cityOption: [],
      distrValue: { value: '', text: this.$t('message.choice') },
      distrOption: [],
      //우편번호
      postNum: '',
      //이메일
      email: [],
      domain: '',
      domainValue: { value: '', text: this.$t('message.choice') },
      domainOptions: [],
      disabledDomain: true,
      //홈페이지
      homepageUrl: '',
      //대표대리점
      repDist: '',
      //계좌번호
      accountNum: '',
      //은행명
      bankNm: '',
      //예금주
      accntNm: '',
      //
      compCd: 'V100',
      salesArea: '',
      crdtArea: '',
    };
  },
  props: ['listData', 'erpInfo', 'authButton'],
  watch: {
    listData() {
      this.reset('new');
      if (this.listData !== null) {
        this.dataSetting();
      }
    },
    erpInfo() {
      this.erpSetting();
    },
    domain() {
      this.email[1] = this.domain;
    },
    domainValue(domain) {
      if (domain.value !== 'EAIL02') {
        this.email[1] = domain.text;
      }
    },
  },
  methods: {
    resetInfo() {
      //초기화버튼
      this.$parent.partnerSave('reset');
    },
    loadErpInfo(erpCustCd) {
      //erp정보조회
      this.$parent.loadErpInfo(erpCustCd);
    },
    vaild() {
      let validCheck = true;
      let compCdCheck = this.compCd.charAt(0) == 'V' ? true : false;
      if (this.custClsValue.value == '' || this.custClsValue == undefined) {
        validCheck = false;
        this.ment = 'message.errorsVaildCustCls';
      } else if (this.bizNum == '' || this.bizNum == undefined) {
        validCheck = false;
        this.ment = 'message.errorsValidBizNum';
      } else if (this.cityValue.value == '' || this.distrValue.value == '' || this.cityValue == undefined || this.distrValue == undefined) {
        validCheck = false;
        this.ment = 'message.errorsVaildCity';
      } else if (this.manageClsValue.value == '' || this.manageClsValue == undefined) {
        validCheck = false;
        this.ment = 'message.errorsVaildMngCls';
      } else if (this.paymentValue.value == '' || this.paymentValue == undefined) {
        validCheck = false;
        this.ment = 'message.errorsVaildPayment';
      } else if (this.taxValue.value == '' || this.taxValue == undefined) {
        validCheck = false;
        this.ment = 'message.errorsVaildTax';
      } else if (this.compCd == '') {
        validCheck = false;
        this.ment = 'message.errorsVaildCompCd';
      } else if (compCdCheck == false) {
        validCheck = false;
        this.ment = 'message.errorsVaildCompCdForm';
      }

      return validCheck;
    },
    dataSave() {
      if (this.vaild() == false) {
        this.$EventBus.$emit('openYesModal', this.ment);
        return false;
      } else {
        let param = {
          compCd: this.compCd,
          custCd: this.custCd,
          erpCustCd: this.erpCustCd,
          bizNum: this.bizNum,
          apprCond: this.paymentValue.value,
          custCls: this.custClsValue.value,
          custType: this.custTypeValue.value,
          operClsCd: this.manageClsValue.value,
          analTypeCd: this.analTypeValue.value,
          taxType: this.taxValue.value,
          biztype: this.biztype,
          bizcate: this.bizcate,
          ceoPositNm: this.ceoPost,
          phoneNumCt: this.numValue[0].value,
          phoneNum: this.phoneNum.join('-'),
          mobileNumCt: this.numValue[1].value,
          mobileNum: this.mobileNum.join('-'),
          faxNumCt: this.numValue[2].value,
          faxNum: this.faxNum.join('-'),
          cityCd: this.cityValue.value,
          distrCd: this.distrValue.value,
          postNum: this.postNum,
          email: this.email.join('@'),
          homepageUrl: this.homepageUrl,
          repDist: this.repDist,
          bankNm: this.bankNm,
          accntNm: this.accntNm,
          accntNum: this.accountNum,
          salesArea: this.salesArea,
          crdtArea: this.crdtArea,

          logitsRegYn: 'Y',
          useYn: 'Y',
        };
        param = this.id !== null ? { ...param, ...{ id: this.id } } : param;
        return param;
      }
    },
    erpSetting() {
      //erp정보 세팅
      this.erpCustCd = this.erpInfo.erpCustCd;
      this.accountNum = this.erpInfo.bankAcctNo;
      this.paymentValue = this.paymentOptions.find(option => option.value == this.erpInfo.apprCond);
      this.erpCustNm = this.erpInfo.erpCustNm;
      this.bizNum = this.erpInfo.bizNum;
      this.taxValue = this.taxOptions.find(option => option.value == this.erpInfo.taxType);
    },
    async dataSetting() {
      //불러온 데이터 세팅
      this.id = this.listData.id;
      this.custCd = this.listData.custCd;
      this.bizNum = this.listData.bizNum;
      if (this.listData.apprCond !== null && this.listData.apprCond !== undefined) this.paymentValue = this.paymentOptions.find(option => option.value == this.listData.apprCond);
      // this.clientClsValue = {};
      if (this.listData.custType !== null && this.listData.custType !== undefined) this.custTypeValue = this.custTypeOptions.find(option => option.value == this.listData.custType);
      if (this.listData.custCls !== null && this.listData.custCls !== undefined) this.custClsValue = this.custClsOptions.find(option => option.value == this.listData.custCls);
      if (this.listData.operClsCd !== null && this.listData.operClsCd !== undefined) this.manageClsValue = this.manageClsOptions.find(option => option.value == this.listData.operClsCd);
      if (this.listData.analTypeCd !== null && this.listData.analTypeCd !== undefined) this.analTypeValue = this.analTypeOptions.find(option => option.value == this.listData.analTypeCd);
      if (this.listData.taxType !== null && this.listData.taxType !== undefined) this.taxValue = this.taxOptions.find(option => option.value == this.listData.taxType);
      this.biztype = this.listData.biztype;
      this.bizcate = this.listData.bizcate;
      this.ceoPost = this.listData.ceoPositNm;
      if (this.listData.phoneNumCt !== null && this.listData.phoneNumCt !== undefined) this.numValue[0] = this.numOptions.find(option => option.value == this.listData.phoneNumCt);
      if (this.listData.mobileNumCt !== null && this.listData.mobileNumCt !== undefined) this.numValue[1] = this.numOptions.find(option => option.value == this.listData.mobileNumCt);
      if (this.listData.faxNumCt !== null && this.listData.faxNumCt !== undefined) this.numValue[2] = this.numOptions.find(option => option.value == this.listData.faxNumCt);
      if (this.listData.phoneNum) this.phoneNum = this.listData.phoneNum.split('-');
      if (this.listData.mobileNum) this.mobileNum = this.listData.mobileNum.split('-');
      if (this.listData.faxNum) this.faxNum = this.listData.faxNum.split('-');
      if (this.listData.cityCd !== null && this.listData.cityCd !== undefined) this.cityValue = this.cityOption.find(option => option.value == this.listData.cityCd);
      await this.changeCityCd('setting');
      this.postNum = this.listData.postNum;
      if (this.listData.email) this.email = this.listData.email.split('@');
      if (this.email[1] !== null && this.email[1] !== undefined) this.domainValue = this.domainOptions.find(option => option.text == this.email[1]);
      if (this.domainValue == undefined || this.domainValue.value == '') {
        this.domain = this.email[1];
        this.domainValue = this.domainOptions.find(option => option.value == 'EAIL02');
      }
      this.homepageUrl = this.listData.homepageUrl;
      this.repDist = this.listData.repDist;
      this.bankNm = this.listData.bankNm;
      this.accntNm = this.listData.accntNm;
      this.accountNum = this.listData.accntNum;
      this.compCd = this.listData.compCd;
      this.salesArea = this.listData.salesArea;
      this.crdtArea = this.listData.crdtArea;
      //erp정보
      this.erpCustCd = this.listData.erpCustCd;
      this.erpCustNm = this.listData.erpCustNm;
    },
    async changeCityCd(type) {
      await this.getCommonCodeCombo('VNM_CITY', this.cityValue.value);
      if (type == 'setting') {
        if (this.listData.distrCd !== null && this.listData.distrCd !== undefined) {
          this.distrOption.forEach(option => {
            if (option.value == this.listData.distrCd) this.distrValue = option;
          });
        }
      } else {
        this.distrValue = { value: '', text: this.$t('message.choice') };
      }
    },
    reset(type) {
      //초기화
      if (type == 'new') {
        this.erpCustCd = '';
        this.accountNum = '';
        this.paymentValue = { value: '', text: this.$t('message.choice') };
        this.erpCustNm = '';
        this.bizNum = '';
        this.taxValue = '';
        this.domain = '';
        this.bankNm = '';
        this.accntNm = '';
      }
      // this.clientClsValue = { value: '', text: this.$t('message.choice') };
      this.custClsValue = { value: '', text: this.$t('message.choice') };
      this.custTypeValue = { value: '', text: this.$t('message.choice') };
      this.manageClsValue = { value: '', text: this.$t('message.choice') };
      this.analTypeValue = { value: '', text: this.$t('message.choice') };
      this.taxValue = { value: '', text: this.$t('message.choice') };
      this.biztype = '';
      this.bizcate = '';
      this.ceoPost = '';
      this.numValue[0] = { value: '', text: this.$t('message.choice') };
      this.numValue[1] = { value: '', text: this.$t('message.choice') };
      this.numValue[2] = { value: '', text: this.$t('message.choice') };
      this.phoneNum = [];
      this.mobileNum = [];
      this.faxNum = [];
      this.cityValue = { value: '', text: this.$t('message.choice') };
      this.distrValue = { value: '', text: this.$t('message.choice') };
      this.postNum = '';
      this.email = [];
      this.domainValue = { value: '', text: this.$t('message.choice') };
      this.homepageUrl = '';
      this.repDist = '';
      this.compCd = 'V100';
      this.custCd = '';
      this.salesArea = '';
      this.crdtArea = '';
    },
    async loadCommonCode() {
      await this.getCommonCodeCombo('APPR_COND');
      await this.getCommonCodeCombo('CUST_TYPE');
      await this.getCommonCodeCombo('CUST_CLS');
      await this.getCommonCodeCombo('OPER_CLS_CD');
      await this.getCommonCodeCombo('ANAL_TYPE_CD');
      await this.getCommonCodeCombo('TAX_TYPE');
      await this.getCommonCodeCombo('PHONE_CT');
      await this.getCommonCodeCombo('VNM_CITY');
      await this.getCommonCodeCombo('EMAIL_DOMAIN');
      // await this.getCommonCodeCombo('COMP_CD');
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'APPR_COND') {
          //결재구분
          this.paymentOptions = response.data.ds;
        } else if (groupCd === 'CUST_TYPE') {
          //구분1
          this.custTypeOptions = response.data.ds;
        } else if (groupCd === 'CUST_CLS') {
          //구분2
          this.custClsOptions = response.data.ds;
        } else if (groupCd === 'OPER_CLS_CD') {
          //운영구분
          this.manageClsOptions = response.data.ds;
        } else if (groupCd === 'ANAL_TYPE_CD') {
          //분석유형
          this.analTypeOptions = response.data.ds;
        } else if (groupCd === 'TAX_TYPE') {
          //세금
          this.taxOptions = response.data.ds;
        } else if (groupCd === 'PHONE_CT') {
          //국가번호
          this.numOptions = response.data.ds;
        } else if (groupCd === 'VNM_CITY') {
          if (prntCd !== '') {
            this.distrOption = response.data.ds;
          } else {
            this.cityOption = response.data.ds;
          }
        } else if (groupCd === 'EMAIL_DOMAIN') {
          //이메일주소
          this.domainOptions = response.data.ds;
          // } else if (groupCd === 'COMP_CD') {
          //   //회사코드
          //   this.compCd = response.data.ds[0].value;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
