<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import commonGridJs from '@/mixins/commonGrid';
import deliveryRequestJs from '@/mixins/booking/deliveryRequest';

export default {
  data() {
    return {
      gridName: 'DepositDeliveryRequestGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      totalOffrPrice: 0,
      totalVatPrice: 0,
      totaPrice: 0,
    };
  },
  mixins: [commonGridJs, deliveryRequestJs],
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style></style>
