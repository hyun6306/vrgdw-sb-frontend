<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import RealGridTreeCreate from '@/mixins/realGridTreeCreate';
import { fields, columns } from '@/consts/gridData/system/HRInformationList';
import commonGridJs from '@/mixins/commonGrid';

export default {
  props: ['dataList', 'gridLang', 'menuId', 'page'],
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'HRInformation',
      realGrid: null,
      cvt_dataList: [],
      totalCount: 0,
    };
  },
  watch: {
    dataList() {
      this.totalCount = 0;
      if (this.realGrid) {
        // this.cvt_dataList = this.cvt_treeDate(this.dataList);
        this.realGrid.treeProvider.setObjectRows({ children: this.dataList }, 'children');
        this.realGrid.treeView.refresh();

        // const pageInfo = { totalCount: this.totalCount };
        const pageInfo = { totalCount: this.dataList.length }; //갯수 확인 필요
        this.$emit('sendPageInfo', pageInfo);
      }
    },

    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    cvt_treeDate(obj) {
      obj.forEach(o => {
        if (o.createdAt) {
          if (o.createdAt) o.cvt_createdAt = this.$vnDateFormatDt(o.createdAt);
        }
        if (o.updatedAt) {
          if (o.updatedAt) o.cvt_updatedAt = this.$vnDateFormatDt(o.updatedAt);
          this.totalCount++;
        }
        if (o.children) {
          this.cvt_treeDate(o.children);
        }
      });
      return obj;
    },
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
        this.realGrid.treeView.setColumns(columns);
      } else {
        const setGridData = {
          treeOptions: {
            expanderIconStyle: 'square', //아이콘 스타일 안바뀜;;;
          },
          checkBarVisible: 'NO',
          gridName: this.gridName,
          columns,
          fields,
          vm,
        };
        this.realGrid = new RealGridTreeCreate(setGridData);
        this.realGrid.treeView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
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
