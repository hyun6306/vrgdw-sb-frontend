<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, mdfLayout, mfbLayout } from '@/consts/gridData/sample/sampleOrder';
import orderGridJs from '@/mixins/order/orderGrid';

export default {
  props: ['selectMonth', 'allHopeMonth', 'selectProductRows'],
  data() {
    return {
      gridName: 'sampleOrder',
      realGrid: null,
      selectRow: -1,
      sizeYn: '',
      checkedCount: 0,
      layout: '',
    };
  },
  mixins: [orderGridJs],
  watch: {
    selectMonth() {
      this.realGrid.dataProvider.setValue(this.selectRow, 'trnHopeMonth', this.selectMonth);
    },
    allHopeMonth() {
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      checkedRows.forEach(row => {
        this.realGrid.dataProvider.setValue(row, 'trnHopeMonth', this.allHopeMonth);
      });
    },
    selectProductRows() {
      this.selectProductRows.forEach(row => {
        row.reqOrdQty = 0;
        row.reqBaseQty = 0;
        row.trnPropMonth = row.trnExptMonth;
        // row['smplHrsnSize'] = row.hrsnSpec; //가로
        if (row.sizeChgYn == 'Y') {
          row.sizeChgYn = 'CUSTOM';
          row['smplHrsnSize'] = 0; //가로
          row['smplVtclSize'] = 0; //세로
          row['smplTsk'] = 0; //두께
        } else if (row.sizeChgYn == 'N') {
          row.sizeChgYn = 'STANDARD';
          row['smplHrsnSize'] = row.hrsnSpec; //가로
          row['smplVtclSize'] = row.vtclSpec; //세로
          row['smplTsk'] = row.tskSpec; //두께
          this.realGrid.gridView.columnByName('smplHrsnSize').editable = false;
          this.realGrid.gridView.columnByName('smplVtclSize').editable = false;
          this.realGrid.gridView.columnByName('smplTsk').editable = false;
        }
      });
      this.realGrid.dataProvider.fillJsonData(this.selectProductRows, { fillMode: 'append' });
      this.realGrid.gridView.setCurrent({ dataRow: this.realGrid.dataProvider.getRowCount() - 1 });
      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
    },
  },
  methods: {
    setValue(dataRow, fieldName, value) {
      const prdtCls = this.realGrid.dataProvider.getValue(0, 'prdtClsCd');
      if (prdtCls == 'MDF') {
        this.layout = mdfLayout;
      } else {
        this.layout = mfbLayout;
      }
      if (fieldName === 'SIZECHGYN') {
        this.realGrid.gridView.setValues(dataRow, value, true);
      } else if (fieldName === 'REQBASEQTY') {
        this.realGrid.dataProvider.setValue(dataRow, 'reqOrdQty', value);
      } else {
        this.realGrid.dataProvider.setValue(dataRow, 'reqBaseQty', value);
      }
    },
  },
  mounted() {
    const vm = this;
    const setGridData = {
      gridName: this.gridName,
      columns,
      fields,
      vm,
      existFavorite: true,
      layout: this.layout,
      existCalendar: true,
      existAddr: true,
    };
    this.realGrid = new RealGridCreate(setGridData);
  },
  created() {
    this.layout = mdfLayout;
  },
};
</script>

<style></style>
