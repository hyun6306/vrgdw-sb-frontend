<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/master/salesRegistCategory';
import commonGridJs from '@/mixins/commonGrid';
import categoryGridJs from '@/mixins/master/categoryGrid';

export default {
  props: ['salesInsertList', 'gridLang'],
  data() {
    return {
      gridName: 'ProductClientListGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      disptRow: 0,
    };
  },
  mixins: [commonGridJs, categoryGridJs],
  watch: {
    salesInsertList() {
      this.realGrid.dataProvider.setRows(this.salesInsertList);

      this.clearCurrent();
      this.clearAllCheck();
    },
    gridLang() {
      this.initGrid();
    },
    disptRow() {
      this.disptColor();
    },
  },
  methods: {
    initGrid() {
      if (this.realGrid) {
        if (columns && layout && this.gridLang) {
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
          layout.forEach(field => {
            this.gridLang.forEach(lang => {
              if (field.name === lang.formKey) {
                field.header.text = lang.text;
              }
            });
          });
        }
        this.realGrid.gridView.setColumns(columns);
        this.realGrid.gridView.setColumnLayout(layout);
      } else {
        const vm = this;
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          layout,
          checkBarVisible: 'NO',
          vm,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.dataProvider.setRows(this.salesInsertList);
        this.disptColor();
        this.realGrid.gridView.onCellDblClicked = function (grid, clickData) {
          clickData;
        };
        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          if (clickData.cellType == 'data') {
            vm.disptRow = clickData.dataRow;
            const row = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            const rows = [];
            rows.push(row);
            vm.$emit('sendJsonRowClick', rows);
          }
        };
        this.isEmpty();
      }
    },
    initDisptRow() {
      this.disptRow = 0;
    },
    disptColor() {
      //클릭한 로우 색상 지정
      let disptIndex = this.disptRow;
      this.realGrid.gridView.setRowStyleCallback(function (grid, item) {
        if (disptIndex == item.dataRow) {
          return 'rg-mfb';
        }
      });
    },
  },
  created() {},
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
