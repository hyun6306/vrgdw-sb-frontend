<template>
  <div class="join_wrap">
    <div class="join_container">
      <span class="logo"><img src="@/assets/img/logo.png" /></span>
      <h1>{{ $t('message.btnUserRegister') }}</h1>
      <small>{{ $t('message.msgJoinNotice') }}</small>

      <div class="join_agree">
        <h2>{{ $t('message.joinAgree') }}</h2>
        <ul>
          <!-- 20230217 현업 요청사항 숨김처리 -->
          <li class="check_agree" v-if="false">
            <label class="chechbox_basic">
              <input type="checkbox" ref="check1" @click="checkLog" v-model="serviceCheckStaus" />
              <span class="checkmark"></span> {{ $t('message.serviceAgree') }}
            </label>
            <a class="btn_gray" @click="firstDocsClick">
              {{ $t('message.btnViewAll') }}
              <i class="icon_go"></i>
            </a>
          </li>
          <!-- 20230217 현업 요청사항 숨김처리 -->
          <li class="check_agree">
            <label class="chechbox_basic">
              <input type="checkbox" ref="check2" @click="checkLog2" v-model="privacyCheckStaus" />
              <span class="checkmark"></span> {{ $t('message.privacyAgree') }}
            </label>
            <a class="btn_gray" @click="secondDocsClick">
              {{ $t('message.btnViewAll') }}
              <i class="icon_go"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="join_form" v-if="this.ceoYn">
        <!-- 고객사/운송사 기본정보 -->
        <h2 v-if="this.trnYn == false">{{ $t('message.cusDefault') }}</h2>
        <h2 v-if="this.trnYn == true">{{ $t('message.trnDefault') }}</h2>

        <div class="join_form_table">
          <table>
            <colgroup>
              <col style="width: 18%" />
              <col style="width: 30%" />
              <col style="width: 22%" />
              <col style="width: 30%" />
            </colgroup>
            <tr>
              <th>
                <!-- 고객사/운송사 베트남 명 -->
                <label v-if="this.trnYn == false || !this.trnYn" class="list_title" for="customer-name">{{ $t('message.custVnmNm') }}</label>
                <label v-if="this.trnYn == true" class="list_title" for="customer-name">{{ $t('message.trncusVnmNm') }}</label>
              </th>
              <td>
                <!-- v-bind:disabled="ceoYn == false && trnYn == false"  -->
                <div class="form_input"><input type="text" :disabled="true" v-model="userDefault.rs.custVnmNm" id="customer-name" class="t-l solo_input disabled" autocomplete="off" /></div>
              </td>
              <th>
                <!-- 고객사/운송사 코드 -->
                <label v-if="this.trnYn == false || !this.trnYn" class="list_title" for="customer-code">{{ $t('message.custCd') }}</label>
                <label v-if="this.trnYn == true" class="list_title" for="customer-code">{{ $t('message.trncusCd') }}</label>
              </th>
              <td>
                <!-- v-bind:disabled="ceoYn == false && trnYn == false"  -->
                <div class="form_input"><input type="text" :disabled="true" v-model="userDefault.rs.custCd" id="customer-code" class="t-c solo_input disabled" autocomplete="off" /></div>
              </td>
            </tr>
            <tr>
              <th>
                <!-- 사업자번호 -->
                <label class="list_title" for="business-number">{{ $t('message.bizNum') }}</label>
              </th>
              <td>
                <!-- v-bind:disabled="ceoYn == false && trnYn == false" id="business-number"  -->
                <div class="form_input"><input v-bind:disalbe="true" :disabled="true" type="text" v-model="userDefault.rs.bizNum" style="width: 70%" class="t-c solo_input disabled" autocomplete="off" /></div>
              </td>
              <th>
                <!-- 대표자 베트남 명 -->
                <label class="list_title" for="representative">{{ $t('message.ceoVnmNm') }}</label>
              </th>
              <td>
                <!-- v-bind:disabled="ceoYn == false && trnYn == false"  -->
                <div class="form_input"><input :disabled="true" type="text" id="representative" v-model="userDefault.rs.ceoVnmNm" class="t-l solo_input disabled" autocomplete="off" /></div>
              </td>
            </tr>
            <tr>
              <th>
                <!-- 전화번호 -->
                <label class="list_title" for="pnone-number01">{{ $t('message.phoneNum') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <input type="text" v-bind:disabled="ceoYn == false" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="pnone-number01" v-model="phoneNum[0]" class="t-c three_input" maxlength="4" autocomplete="off" />
                  <i>-</i>
                  <input type="text" v-bind:disabled="ceoYn == false" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="pnone-number02" v-model="phoneNum[1]" class="t-c three_input" maxlength="4" autocomplete="off" />
                  <i>-</i>
                  <input type="text" v-bind:disabled="ceoYn == false" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="pnone-number03" v-model="phoneNum[2]" class="t-c three_input" maxlength="4" autocomplete="off" />
                </div>
              </td>
              <th>
                <!-- 휴대폰번호 -->
                <label class="list_title" for="mobile-phone-number01">{{ $t('message.mobileNum') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <input type="text" v-bind:disabled="ceoYn == false" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="mobile-phone-number01" v-model="mobileNum[0]" class="t-c three_input" maxlength="4" autocomplete="off" />
                  <i>-</i>
                  <input type="text" v-bind:disabled="ceoYn == false" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="mobile-phone-number02" v-model="mobileNum[1]" class="t-c three_input" maxlength="4" autocomplete="off" />
                  <i>-</i>
                  <input type="text" v-bind:disabled="ceoYn == false" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="mobile-phone-number03" v-model="mobileNum[2]" class="t-c three_input" maxlength="4" autocomplete="off" />
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <!-- 대표자/직원 가입자 명 -->
                <label class="list_title" for="subscriber-name">{{ $t('message.joinUserNm') }}</label>
              </th>
              <td colspan="3">
                <div class="form_input" v-if="this.ceoYn == true || this.trnYn == true"><input :disabled="true" type="text" id="subscriber-naqme" v-model="userDefault.rs.ceoVnmNm" style="width: 241px" class="t-l solo_input disabled" autocomplete="off" /></div>
                <!-- 로그인에서 custNm을 받아야한다. -->
                <!-- 중단점, 직원 회원가입 페이지로 push 됐을 때, userinfo에서 userNm 받아야함 -->
                <div class="form_input" v-if="this.ceoYn == false && trnYn == false"><input type="text" id="subscriber-naqme" v-model="custNm" style="width: 241px" class="t-l solo_input disabled" autocomplete="off" /></div>
              </td>
            </tr>
            <tr>
              <th>
                <label class="list_title" for="address">{{ $t('message.addr') }}</label>
              </th>
              <td colspan="3">
                <div class="form_input_multy">
                  <div class="form_input">
                    <!-- 우편번호 -->
                    <label class="title-post" for="postal-code">{{ $t('message.postNum') }}</label>
                    <input type="text" v-bind:disabled="ceoYn == false && trnYn == false" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="postal-code" maxlength="5" v-model="postNum" style="width: 60px; text-algin: center" class="t-c solo_input" autocomplete="off" />
                  </div>
                  <div class="form_input form_row">
                    <!-- 주소 멀티셀렉 -->
                    <MultiSelect style="width: 160px" v-bind:disabled="ceoYn == false && trnYn == false" track-by="text" label="text" v-model="selectValue1" :options="selectOptions1" :searchable="false" :allow-empty="false" :close-on-select="true" :show-labels="false"></MultiSelect>
                    <MultiSelect style="width: 160px" v-bind:disabled="ceoYn == false && trnYn == false" track-by="text" label="text" v-model="selectValue2" :options="selectOptions2" :searchable="false" :allow-empty="false" :close-on-select="true" :show-labels="false"></MultiSelect>
                    <input type="text" id="address" readonly onfocus="this.removeAttribute('readonly')" v-bind:disabled="ceoYn == false && trnYn == false" v-model="addrDtls" style="width: 369px" class="t-l" autocomplete="one-time-code " />
                  </div>
                  <!-- <label for="" class="filter_type">
                <span class="filter_type_title">
                  {{ $t('message.categorySubject') }}
                </span>
                <MultiSelect id="Product" style="width: 130px" v-model="prdtClsCd" :options="selectPrdt" :searchable="false" :close-on-select="false" :show-labels="false"></MultiSelect>
              </label> -->
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="join_regsit">
        <h2>{{ $t('message.registPwd') }}</h2>
        <div class="join_regsit_content">
          <div class="join_id">
            <span class="title_id">{{ $t('message.id') }}</span>
            <span class="id_txt">{{ email }}</span>
          </div>
          <!-- 임시비밀번호 -->
          <div class="form_box">
            <input id="temporary_password" :type="type1" v-model="confirmTempPassWord" :class="[confirmTempPassWord ? 'on' : '']" @blur="checkCustTempPwd" autocomplete="one-time-code" />
            <label for="temporary_password" class="label_pw">{{ $t('message.temporaryPwd') }}</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태
            패스워드 입력시 on 클래스 추가
            -->
            <span :class="[tempPasswordFlag ? 'pw_check_active on see' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" v-if="tempPasswordFlag == true" /></span>
            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="{ 'btn_view_password on': icon1 === 'not_see', 'btn_view_password on see': icon1 === 'see' }" @click="showPwd1" v-if="browser !== 'EDGE'"></button>
          </div>
          <!-- 신규비밀번호 -->
          <div class="form_box">
            <input v-bind:disabled="tempPasswordFlag == null || tempPasswordFlag == false" v-model="newPassWord" id="new_password" :type="type2" maxlength="16" :class="[newPassWord ? 'on' : '']" @keyup="deboucneNewTempPwd" />
            <label for="new_password" class="label_pw">{{ $t('message.newPwd') }}</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태
            패스워드 입력시 on 클래스 추가
            -->
            <span :class="[passwordValidFlag ? 'pw_check_active on see' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" v-if="passwordValidFlag == true" /></span>
            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="{ 'btn_view_password on': icon2 === 'not_see', 'btn_view_password on see': icon2 === 'see' }" @click="showPwd2" v-if="browser !== 'EDGE'"></button>
          </div>
          <!-- <div :class="[confirmPassWord ? 'form_box on' : 'form_box']"> -->
          <!-- 신규비밀번호확인 -->
          <div class="form_box">
            <input v-bind:disabled="tempPasswordFlag == null || tempPasswordFlag == false || passwordValidFlag == false" id="confirm_password" :class="[confirmPassWord ? 'on' : '']" v-model="confirmPassWord" :type="type3" maxlength="16" class="" @keyup="deboucneConfirmPwd" />
            <label for="confirm_password" class="label_pw">{{ $t('message.checkPwd') }}</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태
            패스워드 입력시 on 클래스 추가
            -->
            <span :class="[passwordCheckFlag ? 'pw_check_active on see' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" v-if="passwordCheckFlag == true" /></span>
            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="{ 'btn_view_password on': icon3 === 'not_see', 'btn_view_password on see': icon3 === 'see' }" @click="showPwd3" v-if="browser !== 'EDGE'"></button>
          </div>
          <p class="login_alert" v-if="passwordValidFlag == false">{{ $t('message.msgPwdNotice') }}</p>
          <p class="login_alert" v-if="confirmTempPassWord && tempPasswordFlag == false">{{ $t('message.msgWrongTemporary') }}</p>
          <p class="login_alert" v-else-if="newPassWord && this.newPassWord !== this.confirmTempPassWord && passwordValidFlag == false">{{ $t('message.msgWrongForm') }}</p>
          <p class="login_alert" v-else-if="confirmPassWord && passwordCheckFlag == false">{{ $t('message.msgMatchNew') }}</p>
          <p class="login_alert" v-else-if="newPassWord && this.newPassWord == this.confirmTempPassWord">{{ $t('message.errorsMatchNewNow') }}</p>
          <p class="login_alert" v-else-if="confirmTempPassWord && !newPassWord && noNewPwdFlag == true">{{ $t('message.errorsValidChgPwd') }}</p>
          <p class="login_alert" v-else-if="newPassWord && confirmTempPassWord && !confirmPassWord && noConfirmPwdFlag == true">{{ $t('message.errorsValidConfirmPwd') }}</p>
          <!-- <p class="login_alert" v-else-if="noConfirmTempPwdFlag == true">{{ $t("message.") }}</p> -->

          <button class="btn_join" @click="setCustDefault">{{ $t('message.btnCreateAccount') }}</button>
        </div>
      </div>
      <p class="login_footer">Copyright VRG Dongwha MDF. All rights reserved.</p>
    </div>
    <PersonalModal :titleMent="titleMent" :ment="ment" :firstDocs="firstDocs" :secondDocs="secondDocs" @clickDocs="clickDocs" />
    <SignupOk :userNm="userNm" />
    <NoticeModal :ment="ment" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PersonalModal from '@/modal/signup/PersonalModal';
import joinApi from '@/api/signIn';
import SignupOk from '@/modal/signup/SignupOk.vue';
import NoticeModal from '@/modal/signup/NoticeModal.vue';
import _ from 'lodash';

export default {
  data() {
    return {
      // noConfirmTempPwdFlag: false,
      titleMent: '',
      noNewPwdFlag: false,
      noConfirmPwdFlag: false,
      firstDocsYN: '',
      secondDocsYN: '',
      tmpPsYn: '',
      custNm: '',
      userNm: '',
      userCd: '',
      trnYn: '',
      ceoYn: '',
      ment: '',
      cityCd: '',
      distrtCd: '',
      aplyUserCd: '',
      serviceCheckStaus: false,
      privacyCheckStaus: false,
      firstDocs: '',
      secondDocs: '',
      docsYN: false,
      docsYN2: false,
      userDefault: { rs: {} },
      phoneNum: [],
      mobileNum: [],
      postNum: '',
      prntCd: '',
      selectOptions1: [],
      selectOptions2: [],
      selectValue1: '',
      selectValue2: '',
      defaultCityCd: null,
      defaultDistrtCd: null,
      addrDtls: '',
      email: '',
      tempPassWord: '',
      confirmTempPassWord: '',
      tempPasswordFlag: null,
      newPassWord: '',
      passwordValidFlag: false,
      confirmPassWord: '',
      passwordCheckFlag: false,
      type1: 'password',
      icon1: 'not_see',
      type2: 'password',
      icon2: 'not_see',
      type3: 'password',
      icon3: 'not_see',
      formLayout: 'horizontal',
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      other: '',
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
          },
        ],
        resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
      },
      intervalId: '',
      privacy: '',
      agree: '',
    };
  },
  computed: {
    // deboucneCheckTempPwd() {
    //   return _.debounce(this.checkCustTempPwd, 500);
    // },
    deboucneNewTempPwd() {
      return _.debounce(this.passwordValid, 500);
    },
    deboucneConfirmPwd() {
      return _.debounce(this.passwordCheckValid, 500);
    },

    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
    ...mapGetters({
      browser: 'userInfo/getBrowser',
    }),
  },
  created() {
    this.getAplyUserCd(); // [API] 영업/계정신청 Api 활성화 시, 활성화.
    // this.deboucneCheckTempPwd();
    this.deboucneNewTempPwd();
    this.deboucneConfirmPwd();
    this.setSignupValid();
    this.getCustDefault();
    this.getCustArea();

    // this.getCustAreaDetail();
  },
  components: {
    SignupOk,
    NoticeModal,
    PersonalModal,
  },
  watch: {
    confirmTempPassWord(text) {
      if (!text) {
        this.tempPasswordFlag = false;
      }
    },
    tempPasswordFlag() {
      if (!this.confirmTempPassWord) {
        this.tempPasswordFlag = false;
      }
    },
    selectValue1() {
      this.getCustAreaDetail();
    },
  },
  methods: {
    goLogin() {
      this.$modal.hide('SignupOk');
      this.$router.push('/signin');
    },
    clickDocs(firstDocsYN, secondDocsYN) {
      this.firstDocsYN = firstDocsYN;
      this.secondDocsYN = secondDocsYN;
      this.docsCheck();
      this.secondDocsCheck();
    },
    setSignupValid() {
      // 로그인 시 route param 받아오기
      if (this.$route.params.param) {
        this.trnYn = false;
        this.userCd = this.$route.params.param.userCd;
        // this.email = this.userCd;
        this.custNm = this.$route.params.param.userNm;
        this.ceoYn = this.$route.params.param.ceoYn;
        if (this.ceoYn) {
          this.ceoYn = true;
        } else {
          this.ceoYn = false;
        }
        this.tmpPsYn = this.$route.params.param.tmpPsYn;
      } else {
        this.ceoYn = true;
      }
    },
    // 임시비밀번호 검증 조회, 시간이 너무 오래 걸림.
    async checkCustTempPwd() {
      if (this.confirmTempPassWord) {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(this.confirmTempPassWord)) {
          const param = {
            userCd: this.aplyUserCd,
            tempPassWord: this.confirmTempPassWord,
          };
          try {
            const response = await joinApi.postCustTempPwd(param);
            if (response.data.rs.isVerified == true) {
              this.tempPasswordFlag = true;
              if (this.tempPassWord.length < 0) {
                this.tempPasswordFlag = false;
              }
            } else {
              this.tempPasswordFlag = false;
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
      } else if (!this.confirmTempPassWord) {
        return;
      }
    },
    // 전화번호 Join을 통해 String 형식 변경
    phoneNumJoin() {
      this.phoneNum.join('-');
    },
    // 회원가입(대표자)의 aplyUserCd(가입자 이메일)와 trnYn(운송사 Y/N)을 url에서 가져온다.
    getAplyUserCd() {
      this.aplyUserCd = this.$route.query.userCd;
      this.trnYn = this.$route.query.trnYn;
      this.email = this.aplyUserCd;

      if (this.trnYn == 'Y') {
        this.trnYn = true;
      } else if (this.trnYn == 'N') {
        this.trnYn = false;
      }
    },
    // 비밀번호 보기 버튼
    showPwd1() {
      this.type1 == 'password' ? ((this.type1 = 'text'), (this.icon1 = 'see')) : ((this.type1 = 'password'), (this.icon1 = 'not_see'));
    },
    // 비밀번호 보기 버튼
    showPwd2() {
      this.type2 == 'password' ? ((this.type2 = 'text'), (this.icon2 = 'see')) : ((this.type2 = 'password'), (this.icon2 = 'not_see'));
    },
    // 비밀번호 보기 버튼
    showPwd3() {
      this.type3 == 'password' ? ((this.type3 = 'text'), (this.icon3 = 'see')) : ((this.type3 = 'password'), (this.icon3 = 'not_see'));
    },
    // 회원가입자 주소 대권역 불러오기
    async getCustArea() {
      try {
        const response = await joinApi.getCustArea();
        this.selectOptions1 = response.data.ds;
        if (this.selectOptions1.length > 0) {
          this.selectValue1 = this.selectOptions1[0];
          this.getCustAreaDetail();
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
    // 회원가입자 주소 중권역 불러오기
    async getCustAreaDetail() {
      if (this.selectValue1) {
        const param = {
          prntCd: this.selectValue1.value,
        };
        try {
          const response = await joinApi.getCustAreaDetail(param);
          this.selectOptions2 = response.data.ds;
          this.setDistrCd();
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      } else if (!this.selectValue1) {
        //
      }
    },
    // 서비스 이용약관 전문보기
    firstDocsClick() {
      this.firstDocs = true;
      // this.ment = 'message.msgConditionMent2';
      this.ment = this.agree;
      this.titleMent = 'message.conditionInfo';
      this.$modal.show('PersonalModal');
    },
    docsCheck() {
      if (this.firstDocsYN == true) {
        this.docsYN = true;
      } else if (this.firstDocsYN == false) {
        this.docsYN = false;
      }
      return this.docsYN ? (this.serviceCheckStaus = true) : (this.serviceCheckStaus = false);
    },
    secondDocsCheck() {
      if (this.secondDocsYN == true) {
        this.docsYN2 = true;
      } else if (this.secondDocsYN == false) {
        this.docsYN2 = false;
      }
      return this.docsYN2 ? (this.privacyCheckStaus = true) : (this.privacyCheckStaus = false);
    },
    // 개인정보활용 동의 전문보기
    secondDocsClick() {
      this.secondDocs = true;
      // this.ment = 'message.msgConditionMent';
      this.ment = this.privacy;
      this.titleMent = 'message.personalInfo';
      this.$modal.show('PersonalModal');
    },
    // 서비스 이용약관 동의 체크박스 Validation
    checkLog() {
      if (this.docsYN === false) {
        this.$refs.check1.checked = false;
        this.serviceCheckStaus = false;
        this.ment = 'message.msgClickDocument';
        this.$modal.show('NoticeModal');
      }
      // 전문 확인 후, 서비스 이용약관 동의 체크박스 해제했을 경우 초기화
      if (this.serviceCheckStaus && this.docsYN) {
        this.firstDocs = false;
        this.docsYN = false;
        this.serviceCheckStaus = false;
      }
    },
    // 개인정보활용 동의 체크박스 Validation
    checkLog2() {
      if (this.docsYN2 === false) {
        this.$refs.check2.checked = false;
        this.privacyCheckStaus = false;
        this.ment = 'message.msgClickDocument';
        this.$modal.show('NoticeModal');
      }
      // 전문 확인 후, 개인정보동의 체크박스 해제했을 경우 초기화
      if (this.privacyCheckStaus && this.docsYN2) {
        this.secondDocs = false;
        this.docsYN2 = false;
        this.privacyCheckStaus = false;
      }
    },
    // 회원가입을 위한 전체 Validation 체크(이용약관 확인, 비밀번호 확인)
    checkAll() {
      if (this.serviceCheckStaus == true && this.privacyCheckStaus == true && this.tempPasswordFlag == true && this.passwordValidFlag == true && this.passwordCheckFlag == true) {
        return true;
      } else {
        return false;
      }
    },
    // noConfirmTempPwd() {
    //   if (!this.confirmTempPassWord) {
    //     this.noConfirmTempPwdFlag = true;
    //   } else {
    //     this.noConfirmTempPwdFlag = false;
    // }
    noNewPwd() {
      if (!this.newPassWord) {
        this.noNewPwdFlag = true;
      } else {
        this.noNewPwdFlag = false;
      }
      // this.noConfirmPwd();
    },
    noConfirmPwd() {
      if (!this.confirmPassWord) {
        this.noConfirmPwdFlag = true;
      } else {
        this.noConfirmPwdFlag = false;
      }
    },
    // 신규 비밀번호 유효성 검사
    passwordValid() {
      // 영문 대/소문자, 숫자가 각 1개 이상 존재, 8자 이상 16자 이하 처리
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(this.newPassWord) && this.newPassWord !== this.confirmTempPassWord) {
        this.passwordValidFlag = true;
        this.passwordCheckFlag = false;
      } else {
        this.passwordValidFlag = false;
      }

      if (this.newPassWord !== this.confirmPassWord) {
        this.passwordCheckFlag = false;
      }
    },
    // 비밀번호 확인, 신규 비밀번호의 유효성 검사 통과 + newPassword 와 confirmPassword의 일치여부 검사
    passwordCheckValid() {
      if (this.passwordValidFlag && this.newPassWord === this.confirmPassWord) {
        this.passwordCheckFlag = true;
      } else if (this.newPassWord !== this.confirmPassWord || !this.passwordValidFlag) {
        this.passwordCheckFlag = false;
      }
    },
    // 회원가입 정보 저장, (고객사 대표, 고객사 직원, 운송사 대표, 운송사 직원)
    async setCustDefault() {
      this.serviceCheckStaus = true; // 20230217 현업 요청사항 serviceCheckStaus = true로 고정

      this.noNewPwd();
      this.noConfirmPwd();
      // this.noConfirmPwd();
      if (this.checkAll() == true) {
        try {
          // ceoYn = Y = true = 고객사 대표 회원가입 = 고객사 대표자 저장 Api
          if (this.ceoYn == true && this.trnYn == false) {
            const param = {
              userCd: this.aplyUserCd,
              newPassWord: this.newPassWord,
              tempPassWord: this.confirmTempPassWord,
              userNm: this.userDefault.rs.ceoVnmNm ? this.userDefault.rs.ceoVnmNm : '-',
              phoneNum: this.phoneNum.join('-'),
              mobileNum: this.mobileNum.join('-'),
            };
            const response = await joinApi.setCustDefault(param);
            if (response) {
              const param = {
                userCd: this.aplyUserCd,
                tempPassWord: this.confirmTempPassWord,
                phoneNum: this.phoneNum.join('-'),
                mobileNum: this.mobileNum.join('-'),
                cityCd: this.selectValue1.value,
                distrCd: this.selectValue2.value,
                addr: this.addrDtls,
              };
              await joinApi.setCustAddr(param);
            }
            this.$modal.show('SignupOk');
            // ceoYn = N = false = 고객사 직원 회원가입 = 고객사 주소정보 저장 Api
          } else if (this.ceoYn == false && this.trnYn == false) {
            const param = {
              userCd: this.userCd,
              tempPassWord: this.confirmTempPassWord,
              phoneNum: this.phoneNum.join('-'),
              mobileNum: this.mobileNum.join('-'),
              cityCd: this.selectValue1.value,
              distrCd: this.selectValue2.value,
              addr: this.addrDtls,
            };
            const response = await joinApi.setCustAddr(param);
            if (response) {
              const param = {
                userCd: this.userCd,
                newPassWord: this.newPassWord,
                tempPassWord: this.confirmTempPassWord,
                userNm: 'CÔNG TY TNHH SX TM DV LỘC PHÁT',
                phoneNum: this.phoneNum.join('-'),
                mobileNum: this.mobileNum.join('-'),
              };
              await joinApi.setCustDefault(param);
            }
            this.$modal.show('SignupOk');
            // trnYn = Y = true 운송사 회원가입 = 운송사 대표자 저장 Api
          } else if (this.trnYn == true && this.ceoYn == true) {
            const param = {
              userCd: this.aplyUserCd,
              newPassWord: this.newPassWord,
              tempPassWord: this.confirmTempPassWord,
              userNm: this.userDefault.rs.ceoVnmNm ? this.userDefault.rs.ceoVnmNm : '-',
              phoneNum: this.phoneNum.join('-'),
              mobileNum: this.mobileNum.join('-'),
            };
            const response = await joinApi.setTransDefault(param);
            if (response) {
              const param = {
                userCd: this.aplyUserCd,
                tempPassWord: this.confirmTempPassWord,
                phoneNum: this.phoneNum.join('-'),
                mobileNum: this.mobileNum.join('-'),
                cityCd: this.selectValue1.value,
                distrCd: this.selectValue2.value,
                addr: this.addrDtls,
              };
              await joinApi.setTransAddr(param);
            }
            this.$modal.show('SignupOk');
            // trnYn = N = false 운송사 직원 회원가입 = 운송사 주소정보 저장 Api
          }
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      } else if (this.serviceCheckStaus == false || this.privacyCheckStaus == false) {
        this.ment = 'message.msgRequiredCheck';
        this.$modal.show('NoticeModal');
      }
      if (this.serviceCheckStaus == true && this.privacyCheckStaus == true && this.confirmTempPassWord && this.newPassWord && !this.confirmPassWord) {
        this.ment = 'message.errorsValidConfirmPwd';
        this.$modal.show('NoticeModal');
      }
      if (this.serviceCheckStaus == true && this.privacyCheckStaus == true && this.confirmTempPassWord && !this.newPassWord && !this.confirmPassWord) {
        this.ment = 'message.errorsValidNewPwd';
        this.$modal.show('NoticeModal');
      }
      if (this.serviceCheckStaus == true && this.privacyCheckStaus == true && !this.confirmTempPassWord && !this.newPassWord && !this.confirmPassWord) {
        this.ment = 'message.msgRequireTemp';
        this.$modal.show('NoticeModal');
      }
    },
    // 고객사 기본정보 조회
    async getCustDefault() {
      try {
        // 운송사 회원가입시, 운송사 기본정보 조회
        if (this.trnYn == true) {
          const param = {
            email: this.aplyUserCd,
          };
          const response = await joinApi.getTransDefault(param);
          this.userDefault = response.data;
          this.tempPassWord = this.userDefault.rs.tempPassWord;
          this.defaultCityCd = this.userDefault.rs.cityCd;
          this.defaultDistrtCd = this.userDefault.rs.distrCd;
          this.userNm = this.userDefault.rs.custVnmNm;
          this.addrDtls = this.userDefault.rs.addrDtlsVnm;
          // 고객사 대표자 회원가입 시, 고객사 기본정보 조회
        } else if (this.ceoYn == true && this.trnYn == false) {
          const param = {
            email: this.aplyUserCd,
          };
          const response = await joinApi.getCustDefault(param);
          this.userDefault = response.data;
          this.tempPassWord = this.userDefault.rs.tempPassWord;
          this.defaultCityCd = this.userDefault.rs.cityCd;
          this.defaultDistrtCd = this.userDefault.rs.distrCd;
          this.userNm = this.userDefault.rs.custVnmNm;
          this.addrDtls = this.userDefault.rs.addrDtlsVnm;
          // 고객사 직원 회원가입 시
        } else if (this.trnYn == false) {
          const param = {
            email: this.userCd,
            // email: this.userCd => 직원이 임시비밀번호로 로그인해서 회원가입 페이지로 넘어오게 되면 rotue에서 받아온다.
          };
          const response = await joinApi.getCustDefault(param);
          this.userDefault = response.data;
          this.tempPassWord = this.userDefault.rs.tempPassWord;
          this.defaultCityCd = this.userDefault.rs.cityCd;
          this.defaultDistrtCd = this.userDefault.rs.distrCd;
          this.userNm = this.userDefault.rs.custVnmNm;
          this.addrDtls = this.userDefault.rs.addrDtlsVnm;
        }
        // 고객사 기본정보를 통해 조회된 주소를 MultiSelect 값에 넣어둔다.
        if (this.defaultCityCd !== 'EXPORT') {
          this.intervalId = setInterval(this.setCityCd, 100);
          // this.selectValue1 = this.selectOptions1.find(option => option.value === this.defaultCityCd);

          // this.getCustAreaDetail(this.selectValue1);
        } else if (this.defaultCityCd == 'EXPORT') {
          this.selectValue1;
          this.selectValue2;
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
    setCityCd() {
      if (this.selectOptions1.length > 0) {
        this.selectValue1 = this.selectOptions1.find(option => option.value === this.defaultCityCd);
        clearInterval(this.intervalId);
      }
    },
    setDistrCd() {
      if (this.selectOptions2.length > 0) {
        this.selectValue2 = this.selectOptions2.find(option => option.value === this.defaultDistrtCd);
        if (!this.selecValue2 || Object.keys(this.selectValue2).length === 0) {
          this.selectValue2 = this.selectOptions2[0];
        }
      }
    },
    async getPrivacy() {
      try {
        const resp = await joinApi.getV2Privacy();
        this.privacy = resp.data.rs?.contents;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getAgree() {
      try {
        const resp = await joinApi.getV2Agree();
        this.agree = resp.data.rs?.contents;
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
  mounted() {
    this.getPrivacy();
    this.getAgree();
  },
};
</script>

<style lang="scss"></style>
