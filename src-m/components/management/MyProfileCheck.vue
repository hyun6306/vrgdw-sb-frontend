<template>
  <div>
    <div class="memberinfoset_contents">
      <span class="memberinfoset_title">{{ $t('message.myProfileUpdate1') }}<br />{{ $t('message.myProfileUpdate2') }}</span>
      <div class="memberinfoset_box">
        <section class="login_form idpw_form">
          <div class="form_box">
            <span class="id_box">{{ this.userInfo.userCd }}</span>
          </div>
          <div class="form_box">
            <input id="normal_login_pw" :type="[pwdShow ? 'text' : 'password']" class="login_input" :placeholder="$t('message.errorsVaildPwd')" v-model="userPw" />
            <!-- 패스워드 보기 버튼
                  패스워드 입력시 on 클래스 추가
                  버튼 클릭시 see 클래스 추가
                  -->
            <button :class="[pwdShow ? 'btn_view_password on see' : 'btn_view_password on']" v-if="browser !== 'EDGE'" @click="pwdIcon"></button>
          </div>
          <button class="btn_search_idpw" @click="pwdCheck" v-if="authButton.fn1Auth == 'Y'">{{ $t('message.btnCheck') }}</button>
          <p class="alert_txt" v-if="loginError">
            <i class="icon_warning"></i>
            {{ $t(alertMent) }}
            <!-- 입력하신 정보와 일치하는 정보가 없습니다. -->
          </p>
        </section>
      </div>
    </div>
    <MoveLoginModal @okOrNo="okOrNo" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import loginApi from '@/api/login';
import MoveLoginModal from '@m/modal/management/MoveLoginModal';
export default {
  components: { MoveLoginModal },
  data() {
    return {
      userPw: '',
      pwdShow: false,
      //
      loginError: false,
      alertMent: '',
      errorCount: 0,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      browser: 'userInfo/getBrowser',
      authButton: 'userInfo/getAuthButton',
    }),
  },
  watch: {
    userPw() {
      this.loginError = false;
      this.alertMent = '';
    },
    errorCount(count) {
      if (count >= 5) {
        this.$modal.show('MoveLoginModal');
      }
    },
  },
  methods: {
    pwdIcon() {
      //비밀번호 아이콘
      this.pwdShow = !this.pwdShow;
    },
    async pwdCheck() {
      //비밀번호 확인
      if (this.userPw == '') {
        this.loginError = true;
        this.alertMent = 'message.msgRequiredPwd';
      } else {
        try {
          if (this.userInfo.userCd.match(/^D\d{7}$/) == null) {
            await loginApi.login(this.userInfo.userCd, this.userPw);
          } else {
            await loginApi.loginAd(this.userInfo.userCd, this.userPw);
          }
          this.errorCount = 0;
          this.$emit('checkSuss', { result: true, oldPwd: this.userPw });
        } catch (e) {
          console.log(e);
          this.errorCount += 1;
          this.loginError = true;
          this.alertMent = 'message.msgWrongPs';
        }
      }
    },
    ...mapMutations('userInfo', ['reset']),
    okOrNo(type) {
      //5회 오류 모달
      this.reset();
      if (type == false) {
        //홈으로
        this.$router.push('/signin');
      } else {
        //아이디비번찾기로
        this.$router.push('/id-search');
      }
    },
  },
};
</script>

<style></style>
