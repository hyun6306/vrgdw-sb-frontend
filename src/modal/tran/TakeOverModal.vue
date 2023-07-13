<template>
  <modal name="TakeOverModal" width="400" height="500" :adaptive="true" @before-open="open" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('TakeOverModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.takeOverConfirm') }}</p>
      <div class="modal_content a-c">
        <div class="form_production_date">
          <span class="">{{ $t('message.delayReason') }}</span>
          <MultiSelect label="text" id="" style="width: 100%" v-model="delayCd" :options="delayOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
        </div>
        <span class="sub_txt">! {{ $t('message.msgDelayReasonAll') }}</span>
        <div class="modal_btn_contents_t05 mt-a mb-0">
          <button class="btn_default" @click="$modal.hide('TakeOverModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_default btn_primary" @click="confirm">{{ $t('message.btnTakeOverConfirm') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import commonApi from '@/api/common';
export default {
  name: 'TakeOverModal',
  data() {
    return {
      delayCd: {},
      delayOptions: [],
    };
  },
  methods: {
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);

        if (groupCd === 'TRN_DELAY_REASON_CD') {
          this.delayOptions = response.data.ds;
          if (this.delayOptions.length > 0) this.delayCd = this.delayOptions[0];
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    open() {
      this.delayCd = this.delayOptions[0];
    },
    confirm() {
      this.$parent.saveTakeOverConfirm(this.delayCd);
    },
  },
  mounted() {
    this.getCommonCodeCombo('TRN_DELAY_REASON_CD');
  },
};
</script>

<style></style>
