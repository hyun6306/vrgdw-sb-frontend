import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/master/salesSearch';
import { fields as itemCf, columns as itemCc, layout as itemCl } from '@/consts/gridData/master/clientSearch';
import { fields as itemTf, columns as itemTc, layout as itemTl } from '@/consts/gridData/master/salesTeamSearch';
import { fields as itemSf, columns as itemSc, layout as itemSl } from '@/consts/gridData/master/salesSuppSearch';

export default {
  props: {
    salesSearchList: {
      type: Array,
    },
    gridLang: {
      type: Array,
    },
    type: {
      type: String,
    },
  },
  watch: {
    salesSearchList() {
      this.realGrid.dataProvider.setRows(this.salesSearchList);
      this.clearCurrent();
      this.clearCheckCount();

      //default 선택
      let isChecked = this.realGrid.gridView.isCheckedRow(0);
      if (!isChecked) this.realGrid.gridView.checkItem(0);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    initGrid() {
      if (this.realGrid) {
        if (this.type === 'sales') {
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
        } else if (this.type === 'client') {
          if (itemCc && itemCl && this.gridLang) {
            itemCc.forEach(col => {
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
            itemCl.forEach(field => {
              this.gridLang.forEach(lang => {
                if (field.name === lang.formKey) {
                  field.header.text = lang.text;
                }
              });
            });
          }
          this.realGrid.gridView.setColumns(itemCc);
          this.realGrid.gridView.setColumnLayout(itemCl);
        } else if (this.type === 'team') {
          if (itemTc && itemTl && this.gridLang) {
            itemTc.forEach(col => {
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
            itemTl.forEach(field => {
              this.gridLang.forEach(lang => {
                if (field.name === lang.formKey) {
                  field.header.text = lang.text;
                }
              });
            });
          }
          this.realGrid.gridView.setColumns(itemTc);
          this.realGrid.gridView.setColumnLayout(itemTl);
        } else if (this.type === 'support') {
          if (itemSc && itemSl && this.gridLang) {
            itemSc.forEach(col => {
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
            itemSl.forEach(field => {
              this.gridLang.forEach(lang => {
                if (field.name === lang.formKey) {
                  field.header.text = lang.text;
                }
              });
            });
          }
          this.realGrid.gridView.setColumns(itemSc);
          this.realGrid.gridView.setColumnLayout(itemSl);
        }
      } else {
        const vm = this;
        let setGridData = {};
        if (this.type === 'sales') {
          setGridData = {
            gridName: this.gridName,
            fields,
            columns,
            layout: layout,
            radioButton: 'YES',
            vm,
          };
        } else if (this.type === 'client') {
          setGridData = {
            gridName: this.gridName,
            fields: itemCf,
            columns: itemCc,
            layout: itemCl,
            radioButton: 'YES',
            vm,
          };
        } else if (this.type === 'team') {
          setGridData = {
            gridName: this.gridName,
            fields: itemTf,
            columns: itemTc,
            layout: itemTl,
            radioButton: 'YES',
            vm,
          };
        } else if (this.type === 'support') {
          setGridData = {
            gridName: this.gridName,
            fields: itemSf,
            columns: itemSc,
            layout: itemSl,
            radioButton: 'YES',
            vm,
          };
        }
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.dataProvider.setRows(this.salesSearchList);

        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          vm.realGrid.gridView.checkItem(clickData.dataRow, true, true);
        };
        this.realGrid.gridView.onCellDblClicked = function (grid, clickData) {
          const row = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
          const rows = [];
          rows.push(row);
          vm.$emit('sendRowDbClick', rows);
        };
        this.isEmpty();

        // //default 선택
        let isChecked = vm.realGrid.gridView.isCheckedRow(0);
        if (!isChecked) vm.realGrid.gridView.checkItem(0);
      }
    },
    isEmpty() {
      this.realGrid.gridView.setDisplayOptions({
        showEmptyMessage: true,
        emptyMessage: this.$t('message.gridMessageNoSearch'),
      });
    },
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
  },
  created() {},
  mounted() {
    this.initGrid();
  },
};
