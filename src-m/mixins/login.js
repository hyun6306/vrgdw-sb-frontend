import { mapMutations } from 'vuex';
import loginApi from '@/api/login';
export default {
  data() {
    return {
      userCd: '',
      userPs: '',
      autoLogin: false,
    };
  },
  methods: {
    validation() {
      if (this.userCd === '') {
        this.isAlertMessageShow = true;
        this.message = 'message.msgRequiredId';
        return;
      } else if (this.userPs === '') {
        this.isAlertMessageShow = true;
        this.message = 'message.msgRequiredPwd';
        return;
      }
      if (/^D(\d{7})$/.test(this.userCd)) {
        this.loginAd();
      } else {
        this.login();
      }
    },
    setAuth(resp) {
      const vrgdwInfo = {
        Authorization: resp.headers.authorization,
        Token: resp.headers.token,
      };
      this.setAuthorization(vrgdwInfo.Authorization);
      this.setRefreshToken(vrgdwInfo.Token);
      this.setUserInfo(resp.data.rs.userInfo);
      this.$i18n.locale = resp.data.rs.userInfo.locale;
    },
    async loginAd() {
      const userPs = this.userPs;
      this.userPs = '';
      try {
        const resp = await loginApi.loginAd(this.userCd, userPs);
        this.setAuth(resp);
        this.registerPush(userPs);
        this.pageMove('/main');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async login() {
      const userPs = this.userPs;
      this.userPs = '';
      const path = this.$route.path;
      try {
        const resp = await loginApi.login(this.userCd, userPs);

        this.setAuth(resp);
        this.registerPush(userPs);
        if (!resp.data.redirect || resp.data.redirect === '') {
          if (resp.data.rs.userInfo.menuGrpCd === 'CAR_DRIVER') {
            this.pageMove('/tran/driver');
          } else {
            this.pageMove('/main');
          }
        } else if (resp.data.redirect === '/mypage/tmp-pw-update' && path.includes('signin')) {
          this.$modal.show('PwChangeModal', { type: 'tmp' });
        } else if (resp.data.redirect === '/mypage/old-pw-update' && path.includes('signin')) {
          this.$modal.show('PwChangeModal', { userPs, type: 'old' });
        } else if (resp.data.redirect && resp.data.redirect !== '' && !path.includes('signin')) {
          debugger;
          this.reset();
          this.$modal.show('AlarmYesReturnModal', { message: 'message.msgPasswordCycle', type: 'cycle' });
        }
      } catch (e) {
        if (this.$route.path === '/checkView') {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
          this.pageMove('/signin');
        } else {
          this.isAlertMessageShow = true;
          this.message = e.err.data.message;
        }
      }
    },
    registerPush(userPs) {
      if (this.$DWAPI) {
        this.$DWAPI.post(['registerPush', this.userCd]);
        let data = {
          notFirst: 'Y',
        };
        if (this.autoLogin) {
          data.userCd = this.userCd;
          data.userPs = userPs;
          data.autoLogin = this.autoLogin;
        }
        this.$DWAPI.post(['setStorageData', 'loginInfo', JSON.stringify(data)]);
      }
    },
    changePwd() {
      this.reset();
      this.userCd = '';
    },
    nextChange() {
      this.pageMove('/main');
    },
    pageMove(routerPath) {
      this.$router.push(routerPath + '?menuId=343');
    },
    ...mapMutations('userInfo', ['setAuthorization', 'setRefreshToken', 'setUserInfo']),
    ...mapMutations('userInfo', ['reset']),
  },
};
