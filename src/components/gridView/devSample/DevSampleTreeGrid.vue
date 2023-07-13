<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import RealGridTreeCreate from '@/mixins/realGridTreeCreate';
import { fields, columns, rows } from '@/consts/gridData/devSample/realGridTreeSample';
import commonGridJs from '@/mixins/commonGrid';

export default {
  props: ['gridLang'],
  name: 'DevSampleTreeGrid',
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'devSampleTreeGrid',
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

        this.realGrid.treeView.setColumns(columns);
      } else {
        const setGridData = {
          checkBarVisible: 'NO',
          gridName: this.gridName,
          columns,
          fields,
          vm,
        };
        this.realGrid = new RealGridTreeCreate(setGridData);
        this.realGrid.treeProvider.setObjectRows({ rows }, 'rows');
      }
    },
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.treeView.setColumnProperty(column.fieldName, 'autoFilter', set);
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
