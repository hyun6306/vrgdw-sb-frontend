<template>
  <div class="login_wrap">
    <div class="login_container">
      <span class="logo"><img src="@/assets/img/logo.png" /></span>
      <h1><img src="@/assets/img/login_subtitle.png" alt="D-Sales & LOGISTCS SYSTEM" /></h1>
      <small>{{ $t('message.msgLoginWelcome') }}</small>

      <div class="login_form">
        <div class="form_box">
          <input id="normal_login_userName" type="text" :class="[userCd ? 'on' : '']" placeholder="example@dongwha.com" v-model="userCd" @keyup.enter="login()" @input="$event => (userCd = $event.target.value.trim())" />
          <label for="normal_login_userName" class="label_id">{{ $t('message.msgRequiredEmail') }}</label>
          <span class="form_border"></span>
        </div>
        <div class="form_box">
          <input id="normal_login_pw" :type="[pwdShow ? 'text' : 'password']" :class="[userPw ? 'on' : '']" placeholder="" v-model="userPw" @keyup.enter="login()" />
          <label for="normal_login_pw" class="label_pw">{{ $t('message.pwd') }}</label>
          <span class="form_border"></span>
          <button :class="[pwdShow ? 'btn_view_password see' : 'btn_view_password']" @click="pwdShow = !pwdShow" v-if="browser !== 'EDGE'"></button>
        </div>
        <p class="login_alert">{{ loginAlet }}</p>

        <button class="btn_login" @click="login">
          {{ $t('message.btnLogin') }}
        </button>
        <div class="check_idpw">
          <label class="chechbox_basic">
            <input type="checkbox" v-model="saveId" true-value="Y" false-value="N" />
            <span class="checkmark"></span> {{ $t('message.loginSave') }}
          </label>
          <a class="login-form-forgot" @click="forgetUser">{{ $t('message.msgLoginForget') }}</a>
        </div>
      </div>
      <p class="login_footer" @click="showLocal++">Copyright VRG Dongwha MDF. All rights reserved.</p>
    </div>
    <div v-if="showLocal > 9">
      <button style="margin: 5px" @click="setLocal">set localhost</button>
      <button style="margin: 5px" @click="setReal">set real</button>
    </div>
    <IdPwModal />
    <TempPwModal />
    <PwChangeModal />
    <AlarmYesModal :ment="ment" />
  </div>
</template>

<script>
import loginApi from '@/api/login';
import { mapMutations, mapGetters } from 'vuex';
import IdPwModal from '@/modal/login/IdPwModal.vue';
import TempPwModal from '@/modal/login/TempPwModal.vue';
import PwChangeModal from '@/modal/login/PwChangeModal.vue';
import AlarmYesModal from '@/modal/order/AlarmYesModal.vue';

export default {
  data() {
    return {
      userCd: '',
      userPw: '',
      pwdShow: false,
      loginAlet: '',
      saveId: 'N',
      ment: '',
      showLocal: 0,
    };
  },
  watch: {
    saveId(Yn) {
      if (Yn == 'N') {
        localStorage.setItem('saveCheck', 'N');
        localStorage.setItem('saveId', '');
      }
    },
    userCd() {
      this.loginAlet = '';
    },
    userPw(data) {
      if (data == 'loginFail') {
        this.userPw = '';
      } else if (data) {
        this.loginAlet = '';
      }
    },
  },
  created() {
    //저장한 아이디 값 가져오기
    const localCheck = localStorage.getItem('saveCheck');
    if (localCheck == 'Y') {
      const localId = localStorage.getItem('saveId');
      if (localCheck && localId) {
        this.userCd = localId;
        this.saveId = localCheck;
      }
    }
    this.reset(true);
  },
  computed: {
    ...mapGetters({
      browser: 'userInfo/getBrowser',
    }),
  },
  components: {
    IdPwModal,
    TempPwModal,
    PwChangeModal,
    AlarmYesModal,
  },
  methods: {
    setLocal() {
      sessionStorage.setItem('isdev', 'http://localhost');
    },
    setReal() {
      sessionStorage.removeItem('isdev');
    },
    showChgModal(pw) {
      this.$modal.show('PwChangeModal', { userPw: pw, page: 'login' });
    },
    forgetUser() {
      this.$router.push('/id-search');
    },
    modalSuss(type) {
      if (type == 'temp') {
        this.$modal.hide('TempPwModal');
      } else {
        this.$modal.hide('PwChangeModal');
      }
      this.reset();
    },
    async login() {
      this.loginAlet = '';
      // eslint-disable-next-line
      let idValid = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
      let adValid = /^D\d{7}$/;
      if (!this.userCd) {
        this.loginAlet = this.$i18n.t('message.msgRequiredId');
        return;
      } else if (this.userCd.match(idValid) == null && this.userCd !== 'system' && this.userCd.match(adValid) == null) {
        this.loginAlet = this.$i18n.t('message.errorsValidIdForm');
        return;
      } else if (!this.userPw) {
        this.loginAlet = this.$i18n.t('message.msgRequiredPwd');
        return;
      }

      try {
        if (this.userCd.match(/^D\d{7}$/) == null) {
          const response = await loginApi.login(this.userCd, this.userPw.trim());
          if (response.data.status == 200) {
            localStorage.setItem('saveCheck', this.saveId);
            localStorage.setItem('saveId', this.userCd);
          }

          const vrgdwInfo = {
            Authorization: response.headers.authorization,
            Token: response.headers.token,
          };
          this.setAuthorization(vrgdwInfo.Authorization);
          //로그인 후 redirect값이 있다면, 그 값으로 이동
          const redirect = response.data.redirect;
          if (redirect == '/mypage/tmp-pw-update') {
            this.$modal.show('TempPwModal');
            this.userPw = '';
          } else if (redirect) {
            this.$modal.show('IdPwModal', {
              redirect: redirect,
              userPw: this.userPw,
            });
          } else {
            let params = {
              userCd: response.data.rs.userInfo.userCd,
              ceoYn: response.data.rs.userInfo.ceoYn,
              tmpPsYn: response.data.rs.userInfo.tmpPsYn,
              userNm: response.data.rs.userInfo.userNm,
            };
            if (redirect == null && params.tmpPsYn == 'Y' && params.ceoYn == 'N') {
              this.$router.push({ name: 'Signup', params: { params } });
            } else {
              this.setRefreshToken(vrgdwInfo.Token);
              this.setUserInfo(response.data.rs.userInfo);
              this.$i18n.locale = response.data.rs.userInfo.locale;
              this.$router.push('/main');
            }
          }
        } else {
          const response = await loginApi.loginAd(this.userCd, this.userPw);
          if (response.data.status == 200) {
            localStorage.setItem('saveCheck', this.saveId);
            localStorage.setItem('saveId', this.userCd);
          }
          const vrgdwInfo = {
            Authorization: response.headers.authorization,
            Token: response.headers.token,
          };
          this.setAuthorization(vrgdwInfo.Authorization);
          this.setRefreshToken(vrgdwInfo.Token);
          this.setUserInfo(response.data.rs.userInfo);
          this.$i18n.locale = response.data.rs.userInfo.locale;
          this.$router.push('/main');
        }
      } catch (err) {
        if (err.err.data.status == 401) {
          if (this.userCd.match(/^D\d{7}$/) !== null) {
            this.ment = err.err.data.message;
            this.$modal.show('OrderAlarmYesModal');
          } else {
            this.loginAlet = this.$i18n.t('message.msgLoginMatch');
            const redirect = err.err.data.redirect;
            if (redirect) {
              this.$modal.show('IdPwModal', { redirect: redirect });
            }
            this.userPw = 'loginFail';
          }
        }
      }
    },
    ...mapMutations('userInfo', ['setAuthorization', 'setRefreshToken', 'setUserInfo', 'reset']),
  },
};
</script>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
