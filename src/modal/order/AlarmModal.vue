<template>
  <modal :name="`OrderAlarmModal${name}`" width="480" height="auto" :adaptive="true" :clickToClose="false" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide(`OrderAlarmModal${name}`)"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(ment)">
          <!-- {{ $t(ment) }} -->
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
  name: 'OrderAlarmModal',
  props: {
    ment: {
      type: String,
      default: '',
    },
    whatIs: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  mixins: [alarmLength],
  data() {
    return {
      custId: '',
    };
  },
  methods: {
    open(event) {
      if (event.params && event.params.custId) {
        this.custId = event.params.custId;
      }
    },
    select(result) {
      if (this.custId !== '') {
        this.$emit('okOrNo', result, `${this.whatIs}/${this.custId}`);
      } else {
        this.$emit('okOrNo', result, this.whatIs);
      }
      this.$modal.hide(`OrderAlarmModal${this.name}`);
    },
  },
};
</script>

<style></style>
