<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { fields, columns } from '@/consts/gridData/system/commonCodeSlave';
import RealGridCreate from '@/mixins/realGridCreate';
import commonGridJs from '@/mixins/system/commonGrid';

export default {
  props: ['commonCodeList', 'gridLang', 'validation'],
  mixins: [commonGridJs],
  data() {
    return {
      gridView: null,
      dataProvider: null,
      gridName: 'commonCodeSlave',
      isUser: true,
      realGrid: null,
    };
  },
  watch: {
    commonCodeList: {
      handler(val) {
        this.realGrid.dataProvider.setRows(val);
        this.clearCheckCount();
        this.clearCurrent();
      },
      deep: true,
      // this.realGrid.dataProvider.setRows(this.commonCodeList);
      // this.realGrid.gridView.commit();
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
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageInsertData'),
        });
      }
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {},
};
</script>
