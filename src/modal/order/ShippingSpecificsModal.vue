<template>
  <modal name="ShippingSpecificsModal" width="540" height="auto" :clickToClose="false">
    <div class="modal" id="ShippingSpecifics">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ShippingSpecificsModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.logitsRemark') }}</p>
      <div class="modal_content a-c">
        <div class="form_textarea" style="height: 120px">
          <textarea :placeholder="$t('message.msgMaxLength100')" v-model="logitsRemark" maxlength="99" />
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default btn_primary" @click="sendLogitsRemark">{{ $t('message.btnCheck') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ShippingSpecificsModal',
  props: ['specialNote'],
  data() {
    return {
      active: false,
      logitsRemark: '',
    };
  },
  watch: {
    specialNote() {
      this.logitsRemark = this.specialNote;
    },
  },
  methods: {
    sendLogitsRemark() {
      this.$emit('sendLogitsRemark', this.logitsRemark);
      this.$modal.hide('ShippingSpecificsModal');
    },
  },
};
</script>

<style></style>
