<template>
  <modal name="DetailCommentModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DetailCommentModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t(modalType) }}</p>
      <!-- <p class="modal_title_t02">dfsdfsd</p> -->
      <div class="modal_content a-c">
        <div class="memo_box">
          <!-- <small>2022-08-12</small> -->
          <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard t-l']" v-html="$t(ment)">
            <!-- {{ $t(ment) }} -->
          </p>
          <!-- <span>고객님 최선을 다하겠습니다.</span>> -->
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'DetailCommentModal',
  mixins: [alarmLength],
  props: ['ment', 'modalType'],
  watch: {},
};
</script>

<style></style>
