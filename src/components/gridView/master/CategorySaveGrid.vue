<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/master/salesRegistCategory';
import commonGridJs from '@/mixins/commonGrid';
import categoryGridJs from '@/mixins/master/categoryGrid';

export default {
  props: ['gridName', 'insertRows', 'gridLang'],
  data() {
    return {
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      jsonRows: [],
    };
  },
  mixins: [commonGridJs, categoryGridJs],
  watch: {
    insertRows() {
      if (this.realGrid) {
        this.setInsertRows(JSON.parse(JSON.stringify(this.insertRows)));
      }
      this.realGrid.dataProvider.setRows(this.insertRows);

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
        this.realGrid.dataProvider.setRows(this.insertRows);
        this.realGrid.gridView.onCellDblClicked = function (grid, clickData) {
          const rowNum = [];
          rowNum.push(clickData.dataRow);
          vm.deleteDbclickRows(rowNum);
        };
        this.isInsertGrid();

        this.setInsertRows(JSON.parse(JSON.stringify(this.insertRows)));
      }
    },
    setInsertRows(insertRows) {
      let checked = false;
      this.jsonRows = this.realGrid.dataProvider.getJsonRows();
      this.jsonRows.forEach(jsonRow => {
        insertRows.forEach(insertRow => {
          if (jsonRow.custId === insertRow.custId) {
            checked = true;
          }
        });
      });

      if (checked) {
        this.$EventBus.$emit('openYesModal', 'message.msgCheckSame');
        return false;
      } else {
        this.realGrid.dataProvider.fillJsonData(insertRows, {
          fillMode: 'append',
        });
        this.realGrid.gridView.setCurrent({
          dataRow: this.realGrid.dataProvider.getRowCount() - 1,
        });
      }
    },
    sendSaveGridChecked() {
      this.gridCommit();
      const selectProductIndexs = this.realGrid.gridView.getCheckedRows(false);
      const selectProductRows = [];
      selectProductIndexs.forEach(index => {
        selectProductRows.push(this.realGrid.dataProvider.getJsonRow(index));
      });
      return selectProductRows;
    },
    deleteDbclickRows(deleteRows) {
      let allRowsCount = this.realGrid.dataProvider.getRowCount();
      if (deleteRows) {
        if (deleteRows.length === allRowsCount) {
          this.realGrid.dataProvider.clearRows();
          return;
        } else {
          deleteRows.sort((a, b) => b - a);
          deleteRows.forEach(index => {
            if (allRowsCount !== 0) {
              this.realGrid.dataProvider.removeRow(index);
            }
          });
        }
      }
    },
    getTotalRows() {
      const rowCount = this.realGrid.dataProvider.getRowCount();
      const totalRows = this.realGrid.dataProvider.getJsonRows();
      if (rowCount === 0) {
        this.$emit('rowCheck', true);
      } else {
        this.$emit('rowCheck', false);
      }
      this.$emit('sendTotalRows', totalRows);
    },
  },
  created() {},
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
