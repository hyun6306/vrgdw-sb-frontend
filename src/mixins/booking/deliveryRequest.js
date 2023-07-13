import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/booking/deliveryRequest';
import { fields as itemDf, columns as itemDc, layout as itemDl } from '@/consts/gridData/booking/depositDeliveryRequest';
import { fields as itemSf, columns as itemSc, layout as itemSl } from '@/consts/gridData/booking/sampleDeliveryRequest';

export default {
  props: {
    deliveryRows: {
      type: Array,
    },
    gridLang: {
      type: Array,
    },
    type: {
      type: String,
    },
    userMenuGrpCd: {
      type: String,
    },
  },
  watch: {
    gridLang() {
      // const vm = this;
      this.initGrid();
    },
  },
  methods: {
    cellClick() {
      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.column === 'outBaseQty') {
          const curr = this.realGrid.gridView.getCurrent();
          this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
          this.realGrid.gridView.showEditor();
          this.realGrid.gridView.setFocus();
        }
      };
    },
    init() {
      if (this.type !== 'sample') {
        this.totalOffrPrice = this.realGrid.gridView.getSummary('bokngOffrPrice', 'sum');
        this.totalVatPrice = this.realGrid.gridView.getSummary('bokngOffrVat', 'sum');
        this.totaPrice = this.totalOffrPrice + this.totalVatPrice;
        this.$emit('totalPrice', this.totalOffrPrice, this.totalVatPrice, this.totaPrice);
      }
    },
    totalInit() {
      if (this.type !== 'sample') {
        this.deliveryRows.forEach((list, index) => {
          let outBaseQty = this.realGrid.dataProvider.getValue(index, 'outBaseQty');
          let bokngPrdtQtyAmt = this.realGrid.dataProvider.getValue(index, 'bokngPrdtQtyAmt');
          let vatRate = this.realGrid.dataProvider.getValue(index, 'vatRate');

          let trnPsbOrdQtyPrice = bokngPrdtQtyAmt * outBaseQty;
          let vatRatePrice = Math.round(trnPsbOrdQtyPrice * vatRate);
          this.realGrid.dataProvider.setValue(index, 'bokngOffrPrice', trnPsbOrdQtyPrice); //계산된 부킹단가
          this.realGrid.dataProvider.setValue(index, 'bokngOffrVat', vatRatePrice); //계산된 부킹단가
        });
        this.init();
      }
    },
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
    isEmpty() {
      this.clearCheckCount();
      this.realGrid.gridView.setDisplayOptions({
        showEmptyMessage: true,
        emptyMessage: this.$t('message.gridMessageNoDeliveryRequest'),
      });
    },
    deleteRows() {
      if (this.type !== 'request') {
        this.realGrid.gridView.commit();
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
        this.rowCount = this.realGrid.dataProvider.getRowCount();
        this.checkedCount = 0;
        this.$emit('checkRowCount', this.rowCount);

        if (this.rowCount === 0) {
          this.isEmpty();
        }
        this.init();
      }
    },
    onItemChecked(grid, itemIndex, checked) {
      if (this.type !== 'request') {
        if (checked) {
          this.checkedCount++;
        } else {
          this.checkedCount--;
        }
        this.$emit('sendCheckedCount', this.checkedCount);
      }
    },
    initGrid() {
      if (this.realGrid) {
        if (this.type === 'delivery') {
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
            if (this.userMenuGrpCd === 'CUSTOMER') {
              columns[6].visible = false;
            }
          }
          this.realGrid.gridView.setColumns(columns);
          this.realGrid.gridView.setColumnLayout(layout);
        } else if (this.type === 'request') {
          if (itemDc && itemDl && this.gridLang) {
            itemDc.forEach(col => {
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
            itemDl.forEach(field => {
              this.gridLang.forEach(lang => {
                if (field.name === lang.formKey) {
                  field.header.text = lang.text;
                }
              });
            });
          }
          this.realGrid.gridView.setColumns(itemDc);
          this.realGrid.gridView.setColumnLayout(itemDl);
        } else {
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
        if (this.type === 'delivery') {
          setGridData = {
            gridName: this.gridName,
            fields,
            columns,
            layout: layout,
            vm,
          };
        } else if (this.type === 'request') {
          setGridData = {
            gridName: this.gridName,
            fields: itemDf,
            columns: itemDc,
            layout: itemDl,
            checkBarVisible: 'NO',
            vm,
          };
        } else if (this.type === 'sample') {
          setGridData = {
            gridName: this.gridName,
            fields: itemSf,
            columns: itemSc,
            layout: itemSl,
            vm,
          };
        }
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.dataProvider.setRows(this.deliveryRows);
        this.totalInit();
        vm.cellClick();
      }
    },
  },
  created() {
    this.deliveryRows.forEach(row => {
      row.outBaseQty = row.trnPsbBaseQty;
      row.currency = 'VND';
      row.isCheckNum = this.isCheckNum;
    });
    this.$emit('sendRowCount', this.deliveryRows.length);
  },
  mounted() {
    this.initGrid();
  },
};
