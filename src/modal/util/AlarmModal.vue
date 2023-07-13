<template>
  <modal name="UtilAlarmModal" width="480" height="auto" :adaptive="true" :clickToClose="false" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('UtilAlarmModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']">
          {{ $t(ment) }}
        </p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_deep_gray" @click="select(false)">
          {{ $t('message.btnCancel') }}
        </button>
        <button class="btn_primary" @click="select(true)">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'UtilAlarmModal',
  data() {
    return {
      ment: '',
    };
  },
  mixins: [alarmLength],
  methods: {
    select(result) {
      this.$emit('okOrNo', result);
      this.$modal.hide('UtilAlarmModal');
    },
    open(event) {
      this.ment = event.params.ment;
    },
  },
};
</script>

<style></style>
