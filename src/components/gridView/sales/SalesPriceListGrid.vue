<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
// import RealGridCreate from '@/mixins/realGridCreate';
// import { fields, columns, layout } from '@/consts/gridData/sales/salesPrice';
import commonGridJs from '@/mixins/commonGrid';
import priceJs from '@/mixins/sales/price';

export default {
  props: ['priceListRows', 'gridLang', 'savePage', 'apprDocNumText', 'page'],
  data() {
    return {
      gridName: 'salesPriceListGrid',
      realGrid: null,
      selectRow: -1,
      checkedCount: 0,
    };
  },
  mixins: [commonGridJs, priceJs],
  watch: {
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    test() {},
  },
  mounted() {},
};
</script>

<style></style>
