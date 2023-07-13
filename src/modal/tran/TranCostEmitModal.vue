<template>
  <modal name="TranCostEmitModal" width="1210" height="600" :adaptive="true" @before-close="close" @before-open="open" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('TranCostEmitModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.trnCostChg') }}</p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>{{ $t('message.tranCost') }}</span>
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 14%" />
              <col style="width: 12%" />
              <col style="width: 12%" />
              <col style="width: 12%" />
              <col style="width: 20%" />
              <col style="width: 30%" />
            </colgroup>
            <thead>
              <th>{{ $t('message.tranCostType') }}</th>
              <th>{{ $t('message.afterChg') }}</th>
              <th>{{ $t('message.beforeChg') }}</th>
              <th>{{ $t('message.margin') }}</th>
              <th>{{ $t('message.chgReason') }}</th>
              <th>{{ $t('message.etcChgReason') }}</th>
            </thead>
            <tbody>
              <tr>
                <td class="t-l">{{ $t('message.basicTranCost') }}</td>
                <td class="t-l">
                  <!-- <span class="essential"><input type="text" id="" placeholder="" style="width: 100%" /></span> -->
                </td>
                <td class="t-r">{{ costInfo.areaPriceAmt | priceFormat }}</td>
                <td class="t-l"></td>
                <td class="t-l">
                  <!-- <MultiSelect id="" class="essential" style="width: 100%" v-model="baseValue" :options="baseOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
                </td>
                <td class="t-l">
                  <!-- <input type="text" id="" placeholder="" style="width: 100%" /> -->
                </td>
              </tr>
              <tr>
                <td class="t-l">{{ $t('message.etcTranCost') }}</td>
                <td class="t-l">
                  <span class="essential"><input type="text" id="" placeholder="" @keydown="caculateMargin" @keyup="caculateMargin" oninput="this.value = this.value.replace(/^|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');" style="width: 100%" v-model="etcTranCost" /></span>
                </td>
                <td class="t-r">{{ costInfo.etcTrnPriceAmt | priceFormat }}</td>
                <td class="t-l">{{ margin | priceFormat }}</td>
                <td class="t-l">
                  <MultiSelect id="" class="essential" style="width: 100%" v-model="etcValue" :options="etcOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </td>
                <td class="t-l">
                  <span class="essential" v-if="this.etcValue.value == 'MOD17'"><input type="text" id="" placeholder="" style="width: 100%" v-model="etcChgReason" /></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <span class="sub_txt" v-if="ment !== ''"> {{ $t(ment) }} </span>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="$modal.hide('TranCostEmitModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_primary" @click="costSave">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import tranApi from '@/api/tran/tran';
import commonApi from '@/api/common';
export default {
  data() {
    return {
      // baseValue: '',
      etcValue: '',
      // baseOptions: [],
      etcOptions: [],
      etcTranCost: '',
      etcChgReason: '',
      margin: '',
      //
      costInfo: '',
      //
      ment: '',
    };
  },
  watch: {
    costInfo(data) {
      data;
      this.etcValue = { text: data.modiReasonNm, value: data.modiReasonCd };
      this.etcChgReason = data.etcModiReason;
    },
  },
  methods: {
    caculateMargin() {
      const replaceCost = this.etcTranCost.replaceAll(',', '');
      if (this.costInfo.etcTrnPriceAmt === 0) {
        this.margin = replaceCost * 1;
      } else {
        if (this.costInfo.etcTrnPriceAmt > 0) {
          this.margin = replaceCost * 1 - this.costInfo.etcTrnPriceAmt;
        } else if (this.costInfo.etcTrnPriceAmt < 0) {
          this.margin = replaceCost * 1 - this.costInfo.etcTrnPriceAmt;
        }
      }
    },
    async costSave() {
      try {
        if (this.etcTranCost == '') {
          this.ment = 'message.msgEtcTranCostNull';
        } else if (this.etcValue == '' || this.etcValue.value == null) {
          this.ment = 'message.msgModiTypeNull';
        } else if (this.etcValue.value == 'MOD17' && this.etcChgReason == null) {
          this.ment = 'message.msgEtcModiNull';
        } else {
          let param = {
            etcTrnPriceAmt: this.etcTranCost.replaceAll(',', ''),
            modiReasonCd: this.etcValue.value,
            etcModiReason: this.etcChgReason,
            trnPlnNumList: [this.costInfo.trnPlnNum],
          };
          const resp = await tranApi.putTranCostSave(param);
          this.$modal.hide('TranCostEmitModal');
          // this.close();
          if (resp.data.status == 200) {
            this.$parent.showModal({ type: 'saveSuss' });
          } else {
            this.$parent.showModal({ type: 'saveFail', error: resp.data.message });
          }
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
    async modifTypeList() {
      //운송비 조정 유형
      let param = {
        groupCd: 'TRN_MODI_REASON_CD',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const response = await commonApi.getCommonCodeCombo(param);
        // this.baseOptions = response.data.ds;
        this.etcOptions = response.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    open(event) {
      this.costInfo = event.params.costInfo;
      this.margin = '';
    },
    close() {
      this.costInfo = '';
      this.etcChgReason = '';
      this.etcTranCost = '';
      this.etcValue = '';
      this.margin = '';
      this.ment = '';
    },
  },
  created() {
    this.modifTypeList();
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
