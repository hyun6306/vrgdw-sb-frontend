<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
// eslint-disable-next-line no-unused-vars
import { fields, columns, layout, labels } from '@/consts/gridData/sample/sampleOrder';
import orderGridJs from '@/mixins/order/orderGrid';

export default {
  props: ['selectMonth', 'allHopeMonth', 'selectProductRows', 'gridLang'],
  data() {
    return {
      gridName: 'sampleOrder',
      realGrid: null,
      selectRow: -1,
      sizeYn: '',
      checkedCount: 0,
      removeOffrDtlsIds: [],
    };
  },
  mixins: [orderGridJs],
  watch: {
    selectMonth() {
      this.realGrid.dataProvider.setValue(this.selectRow, 'trnHopeDt', this.selectMonth);
    },
    allHopeMonth() {
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      checkedRows.forEach(row => {
        this.realGrid.dataProvider.setValue(row, 'trnHopeDt', this.allHopeMonth);
      });
    },
    selectProductRows() {
      if (this.realGrid && this.checkAddRows()) {
        this.insertRows(JSON.parse(JSON.stringify(this.selectProductRows)));
      }
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    focusCheck() {
      const focusCell = this.realGrid.gridView.getCurrent();
      if (focusCell.column !== null) {
        return true;
      } else {
        return false;
      }
    },
    setValue(dataRow, fieldName, value, newValue, oldValue = '') {
      if (fieldName === 'SIZECHGYN') {
        this.realGrid.gridView.setValues(dataRow, value, true);
      } else if (fieldName === 'REQBASEQTY') {
        this.realGrid.dataProvider.setValue(dataRow, 'reqOrdQty', value);
      } else if (fieldName === 'REQORDQTY') {
        this.realGrid.dataProvider.setValue(dataRow, 'reqBaseQty', value);
      } else if (fieldName === 'SMPLHRSNSIZE' || fieldName === 'SMPLVTCLSIZE' || fieldName === 'SMPLTSK') {
        this.realGrid.dataProvider.setValue(dataRow, fieldName, value);
      } else if (fieldName === 'PRDTCD') {
        this.realGrid.dataProvider.setValue(dataRow, 'prdtCd', oldValue);
      }
    },
    searchProduct(data) {
      this.$emit('searchProduct', { prdtData: data, type: 'grid' });
    },
    checkAddRows() {
      if (this.realGrid.dataProvider.getRowCount() > 0 && this.selectProductRows.length > 0) {
        const row = this.realGrid.dataProvider.getJsonRow(0);
        if (row.prdtClsCd === this.selectProductRows[0].prdtClsCd) {
          return true;
        } else {
          this.$emit('gridSendModal', 'message.msgSamePrdtClsCd');
          return false;
        }
      } else {
        return true;
      }
    },

    initGrid() {
      const vm = this;
      // eslint-disable-next-line no-import-assign
      labels.push(this.$t('message.standard'));
      labels.push(this.$t('message.custom'));
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
              if (col.fieldName === 'sizeChgYn') {
                col.editor.labels = labels;
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
      } else {
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
          existFavorite: true,
          layout: layout,
          existCalendar: true,
          updatable: true,
        };

        this.realGrid = new RealGridCreate(setGridData);

        this.realGrid.gridView.onCellDblClicked = (grid, clickData) => {
          if (clickData.column === 'prdtCd' && clickData.dataRow !== undefined) {
            const prdtClsCd = this.realGrid.dataProvider.getValue(clickData.dataRow, 'prdtClsCd');
            this.searchProduct({
              prdtCd: '',
              prdtClsCd,
              dataRow: clickData.dataRow,
              dbClick: true,
            });
            this.realGrid.gridView.clearCurrent();
          }
        };
        this.realGrid.gridView.onCellClicked = (grid, clickData) => {
          if (clickData.column === 'smplHrsnSize' || clickData.column === 'smplVtclSize' || clickData.column === 'smplTsk' || clickData.column === 'reqOrdQty' || clickData.column === 'reqBaseQty') {
            const curr = this.realGrid.gridView.getCurrent();
            this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
            this.realGrid.gridView.showEditor();
            this.realGrid.gridView.setFocus();
          }
        };
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoProduct'),
        });
        this.insertRows(JSON.parse(JSON.stringify(this.selectProductRows)));
      }
    },
    insertRows(insertRows) {
      insertRows.forEach(row => {
        if (!row.id) {
          row.reqOrdQty = 0;
          row.reqBaseQty = 0;
          row.trnPropDt = row.trnExptDt;
          if (row.sizeChgYn == 'N') {
            // row.sizeChgYn = 'STANDARD';
            row['smplHrsnSize'] = row.hrsnSpec; //가로
            row['smplVtclSize'] = row.vtclSpec; //세로
            row['smplTsk'] = row.tskSpec; //두께
          }
        } else {
          if (row.trnPropDt) row.trnPropDt = this.$vnDateFormatD(row.trnPropDt);
          if (row.trnHopeDt) row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        }
      });
      insertRows = this.existPrdtCdCheck(insertRows);
      if (insertRows.length > 0 && insertRows[0].searchGrid) {
        if (insertRows.length === 1) {
          this.realGrid.dataProvider.updateRow(insertRows[0].dataRow, insertRows[0]);
        } else {
          const rows = JSON.parse(JSON.stringify(insertRows));
          this.realGrid.dataProvider.updateRow(rows[0].dataRow, rows[0]);
          rows.splice(0, 1);
          this.realGrid.dataProvider.fillJsonData(rows, {
            fillMode: 'append',
          });
          this.realGrid.gridView.setCurrent({
            dataRow: this.realGrid.dataProvider.getRowCount() - 1,
          });
        }
      } else if (insertRows.length > 0 && insertRows[0].id && this.realGrid.dataProvider.getRowCount() > 0) {
        this.realGrid.dataProvider.fillJsonData(insertRows, {
          fillMode: 'update',
        });
      } else {
        this.realGrid.dataProvider.fillJsonData(insertRows, {
          fillMode: 'append',
        });
        this.realGrid.gridView.setCurrent({
          dataRow: this.realGrid.dataProvider.getRowCount() - 1,
        });
      }
      if (insertRows.length > 0) {
        let prdtCls = this.realGrid.dataProvider.getValue(insertRows.length - 1, 'prdtClsCd');
        if (prdtCls == 'MDF') {
          this.realGrid.gridView.columnByName('lpmFrtPttn').visible = false;
          this.realGrid.gridView.columnByName('lpmBckPttn').visible = false;
          this.realGrid.gridView.columnByName('prsUpPttn').visible = false;
          this.realGrid.gridView.columnByName('prsDwPttn').visible = false;
        }
      }

      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
      const totalPrice = this.realGrid.gridView.getSummary('reqOffrPrice', 'sum');
      this.$emit('changeTotalPrice', isNaN(totalPrice) ? 0 : totalPrice);
    },
    existPrdtCdCheck(insertRows) {
      const rows = this.realGrid.dataProvider.getJsonRows();
      const indexList = [];

      insertRows.forEach((iRow, iIndex) => {
        rows.forEach(row => {
          if (iRow.prdtCd === row.prdtCd && !iRow.id) {
            indexList.push(iIndex);
          }
        });
      });

      indexList.sort((num1, num2) => {
        return num2 - num1;
      });

      indexList.forEach(num => {
        insertRows.splice(num, 1);
      });

      return insertRows;
    },
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.gridView.setColumnProperty(column.fieldName, 'autoFilter', set);
      });
    },
  },
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
