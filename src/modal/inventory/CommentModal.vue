<template>
  <modal name="InventoryCommentModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('InventoryCommentModal')"></button>
      </div>

      <p class="modal_title_t02">{{ $t('message.salesMemo') }}</p>
      <div class="modal_content a-c">
        <div class="memo_box">
          <!-- <small>{{ memo.updatedAt }}</small> -->
          <span>{{ remark }}</span>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: ['memo'],
  name: 'InventoryCommentModal',
  watch: {
    memo() {
      if (this.memo.remark) {
        this.remark = this.memo.remark;
      }
    },
  },
  data() {
    return {
      remark: '',
    };
  },
};
</script>

<style></style>
