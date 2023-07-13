<template>
  <modal name="DeliverAlarmModal" width="400" height="auto" :clickToClose="false" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="cancelChange"></button>
      </div>
      <p v-if="this.clickFlag == true" class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p class="txt_onboard">
          {{ $t(this.boardText) }}
          <br /><br />{{ $t(this.boardText2) }}
        </p>
      </div>
      <!-- 취소확인버튼 -->
      <div class="modal_btn_contents">
        <button class="btn_deep_gray" @click="cancelChange">{{ $t('message.btnCancel') }}</button>
        <button class="btn_primary" @click="saveChange">{{ $t('message.btnCheck') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'DeliverAlarmModal',
  props: ['mainLogitsYn', 'clearDefault', 'clickFlag', 'ment', 'defaultCheck', 'boardText', 'boardText2'],
  data() {
    return {
      checkFlag: '',
      allClose: '',
    };
  },
  watch: {},
  methods: {
    // 취소버튼, clickFalg로 기본배송지 변경여부를 확인한다.
    cancelChange() {
      // 취소버튼, 기본배송지 체크여부를 Props로 받은 clickFlag로 판별한다.
      // 취소 클릭 시, 확인창만 닫는다.

      // 기본배송지 체크되어 있을 때, 취소 클릭 시
      if (this.clickFlag == true && this.boardText == 'message.msgNoReflect') {
        this.checkFlag = false;
        this.allClose = false;
        const main = true;
        this.$emit('cancelEmit', main, this.checkFlag, this.allClose);
        this.$modal.hide('DeliverAlarmModal');
      }

      // 기본배송지 변경 체크 후, 취소 클릭 시
      if (this.clickFlag == true && this.boardText !== 'message.msgNoReflect') {
        this.checkFlag = false;
        this.allClose = false;
        this.$emit('cancelEmit', this.checkFlag, this.allClose);
        this.$modal.hide('DeliverAlarmModal');
      }
      // 기본배송지 체크 해제 후 취소 시
      if (this.clickFlag == false && this.clearDefault == true && this.boardText !== 'message.msgNoReflect') {
        this.checkFlag = true;
        const clearD = true;
        this.$emit('cancelEmit', clearD, this.checkFlag);
        this.$modal.hide('DeliverAlarmModal');
      }
      // 기본배송지 체크되어 있지 않을 때, 취소 클릭 시
      if (this.clickFlag == false && this.boardText == 'message.msgNoReflect') {
        this.checkFlag = false;
        this.$emit('cancelEmit', this.checkFlag);
        this.$modal.hide('DeliverAlarmModal');
      }
    },
    // 확인버튼
    saveChange() {
      // 기본배송지 변경 저장
      if (this.clickFlag == true && this.mainLogitsYn == 'Y' && this.boardText !== 'message.msgNoReflect') {
        this.$modal.hide('DeliverAlarmModal');
        const checkFlag = false;
        const allClose = true;
        const main = true;
        const saveFlag = true;
        this.$emit('saveEmit', saveFlag, main, checkFlag, allClose);
      }
      // 기본배송지 체크 > 확인 클릭 시
      if (this.clickFlag == true && this.boardText == 'message.msgNoReflect') {
        this.$modal.hide('DeliverAlarmModal');
        const checkFlag = false;
        const allClose = true;
        const main = true;
        this.$emit('saveEmit', main, checkFlag, allClose);
      }
      // 기본배송지 체크 > 확인 클릭 시
      if (this.clickFlag == true && this.boardText !== 'message.msgNoReflect' && this.mainLogitsYn == 'N') {
        this.$modal.hide('DeliverAlarmModal');
        const checkFlag = true;
        const allClose = false;
        const saveFlag = true;
        this.$emit('saveEmit', saveFlag, checkFlag, allClose);
      }
      // 기본배송지 체크되어 있지 않을 때, 확인 클릭 시
      if (this.clickFlag == false && this.boardText == 'message.msgNoReflect') {
        this.$modal.hide('DeliverAlarmModal');
        const checkFlag = false;
        const saveFlag = true;
        const allClose = true;
        this.$emit('noneEmit', allClose, saveFlag, checkFlag);
      }
      // 기본배송지 체크되어 있지 않을 때, 확인 클릭 시
      if (this.clickFlag == true && this.boardText == 'message.msgNoReflect') {
        this.$modal.hide('DeliverAlarmModal');
        const checkFlag = false;
        const saveFlag = true;
        const allClose = true;
        this.$emit('noneEmit', allClose, saveFlag, checkFlag);
      }
    },
  },
};
</script>

<style></style>
