<template>
  <modal name="PwChangeModal" width="90%" height="auto" :adaptive="true" @before-open="open" @before-close="reset">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="[reset(), $modal.hide('PwChangeModal')]"></button>
      </div>
      <!-- <p class="modal_title">임시비밀번호 로그인</p> -->
      <div class="modal_content">
        <div class="new_password">
          <p class="new_password_title" v-if="type === 'old'">
            {{ $t('message.msgElapsePwd2') }}<i class="fr">{{ $t('message.msgElapsePwd3') }}</i
            >{{ $t('message.msgElapsePwd4') }}
          </p>
          <small class="new_password_subtxt" v-if="type === 'old'">{{ $t('message.msgChangeElapse') }}</small>
          <p class="new_password_title" v-if="type === 'tmp'">{{ $t('message.msgChangeElapse') }}<br />{{ $t('message.msgLoggedTemporary2') }}</p>
          <small class="new_password_subtxt" v-if="type === 'tmp'">{{ $t('message.msgLoggedTemporary3') }}</small>
          <p class="new_password_title" v-if="type === 'myInfo'">{{ $t('message.chgPwd') }}</p>
          <small class="new_password_subtxt" v-if="type === 'myInfo'"></small>

          <section class="login_form idpw_form" v-if="type === 'old' || type == 'myInfo'">
            <strong class="idpw_form_title" v-if="type === 'old'">{{ $t('message.msgChangeTemporary') }}</strong>
            <strong class="idpw_form_title" v-else>{{ $t('message.nowPwd') }}</strong>
            <div class="form_box">
              <input id="new-password" :type="[isShow.current ? 'text' : 'password']" class="login_input" v-model="password.current" />
              <!-- 패스워드 보기 버튼
                    패스워드 입력시 on 클래스 추가
                    버튼 클릭시 see 클래스 추가
                    -->
              <button :class="[isShow.current ? 'btn_view_password see' : 'btn_view_password']" @click="isShow.current = !isShow.current"></button>
            </div>
            <p class="alert_txt" v-if="checkPassword.current.visible">{{ $t(checkPassword.current.message) }}</p>
          </section>
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
            <p class="alert_txt" v-if="checkPassword.change.visible">{{ $t(checkPassword.change.message) }}</p>
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
            <p class="alert_txt" v-if="checkPassword.confirm.visible">{{ $t(checkPassword.confirm.message) }}</p>
          </section>
        </div>
        <div class="modal_btn_contents">
          <button class="btn_next_change" @click="nextChange" v-if="type === 'old'">{{ $t('message.btnChangeNext') }}</button>
          <button class="btn_primary" @click="validation">{{ $t('message.btnchangePwd') }}</button>
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
  name: 'PwChangeModal',
  components: {
    AlarmYesReturnModal,
  },
  data() {
    return {
      isShow: {
        current: false,
        change: false,
        confirm: false,
      },
      password: {
        currentCheck: '',
        current: '',
        change: '',
        confirm: '',
      },
      checkPassword: {
        current: {
          visible: false,
          message: '',
        },
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
      type: '',
    };
  },
  watch: {
    'password.current': function () {
      this.checkPassword.current.visible = false;
      this.serverMessage = '';
    },
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
        current: false,
        change: false,
        confirm: false,
      };
      this.password = {
        currentCheck: '',
        current: '',
        change: '',
        confirm: '',
      };
      this.checkPassword = {
        current: {
          visible: false,
          message: '',
        },
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
    open(event) {
      this.password.currentCheck = event.params.userPs;
      this.type = event.params.type;
    },
    validation() {
      if (this.type === 'old' || this.type == 'myInfo') {
        if (this.password.current === '') {
          this.checkPassword.current.visible = true;
          this.checkPassword.current.message = 'message.errorsValidNowPwd';
          return;
        } else if (!stringUtil.pwdFormatCheck(this.password.current)) {
          this.checkPassword.current.visible = true;
          this.checkPassword.current.message = 'message.msgWrongForm';
          return;
        } else if (this.password.currentCheck !== this.password.current) {
          this.checkPassword.current.visible = true;
          this.checkPassword.current.message = 'message.msgWrongPwd2';
          return;
        }
      }

      if (this.password.change === '') {
        this.checkPassword.change.visible = true;
        this.checkPassword.change.message = 'message.errorsValidNewPwd';
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
      if (this.type === 'old') {
        this.changePwd();
      } else if (this.type === 'tmp') {
        this.tempPwd();
      } else if (this.type == 'myInfo') {
        this.$parent.chgPwd('modal', this.password.change);
      }
    },
    async changePwd() {
      try {
        await loginApi.changePwd(this.password.current, this.password.change);
        this.$modal.show('AlarmYesReturnModal', { message: 'message.msgSucessPwd', type: 'changePwd' });
      } catch (e) {
        this.serverMessage = e.err.data.message;
      }
    },
    async nextChange() {
      try {
        await loginApi.nextChange();
        this.$modal.show('AlarmYesReturnModal', { message: 'message.msgReExposed', type: 'nextChange' });
      } catch (e) {
        this.serverMessage = e.err.data.message;
      }
    },
    async tempPwd() {
      try {
        await loginApi.tempPwd(this.password.change);
        this.$modal.show('AlarmYesReturnModal', { message: 'message.msgSucessPwd', type: 'changePwd' });
      } catch (e) {
        this.serverMessage = e.err.data.message;
      }
    },
    confirm(type) {
      if (type === 'changePwd') {
        this.$emit('changePwd');
      } else if (type === 'nextChange') {
        this.$emit('nextChange');
      }
      this.reset();
      this.$modal.hide('PwChangeModal');
    },
  },
};
</script>

<style></style>
