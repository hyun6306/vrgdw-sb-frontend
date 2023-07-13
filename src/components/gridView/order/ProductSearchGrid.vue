<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/order/productSearch';
import productApi from '@/api/order/product';

export default {
  props: {
    productSearchList: {
      type: Array,
    },
    gridName: {
      type: String,
    },
    gridLang: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  watch: {
    productSearchList() {
      // this.realGrid.dataProvider.fillJsonData(this.productSearchList, { fillMode: 'set' });
      if (this.realGrid) {
        this.setData();
        this.realGrid.dataProvider.setRows(this.productSearchList);
      }
    },
    gridLang() {
      this.initGrid();
    },
  },
  data() {
    return {
      // gridName: 'productSearchGrid',
      realGrid: null,
      checkedCount: 0,
      patternVisible: true,
    };
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
    onItemAllChecked(grid, checked) {
      checked;
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      this.checkedCount = checkedRows.length;
      this.$emit('sendCheckedCount', 'search', checkedRows.length);
    },
    onItemChecked(grid, itemIndex, checked) {
      if (checked) {
        this.checkedCount++;
      } else {
        this.checkedCount--;
      }
      this.$emit('sendCheckedCount', 'search', this.checkedCount);
    },
    sendSelectProducts() {
      const selectProductIndexs = this.realGrid.gridView.getCheckedRows(false);
      const selectProductRows = [];
      selectProductIndexs.forEach(index => {
        selectProductRows.push(this.realGrid.dataProvider.getJsonRow(index));
      });
      return selectProductRows;
    },

    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
      this.checkedCount = 0;
    },
    setData() {
      let prdtClsCd = '';
      this.productSearchList.forEach(list => {
        prdtClsCd = list.prdtClsCd;
        list.trnExptDt = this.$vnDateFormatD(list.trnExptDt);
      });
      if (prdtClsCd.includes('MDF')) {
        this.patternVisible = false;
      } else {
        this.patternVisible = true;
      }
      this.patternShow();
    },
    patternShow() {
      this.realGrid.gridView.layoutByName('lpmFrtPttnNm').visible = this.patternVisible;
      this.realGrid.gridView.layoutByName('lpmBckPttnNm').visible = this.patternVisible;
      this.realGrid.gridView.layoutByName('prsUpPttnNm').visible = this.patternVisible;
      this.realGrid.gridView.layoutByName('prsDwPttnNm').visible = this.patternVisible;
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
        if (this.userMenuGrpCd !== 'CUSTOMER') {
          columns[0].visible = false;
        }
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
        this.realGrid.dataProvider.setRows(this.productSearchList);
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
