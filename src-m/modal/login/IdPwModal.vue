<template>
  <modal name="IdPwModal" width="90%" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="[reset(), $modal.hide('IdPwModal')]"></button>
      </div>
      <!-- <p class="modal_title">임시비밀번호 로그인</p> -->
      <div class="modal_content">
        <div class="new_password">
          <p class="new_password_title">{{ $t('message.msgLoggedTemporary2') }}<br />{{ $t('message.msgLoggedTemporary3') }}</p>
          <small class="new_password_subtxt">{{ $t('message.msgChangeTemporary') }}</small>
          <section class="login_form idpw_form">
            <strong class="idpw_form_title">{{ $t('message.changePwd') }}</strong>
            <small class="idpw_form_subtxt">{{ $t('message.msgPwdRule') }}</small>
            <div class="form_box">
              <input id="new-password-check" :type="[isShow.change ? 'text' : 'password']" class="login_input" v-model="password.change" />
              <!-- 패스워드 보기 버튼
                    패스워드 입력시 on 클래스 추가
                    버튼 클릭시 see 클래스 추가
                    -->

              <button :class="[isShow.change ? 'btn_view_password see' : 'btn_view_password']" @click="isShow.change = !isShow.change"></button>
            </div>
            <p class="alert_txt" v-if="checkPassword.change.visible">{{ checkPassword.change.message }}</p>
          </section>
          <section class="login_form idpw_form">
            <strong class="idpw_form_title">{{ $t('message.changeCheck2') }}</strong>
            <div class="form_box">
              <input id="new-password" :type="[isShow.confirm ? 'text' : 'password']" class="login_input" v-model="password.confirm" />
              <!-- 패스워드 보기 버튼
                    패스워드 입력시 on 클래스 추가
                    버튼 클릭시 see 클래스 추가
                    -->
              <button :class="[isShow.confirm ? 'btn_view_password see' : 'btn_view_password']" @click="isShow.confirm = !isShow.confirm"></button>
            </div>
            <p class="alert_txt" v-if="checkPassword.confirm.visible">{{ checkPassword.confirm.message }}</p>
          </section>
        </div>
        <div class="modal_btn_contents">
          <button class="btn_primary" @click="validation">{{ $t('button.ok') }}</button>
        </div>
        <p class="alert_txt">
          <i class="icon_warning" v-if="serverMessage !== ''"></i>
          {{ serverMessage }}
        </p>
      </div>
    </div>
    <AlarmYesReturnModal @confirm="confirm" />
  </modal>
</template>

<script>
import AlarmYesReturnModal from '@m/modal/AlarmYesReturnModal';
import stringUtil from '@/utils/stringUtil';
import loginApi from '@/api/login';

export default {
  name: 'IdPwModal',
  components: {
    AlarmYesReturnModal,
  },
  data() {
    return {
      isShow: {
        change: false,
        confirm: false,
      },
      password: {
        change: '',
        confirm: '',
      },
      checkPassword: {
        change: {
          visible: false,
          message: '',
        },
        confirm: {
          visible: false,
          message: '',
        },
      },
      serverMessage: '',
    };
  },
  watch: {
    'password.change': function () {
      this.checkPassword.change.visible = false;
      this.serverMessage = '';
    },
    'password.confirm': function () {
      this.checkPassword.confirm.visible = false;
      this.serverMessage = '';
    },
  },
  methods: {
    reset() {
      this.isShow = {
        change: false,
        confirm: false,
      };
      this.password = {
        change: '',
        confirm: '',
      };
      this.checkPassword = {
        change: {
          visible: false,
          message: '',
        },
        confirm: {
          visible: false,
          message: '',
        },
      };
      this.serverMessage = '';
    },
    validation() {
      if (this.password.change === '') {
        this.checkPassword.change.visible = true;
        this.checkPassword.change.message = 'message.errorsValidChgPwd';
        return;
      } else if (!stringUtil.pwdFormatCheck(this.password.change)) {
        this.checkPassword.change.visible = true;
        this.checkPassword.change.message = 'message.msgWrongForm';
        return;
      }

      if (this.password.confirm === '') {
        this.checkPassword.confirm.visible = true;
        this.checkPassword.confirm.message = 'message.errorsValidConfirmPwd';
        return;
      } else if (!stringUtil.pwdFormatCheck(this.password.confirm)) {
        this.checkPassword.confirm.visible = true;
        this.checkPassword.confirm.message = 'message.msgWrongForm';
        return;
      } else if (this.password.confirm !== this.password.change) {
        this.checkPassword.confirm.visible = true;
        this.checkPassword.confirm.message = 'message.msgMatchPwd';
        return;
      }
      this.tempPwd();
    },
    async tempPwd() {
      try {
        await loginApi.tempPwd(this.password.change);
        this.$modal.show('AlarmYesReturnModal', { message: 'message.msgSucessPwd', type: 'tempPwd' });
      } catch (e) {
        this.serverMessage = e.err.data.message;
      }
    },
    confirm(type) {
      if (type === 'tempPwd') {
        this.$emit('changePwd');
      }
      this.reset();
      this.$modal.hide('IdPwModal');
    },
  },
};
</script>

<style></style>
