<template>
  <modal name="OffrMemoModal" width="540" height="auto" @before-open="beforeOpen" :clickToClose="false">
    <div class="modal" id="ShippingSpecifics">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('OffrMemoModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t(modalType) }}</p>
      <div class="modal_content a-c">
        <div class="memo_box">
          <span>{{ ment }}</span>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default btn_primary" @click="$modal.hide('OffrMemoModal')">{{ $t('message.btnCheck') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'OffrMemoModal',
  data() {
    return {
      active: false,
    };
  },
  props: ['ment', 'modalType'],
  methods: {
    beforeOpen() {},
  },
};
</script>

<style></style>
