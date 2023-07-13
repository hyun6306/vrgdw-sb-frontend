<template>
  <div>
    <div class="master_btns_box">
      <button class="btn_s_default btn_function" @click="$parent.partnerSave('reset')">{{ $t('message.btnInit') }}</button>
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
          <!-- 회사코드 -->
          <th>
            <label class="list_title" for="">{{ $t('message.companyCode') }}</label>
          </th>
          <td>
            <div class="form_input">
              <!-- <span class="essential" style="width: 100%"> -->
              <input type="text" v-model="compCd" id="" style="width: 100%" class="t-l solo_input disabled" disabled placeholder="" />
              <!-- </span> -->
            </div>
          </td>
          <!-- 운송사코드 -->
          <th>
            <label class="list_title" for="">{{ $t('message.trncusCd') }}</label>
          </th>
          <td>
            <div class="form_input">
              <!-- <span class="essential" style="width: 100%"> -->
              <input type="text" v-model="trncusCd" id="" class="t-l solo_input disabled" placeholder="" disabled />
              <!-- </span> -->
            </div>
          </td>
          <!-- 초기화버튼 -->
          <!--          <td class="t-r" colspan="2">-->
          <!--            <button class="btn_intable b-w" @click="this.$parent.partnerSave('reset')">{{ $t('message.btnInit') }}</button>-->
          <!--          </td>-->
        </tr>
        <tr>
          <!-- 사업자번호 -->
          <th>
            <label class="list_title" for="">{{ $t('message.bizNum') }}</label>
          </th>
          <td>
            <div class="form_input">
              <input type="text" v-model="bizNum" id="" style="width: 100%" class="t-l solo_input" maxlength="30" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
            </div>
          </td>
          <!-- 운영구분 -->
          <th>
            <label class="list_title" for="">{{ $t('message.manageCls') }}</label>
          </th>
          <td>
            <div class="form_input">
              <MultiSelect id="" style="width: 100%" class="" v-model="operClsValue" :options="operClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </div>
          </td>
          <!-- 업태 -->
          <th>
            <label class="list_title" for="">{{ $t('message.biztype') }}</label>
          </th>
          <td>
            <div class="form_input">
              <input type="text" v-model="biztype" id="" class="t-l solo_input" placeholder="" />
            </div>
          </td>
        </tr>
        <tr>
          <!-- 전화번호 -->
          <th>
            <label class="list_title" for="">{{ $t('message.phoneNum') }}</label>
          </th>
          <td>
            <div class="form_input" style="width: 100%">
              <MultiSelect id="" style="width: 100%" class="" v-model="phoneNumCt" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
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
          <!-- 업종 -->
          <th>
            <label class="list_title" for="">{{ $t('message.bizcate') }}</label>
          </th>
          <td>
            <div class="form_input">
              <input type="text" v-model="bizcate" id="" class="t-l solo_input" placeholder="" />
            </div>
          </td>
        </tr>
        <tr>
          <!-- 휴대폰번호 -->
          <th>
            <label class="list_title" for="">{{ $t('message.cellNum') }}</label>
          </th>
          <td>
            <div class="form_input" style="width: 100%">
              <MultiSelect id="" style="width: 100%" class="" v-model="mobileNumCt" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
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
          <!-- 물류담당자코드 -->
          <th>
            <label class="list_title" for="">{{ $t('message.logitsMngCd') }}</label>
          </th>
          <td>
            <div class="form_input">
              <input type="text" v-model="logitsMngCd" id="" class="t-l solo_input" placeholder="" />
            </div>
          </td>
        </tr>
        <tr>
          <!-- 팩스번호 -->
          <th>
            <label class="list_title" for="">{{ $t('message.faxNumber') }}</label>
          </th>
          <td>
            <div class="form_input" style="width: 100%">
              <MultiSelect id="" style="width: 100%" class="" v-model="faxNumCt" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
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
          <!-- 출차생략 -->
          <!--          <th>-->
          <!--            <label class="list_title" for="">{{ $t('message.outOmit') }}</label>-->
          <!--          </th>-->
          <!--          <td>-->
          <!--            <div class="form_input">-->
          <!--              <MultiSelect id="" style="width: 100%" class="" v-model="exitSkipValue" :options="exitSkipOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>-->
          <!--            </div>-->
          <!--          </td>-->
          <!-- 예금주 -->
          <th>
            <label class="list_title" for="">{{ $t('message.depositor') }}</label>
          </th>
          <td>
            <div class="form_input">
              <input type="text" v-model="accntNm" id="" class="t-l solo_input" placeholder="" />
            </div>
          </td>
        </tr>
        <tr>
          <!-- 이메일 -->
          <th>
            <label class="list_title" for="">{{ $t('message.email') }}</label>
          </th>
          <td style="width: 100%; text-align: center" colspan="3">
            <div class="form_input" style="width: 100%">
              <span class="essential" style="width: 100%">
                <input type="text" id="mobile-number01" class="t-c" placeholder="" v-model="email[0]" oninput="this.value = this.value.replace(/[^0-9a-zA-Z_-.]/g, '');" />
              </span>
              <i>@ </i>
              <span class="essential" style="width: 100%">
                <MultiSelect id="" style="width: 100%" class="" v-model="domainValue" :options="domainOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              </span>
              <span :class="this.domainValue.value == 'EAIL02' ? 'essential' : ''" style="width: 100%">
                <input type="text" id="mobile-number03" :class="this.domainValue.value !== 'EAIL02' ? 't-c disabled' : 't-c'" v-model="domain" :disabled="this.domainValue.value !== 'EAIL02'" oninput="this.value = this.value.replace(/[^0-9a-zA-Z.]/g, '');" />
              </span>
            </div>
          </td>
          <!-- 우편번호 -->
          <th>
            <label class="list_title" for="">{{ $t('message.postNum') }}</label>
          </th>
          <td>
            <div class="form_input">
              <input type="text" v-model="postNum" id="" class="t-l solo_input" placeholder="" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
            </div>
          </td>
        </tr>
        <tr>
          <!-- 사업장 권역 -->
          <th>
            <label class="list_title" for="">{{ $t('message.bizArea') }}</label>
          </th>
          <td style="width: 100%">
            <div class="form_input">
              <MultiSelect id="Material_Group" v-model="cityValue" :options="cityOption" @input="changeCityCd('input')" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              <MultiSelect id="Material_Group" v-model="distrValue" :options="distrOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </div>
          </td>
          <!-- 은행명 -->
          <th>
            <label class="list_title" for="">{{ $t('message.bankNm') }}</label>
          </th>
          <td>
            <div class="form_input">
              <input type="text" v-model="bankNm" id="" class="t-l solo_input" placeholder="" />
            </div>
          </td>
          <!-- 계좌번호 -->
          <th>
            <label class="list_title" for="">{{ $t('message.bankAccount') }}</label>
          </th>
          <td>
            <div class="form_input">
              <input type="text" v-model="accntNum" id="" class="t-l solo_input" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import commonApi from '@/api/common';

export default {
  props: ['listData'],
  data() {
    return {
      id: '',
      compCd: 'V100', //회사코드
      trncusCd: '', //운송사코드
      bizNum: '', //사업자번호
      //운영구분
      operClsValue: { value: '', text: this.$t('message.choice') },
      operClsOptions: [],
      //
      biztype: '', //업태
      bizcate: '', //업종
      //번호
      numOptions: [],
      phoneNumCt: { value: '', text: this.$t('message.choice') },
      phoneNum: [],
      mobileNumCt: { value: '', text: this.$t('message.choice') },
      mobileNum: [],
      faxNumCt: { value: '', text: this.$t('message.choice') },
      faxNum: [],
      //사업장권역
      cityOption: [],
      cityValue: { value: '', text: this.$t('message.choice') },
      distrOption: [],
      distrValue: { value: '', text: this.$t('message.choice') },
      //
      postNum: '', //우편번호
      //이메일주소
      email: [],
      domainOptions: [],
      domainValue: { value: '', text: this.$t('message.choice') },
      domain: '',
      //
      logitsMngCd: '', //물류담당자코드
      //출차생략
      exitSkipOptions: [
        { value: 'Y', text: 'Y' },
        { value: 'N', text: 'N' },
      ],
      exitSkipValue: { value: 'Y', text: 'Y' },
      //
      bankNm: '', //은행명
      accntNum: '', //계좌번호
      accntNm: '', //예금주
    };
  },
  watch: {
    listData() {
      this.reset();
      if (this.listData !== null) {
        this.dataSetting();
      }
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
    vaild() {
      let vaildCheck = true;
      let compCdCheck = this.compCd.charAt(0) == 'V' ? true : false;

      if (this.compCd == '') {
        vaildCheck = false;
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildCompCd');
      } else if (compCdCheck == false) {
        vaildCheck = false;
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildCompCdForm');
        // } else if (this.trncusCd == '') {
        //   vaildCheck = false;
        //   this.$EventBus.$emit('openYesModal', 'message.errorsVaildTrnCusCd');
      }

      return vaildCheck;
    },
    dataSave() {
      //저장
      if (this.vaild() == true) {
        let param = {
          id: this.id,
          compCd: this.compCd,
          trncusCd: this.trncusCd,
          bizNum: this.bizNum,
          operClsCd: this.operClsValue.value,
          biztype: this.biztype,
          bizcate: this.bizcate,
          phoneNumCt: this.phoneNumCt.value,
          phoneNum: this.phoneNum.join('-'),
          mobileNumCt: this.mobileNumCt.value,
          mobileNum: this.mobileNum.join('-'),
          faxNumCt: this.faxNumCt.value,
          faxNum: this.faxNum.join('-'),
          cityCd: this.cityValue.value,
          distrCd: this.distrValue.value,
          postNum: this.postNum,
          email: this.email.join('@'),
          logitsMngCd: this.logitsMngCd,
          exitSkipYn: this.exitSkipValue.value,
          bankNm: this.bankNm,
          accntNum: this.accntNum,
          accntNm: this.accntNm,
          useYn: 'Y',
        };

        return param;
      } else {
        return false;
      }
    },
    async dataSetting() {
      this.id = this.listData.id;
      this.compCd = this.listData.compCd;
      this.trncusCd = this.listData.trncusCd;
      this.bizNum = this.listData.bizNum;
      if (this.listData.operClsCd !== null && this.listData.operClsCd !== undefined) this.operClsValue = this.operClsOptions.find(option => option.value == this.listData.operClsCd);
      this.biztype = this.listData.biztype;
      this.bizcate = this.listData.bizcate;
      if (this.listData.phoneNumCt !== null && this.listData.phoneNumCt !== undefined) this.phoneNumCt = this.numOptions.find(option => option.value == this.listData.phoneNumCt);
      if (this.listData.phoneNum) this.phoneNum = this.listData.phoneNum.split('-');
      if (this.listData.mobileNumCt !== null && this.listData.mobileNumCt !== undefined) this.mobileNumCt = this.numOptions.find(option => option.value == this.listData.mobileNumCt);
      if (this.listData.mobileNum) this.mobileNum = this.listData.mobileNum.split('-');
      if (this.listData.faxNumCt !== null && this.listData.faxNumCt !== undefined) this.faxNumCt = this.numOptions.find(option => option.value == this.listData.faxNumCt);
      if (this.listData.faxNum) this.faxNum = this.listData.faxNum.split('-');
      this.logitsMngCd = this.listData.logitsMngCd;
      if (this.listData.exitSkipYn !== null && this.listData.exitSkipYn !== undefined) this.exitSkipValue = this.exitSkipOptions.find(option => option.value == this.listData.exitSkipYn);
      if (this.listData.email) this.email = this.listData.email.split('@');
      if (this.email[1] !== null && this.email[1] !== undefined) this.domainValue = this.domainOptions.find(option => option.text == this.email[1]);
      if (this.domainValue == undefined || this.domainValue.value == '') {
        this.domain = this.email[1];
        this.domainValue = this.domainOptions.find(option => option.value == 'EAIL02');
      }
      this.postNum = this.listData.postNum;
      if (this.listData.cityCd !== null && this.listData.cityCd !== undefined) this.cityValue = this.cityOption.find(option => option.value == this.listData.cityCd);
      await this.changeCityCd('setting');
      this.bankNm = this.listData.bankNm;
      this.accntNum = this.listData.accntNum;
      this.accntNm = this.listData.accntNm;
    },
    reset() {
      //초기화
      this.compCd = 'V100';
      this.trncusCd = '';
      this.bizNum = '';
      this.operClsValue = { value: '', text: this.$t('message.choice') };
      this.biztype = '';
      this.bizcate = '';
      this.phoneNumCt = { value: '', text: this.$t('message.choice') };
      this.phoneNum = [];
      this.mobileNumCt = { value: '', text: this.$t('message.choice') };
      this.mobileNum = [];
      this.faxNumCt = { value: '', text: this.$t('message.choice') };
      this.faxNum = [];
      this.logitsMngCd = '';
      this.exitSkipValue = { value: 'Y', text: 'Y' };
      this.email = [];
      this.domainValue = { value: '', text: this.$t('message.choice') };
      this.domain = '';
      this.postNum = '';
      this.cityValue = { value: '', text: this.$t('message.choice') };
      this.distrValue = { value: '', text: this.$t('message.choice') };
      this.bankNm = '';
      this.accntNum = '';
      this.accntNm = '';
    },
    async changeCityCd(type) {
      await this.getCommonCodeCombo('VNM_CITY', this.cityValue.value);
      if (type == 'setting') {
        if (this.listData.distrCd) {
          this.distrOption.forEach(option => {
            if (option.value == this.listData.distrCd) this.distrValue = option;
          });
        }
      } else {
        this.distrValue = { value: '', text: this.$t('message.choice') };
      }
    },
    async loadCommonCode() {
      await this.getCommonCodeCombo('OPER_CLS_CD');
      await this.getCommonCodeCombo('PHONE_CT');
      await this.getCommonCodeCombo('VNM_CITY');
      await this.getCommonCodeCombo('EMAIL_DOMAIN');
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'OPER_CLS_CD') {
          //운영구분
          this.operClsOptions = response.data.ds;
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
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
