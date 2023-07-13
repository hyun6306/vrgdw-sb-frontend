<template>
  <modal name="TempPwModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('TempPwModal')"></button>
      </div>
      <div class="modal_content">
        <div class="modal_form">
          <small>{{ $t('message.msgLoggedTemporary') }}</small>
          <p class="modal_form_title">
            {{ $t('message.msgChangeTemporary') }}
          </p>
          <!-- <div class="form_box" :class="[newPwd ? 'form_box on' : 'form_box']"> -->
          <div class="form_box">
            <input id="new_password" :type="type.new" :class="[newPwd ? 'on' : '']" placeholder="" v-model="newPwd" />
            <label for="new_password" class="label_pw">{{ $t('message.newPwd') }}</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <!-- <span :class="[newCheck ? 'pw_check_active on' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" v-if="newPwd" /></span> -->
            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="icon.new" @click="showNew" v-if="browser !== 'EDGE'"></button>
            <!-- <button :class="{ 'btn_view_password on': icon.new === 'not_see', 'btn_view_password on see': icon.new === 'see' }" @click="showNew" :disabled="newPwd == ''"></button> -->
          </div>
          <!-- <div :class="[confirmPwd ? 'form_box on' : 'form_box']"> -->
          <div class="form_box">
            <input id="confirm_password" :type="type.confirm" :class="[confirmPwd ? 'on' : '']" placeholder="" v-model="confirmPwd" />
            <label for="confirm_password" class="label_pw">{{ $t('message.newCheck') }}</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span :class="[confirmCheck ? 'pw_check_active on' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" v-if="confirmPwd" /></span>

            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="icon.confirm" @click="showConfirm" v-if="browser !== 'EDGE'"></button>
            <!-- <button :class="{ 'btn_view_password on': icon.confirm === 'not_see', 'btn_view_password on see': icon.confirm === 'see' }" @click="showConfirm" :disabled="confirmPwd == ''"></button> -->
          </div>
          <!-- <p class="input_alert">{{ $t('message.msgPwdNotice') }}</p> -->
          <p class="login_alert">{{ loginAlet }}</p>
        </div>
      </div>
      <div class="modal_btn_contents_t02">
        <button class="btn_primary" @click="confirm">
          {{ $t('message.btnSave') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
//임시 비밀번호 변경 모달
import { mapGetters } from 'vuex';
import stringUtil from '@/utils/stringUtil';
import loginApi from '@/api/login';

export default {
  name: 'TempPwModal',
  data() {
    return {
      newPwd: '',
      confirmPwd: '',
      type: {
        new: 'password',
        confirm: 'password',
      },
      icon: {
        new: 'btn_view_password on',
        confirm: 'btn_view_password on',
      },
      loginAlet: '',
      newCheck: false,
      confirmCheck: false,
      formCheck: false,
    };
  },
  computed: {
    ...mapGetters({
      browser: 'userInfo/getBrowser',
    }),
  },
  watch: {
    newPwd(pwd) {
      this.loginAlet = '';
      // this.formCheck = /^[A-Za-z0-9]{8,}$/.test([pwd]);
      this.formCheck = stringUtil.pwdFormatCheck(pwd);
      pwd === this.confirmPwd ? (this.confirmCheck = true) : (this.confirmCheck = false);
    },
    confirmPwd(pwd) {
      this.loginAlet = '';
      if (pwd === this.newPwd && this.formCheck == true) {
        this.confirmCheck = true;
      } else {
        this.confirmCheck = false;
      }
    },
  },
  methods: {
    showNew() {
      //눈 모양 버튼을 누르면 비밀번호가 보임
      // this.type.new == 'password' ? ((this.type.new = 'text'), (this.icon.new = 'see')) : ((this.type.new = 'password'), (this.icon.new = 'not_see'));
      const showType = stringUtil.dataShowBtn(this.type.new);
      this.type.new = showType.type;
      this.icon.new = showType.ynShow;
    },
    showConfirm() {
      // this.type.confirm == 'password' ? ((this.type.confirm = 'text'), (this.icon.confirm = 'see')) : ((this.type.confirm = 'password'), (this.icon.confirm = 'not_see'));
      const showType = stringUtil.dataShowBtn(this.type.confirm);
      this.type.confirm = showType.type;
      this.icon.confirm = showType.ynShow;
    },
    async confirm() {
      this.loginAlet = '';
      if (!this.newPwd) {
        this.loginAlet = this.$i18n.t('message.errorsValidNewPwd');
      } else if (!this.formCheck) {
        this.loginAlet = this.$i18n.t('message.msgPwdNotice');
      } else if (!this.confirmPwd) {
        this.loginAlet = this.$i18n.t('message.errorsValidConfirmPwd');
      } else if (this.newPwd !== this.confirmPwd) {
        this.loginAlet = this.$i18n.t('message.msgMatchNew');
      } else {
        try {
          await loginApi.tempPwd(this.newPwd);
          this.$parent.modalSuss('temp');
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
      // if (this.confirmCheck == true) {
      // }
    },
  },
};
</script>

<style></style>
