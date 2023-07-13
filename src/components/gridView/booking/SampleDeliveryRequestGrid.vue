<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import commonGridJs from '@/mixins/commonGrid';
import deliveryRequestJs from '@/mixins/booking/deliveryRequest';

export default {
  data() {
    return {
      gridName: 'SampleDeliveryRequestGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      outBaseQty: 0,
      isChecked: false,
      rowCount: 0,
      totalOffrPrice: 0,
      totalVatPrice: 0,
      totaPrice: 0,
      bokngPrdtQtyAmt: 0,
      vatRate: 0,
      checkedCount: 0,
      isCheckNum: false,
    };
  },
  mixins: [commonGridJs, deliveryRequestJs],
  watch: {},
  methods: {
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      if (newValue > 0) {
        this.realGrid.gridView.commit();
        const fieldName = this.realGrid.dataProvider.getFieldName(field);
        this.outBaseQty = newValue; //출고요청수량
        this.outBaseQty ? this.outBaseQty : (this.outBaseQty = 0);

        if (fieldName == 'OUTBASEQTY') {
          this.deliveryRows[dataRow].outBaseQty = this.outBaseQty;
          this.deliveryRows.forEach(list => {
            let qtyAll = list.trnEndBaseQty + list.trnIngBaseQty + list.trnReqBaseQty;
            if (list.bokngBaseQty <= qtyAll) {
              list.isCheckQtyAll = true;
            } else {
              list.isCheckQtyAll = false;
            }
            if (list.trnPsbBaseQty < list.outBaseQty) {
              list.isCheckNum = true;
            } else {
              list.isCheckNum = false;
            }
          });
          let checkedInfo = {};
          checkedInfo.isCheckedQtyAll = this.deliveryRows.some(row => row.isCheckQtyAll);
          checkedInfo.isOutBaseQty = this.deliveryRows.some(row => row.outBaseQty === 0);
          checkedInfo.isChecked = this.deliveryRows.some(row => row.isCheckNum);

          this.$emit('checked', checkedInfo);
        }
      } else {
        grid.cancel();
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style></style>
