<template>
  <modal name="ReportLangSelectModal" width="480" height="auto" :adaptive="true" @before-open="open" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close"></button>
      </div>
      <p class="modal_title_t02" v-if="type !== 'quoteMail'">{{ $t('message.printQuotation') }}</p>
      <p class="modal_title_t02" v-else>{{ $t('message.sendQuotation') }}</p>
      <div class="modal_content a-c">
        <span>{{ $t('message.msgSelectLanguage') }}</span>
        <div class="lang_checkbox">
          <label class="chechbox_basic">
            <input type="checkbox" v-model="langList" value="en" />
            <span class="checkmark"></span>
            {{ $t('message.eng') }}
          </label>
          <!--          <label class="chechbox_basic">-->
          <!--            <input type="checkbox" v-model="langList" value="vn" />-->
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
          <button class="btn_default btn_primary" @click="confirm()" v-if="type !== 'quoteMail'">{{ $t('message.btnOutput') }}</button>
          <button class="btn_default btn_primary" @click="confirm()" v-else>{{ $t('message.btnSendQuotation') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'PlantSelectModal',
  data() {
    return {
      signShow: false,
      langList: [],
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
      this.langList = [];
      this.signYn = 'N';
      this.$modal.hide('ReportLangSelectModal');
    },
    confirm() {
      if (this.langList.length == 0) {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildLang');
      } else {
        this.$emit('printReport', { result: true, langList: this.langList, signYn: this.signYn, type: this.type });
        this.close();
      }
    },
  },
};
</script>

<style></style>
