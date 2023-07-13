<template>
  <modal name="RemainEndModal" width="540" height="auto" @before-open="beforeOpen" :clickToClose="false">
    <div class="modal" id="">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('RemainEndModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.remainEndRemark') }}</p>
      <div class="modal_content a-c">
        <div class="plant_radio_box">
          <label class="radio_t" v-for="(item, index) in statusList" :key="index">
            <input type="radio" name="radio" v-model="dfcEndTypeCd.value" :value="item.value" :text="item.text" :disabled="type === 'read'" />
            <span class="checkmark"></span>
            {{ item.text }}
          </label>
        </div>
        <div class="form_textarea" style="height: 120px">
          <textarea v-model="dfcEndRemark" :placeholder="$t('message.msgRemainEndRemark')" :disabled="type === 'read'" />
        </div>
        <div class="modal_btn_contents_t05">
          <button v-if="type === 'read'" class="btn_default btn_primary" @click="$modal.hide('RemainEndModal')">{{ $t('message.btnCheck') }}</button>
          <button v-else class="btn_default btn_primary" @click="saveBookingEnd()">
            {{ $t('message.btnCloseRemain') }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import commonApi from '@/api/common';
import bookingApi from '@/api/order/booking';

export default {
  props: {
    remarkData: {
      type: Array,
    },
  },
  name: 'RemainEndModal',
  data() {
    return {
      statusList: [],
      selectRow: {},
      dfcEndTypeCd: {},
      dfcEndRemark: '',
      ment: '',
      isReSearch: false,
      type: '',
    };
  },
  methods: {
    dfcEndData() {
      this.selectRow = this.remarkData[0];
      this.statusList.forEach(list => {
        if (this.selectRow.dfcEndTypeCd === list.value) {
          this.dfcEndTypeCd = { text: list.text, value: this.selectRow.dfcEndTypeCd };
        }
      });
      // this.dfcEndTypeCd = this.statusList.find(option => (option.value = this.selectRow.dfcEndTypeCd));
      this.dfcEndRemark = this.selectRow.dfcEndRemark;
    },
    async getCommonCodeCombo() {
      try {
        const param = {
          groupCd: 'RMN_END_REMARK',
          useYn: 'Y',
          prntCd: '',
        };
        const response = await commonApi.getCommonCodeCombo(param);
        this.statusList = response.data.ds;
        this.dfcEndTypeCd = this.statusList[0];

        if (this.type === 'read') {
          this.dfcEndData();
        } else {
          this.dfcEndRemark = '';
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    reSearch() {
      this.isReSearch = true;
      this.$emit('isReSearch', this.isReSearch);
    },
    async saveBookingEnd() {
      //부킹잔량종료
      this.ment = '';
      if (!this.dfcEndRemark) {
        this.$EventBus.$emit('openYesModal', 'message.msgRemainEndRemark');
      } else {
        try {
          const param = [];
          this.remarkData.forEach(list => {
            param.push({
              id: list.id,
              offrId: list.offrId,
              offrNum: list.offrNum,
              offrDtlsId: list.offrDtlsId,
              prdtCd: list.prdtCd,
              dfcEndTypeCd: this.dfcEndTypeCd.value,
              dfcEndRemark: this.dfcEndRemark,
            });
          });
          const paramData = JSON.parse(JSON.stringify(param));
          const response = await bookingApi.saveBookingEnd(paramData);
          if (response.data.status === 500) {
            this.ment = response.data.message;
            this.$EventBus.$emit('openYesModal', this.ment);
          } else {
            this.$modal.hide('RemainEndModal');
            await this.reSearch();
            this.$EventBus.$emit('openYesModal', 'message.msgSelectRemainEnd');
          }
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    beforeOpen(event) {
      this.type = event.params.type;
      this.getCommonCodeCombo();
    },
  },
};
</script>

<style></style>
