<template>
  <modal name="JsonDataModal" width="540" height="auto" @before-open="beforeOpen" :clickToClose="false">
    <div class="modal" id="">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('JsonDataModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.jsonDataTitle') }}</p>
      <div class="modal_content a-c">
        <div class="form_textarea" style="height: 320px">
          <textarea v-model="jsonData" :disabled="true" />
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default btn_primary" @click="$modal.hide('JsonDataModal')">{{ $t('message.btnYes') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'JsonDataModal',
  data() {
    return {
      jsonData: '',
    };
  },
  methods: {
    beforeOpen(event) {
      this.jsonData = event.params.jsonData;
    },
  },
};
</script>

<style></style>
