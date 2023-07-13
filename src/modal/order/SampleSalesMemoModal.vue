<template>
  <modal name="SampleSalesMemoModal" width="540" height="auto" @opened="getMemo" :clickToClose="false">
    <div class="modal" id="ShippingSpecifics">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('SampleSalesMemoModal')"></button>
      </div>
      <!-- <SampleSalesMemoModal /> -->
      <p class="modal_title_t02">{{ $t('message.salesOpinion') }}</p>
      <div class="modal_content a-c">
        <div class="form_textarea t-l" style="height: 120px">
          <textarea v-bind:disabled="this.userMenuGrpCd == 'CUSTOMER'" v-if="registYn == false" v-model="memoText" />
          <textarea v-bind:disabled="this.userMenuGrpCd == 'CUSTOMER'" v-if="registYn == true" v-model="ment" />
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default" v-if="this.userMenuGrpCd !== 'CUSTOMER'" @click="$modal.hide('SampleSalesMemoModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_default btn_primary" @click="registSalesMemo" v-if="this.userMenuGrpCd !== 'CUSTOMER' && registYn == false">{{ $t('message.btnSave') }}</button>
          <button class="btn_default btn_primary" @click="savelSalesMemo" v-if="this.userMenuGrpCd !== 'CUSTOMER' && registYn == true">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import orderApi from '@/api/order/order';
import productApi from '@/api/order/product';
import { mapGetters } from 'vuex';

export default {
  name: 'SampleSalesMemoModal',
  props: ['registYn', 'salesMemoParam'],
  data() {
    return {
      memoText: '',
      memoResult: null,
      ment: '',
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  methods: {
    registSalesMemo() {
      this.putSalesMemo();
    },
    savelSalesMemo() {
      this.putSalesMemo();
    },
    async getMemo() {
      this.ment = '';
      const param = this.salesMemoParam;
      try {
        if (this.registYn == true) {
          const response = await orderApi.getOffrMemo(param);
          this.ment = response.data.rs.remark;
        } else {
          return;
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async putSalesMemo(changeRegistYn) {
      try {
        // 영업의견 Y 상태에서, 저장 시 == update
        if (this.registYn == true) {
          const param = {
            id: Number(this.salesMemoParam.id),
            salesMngRemark: this.ment,
          };
          const response = await productApi.putSalesMemo(param);
          changeRegistYn = 'Y';
          this.$modal.hide('SampleSalesMemoModal');
          this.$emit('registSalesMemo', changeRegistYn, this.ment);
          // 영업의견 N 상태에서, 저장 시 == regist
        } else {
          const param = {
            id: Number(this.salesMemoParam.id),
            salesMngRemark: this.memoText,
          };
          const response = await productApi.putSalesMemo(param);
          changeRegistYn = 'Y';
          this.$modal.hide('SampleSalesMemoModal');
          this.$emit('registSalesMemo', changeRegistYn, this.memoText);
          return (this.memoText = '');
          // return ();
        }
      } catch (e) {
        console.log(e);
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
