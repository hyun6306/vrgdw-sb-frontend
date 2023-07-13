<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/order/productFavorite';
import productApi from '@/api/order/product';

export default {
  props: {
    productPreviousOrderList: {
      type: Array,
    },
    gridName: {
      type: String,
    },
    gridLang: {
      type: Array,
    },
  },
  data() {
    return {
      // gridName: 'productPreviousOrderGrid',
      realGrid: null,
      checkedCount: 0,
    };
  },
  watch: {
    productPreviousOrderList() {
      if (this.realGrid) {
        this.setData();
        this.realGrid.dataProvider.setRows(this.productPreviousOrderList);
      }
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    async changeFavoriteUseYn(rowIndex) {
      try {
        const data = this.realGrid.dataProvider.getJsonRow(rowIndex);
        const param = {
          prdtCd: data.prdtCd,
          useYn: data.favoritYn === 'Y' ? 'N' : 'Y',
          custId: '',
        };
        this.realGrid.dataProvider.setValue(rowIndex, 'favoritYn', param.useYn);
        // const resp =
        await productApi.saveProductFavorite(param);
        // this.$emit('gridSendModal', resp.data.message);
      } catch (e) {
        console.log(e);
      }
    },
    sendSelectProducts() {
      const selectProductIndexs = this.realGrid.gridView.getCheckedRows(false);
      const selectProductRows = [];
      selectProductIndexs.forEach(index => {
        selectProductRows.push(this.realGrid.dataProvider.getJsonRow(index));
      });
      return selectProductRows;
    },
    onItemAllChecked(grid, checked) {
      checked;
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      this.checkedCount = checkedRows.length;
      this.$emit('sendCheckedCount', 'previous', checkedRows.length);
    },
    onItemChecked(grid, itemIndex, checked) {
      if (checked) {
        this.checkedCount++;
      } else {
        this.checkedCount--;
      }
      this.$emit('sendCheckedCount', 'previous', this.checkedCount);
    },
    clearCheckCount() {
      if (this.realGrid) {
        this.realGrid.gridView.checkAll(false);
      }
    },
    setData() {
      this.productPreviousOrderList.forEach(list => {
        list.trnExptDt = this.$vnDateFormatD(list.trnExptDt);
      });
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
      } else {
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          layout,
          vm,
          existFavorite: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.setData();
        this.realGrid.dataProvider.setRows(this.productPreviousOrderList);
        this.realGrid.gridView.onCellDblClicked = (grid, clickData) => {
          if (clickData.dataRow !== undefined) {
            const row = this.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            if (row.orderYn === 'Y') {
              const rows = [];
              rows.push(row);
              this.$emit('sendSelectProductsDbClick', rows);
            } else {
              this.$emit('gridSendModal', 'message.msgNoPossibleOrder');
            }
          }
        };
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
      }
      this.realGrid.gridView.setColumns(columns);
      this.realGrid.gridView.setColumnLayout(layout);
    },
  },
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
