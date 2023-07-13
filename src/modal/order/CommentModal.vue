<template>
  <modal name="CommentModal" @opened="getMemo" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CommentModal')"></button>
      </div>

      <p class="modal_title_t02 t-l">{{ $t('message.note') }}</p>
      <div class="modal_content a-c">
        <div class="memo_box">
          <!-- response 값 확인되면 변경 -->
          <span>{{ this.ment }}</span>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import orderApi from '@/api/order/order';

export default {
  name: 'CommentModal',
  props: ['custMemoParam', 'userMenuGrpCd'],
  data() {
    return {
      ment: '',
    };
  },

  methods: {
    async getMemo() {
      const param = this.custMemoParam;
      try {
        const response = await orderApi.getOffrMemo(param);

        this.ment = response.data.rs.remark;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
};
</script>

<style></style>
