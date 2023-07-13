<template>
  <modal name="IdPwModal" width="480" height="auto" :adaptive="true" @before-open="beforeOpen" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('IdPwModal')"></button>
      </div>
      <p class="modal_title"></p>
      <div class="modal_content">
        <p class="txt_onboard">{{ message }}</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="confirm">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'IdPwModal',
  data() {
    return {
      redirect: '',
      message: '',
      userPw: '',
    };
  },
  methods: {
    created() {},
    beforeOpen(event) {
      this.userPw = event.params.userPw;
      this.redirect = event.params.redirect;
      if (this.redirect == '/mypage/old-pw-update') {
        this.message = this.$i18n.t('message.msgLoginElapse');
      } else if (this.redirect == '/api/v2/login/findPw') {
        this.message = this.$i18n.t('message.msgLoginTemporary');
        // } else if (this.redirect == '/mypage/tmp-pw-update') {
        //   this.$modal.show('TempPwModal');
      } else {
        this.message = this.$i18n.t('message.msgSendTemporary');
      }
    },
    confirm() {
      if (this.redirect == '/mypage/old-pw-update') {
        this.$parent.showChgModal(this.userPw);
        this.$modal.hide('IdPwModal');
      } else {
        window.location.href = '/signin';
        this.$modal.hide('IdPwModal');
      }
    },
  },
};
</script>

<style></style>
