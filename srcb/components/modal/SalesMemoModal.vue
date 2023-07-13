<template>
  <modal name="SalesMemoModal" width="540" height="auto">
    <div class="modal" id="ShippingSpecifics">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ShippingSpecificsModal')"></button>
      </div>
      <p class="modal_title_t02">영업의견 메모</p>
      <div class="modal_content a-c">
        <div class="form_textarea" style="height: 120px">
          <textarea placeholder="100자 이하" />
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default">취소</button>
          <button class="btn_default btn_primary">등록</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ShippingSpecificsModal',
  data() {
    return {
      active: false,
    };
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
  },
};
</script>

<style></style>
