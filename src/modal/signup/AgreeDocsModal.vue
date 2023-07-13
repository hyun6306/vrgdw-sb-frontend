<template>
  <modal name="AgreeDocsModal" width="480" height="auto" :adaptive="true" :clickToClose="false" @closed="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('AgreeDocsModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p class="txt_onboard">{{ $t(ment) }}</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="$modal.hide('AgreeDocsModal')">
          {{ $t('message.btnYes') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  data() {
    return {
      firstDocsYN: '',
      secondDocsYN: '',
    };
  },
  name: 'AgreeDocsModal',
  props: ['ment', 'firstDocs', 'secondDocs'],

  methods: {
    close() {
      if (this.firstDocs == true) {
        this.firstDocsYN = true;
      } else if (this.firstDocs == false) {
        this.firstDocsYN = false;
      }

      if (this.secondDocs == true) {
        this.secondDocsYN = true;
      } else if (this.secondDocs == false) {
        this.secondDocsYN = false;
      }
      this.$emit('clickDocs', this.firstDocsYN, this.secondDocsYN);
    },
  },
};
</script>

<style></style>
