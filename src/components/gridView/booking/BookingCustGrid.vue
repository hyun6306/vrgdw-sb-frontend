<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout, baseColumn, ordColumn } from '@/consts/gridData/booking/bookingListCumt';
import commonGridJs from '@/mixins/commonGrid';
import orderApi from '@/api/order/order';
import { mapGetters } from 'vuex';

export default {
  props: ['bookingData', 'gridLang', 'savePage', 'menuId', 'page'],
  data() {
    return {
      gridName: 'BookingCustGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      layoutData: false,
    };
  },
  mixins: [commonGridJs],
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  watch: {
    bookingData() {
      let format = this.$vnDateFormatD;
      this.bookingData.forEach(row => {
        if (row.bokngDt) row.bokngDt = format(row.bokngDt);
        if (row.lstTrnReqDt) row.lstTrnReqDt = format(row.lstTrnReqDt);
        if (row.prdcExpctDt) row.prdcExpctDt = format(row.prdcExpctDt);
        if (row.prdcSttDt) row.prdcSttDt = format(row.prdcSttDt);
        if (row.dfcEndDt) row.dfcEndDt = format(row.dfcEndDt);
        if (row.trnHopeDt) row.trnHopeDt = format(row.trnHopeDt);
        if (row.trnExpctDt) row.trnExpctDt = format(row.trnExpctDt);
      });
      this.realGrid.dataProvider.setRows(this.bookingData);
      this.clearCurrent();
      // setTimeout(() => {
      //   this.realGrid.gridView.fitLayoutWidth(null, 600, 50, true);
      // }, 100);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    init() {
      this.realGrid.gridView.setDisplayOptions({
        showEmptyMessage: true,
        emptyMessage: this.$t('message.gridMessageNoSearch'),
      });
    },
    async initGrid() {
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
          existAddr: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.init();
      }
      await this.layoutSetting();
      this.layoutState(this.layoutData);
    },
    openAddrInfo(clickInfo) {
      this.$emit('openAddrInfo', clickInfo);
    },
    layoutState(data) {
      this.layoutData = data;
      if (data) {
        for (let key in ordColumn) {
          this.realGrid.gridView.layoutByName(ordColumn[key]).visible = false;
        }
        for (let key in baseColumn) {
          this.realGrid.gridView.layoutByName(baseColumn[key]).visible = true;
        }
      } else {
        for (let key in baseColumn) {
          this.realGrid.gridView.layoutByName(baseColumn[key]).visible = false;
        }
        for (let key in ordColumn) {
          this.realGrid.gridView.layoutByName(ordColumn[key]).visible = true;
        }
      }
    },
    async resetLayout() {
      this.saveLayout('reset');
      this.layoutState(this.layoutData);
    },
    async saveLayout(type) {
      if (type == 'reset') this.realGrid.gridView.setColumnLayout(layout);
      try {
        let layouts = this.realGrid.gridView.saveColumnLayout();
        let param = {
          menuId: this.menuId,
          storeCls: this.page,
          uiJson: layouts,
        };

        const response = await orderApi.putSaveUi(param);
        if (response.data.rs) {
          if (type === 'update') {
            this.$EventBus.$emit('openYesModal', 'message.msgLayoutUpdate');
          } else if (type === 'reset') {
            this.$EventBus.$emit('openYesModal', 'message.msgClearRefresh');
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgResultSave');
          }
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async layoutSetting() {
      if (this.savePage.length > 0 && this.savePage !== null) {
        let key = this.savePage.length - 1;
        if (this.savePage[key].storeCls == this.page) {
          const loadLayout = this.savePage[key].uiJson;
          let current = this.realGrid.gridView.saveColumnLayout();
          let newCurrent = [];
          let newLayoutName = false;
          loadLayout.forEach(field => {
            this.gridLang.forEach(lang => {
              if (field.name === lang.formKey) {
                field.header.text = lang.text;
              }
            });
          });
          current.forEach(cur => {
            if (cur.items) {
              let isSame = loadLayout.filter(loadLay => {
                if (cur.name == loadLay.name) {
                  let curItem = cur.items;
                  let layItem = loadLay.items;
                  let isSameItem = [];
                  curItem.forEach(cItem => {
                    let same = layItem.find(lItem => cItem.column === lItem.column);
                    if (same) isSameItem.push(same);
                  });
                  if (isSameItem.length !== curItem.length) {
                    newCurrent.push(0);
                  }
                }
                return cur.name === loadLay.name;
              });
              if (!newLayoutName && isSame.length === 0) {
                newLayoutName = true;
              }
            } else {
              if (loadLayout.filter(field => field.column === cur.column)) {
                //
              } else {
                newCurrent.push(cur);
              }
            }
          });
          if (newCurrent.length > 0 || loadLayout.length !== current.length) {
            this.realGrid.gridView.setColumnLayout(layout);
            await this.saveLayout('update');
          } else if (newLayoutName) {
            this.realGrid.gridView.setColumnLayout(layout);
            await this.saveLayout('update');
          } else {
            this.realGrid.gridView.setColumnLayout(loadLayout);
          }
        }
      }
    },
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.gridView.setColumnProperty(column.fieldName, 'autoFilter', set);
      });
      // setTimeout(() => {
      //   this.realGrid.gridView.fitLayoutWidth(null, 600, 50, true);
      // }, 100);
    },
  },
  created() {},
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
