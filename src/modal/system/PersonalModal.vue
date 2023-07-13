<template>
  <modal name="PersonalModal" width="650" height="650" @before-open="open" :clickToClose="false">
    <div class="modal" id="Personal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('PersonalModal')"></button>
      </div>
      <p class="modal_title_t02">{{ title }}</p>
      <div class="modal_content a-c">
        <div class="specialty_box" v-html="contents"></div>
      </div>
    </div>
  </modal>
</template>

<script>
import systemApi from '@/api/system/system';

export default {
  name: 'PersonalModal',
  data() {
    return {
      privacyId: '',
      title: '',
      contents: '',
      page: '',
    };
  },
  methods: {
    async privacyDetail() {
      if (this.privacyId !== undefined) {
        let param = {
          id: this.privacyId,
          bbsId: this.page,
        };
        try {
          const response = await systemApi.getPrivacyDetail(param);
          this.title = response.data.rs.title;
          this.contents = response.data.rs.contents;
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    open(event) {
      this.privacyId = event.params.id;
      this.page = event.params.page;
      this.privacyDetail();
    },
  },
};
</script>

<style></style>
