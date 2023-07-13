<template>
  <div class="wrap">
    <div class="container" id="container_login">
      <div class="contents login_contents">
        <section class="login_title">
          <span class="logo in_img"><img src="@m/assets/img/login_title.png" /></span>
          <span class="logo_subtxt">{{ $t('message.msgLoginWelcome') }}</span>
        </section>
        <section class="login_form">
          <div class="form_box">
            <input id="" type="text" class="login_input on" v-model="userCd" @input="$event => (userCd = $event.target.value.trim())" />
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <!-- <span class="pw_check_active in_img on"><img src="@m/assets/img/icon_check.png" /></span> -->
          </div>
          <div class="form_box">
            <input id="normal_login_pw" :type="[isShow ? 'text' : 'password']" class="login_input" v-model="userPs" />
            <!-- autoComplete="on" 추가시 권고사항은 없어지나 visible 컨트롤 불가.-->

            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="[isShow ? 'btn_view_password see' : 'btn_view_password']" @click="isShow = !isShow"></button>
          </div>
          <div class="check_idpw">
            <label class="chechbox_basic">
              <input type="checkbox" v-model="autoLogin" />
              <span class="checkmark"></span> {{ $t('message.autoLogin') }}
            </label>
            <a class="login-form-forgot" @click="pageMove('/id-search')">{{ $t('message.msgLoginForget') }}</a>
          </div>
          <button class="btn_login" @click="validation">{{ $t('message.btnLogin') }}</button>
          <p class="alert_txt" v-if="isAlertMessageShow">
            <i class="icon_warning"></i>
            !{{ $t(message) }}
          </p>
          <p class="alert_txt" style="padding-left: 0; color: #999999" @click="$modal.show('PrivacyModal')">{{ $t('message.privatePolicy') }}</p>
        </section>
        <p class="login_footer" @click="showLocal++">Copyright VRG Dongwha MDF. All rights reserved.</p>
        <PwChangeModal @nextChange="nextChange" @changePwd="changePwd" />
      </div>
    </div>
    <PrivacyModal />
    <div v-if="showLocal > 9">
      <button style="margin: 5px" @click="setLocal">set localhost</button>
      <button style="margin: 5px" @click="setReal">set real</button>
    </div>
  </div>
</template>

<script>
import PwChangeModal from '@m/modal/login/PwChangeModal';
import loginJs from '@m/mixins/login';
import PrivacyModal from '@m/modal/PrivacyModal';

export default {
  components: {
    PwChangeModal,
    PrivacyModal,
  },
  data() {
    return {
      isShow: false,
      userCd: '',
      userPs: '',
      autoLogin: false,
      isAlertMessageShow: false,
      message: '',
      showLocal: 0,
    };
  },
  mixins: [loginJs],
  watch: {
    userCd() {
      this.isAlertMessageShow = false;
    },
    userPs() {
      this.isAlertMessageShow = false;
    },
  },
  methods: {
    changePwd() {
      this.reset();
      this.userCd = '';
    },
    nextChange() {
      this.pageMove('/main');
    },
    setLocal() {
      sessionStorage.setItem('isdev', 'http://localhost');
    },
    setReal() {
      sessionStorage.removeItem('isdev');
    },
  },
  created() {},
  mounted() {},
};
</script>
