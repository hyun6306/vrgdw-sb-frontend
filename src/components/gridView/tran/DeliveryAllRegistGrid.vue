<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/deliveryAllRegist';
import commonGridJs from '@/mixins/commonGrid';

export default {
  props: ['forwardingRows', 'gridLang', 'menuId'],
  data() {
    return {
      gridName: 'DeliveryAllRegistGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
    };
  },
  mixins: [commonGridJs],
  watch: {
    forwardingRows() {
      this.realGrid.dataProvider.setRows(this.forwardingRows);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    isEmpty() {
      this.realGrid.gridView.setDisplayOptions({
        showEmptyMessage: true,
        emptyMessage: this.$t('message.gridMessageNoSearch'),
      });
    },
    initGrid() {
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
        const vm = this;
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
          layout: layout,
          checkBarVisible: 'NO',
        };
        this.realGrid = new RealGridCreate(setGridData);

        if (!this.forwardingRows) {
          this.isEmpty();
        } else {
          this.realGrid.dataProvider.setRows(this.forwardingRows);
        }
      }
    },
  },
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
