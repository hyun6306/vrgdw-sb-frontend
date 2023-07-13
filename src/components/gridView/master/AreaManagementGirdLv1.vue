<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { fields, columns } from '@/consts/gridData/master/areaManagement';
import RealGridCreate from '@/mixins/realGridCreate';
import commonGridJs from '@/mixins/system/commonGrid';

export default {
  props: ['listRows', 'gridLang'],
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'areaCodeLv1',
      realGrid: null,
      disptRow: 0,
    };
  },
  watch: {
    listRows() {
      this.realGrid.dataProvider.setRows(this.listRows);
    },
    gridLang() {
      this.initGrid();
    },
    disptRow() {
      this.disptColor();
    },
  },
  methods: {
    initGrid() {
      const vm = this;
      if (this.realGrid) {
        if (columns && this.gridLang) {
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
        }
        this.realGrid.gridView.setColumns(columns);
      } else {
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.disptColor();
      }

      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.cellType == 'data') {
          vm.disptRow = clickData.itemIndex;
          // if (clickData.column == 'code') {
          let prntCd = grid.getValue(clickData.itemIndex, 'code');
          if (prntCd !== '' && prntCd !== undefined) {
            this.$emit('prntCd', prntCd);
          }
          // const rowInfo = this.realGrid.dataProvider.getJsonRow(clickData.itemIndex);
          // }
        }
      };
    },
    initDisptRow() {
      this.disptRow = 0;
    },
    disptColor() {
      //클릭한 로우 색상 지정
      let disptIndex = this.disptRow;
      this.realGrid.gridView.setRowStyleCallback(function (grid, item) {
        if (disptIndex == item.dataRow) {
          return 'rg-mfb';
        }
      });
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {},
};
</script>
