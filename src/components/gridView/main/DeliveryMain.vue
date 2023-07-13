<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { fields, columns, layout } from '@/consts/gridData/main/deliveryCustomerMain';
import { fields as fieldsV, columns as columnsV, layout as layoutV } from '@/consts/gridData/main/deliveryVrgdwMain';
import RealGridCreate from '@/mixins/realGridCreate';
import commonGridJs from '@/mixins/commonGrid';
import { mapGetters } from 'vuex';

export default {
  props: ['listRows', 'gridLang'],
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'deliveryMain',
      realGrid: null,
    };
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  watch: {
    listRows() {
      this.listRows.forEach(list => {
        if (list.reqDt) list.reqDt = this.$vnDateFormatD(list.reqDt);
        if (list.outDt) list.outDt = this.$vnDateFormatD(list.outDt);
        if (list.takeOverDt) list.takeOverDt = this.$vnDateFormatD(list.takeOverDt);
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
        if (this.userMenuGrpCd === 'CUSTOMER') {
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
          this.realGrid.gridView.setColumnLayout(layout);
        } else {
          if (columnsV && this.gridLang) {
            columnsV.forEach(col => {
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
          this.realGrid.gridView.setColumns(columnsV);
          this.realGrid.gridView.setColumnLayout(layoutV);
        }
      } else {
        let setGridData = {};
        if (this.userMenuGrpCd === 'CUSTOMER') {
          setGridData = {
            gridName: this.gridName,
            columns: columns,
            fields: fields,
            layout: layout,
            vm,
            rowIndicator: 'NO',
            checkBarVisible: 'NO',
          };
        } else {
          setGridData = {
            gridName: this.gridName,
            columns: columnsV,
            fields: fieldsV,
            layout: layoutV,
            vm,
            rowIndicator: 'NO',
            checkBarVisible: 'NO',
          };
        }

        this.realGrid = new RealGridCreate(setGridData);
      }
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {},
};
</script>
