<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/master/salesRegistCategory';
import commonGridJs from '@/mixins/commonGrid';
import categoryGridJs from '@/mixins/master/categoryGrid';

export default {
  props: ['gridName', 'salesInsertList', 'gridLang'],
  data() {
    return {
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
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
          vm,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.dataProvider.setRows(this.salesInsertList);
        // this.layoutSetting();
        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          clickData;
          // vm.realGrid.gridView.checkItem(clickData.dataRow, true, true);
        };
        this.realGrid.gridView.onCellDblClicked = function (grid, clickData) {
          const row = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
          const rows = [];
          rows.push(row);
          vm.$emit('sendInsertRowDbClick', rows);
        };
        this.isEmpty();
      }
    },
    sendAllGridChecked() {
      this.gridCommit();
      const selectProductIndexs = this.realGrid.gridView.getCheckedRows(false);
      const selectProductRows = [];
      selectProductIndexs.forEach(index => {
        selectProductRows.push(this.realGrid.dataProvider.getJsonRow(index));
      });
      return selectProductRows;
    },
  },
  created() {},
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
