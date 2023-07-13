<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns } from '@/consts/gridData/master/productControl';
import commonGridJs from '@/mixins/commonGrid';
// import orderApi from '@/api/order/order';
export default {
  props: ['controlList', 'gridLang'],
  data() {
    return {
      gridName: 'ProductControlGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
    };
  },
  mixins: [commonGridJs],
  computed: {},
  watch: {
    controlList() {
      this.realGrid.dataProvider.setRows(this.controlList);

      this.clearCurrent();
      this.clearCheckCount();
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    getNewAndChangeData() {
      const newRowsIndex = this.realGrid.dataProvider.getAllStateRows();
      const newRows = [];
      newRowsIndex.updated.forEach(index => {
        const row = this.realGrid.dataProvider.getJsonRow(index);
        row.__modified__ = true;
        newRows.push(row);
      });
      return newRows;
    },
    sendJsonRows() {
      return this.realGrid.dataProvider.getJsonRows();
    },
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      const fieldName = this.realGrid.dataProvider.getFieldName(field);
      this.realGrid.gridView.commit();

      if (fieldName === 'USEYN') {
        let useYn = newValue;
        this.realGrid.dataProvider.setValue(dataRow, 'useYn', useYn);
        if (oldValue === newValue) this.realGrid.dataProvider.setRowState(dataRow, 'none');
      }
    },
    onItemChecked(grid, itemIndex, checked) {
      checked;
    },
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
    isEmpty() {
      this.realGrid.gridView.setDisplayOptions({
        showEmptyMessage: true,
        emptyMessage: this.$t('message.gridMessageNoSearch'),
      });
    },
    async initGrid() {
      if (this.realGrid) {
        if (columns && this.gridLang) {
          columns.forEach(col => {
            this.gridLang.forEach(lang => {
              if (col.header) {
                if (col.fieldName === lang.formKey) {
                  col.header.text = lang.text;
                } else if (col.objectKey === lang.formKey) {
                  col.header.text = lang.text;
                }
              }
            });
          });
        }
        this.realGrid.gridView.setColumns(columns);
      } else {
        const vm = this;
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
          checkBarVisible: 'NO',
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.dataProvider.setRows(this.controlList);
        this.isEmpty();
      }
    },
  },
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
