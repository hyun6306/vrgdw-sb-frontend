<template>
  <modal name="DraftDocumentModal" width="90%" height="auto" :adaptive="true" @before-open="open" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.enterDraftDocNum') }}</p>
      <div class="modal_content a-c">
        <div class="draftd">
          <p>{{ $t('message.msgEnterDraftDocNum') }}</p>
          <input type="text" v-model="apprDocNum" maxlength="22" />
          <span class="sub_txt" v-if="noCorrectLength"> {{ $t('message.msgNotRuleDraftDocNum') }} </span>
        </div>

        <div class="modal_btn_contents modal_btn_contents_02">
          <button class="btn_next_change" @click="close">{{ $t('message.btnCancel') }}</button>
          <button class="btn_default btn_primary" @click="register">{{ $t('message.btnRegistration') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
// import detailApi from '@/api/order/detail.js';

export default {
  name: 'DraftDocumentModal',
  data() {
    return {
      offrId: '',
      apprId: '',
      quote: {},
      custId: '',
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
    async open(event) {
      if (event.params.type == 'booking') {
        this.quote = event.params.bookItem;
        this.custId = event.params.bookItem.custId;
        this.offrId = event.params.bookItem.offrId;
        this.apprId = event.params.bookItem.apprId;
      } else if (event.params.type == 'quote') {
        this.quote = event.params.quote;
        this.custId = event.params.custId;
        this.apprId = event.params.quote.apprId;
        this.offrId = event.params.offrId;
      }
    },
    register() {
      let check = /[^0-9]/g;
      const docNum = this.apprDocNum.replaceAll('-', '');
      if (this.apprDocNum.length !== 22 || check.test(docNum)) {
        this.noCorrectLength = true;
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildOffrDocumNum');
        return;
      } else {
        const newParam = {
          custId: this.custId,
          offrId: this.offrId,
          offerDtlsList: [
            {
              apprId: this.apprId,
              apprDocNum: this.apprDocNum,
            },
          ],
        };
        this.$emit('saveApprDocNum', newParam);
        this.close();
      }
    },
    close() {
      this.apprDocNum = '';
      this.custId = '';
      this.quote = {};
      this.apprId = '';
      this.noCorrectLength = false;
      this.$modal.hide('DraftDocumentModal');
    },
  },
};
</script>
