<template>
  <modal :name="'MasterAlarmModal'" width="480" height="auto" :adaptive="true" :clickToClose="false" @before-open="beforeOpen">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('MasterAlarmModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p class="txt_onboard">
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
export default {
  name: 'MasterAlarmModal',
  props: {
    ment: {
      type: String,
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    select(result) {
      this.$emit('okOrNo', result);
      this.$modal.hide('MasterAlarmModal');
    },
    beforeOpen() {},
  },
};
</script>

<style></style>
