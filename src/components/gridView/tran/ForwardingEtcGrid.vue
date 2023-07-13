<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/forwardingEtc';
import commonGridJs from '@/mixins/commonGrid';

export default {
  props: ['gridLang', 'savePage', 'page'],
  data() {
    return {
      gridName: 'ForwarddingEtcGrid',
      realGrid: null,
    };
  },
  computed: {},
  mixins: [commonGridJs],
  watch: {
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    deleteRows() {
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      if (checkedRows > 0) {
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
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoItem');
      }
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
      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.editable && (clickData.column === 'trnReqRemark' || clickData.column === 'etcOutItemNm' || clickData.column === 'trnReqQty')) {
          const curr = this.realGrid.gridView.getCurrent();
          this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
          this.realGrid.gridView.showEditor();
          this.realGrid.gridView.setFocus();
        }
      };
      this.sendCount();
    },
    addRow(data) {
      const dataRow = this.realGrid.dataProvider.addRow(data);
      this.realGrid.gridView.setCurrent({ dataRow });
      this.sendCount();
    },
    sendCount() {
      this.$emit('rowCount', this.realGrid.dataProvider.getRowCount());
    },
    gridCommit() {
      this.realGrid.gridView.commit();
    },
  },
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
