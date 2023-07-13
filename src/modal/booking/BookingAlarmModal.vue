<template>
  <modal :name="`BookingAlarmModal${page}`" width="480" height="auto" :adaptive="true" :clickToClose="false" @before-open="beforeOpen">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide(`BookingAlarmModal${page}`)"></button>
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
  name: 'BookingAlarmModal',
  props: {
    ment: {
      type: String,
    },
    page: {
      type: String,
      default: '',
    },
  },
  mixins: [alarmLength],
  data() {
    return {
      type: '',
      move: '',
    };
  },
  methods: {
    select(result) {
      this.$emit('okOrNo', result, this.type);
      this.$modal.hide(`BookingAlarmModal${this.page}`);
    },
    beforeOpen(event) {
      this.type = event.params.type;
    },
  },
};
</script>

<style></style>
