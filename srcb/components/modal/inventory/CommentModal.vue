<template>
  <modal name="CommentModal" width="400" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CommentModal')"></button>
      </div>

      <p class="modal_title_t02">영업의견 메모</p>
      <div class="modal_content a-c">
        <div class="memo_box">
          <small>2022-08-12</small>
          <span>고객님 최선을 다하겠습니다.</span>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'CommentModal',
};
</script>

<style></style>
