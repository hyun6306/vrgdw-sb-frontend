<template>
  <modal name="DraftDocumentModal" width="400" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DraftDocumentModal')"></button>
      </div>
      <p class="modal_title_t02">기안문서번호입력</p>
      <div class="modal_content a-c">
        <div class="draftd">
          <p>기안문서번호를 입력해주세요.</p>
          <input type="text" />
          <span class="sub_txt"> 기안번호 규칙이 맞지 않습니다 (숫자 20자리 입니다) </span>
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
  name: 'DraftDocumentModal',
};
</script>
