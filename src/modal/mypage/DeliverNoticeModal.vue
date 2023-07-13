<template>
  <modal name="DeliverNoticeModal" @before-open="open" width="400" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('DeliverNoticeModal')"></button>
      </div>
      <p class="modal_title">{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p class="txt_onboard">{{ $t(ment) }}</p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_deep_gray" @click="close(false)">
          {{ $t('message.btnCancel') }}
        </button>
        <button class="btn_primary" @click="close(true)">
          {{ $t('message.btnCheck') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order.js';

export default {
  name: 'DeliverNoticeModal',
  props: ['ment'],
  data() {
    return {
      check: '',
      checkFlag: '',
      flag: '',
      delivery: {},
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  watch: {},
  methods: {
    open(event) {
      this.delivery = event.params?.delivery;
      this.checkMain();
    },
    // before-open, 삭제할 배송지의 id와 기본배송지의 id 일치 여부 확인
    checkMain() {
      this.checkFlag = this.delivery.mainLogitsYn === 'Y';
    },
    // 모달 닫힐 때 확인
    async close(result) {
      // 취소 눌렀을 경우 모달만 닫고 retrun;
      if (result == false) {
        this.$modal.hide('DeliverNoticeModal');
        return;
        // 확인 눌렀을 때만
      } else {
        this.$modal.hide('DeliverNoticeModal');
        const param = { custId: this.delivery.custId, ids: [this.delivery.id] };
        try {
          await orderApi.deleteUserLogitsAddr(param);
          const ment = 'message.msgResultSave';
          this.flag = 'delete';
          this.$emit('updateDeliver', this.checkFlag, this.flag, ment);
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
      // 모달 닫으면서 배송지 삭제 API 돌리기
    },
  },
};
</script>

<style></style>
