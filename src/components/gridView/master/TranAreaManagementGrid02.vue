<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { fields02 as fields, columns02 as columns } from '@/consts/gridData/master/tranAreaManagement';
import RealGridCreate from '@/mixins/realGridCreate';
import commonGridJs from '@/mixins/system/commonGrid';

export default {
  props: ['listRows', 'gridLang'],
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'tranAreaMng02',
      realGrid: null,
    };
  },
  watch: {
    listRows() {
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
          checkBarVisible: 'NO',
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
      }
    },
    setFilter(set) {
      columns.forEach(column => {
        column.autoFilter = set;
      });
      this.realGrid.gridView.setColumns(columns);
      // this.realGrid.gridView.setColumnLayout(layout);
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {},
};
</script>
