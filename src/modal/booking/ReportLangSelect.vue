<template>
  <modal name="BookingReportLangModal" width="480" height="auto" :adaptive="true" @before-open="open" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.printQuotation') }}</p>
      <div class="modal_content a-c">
        <span>{{ $t('message.msgSelectLanguage') }}</span>
        <div class="lang_checkbox">
          <label class="chechbox_basic">
            <input type="checkbox" v-model="language" value="en" />
            <span class="checkmark"></span>
            {{ $t('message.eng') }}
          </label>
          <!--          <label class="chechbox_basic">-->
          <!--            <input type="checkbox" v-model="language" value="vn" />-->
          <!--            <span class="checkmark"></span>-->
          <!--            {{ $t('message.vietnamese') }}-->
          <!--          </label>-->
        </div>
        <p>
          <label class="chechbox_basic" v-if="signShow">
            <input type="checkbox" v-model="signYn" true-value="Y" fasle-value="N" />
            <span class="checkmark"></span>
            {{ $t('message.msgIncludeSignature') }}
          </label>
        </p>
        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="close">{{ $t('message.btnCancel') }}</button>
          <button class="btn_default btn_primary" @click="confirm()">{{ $t('message.btnOutput') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'BookingReportLangModal',
  data() {
    return {
      signShow: false,
      language: [],
      signYn: 'N',
      type: '',
    };
  },
  methods: {
    open(event) {
      this.signShow = event.params.signShow;
      this.type = event.params.type;
    },
    close() {
      this.signShow = false;
      this.language = [];
      this.signYn = 'N';
      this.$modal.hide('BookingReportLangModal');
    },
    confirm() {
      this.$emit('bookingPrintReport', { result: true, language: this.language, signYn: this.signYn, type: this.type });
      this.close();
    },
  },
};
</script>

<style></style>
