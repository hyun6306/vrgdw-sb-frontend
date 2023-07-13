<template>
  <modal name="PrintModal" width="630" height="710" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('PrintModal')"></button>
      </div>
      <p class="modal_title">인쇄</p>
      <div class="print_content">
        <div class="print_head">
          <span class="print_title"><img src="@/assets/img/icon_print.png" />견적서 출력</span>
          <div class="print_btns">
            <button class="btn_pdf_download"><img src="@/assets/img/icon_pdf.png" /></button>
            <button class="btn_printer"><img src="@/assets/img/icon_printer.png" /></button>
          </div>
        </div>
        <div class="print_box"></div>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary">확인</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'PrintModal',
};
</script>

<style></style>
