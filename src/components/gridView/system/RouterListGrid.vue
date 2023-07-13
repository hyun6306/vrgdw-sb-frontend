<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { fields, columns } from '@/consts/gridData/system/routerList';
import RealGridCreate from '@/mixins/realGridCreate';

export default {
  props: ['routerList', 'gridLang'],
  data() {
    return {
      gridView: null,
      dataProvider: null,
      gridName: 'routerList',
      isUser: true,
      realGrid: null,
    };
  },
  watch: {
    routerList() {
      this.realGrid.dataProvider.setRows(this.routerList);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      const fieldName = this.realGrid.dataProvider.getFieldName(field);
      this.realGrid.gridView.commit();
      this.realGrid.dataProvider.setValue(dataRow, fieldName, newValue);
    },
    addRow() {
      const dataRow = this.realGrid.dataProvider.addRow([[]]);
      // this.realGrid.gridView.beginAppendRow();
      // this.realGrid.gridView.commit(true);
      // this.realGrid.gridView.showEditor();
      // this.realGrid.gridView.setFocus();
      this.realGrid.gridView.setCurrent({ dataRow });
      // this.realGrid.gridView.setCurrent(this.realGrid.dataProvider.getRowCount());
      // setTimeout(() => {
      //   this.realGrid.gridView.showEditor();
      // }, 500);
      // this.realGrid.dataProvider.setRowState(this.realGrid.dataProvider.getRowCount(), 'created', true);
    },
    getNewAndChangeData() {
      this.realGrid.gridView.commit();
      const newRowsIndex = this.realGrid.dataProvider.getAllStateRows();
      const newRows = [];
      newRowsIndex.updated.forEach(index => {
        const row = this.realGrid.dataProvider.getJsonRow(index);
        row.__modified__ = true;
        newRows.push(row);
      });
      newRowsIndex.created.forEach(index => {
        const row = this.realGrid.dataProvider.getJsonRow(index);
        if (row.progPh) {
          const pathSplit = row.progPh.split('/');
          row.progCd = pathSplit[pathSplit.length - 1];
        }
        row.__created__ = true;
        newRows.push(row);
      });
      return newRows;
    },
    getCheckedData() {
      const checkedRowsIndex = this.realGrid.gridView.getCheckedRows(false);
      const checkedRows = [];
      checkedRowsIndex.forEach(rowIndex => {
        const row = this.realGrid.dataProvider.getJsonRow(rowIndex);
        row.__deleted__ = true;
        checkedRows.push(row);
      });

      return checkedRows;
    },
    deleteRows() {
      const checkedRowsIndex = this.realGrid.gridView.getCheckedRows(false);
      let allRowsCount = this.realGrid.dataProvider.getRowCount();
      if (checkedRowsIndex.length === allRowsCount) {
        this.realGrid.dataProvider.clearRows();
      } else {
        checkedRowsIndex.sort((a, b) => b - a);
        checkedRowsIndex.forEach(index => {
          this.realGrid.dataProvider.removeRow(index);
        });
      }
    },
    onItemChecked(grid, itemIndex, checked) {
      checked;
    },
    initGrid() {
      const vm = this;
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
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
      }
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {},
};
</script>
