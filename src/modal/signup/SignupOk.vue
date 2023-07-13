<template>
  <modal name="SignupOk" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('SignupOk')"></button>
      </div>
      <!-- <p class="modal_title">알림</p> -->
      <div class="modal_content">
        <p class="txt_onboard">{{ this.userNm + $t('message.msgSuccessJoin') }}</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="goLogin">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'SignupOk',
  props: ['userNm'],

  methods: {
    goLogin() {
      this.$parent.goLogin();
    },
  },
};
</script>

<style></style>
