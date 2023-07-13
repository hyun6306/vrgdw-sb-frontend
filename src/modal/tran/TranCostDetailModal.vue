<template>
  <modal name="TranCostDetailModal" width="800" height="auto" :adaptive="true" @before-close="close" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('TranCostDetailModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        {{ $t('message.transDetail') }}
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>{{ $t('message.carInfo') }}</span>
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 25%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
            </colgroup>
            <thead>
              <th>{{ $t('message.tranCostType') }}</th>
              <th>{{ $t('message.tranCost') }}</th>
              <th>{{ $t('message.chgReason') }}</th>
              <th>{{ $t('message.etcChgReason') }}</th>
            </thead>
            <tbody>
              <tr>
                <td class="t-l">{{ $t('message.basicTranCost') }}</td>
                <td class="t-r">{{ priceInfo.areaPriceAmt | priceFormat }}</td>
                <td class="t-l">{{ priceInfo.modiReasonNm }}</td>
                <td class="t-l">{{ priceInfo.etcModiReason }}</td>
              </tr>
              <tr>
                <td class="t-l">{{ $t('message.etcTranCost') }}</td>
                <td class="t-r">{{ priceInfo.etcTrnPriceAmt | priceFormat }}</td>
                <td class="t-l">{{ priceInfo.modiReasonNm }}</td>
                <td class="t-l">{{ priceInfo.etcModiReason }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary" @click="$modal.hide('TranCostDetailModal')">{{ $t('message.btnClose') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: ['priceInfo'],
  data() {
    return {};
  },
  watch: {},
  methods: {
    close() {
      this.openFirst = 0;
    },
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
