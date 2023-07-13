<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { fields, columns } from '@/consts/gridData/system/codeGroup';
import RealGridCreate from '@/mixins/realGridCreate';
import commonGridJs from '@/mixins/system/commonGrid';

export default {
  props: ['codeGroupList', 'gridLang'],
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'ProductChartGroupGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
    };
  },
  watch: {
    codeGroupList() {
      this.realGrid.dataProvider.setRows(this.codeGroupList);
    },
    gridLang() {
      this.initGrid();
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
          checkBarVisible: 'NO',
        };
        this.realGrid = new RealGridCreate(setGridData);

        this.realGrid.gridView.setEditOptions({ updatable: false });
        this.realGrid.gridView.onCellClicked = (grid, clickData) => {
          if (clickData.cellType == 'data') {
            this.disptColor(clickData.dataRow);
            const row = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            const codeGroup = [];
            codeGroup.push(row);
            this.$emit('codeGroup', codeGroup[0].groupCd);
          }
        };

        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
      }
    },
    disptColor(disptIndex) {
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
