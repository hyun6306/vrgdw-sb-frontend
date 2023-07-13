<template>
  <modal name="PriceDraftDocumentModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.msgEnterDraftDocNum') }}</p>
      <div class="modal_content a-c">
        <div class="draftd">
          <p>{{ $t('message.msgEnterDraftDocNum') }}</p>
          <input type="text" v-model="apprDocNum" maxlength="22" />
          <span class="sub_txt" v-if="noCorrectLength"> {{ $t('message.msgNotRuleDraftDocNum') }} </span>
        </div>

        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="close">{{ $t('message.btnCancel') }}</button>
          <button class="btn_default btn_primary" @click="register">{{ $t('message.btnRegist') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'PriceDraftDocumentModal',
  data() {
    return {
      apprDocNum: '',
      noCorrectLength: false,
    };
  },
  watch: {
    apprDocNum() {
      this.noCorrectLength = false;
      this.apprDocNum = this.apprDocNum.replace(/^(\d{8})(\d{8})(\d{4})$/, `$1-$2-$3`);
    },
  },
  methods: {
    register() {
      let check = /[^0-9]/g;
      const docNum = this.apprDocNum.replaceAll('-', '');
      if (this.apprDocNum.length !== 22 || check.test(docNum)) {
        this.noCorrectLength = true;
      } else {
        this.$emit('saveApprDocNum', this.apprDocNum);
        this.close();
      }
    },
    close() {
      this.apprDocNum = '';
      this.noCorrectLength = false;
      this.$modal.hide('PriceDraftDocumentModal');
    },
  },
};
</script>
