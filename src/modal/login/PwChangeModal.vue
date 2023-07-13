<template>
  <modal name="PwChangeModal" width="480" height="auto" :adaptive="true" @before-open="beforeOpen" @before-close="close" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('PwChangeModal')"></button>
      </div>
      <div class="modal_content">
        <div class="modal_form">
          <small v-if="page == 'login'">{{ $t('message.msgElapsePwd') }}</small>
          <small v-if="page == 'myInfo'"></small>
          <p class="modal_form_title" v-if="page == 'login'">{{ $t('message.msgChangeElapse') }}</p>
          <p class="modal_form_title" v-if="page == 'myInfo'">{{ $t('message.chgPwd') }}</p>
          <!-- <div :class="[nowPwd ? 'form_box on' : 'form_box']"> -->
          <div class="form_box">
            <input id="new_password" :type="type.now" :class="[nowPwd ? 'on' : '']" placeholder="" v-model="nowPwd" />
            <label for="new_password" class="label_pw">{{ $t('message.nowPwd') }}</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span :class="[check.now ? 'pw_check_active on' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" v-if="nowPwd" /></span>

            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="icon.now" @click="showIcon('now')" v-if="browser !== 'EDGE'"></button>
            <!-- <button :class="{ 'btn_view_password on': icon.now === 'not_see', 'btn_view_password on see': icon.now === 'see' }" @click="showNow" :disabled="nowPwd == ''"></button> -->
          </div>
          <!-- <div :class="[newPwd ? 'form_box on' : 'form_box']"> -->
          <div class="form_box">
            <input id="confirm_password01" :type="type.new" :class="[newPwd ? 'on' : '']" placeholder="" v-model="newPwd" />
            <label for="confirm_password01" class="label_pw">{{ $t('message.changePwd') }}</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span :class="[check.new ? 'pw_check_active on' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" v-if="newPwd" /></span>

            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="icon.new" @click="showIcon('new')" v-if="browser !== 'EDGE'"></button>
            <!-- <button :class="{ 'btn_view_password on': icon.new === 'not_see', 'btn_view_password on see': icon.new === 'see' }" @click="showNew" :disabled="newPwd == ''"></button> -->
          </div>
          <!-- <div :class="[confirmPwd ? 'form_box on' : 'form_box']"> -->
          <div class="form_box">
            <input id="confirm_password02" :type="type.confirm" :class="[confirmPwd ? 'on' : '']" placeholder="" v-model="confirmPwd" />
            <label for="confirm_password02" class="label_pw">{{ $t('message.changeCheck') }}</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span :class="[check.confirm ? 'pw_check_active on' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" v-if="confirmPwd" /></span>

            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="icon.confirm" @click="showIcon('confirm')" v-if="browser !== 'EDGE'"></button>
            <!-- <button :class="{ 'btn_view_password on': icon.confirm === 'not_see', 'btn_view_password on see': icon.confirm === 'see' }" @click="showConfirm" :disabled="confirmPwd == ''"></button> -->
          </div>
          <!-- <p class="input_alert">{{ $t('message.msgPwdNotice') }}</p> -->
          <p class="input_alert">{{ loginAlet }}</p>
        </div>
      </div>
      <div class="modal_btn_contents_t02">
        <button class="btn_gray" @click="changeNext" v-if="page == 'login'">
          {{ $t('message.btnChangeNext') }}
        </button>
        <button class="btn_primary" @click="changePwd()">
          {{ $t('message.btnChangePwd') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import loginApi from '@/api/login';
import stringUtil from '@/utils/stringUtil';

export default {
  name: 'PwChangeModal',
  data() {
    return {
      userPw: '',
      loginAlet: '',
      check: {
        now: false,
        new: false,
        confirm: false,
      },
      nowPwd: '',
      newPwd: '',
      confirmPwd: '',
      icon: {
        now: 'btn_view_password on',
        new: 'btn_view_password on',
        confirm: 'btn_view_password on',
      },
      type: {
        now: 'password',
        new: 'password',
        confirm: 'password',
      },
      page: '',
    };
  },
  computed: {
    ...mapGetters({
      browser: 'userInfo/getBrowser',
    }),
  },
  watch: {
    nowPwd(pwd) {
      this.loginAlet = '';
      this.check.now = this.userPw == pwd ? true : false;
    },
    newPwd(pwd) {
      this.loginAlet = '';
      // const reg = /^[0-9a-zA-Z]{8,}$/.test([pwd]);
      // !reg ? (this.check.new = false) : (this.check.new = true);
      const reg = stringUtil.pwdFormatCheck(pwd);
      this.check.new = reg;
      this.check.confirm = pwd === this.confirmPwd ? true : false;
    },
    confirmPwd(pwd) {
      this.loginAlet = '';
      this.check.confirm = pwd === this.newPwd ? true : false;
    },
  },
  methods: {
    beforeOpen(event) {
      this.userPw = event.params.userPw;
      this.page = event.params.page;
    },
    showIcon(data) {
      let showType = '';
      if (data == 'now') {
        showType = stringUtil.dataShowBtn(this.type.now);
        this.type.now = showType.type;
        this.icon.now = showType.ynShow;
      } else if (data == 'new') {
        showType = stringUtil.dataShowBtn(this.type.new);
        this.type.new = showType.type;
        this.icon.new = showType.ynShow;
      } else if (data == 'confirm') {
        showType = stringUtil.dataShowBtn(this.type.confirm);
        this.type.confirm = showType.type;
        this.icon.confirm = showType.ynShow;
      }
    },
    alertCheck() {
      if (this.nowPwd == '') {
        this.loginAlet = this.$i18n.t('message.errorsValidNowPwd');
        return false;
      } else if (this.newPwd == '') {
        this.loginAlet = this.$i18n.t('message.errorsValidChgPwd');
        return false;
      } else if (this.confirmPwd == '') {
        this.loginAlet = this.$i18n.t('message.errorsValidConfirmPwd');
        return false;
      }

      if (this.userPw !== this.nowPwd) {
        this.loginAlet = this.$i18n.t('message.msgWrongPwd');
        return false;
      }
      if (this.check.new == false) {
        this.loginAlet = this.$i18n.t('message.msgPwdNotice');
        return false;
      }
      if (this.check.confirm == false) {
        this.loginAlet = this.$i18n.t('message.msgMatchPwd');
        return false;
      }
      return true;
    },
    async changePwd() {
      this.loginAlet = '';
      let check = this.alertCheck();
      if (!check) {
        return;
      } else if (this.nowPwd == this.newPwd) {
        this.loginAlet = this.$i18n.t('message.errorsMatchNewNow');
        return;
      } else {
        if (this.page == 'login') {
          try {
            await loginApi.changePwd(this.nowPwd, this.newPwd);
            this.$parent.modalSuss('chg');
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        } else if (this.page == 'myInfo') {
          this.$parent.chgPwd('modal', this.newPwd);
        }
      }
    },
    async changeNext() {
      this.loginAlet = '';
      try {
        await loginApi.nextChange();
        this.$modal.hide('PwChangeModal');
        this.$parent.login();
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    close() {
      this.userPw = '';
      this.loginAlet = '';
      this.check = {
        now: false,
        new: false,
        confirm: false,
      };
      this.nowPwd = '';
      this.newPwd = '';
      this.confirmPwd = '';
      this.icon = {
        now: 'btn_view_password on',
        new: 'btn_view_password on',
        confirm: 'btn_view_password on',
      };
      this.type = {
        now: 'password',
        new: 'password',
        confirm: 'password',
      };
      this.page = '';
    },
  },
};
</script>

<style></style>
