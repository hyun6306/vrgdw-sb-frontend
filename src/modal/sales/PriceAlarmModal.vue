<template>
  <modal name="PriceAlarmModal" width="480" height="auto" :adaptive="true" @before-open="beforeOpen" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('PriceAlarmModal')"></button>
      </div>
      <p class="modal_title">{{ title }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']">
          {{ text }}
        </p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_deep_gray" @click="confirmBtn(false)">
          {{ $t('message.btnCancel') }}
        </button>
        <button class="btn_primary" @click="confirmBtn(true)">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'PriceAlarmModal',
  data() {
    return {
      text: '',
      type: '',
      title: '',
    };
  },
  mixins: [alarmLength],
  methods: {
    confirmBtn(result) {
      if (this.type === 'save' || this.type === 'reset') {
        this.$parent.layoutSave(this.type, result);
        this.$modal.hide('PriceAlarmModal');
      }
    },
    beforeOpen(event) {
      this.type = event.params.type;
      if (this.type == 'save') {
        this.title = this.$i18n.t('message.alert');
        this.text = this.$i18n.t('message.msgAskSave');
      } else if (this.type == 'reset') {
        this.title = this.$i18n.t('message.alert');
        this.text = this.$i18n.t('message.msgAskRefresh');
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
