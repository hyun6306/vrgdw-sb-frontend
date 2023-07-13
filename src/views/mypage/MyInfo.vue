<template>
  <div>
    <!-- 비번입력 -->
    <div class="member_info_container" v-if="loginState == 'check'">
      <div class="join_regsit">
        <h2>{{ $t('message.msgReviseInfo') }}<br />{{ $t('message.msgReviseInfo2') }}</h2>
        <!-- 유저정보 -->
        <div class="join_regsit_content">
          <!-- 아이디 -->
          <div class="join_id">
            <span class="title_id">{{ $t('message.id') }}</span>
            <span class="id_txt">{{ this.userInfo.userCd }}</span>
          </div>
          <!-- 비밀번호 -->
          <div class="form_box">
            <input id="password" v-model="userPw" @keyup.enter="infoChg('pwCheck')" :type="type" :class="[userPw ? 'on' : '']" />
            <label for="password" class="label_pw">password</label>
            <span class="form_border"></span>
            <button @click="showPwd" :class="showbtn" v-if="browser !== 'EDGE'"></button>
          </div>
          <!-- 비밀번호 검증 실패 alert -->
          <p class="login_alert" v-if="loginError">{{ '!' + $t(alertMent) }}</p>
          <!-- 버튼 -->
          <div class="btn_box">
            <button class="btn_cancle" v-if="authButton.fn2Auth == 'Y'" @click="infoChg('cancel')">{{ $t('message.btnCancel') }}</button>
            <button class="btn_join" v-if="authButton.fn1Auth == 'Y'" @click="infoChg('pwCheck')">{{ $t('message.btnConfirm') }}</button>
          </div>
        </div>
      </div>
    </div>
    <MyPageAlarmModal @okOrNo="okOrNo" />
    <div v-if="loginState !== 'check'">
      <!-- 고객사 정보 -->
      <!-- <CompanyInfo v-if="loginState == 'CUSTOMER'" /> -->
      <!-- 운송사 정보 -->
      <!-- <TranCompanyInfo v-if="loginState == 'TRANSCUS'" /> -->
      <!-- 개인 정보 -->
      <DefaultInfo ref="defaultInfo" :infoData="infoData" />
      <PushInfo ref="pushInfo" :infoData="infoData" />
      <!-- //기본정보수정 -->
      <div class="board_footer">
        <div class="footer_left"></div>
        <!-- 삭제버튼, 저장버튼 -->
        <div class="footer_right">
          <button class="btn_default btn_function" v-if="authButton.fn3Auth == 'Y'" @click="infoReset">{{ $t('message.btnInit') }}</button>
          <button class="btn_default btn_critical_process" v-if="authButton.fn4Auth == 'Y'" @click="chgPwd('btn')">{{ $t('message.btnChangePwd') }}</button>
          <button class="btn_default btn_critical_process" v-if="authButton.savAuth == 'Y'" @click="saveInfo('btn')">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
    <AlarmYesReturnModal :page="page" @confirm="confirm()" />
    <PwChangeModal />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import stringUtil from '@/utils/stringUtil';
import loginApi from '@/api/login';
import myInfoApi from '@/api/mypage/myInfo';
import MyPageAlarmModal from '@/modal/mypage/MyPageAlarmModal';
import AlarmYesReturnModal from '@/modal/AlarmYesReturnModal.vue';
//
// import CompanyInfo from '@/components/mypage/CompanyInfo';
// import TranCompanyInfo from '@/components/mypage/TranCompanyInfo';
import DefaultInfo from '@/components/mypage/DefaultInfo';
import PushInfo from '@/components/mypage/PushInfo';
import PwChangeModal from '@/modal/login/PwChangeModal';

export default {
  props: ['page', 'authButton'],
  components: {
    // CompanyInfo,
    // TranCompanyInfo,
    DefaultInfo,
    PushInfo,
    //
    MyPageAlarmModal,
    AlarmYesReturnModal,
    PwChangeModal,
  },
  data() {
    return {
      //로그인
      userPw: '',
      showbtn: 'btn_view_password on',
      type: 'password',
      //로그인 실패 시
      loginError: false,
      errorCount: 0,
      //로그인 성공 시
      loginState: 'check',
      infoData: {},
      alertMent: '',
    };
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      //
      browser: 'userInfo/getBrowser',
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  watch: {
    loginState(state) {
      if (state !== 'check') {
        this.loadInfo();
      }
    },
    userPw(pw) {
      //비밀번호 입력시 로그인 오류 알림 메시지 안보이도록
      if (pw !== '') {
        this.alertMent = '';
      }
    },
    errorCount(e) {
      //로그인 5회 실패시 팝업 노출
      if (e >= 5) {
        this.$modal.show('MyPageAlarmModal');
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgWrongPs');
      }
    },
  },
  methods: {
    infoReset() {
      //회원정보 초기화
      this.$refs.defaultInfo.reset();
      this.$refs.pushInfo.reset();
    },
    async chgPwd(type, pwd = '') {
      //비밀번호 변경
      if (type == 'btn') {
        this.$modal.show('PwChangeModal', { userPw: this.userPw, page: 'myInfo' });
      } else if (type == 'modal') {
        this.$modal.hide('PwChangeModal');
        this.saveInfo('modal', pwd);
      }
    },
    async saveInfo(type, pwd = '') {
      //회원정보 저장
      try {
        let param = {};
        if (type == 'btn') {
          let defaultParam = this.$refs.defaultInfo.save();
          let pushParam = this.$refs.pushInfo.save();
          if (defaultParam !== false) {
            param = { ...defaultParam, ...pushParam, ...{ userPs: this.userPw } };
          }
        } else if (type == 'modal') {
          param = {
            userPs: pwd,
            userNm: this.infoData.userNm,
            phoneNumCt: this.infoData.phoneNumCt,
            phoneNum: this.infoData.phoneNum,
            mobileNumCt: this.infoData.mobileNumCt,
            mobileNum: this.infoData.mobileNum,
            pushYn: this.infoData.pushYn,
            emailYn: this.infoData.emailYn,
            menuGrpCd: this.infoData.menuGrpCd,
          };
        }
        await myInfoApi.saveMyInfoSave(param);
        if (this.infoData.menuGrpCd !== param.menuGrpCd) {
          this.$modal.show(`AlarmYesReturnModal${this.page}`, { message: 'message.msgChangeMenuGrpCd' });
        } else {
          this.userPw = pwd;
          await this.loadInfo();
          this.$EventBus.$emit('openYesModal', 'message.msgModifiedInfo');
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    confirm() {
      window.location.reload(true);
    },
    async loadInfo() {
      //개인정보상세 조회
      try {
        const response = await myInfoApi.getMyInfo();
        this.infoData = response.data.rs;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    ...mapMutations('userInfo', ['reset']),
    okOrNo(type) {
      //5회 오류 모달
      this.reset();
      if (type == false) {
        //홈으로
        this.$router.push('/');
      } else {
        //아이디비번찾기로
        this.$router.push('/id-search');
      }
    },
    async infoChg(type) {
      //버튼
      if (type == 'cancel') {
        //취소버튼 메인으로 이동
        this.$parent.deleteTabs('MyProfile');
      } else {
        if (this.userPw == '') {
          this.loginError = true;
          this.alertMent = 'message.msgRequiredPwd';
        } else {
          //비밀번호 체크 후 맞으면 정보수정으로 이동
          try {
            if (this.userInfo.userCd.match(/^D\d{7}$/) == null) {
              const response = await loginApi.login(this.userInfo.userCd, this.userPw);
              console.log('로그인 시도 : ', response);
              if (response.data.status == 200) {
                this.errorCount = 0;
                this.loginState = this.userMenuGrpCd;
              }
            } else {
              const response = await loginApi.loginAd(this.userInfo.userCd, this.userPw);
              if (response.data.status == 200) {
                this.errorCount = 0;
                this.loginState = this.userMenuGrpCd;
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
        }
      }
    },
    //
    showPwd() {
      //눈 모양 버튼을 누르면 비밀번호가 보임
      const showType = stringUtil.dataShowBtn(this.type);
      this.type = showType.type;
      this.showbtn = showType.ynShow;
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
