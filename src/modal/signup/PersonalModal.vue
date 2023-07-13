<template>
  <modal name="PersonalModal" width="650" height="650" @closed="close" :adaptive="true" :clickToClose="false">
    <div class="modal" id="Personal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('PersonalModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t(titleMent) }}</p>
      <div class="modal_content a-c">
        <div class="specialty_box"><p v-html="ment"></p></div>
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
  props: ['titleMent', 'ment', 'firstDocs', 'secondDocs'],

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
