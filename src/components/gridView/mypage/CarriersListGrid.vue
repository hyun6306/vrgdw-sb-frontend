<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/mypage/carriersList';
import commonGridJs from '@/mixins/commonGrid';
import commonApi from '@/api/common';
import { mapGetters } from 'vuex';

export default {
  mixins: [commonGridJs],
  props: ['gridLang'],
  data() {
    return {
      gridName: 'CarriersListGrid',
      realGrid: null,
      loadData: [],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  watch: {
    gridLang() {
      this.initGrid();
    },
    loadData(data) {
      this.realGrid.dataProvider.setRows(data);
      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
    },
  },
  methods: {
    async initGrid() {
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
          this.realGrid.gridView.setColumns(columns);
          this.realGrid.gridView.setColumnLayout(layout);
        }
      } else {
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
          existFavorite: true,
          layout: layout,
          existCalendar: true,
          existAddr: true,
          updatable: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        await this.loadCarriersList();
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridTranListNull'),
        });
      }
    },
    async loadCarriersList(params) {
      try {
        let param = {};
        param = params == undefined ? { trncusId: '', trncusNm: '' } : params;
        const response = await commonApi.getCarruersList(param);
        this.loadData = response.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {},
};
</script>

<style></style>
