<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import commonGridJs from '@/mixins/commonGrid';
import deliveryRequestJs from '@/mixins/booking/deliveryRequest';

export default {
  props: ['gridName'],
  data() {
    return {
      // gridName: 'DeliveryRequestGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      outBaseQty: 0,
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
        this.bokngPrdtQtyAmt = this.realGrid.dataProvider.getValue(dataRow, 'bokngPrdtQtyAmt'); //부킹단가
        this.vatRate = this.realGrid.dataProvider.getValue(dataRow, 'vatRate'); //Vat(%)
        this.outBaseQty ? this.outBaseQty : (this.outBaseQty = 0);

        if (fieldName == 'OUTBASEQTY') {
          let trnPsbOrdQtyPrice = this.bokngPrdtQtyAmt * this.outBaseQty;
          let vatRatePrice = Math.round(trnPsbOrdQtyPrice * this.vatRate);
          this.realGrid.dataProvider.setValue(dataRow, 'bokngOffrPrice', trnPsbOrdQtyPrice); //계산된 부킹단가
          this.realGrid.dataProvider.setValue(dataRow, 'bokngOffrVat', vatRatePrice); //계산된 부킹단가
          this.init();

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

          this.$emit('totalPrice', this.totalOffrPrice, this.totalVatPrice, this.totaPrice);
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
