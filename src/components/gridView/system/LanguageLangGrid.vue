<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { fields, columns } from '@/consts/gridData/system/languageLang';
import RealGridCreate from '@/mixins/realGridCreate';

export default {
  props: ['languageLangList', 'gridLang'],
  data() {
    return {
      gridView: null,
      dataProvider: null,
      gridName: 'languageLang',
      isUser: true,
      realGrid: null,
    };
  },
  watch: {
    languageLangList() {
      this.realGrid.dataProvider.setRows(this.languageLangList);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    getCheckedData() {
      const checkedRowsIndex = this.realGrid.gridView.getCheckedRows(false);
      const checkedRows = [];
      checkedRowsIndex.forEach(rowIndex => {
        const row = this.realGrid.dataProvider.getJsonRow(rowIndex);
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
        this.realGrid.gridView.onCellClicked = (grid, clickData) => {
          if (clickData.cellType == 'data') {
            const jsonRow = this.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            this.$emit('sendLangOne', jsonRow);
          }
        };
      }
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {},
};
</script>
