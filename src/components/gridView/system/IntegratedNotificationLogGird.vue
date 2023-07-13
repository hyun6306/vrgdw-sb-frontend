<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { fields, columns } from '@/consts/gridData/system/IntegratedNotificationLog';
import RealGridCreate from '@/mixins/realGridCreate';
import commonGridJs from '@/mixins/commonGrid';

export default {
  props: ['listRows', 'gridLang'],
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'IntegratedNotificationLog',
      realGrid: null,
      scWindow: null,
    };
  },
  watch: {
    listRows() {
      this.listRows.forEach(list => {
        if (list.updatedAt) list.updatedAt = this.$vnDateFormatDt(list.updatedAt);
      });
      this.realGrid.dataProvider.setRows(this.listRows);
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
          rowIndicator: 'NO',
          checkBarVisible: 'NO',
          existAddr: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
        this.realGrid.gridView.displayOptions.rowHeight = -1;
        this.realGrid.gridView.displayOptions.minRowHeight = 36;
      }

      this.realGrid.gridView.onCellItemClicked = function (grid, index, clickData) {
        this.scWindow = window.open(`shortUrl/${clickData.value}`, 'shorUrlWindow', '');
        return true;
      };
    },
    openJsonData(clickInfo) {
      let data = JSON.parse(this.realGrid.dataProvider.getValue(clickInfo.itemIndex, clickInfo.column.fieldName));
      data = JSON.stringify(data, undefined, 2);
      this.$emit('openJsonModal', data);
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {},
};
</script>

<style>
/* button.staticBtnValue:before {content: '링크확인(';} */
/* button.staticBtnValue::after {content: ')';} */
</style>
