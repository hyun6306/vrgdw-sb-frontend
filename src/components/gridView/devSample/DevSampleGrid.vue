<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layouts, rows } from '@/consts/gridData/devSample/realgridSample';
import commonGridJs from '@/mixins/commonGrid';

export default {
  props: ['gridLang'],
  name: 'DevSampleGrid',
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'devSampleGrid',
      realGrid: null,
    };
  },
  watch: {
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
        this.realGrid.gridView.setColumnLayout(layouts);
      } else {
        let setGridData = {};

        setGridData = {
          gridName: this.gridName,
          columns: columns,
          fields: fields,
          layout: layouts,
          vm,
          rowIndicator: 'NO',
          checkBarVisible: 'NO',
        };

        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.dataProvider.setRows(rows);
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
  created() {},
};
</script>

<style scoped></style>
