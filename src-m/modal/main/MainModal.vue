<template>
  <div v-if="noLogitsReq" class="choice_btn_contents">
    <section class="new_regist_section">
      <!-- <button class="btn_close" @click="registClose = !registClose"></button> -->
      <div class="btn_new_order">
        <img src="@m/assets/img/icon_m_neworder.png" alt="new" />
        <a @click="close('/order/general')">{{ $t('message.quoteRequest') }}</a>
        <span>{{ $t('message.msgNewQuote') }}</span>
      </div>
      <div class="btn_new_order btn_regist_info">
        <img src="@m/assets/img/icon_m_myinfo.png" alt="myinfo" />
        <a @click="close('')">{{ $t('message.modifyMyInfo') }}</a>
        <span>{{ $t('message.msgRegistDefault') }}</span>
      </div>
    </section>
    <button class="btn_modal_close" @click="close('')"></button>
  </div>
</template>
<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  props: ['noLogitsReq'],
  name: 'MainModal',
  data() {
    return {
      message: '',
      type: '',
      index: -1,
    };
  },
  mixins: [alarmLength],
  methods: {
    close(routerPath = '') {
      this.$emit('closeMainModal', routerPath);
    },
  },
};
</script>

<style></style>
