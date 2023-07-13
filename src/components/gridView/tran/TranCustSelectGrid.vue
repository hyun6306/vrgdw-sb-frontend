<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/tranCustSelect';
import commonGridJs from '@/mixins/commonGrid';
function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

export default {
  props: ['listRows', 'gridLang', 'savePage', 'page', 'gridName', 'trnPlnNum'],
  data() {
    return {
      // gridName: 'tranCustSelect',
      realGrid: null,
    };
  },
  computed: {},
  mixins: [commonGridJs],
  watch: {
    listRows() {
      this.resetAllChecked();
      this.listRows.forEach(row => {
        row;
      });
      this.realGrid.dataProvider.setRows(this.listRows);
      this.calculator(this.listRows);
      // this.realGrid.gridView.fitLayoutWidth(null, 600, 50, true);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    calculator(rows) {
      const qtyInfo = {
        length: rows.length,
        checkedQty: roundToTwo(rows.reduce((acc, curr) => acc + Number(curr.trnReqOrdQty ?? 0), 0)),
        checkedWght: roundToTwo(rows.reduce((acc, curr) => acc + Number(curr.trnReqWght ?? 0), 0)),
        checkedVol: roundToTwo(rows.reduce((acc, curr) => acc + Number(curr.trnReqVol ?? 0), 0)),
      };
      this.$emit('sendQtyInfo', qtyInfo);
    },
    deleteRows() {
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      let allRowsCount = this.realGrid.dataProvider.getRowCount();
      this.resetAllChecked();
      if (checkedRows.length === allRowsCount) {
        this.realGrid.dataProvider.clearRows();
      } else {
        checkedRows.sort((a, b) => b - a);
        checkedRows.forEach(index => {
          this.realGrid.dataProvider.removeRow(index);
        });
      }
      const rows = this.realGrid.dataProvider.getJsonRows();
      this.calculator(rows);
    },
    resetAllChecked() {
      this.realGrid.gridView.checkAll(false);
    },
    resetLayout() {
      this.realGrid.gridView.setColumnLayout(layout);
    },
    initGrid() {
      const vm = this;
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
        const setGridData = {
          gridName: this.gridName,
          columns: columns,
          fields: fields,
          layout: layout,
          existAddr: true,
          checkBarVisible: this.trnPlnNum ? 'NO' : '',
          vm,
        };

        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
      }
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
        this.realGrid.gridView.setColumns(columns);
        this.realGrid.gridView.setColumnLayout(layout);
      }
    },
  },
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
