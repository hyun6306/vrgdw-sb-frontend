<template>
  <div class="login_wrap">
    <div class="login_container">
      <span class="logo"><img src="@/assets/img/logo.png" /></span>
      <h1><img src="@/assets/img/login_subtitle.png" alt="D-Sales & LOGISTCS SYSTEM" /></h1>
      <small>{{ $t('message.msgLoginWelcome') }}</small>
      <div class="idpw_form">
        <div id="TabS">
          <ul class="tab-menu">
            <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
              <a v-on:click="currentTab = index">{{ tab }}</a>
            </li>
          </ul>
          <div class="tab-content tab-idpw-content">
            <div v-show="currentTab == 0">
              <IdSearch ref="idSearch" />
            </div>
          </div>
          <div class="tab-content">
            <div v-show="currentTab == 1">
              <PwSearch ref="pwdSearch" />
            </div>
          </div>
        </div>
        <p class="login_alert" v-if="alertMsg">
          {{ alertMsg }}
        </p>
        <button class="btn_login" @click="search">
          {{ $t('message.btnSearch') }}
        </button>
        <div class="id_search_result_box" v-if="success">
          <p class="user_id">
            {{ $t('message.msgYourId1') }}
            <span>{{ userCd }}</span>
            {{ $t('message.msgYourId2') }}
          </p>
          <a @click="$router.push('/signin')">{{ $t('message.loginLink') }}</a>
        </div>
      </div>
      <p class="login_footer">Copyright VRG Dongwha MDF. All rights reserved.</p>
    </div>
    <IdPwModal />
  </div>
</template>

<script>
import loginApi from '@/api/login';
import IdSearch from '@/components/login/IdSearch.vue';
import PwSearch from '@/components/login/PwSearch.vue';
import IdPwModal from '@/modal/login/IdPwModal.vue';

export default {
  data() {
    return {
      alertMsg: '',
      success: false,
      userCd: '',
      infoType: '',
      info: '',
      currentTab: 0,
      searchInfo: '',
      tabs: [this.$i18n.t('message.searchId'), this.$i18n.t('message.searchPwd')],
    };
  },
  components: {
    IdSearch,
    PwSearch,
    IdPwModal,
  },
  watch: {
    currentTab() {
      this.alertMsg = '';
      this.success = false;
    },
  },
  created() {},
  methods: {
    alertRefresh() {
      this.alertMsg = '';
      this.success = false;
    },
    async search() {
      this.alertRefresh();
      try {
        if (this.currentTab == 0) {
          this.searchInfo = this.$refs.idSearch.searchInfo();
          if (this.searchInfo.userNm == '') {
            this.alertMsg = this.$i18n.t('message.errorsValidUserNm');
            return;
          } else if (this.searchInfo.bizNum == '') {
            this.alertMsg = this.$i18n.t('message.errorsValidBizNum');
            return;
          }
          if (this.searchInfo.custCd == '') {
            this.alertMsg = this.$i18n.t('message.errorsValidCustCd');
            return;
          }
          const response = await loginApi.idSearch(this.searchInfo);
          this.userCd = response.data.rs.userCd;
          this.alertMsg = '';
          this.success = true;
        } else if (this.currentTab == 1) {
          this.searchInfo = this.$refs.pwdSearch.searchInfo();
          if (this.searchInfo.userCd == '') {
            this.alertMsg = this.$i18n.t('message.errorsValidIdCheck');
            return;
          } else if (this.searchInfo.userNm == '') {
            this.alertMsg = this.$i18n.t('message.errorsValidUserNm');
            return;
          }
          const response = await loginApi.pwSearch(this.searchInfo);
          this.alertMsg = '';
          const redirect = response.data.redirect;
          this.$modal.show('IdPwModal', { redirect: redirect });
        } else {
          return;
        }
      } catch (err) {
        const fail = err.err.data.status;
        if (fail == '404') {
          this.alert = true;
          this.alertMsg = this.$i18n.t('message.msgSearchMatch');
        }
      }
    },
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
