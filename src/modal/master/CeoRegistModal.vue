<template>
  <modal name="CeoRegistModal" width="480" height="auto" :adaptive="true" :clickToClose="false" @before-open="open" @before-close="close">
    <div class="modal modal_new">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('CeoRegistModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.registCeo') }}</p>

      <div class="modal_content">
        <div class="modal_form">
          <div class="form_box">
            <input id="normal_login_userName" type="text" :class="[userCd ? 'on' : '']" placeholder="example@dongwha.com" v-model="userCd" />
            <label for="normal_login_userName" class="label_pw">{{ $t('message.email') }}</label>
            <span class="form_border"></span>
            <span :class="[idCheck ? 'pw_check_active on' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" /></span>
          </div>
          <div class="form_box">
            <input id="normal_login_pw" :type="pwdType" :class="[userPwd ? 'on' : '']" placeholder="" v-model="userPwd" />
            <label for="normal_login_pw" class="label_pw">{{ $t('message.pwd') }}</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span :class="[pwdCheck ? 'pw_check_active on' : 'pw_check_active off']"><img src="@/assets/img/icon_check.png" /></span>
            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button :class="showbtn" @click="pwdBtn" v-if="browser !== 'EDGE'"></button>
          </div>
          <p class="input_alert">{{ $t(ment) }}</p>
        </div>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_default" @click="$modal.hide('CeoRegistModal')">{{ $t('message.btnCancel') }}</button>
        <button class="btn_default btn_primary" @click="addCeo">{{ $t('message.btnCheck') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
import masterApi from '@/api/master/master';
import stringUtil from '@/utils/stringUtil';
import { mapGetters } from 'vuex';

export default {
  name: 'CeoRegistModal',
  data() {
    return {
      id: '',
      userCd: '',
      idCheck: false,
      pwdType: 'password',
      userPwd: '',
      pwdCheck: false,
      showbtn: 'btn_view_password on',
      ment: '',
    };
  },
  computed: {
    ...mapGetters({
      browser: 'userInfo/getBrowser',
    }),
  },
  watch: {
    userCd(emial) {
      this.ment = '';
      const reg = stringUtil.emailFormatCheck(emial);
      this.idCheck = reg;
    },
    userPwd(pwd) {
      //비밀번호 형식
      this.ment = '';
      const reg = stringUtil.pwdFormatCheck(pwd);
      this.pwdCheck = reg;
    },
  },
  methods: {
    pwdBtn() {
      const showType = stringUtil.dataShowBtn(this.pwdType);
      this.pwdType = showType.type;
      this.showbtn = showType.ynShow;
    },
    async addCeo() {
      //저장
      if (this.vaild() == true) {
        try {
          let param = {
            custId: this.id,
            aplyUserCd: this.userCd,
            aplyTmpPs: this.userPwd,
            saveYn: 'Y',
            testMail: '',
          };
          await masterApi.putAccAplyInfo(param);
          this.$parent.saveCeo();
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    vaild() {
      let check = true;

      if (this.id == '') {
        //고객사아이디없음
        this.$parent.saveCeo('error');
      } else if (this.userCd == '') {
        //아이디없음
        this.ment = 'message.msgRequiredEmail';
        check = false;
      } else if (this.idCheck == false) {
        //비밀번호 없음
        this.ment = 'message.errorsValidEmailForm';
        check = false;
      } else if (this.userPwd == '') {
        //비밀번호 없음
        this.ment = 'message.msgRequiredPwd';
        check = false;
      } else if (this.pwdCheck == false) {
        this.ment = 'message.msgPwdRule';
        check = false;
      }
      return check;
    },
    open(event) {
      this.id = event.params.id;
    },
    close() {
      //초기화
      this.ment = '';
      this.id = '';
      this.userCd = '';
      this.idCheck = false;
      this.pwdType = 'password';
      this.userPwd = '';
      this.pwdCheck = false;
      this.showbtn = 'btn_view_password on';
    },
  },
};
</script>

<style></style>
