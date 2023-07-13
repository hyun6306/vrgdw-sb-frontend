<template>
  <modal :name="`SalesOpinionModal${name}`" width="100%" height="100%" :adaptive="true" @before-open="open">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.salesOpinion') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide(`SalesOpinionModal${name}`)"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="endcomplete_contents">
          <!-- 완료처리 코멘트 -->
          <div class="endcomplete_coment">
            <textarea v-model="memo" :disabled="userMenuGrp === 'CUSTOMER' || type === 'item'"></textarea>
          </div>
          <!-- //완료처리 코멘트 -->
        </div>

        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_tempsave" @click="putSalesMemo">{{ $t('message.btnYes') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>

<script>
import orderApi from '@/api/order/order';
import { mapGetters } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      memo: '',
      id: 0,
      type: '',
    };
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
    }),
  },
  methods: {
    open(event) {
      this.memo = event.params.memo.remark;
      this.id = event.params.id * 1;
      this.type = event.params.type;
    },
    async putSalesMemo() {
      if (this.userMenuGrp !== 'CUSTOMER') {
        try {
          const param = {
            id: this.id,
            salesMngRemark: this.memo,
          };
          await orderApi.putSalesMemo(param);
          this.$modal.hide(`SalesOpinionModal${this.name}`);
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      } else {
        this.$modal.hide(`SalesOpinionModal${this.name}`);
      }
    },
  },
};
</script>

<style></style>
