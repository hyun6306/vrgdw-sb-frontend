<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/order/orderGeneral';
// import productApi from '@/api/order/product';
import orderGridJs from '@/mixins/order/orderGrid';

export default {
  props: ['selectMonth', 'allHopeMonth', 'selectProductRows', 'gridLang'],
  data() {
    return {
      gridName: 'orderGeneralGrid',
      realGrid: null,
      selectRow: -1,
      checkedCount: 0,
      removeOffrDtlsIds: [],
      patternVisible: true,
    };
  },
  mixins: [orderGridJs],
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
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
    setValue(dataRow, fieldName, value, newValue, oldValue = '') {
      const priceStat = this.realGrid.dataProvider.getValue(dataRow, 'priceStat');
      if (fieldName === 'REQBASEQTY') {
        this.realGrid.dataProvider.setValue(dataRow, 'reqOrdQty', value);
        this.realGrid.dataProvider.setValue(dataRow, 'reqOffrPrice', newValue * priceStat.aplyPrice);
      } else if (fieldName === 'REQORDQTY') {
        this.realGrid.dataProvider.setValue(dataRow, 'reqBaseQty', value);
        this.realGrid.dataProvider.setValue(dataRow, 'reqOffrPrice', Math.ceil(value * priceStat.aplyPrice));
      } else if (fieldName === 'PRDTCD') {
        this.realGrid.dataProvider.setValue(dataRow, 'prdtCd', oldValue);
      }
      const totalPrice = this.realGrid.gridView.getSummary('reqOffrPrice', 'sum');
      this.$emit('changeTotalPrice', isNaN(totalPrice) ? 0 : totalPrice);
    },
    searchProduct(data) {
      this.$emit('searchProduct', { prdtData: data, type: 'grid' });
    },
    insertRows(insertRows) {
      let prdtClsCd = '';
      insertRows.forEach(row => {
        prdtClsCd = row.prdtClsCd;
        row.priceStat = {
          aplyPrice: row.aplyPrice,
          updwn: 'N/A',
          disbleYn: 'N',
        };
        if (!row.id) {
          row.reqOrdQty = 0;
          row.reqBaseQty = 0;
          row.trnPropDt = row.trnExptDt;
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

      if (prdtClsCd.includes('MDF')) {
        this.patternVisible = false;
      } else {
        this.patternVisible = true;
      }
      this.patternShow();
      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
      const totalPrice = this.realGrid.gridView.getSummary('reqOffrPrice', 'sum');
      this.$emit('changeTotalPrice', isNaN(totalPrice) ? 0 : totalPrice);
    },
    patternShow() {
      this.realGrid.gridView.layoutByName('lpmFrtPttnNm').visible = this.patternVisible;
      this.realGrid.gridView.layoutByName('lpmBckPttnNm').visible = this.patternVisible;
      this.realGrid.gridView.layoutByName('prsUpPttnNm').visible = this.patternVisible;
      this.realGrid.gridView.layoutByName('prsDwPttnNm').visible = this.patternVisible;
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
        this.patternShow();
      } else {
        if (this.userMenuGrpCd !== 'CUSTOMER') {
          columns[7].visible = false;
        }
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
          if (clickData.column === 'reqOrdQty' || clickData.column === 'reqBaseQty') {
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
