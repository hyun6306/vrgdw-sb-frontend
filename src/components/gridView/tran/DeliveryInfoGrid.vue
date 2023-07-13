<template>
  <div :id="gridName" ref="deliveryInfoGrid" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/deliveryReqList';

export default {
  props: ['menuId', 'savePage', 'costList', 'gridLang'],
  data() {
    return {
      gridName: 'DeliveryInfoGrid',
      realGrid: null,
    };
  },
  computed: {},
  watch: {
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    setRows(list) {
      list.forEach(row => {
        row.currency = 'VND';
      });
      this.realGrid.dataProvider.setRows(list);
    },
    async initGrid() {
      // 그리드 다국어 설정
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
        this.realGrid.gridView.setColumns(columns);
        this.realGrid.gridView.setColumnLayout(layout);
      } else {
        // if (this.userMenuGrpCd !== 'CUSTOMER') {
        //   columns[7].visible = false;
        // }
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
          existFavorite: true,
          layout: layout,
          existCalendar: true,
        };

        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
        if (!this.realGrid) this.initGrid();
        // this.insertRows(JSON.parse(JSON.stringify(this.selectProductRows)));
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
};
</script>

<style></style>
