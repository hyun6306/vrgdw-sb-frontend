<template>
  <div :id="gridName" ref="MonthClose" style="width: 100%"></div>
</template>

<script>
import commonGridJs from '@/mixins/commonGrid.js';
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/monthClose';
import orderGridJs from '@/mixins/order/orderGrid';
import orderApi from '@/api/order/order';
import { mapGetters } from 'vuex';
// import dayjs from 'dayjs';

export default {
  props: ['closeList', 'menuId', 'savePage', 'gridLang'],
  data() {
    return {
      listData: [],
      gridName: 'MonthClose',
      realGrid: null,
      menuList: [this.$store.state.menuList],
      count: 0,
    };
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  mixins: [orderGridJs, commonGridJs],
  watch: {
    // Props로 받은 운송비 조회 목록
    closeList() {
      this.closeList.forEach(list => {
        const row = list;
        if (row) this.listData.push(list);
        row.closeDt ? (row.closeDt = this.$vnDateFormatD(row.trnCfmAt)) : (row.closeDt = '');
        row.closeMonth ? (row.closeMonth = this.$vnDateFormatM(row.outDt)) : (row.closeMonth = '');
      });
      this.realGrid.dataProvider.setRows(this.closeList);
      this.count = this.realGrid.gridView.getItemCount();
    },
    // 그리드에 뿌려지는 listData, WATCH, 돌 때 마다 아이템카운트 업데이트
    count() {
      const itemCount = this.count;
      this.$emit('count', itemCount);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    // 레이아웃 관련
    isChooseCell() {
      const current = this.realGrid.gridView.getCurrent();
      return current.itemIndex !== -1 ? true : false;
    },
    // 그리드 다국어 설정
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
        // this.insertRows(JSON.parse(JSON.stringify(this.selectProductRows)));
      }
      await this.layoutSetting();
    },
    async resetLayout() {
      this.saveLayout('reset');
    },
    async saveLayout(type) {
      if (type == 'reset') this.realGrid.gridView.setColumnLayout(layout);
      try {
        let layouts = this.realGrid.gridView.saveColumnLayout();
        let param = {
          menuId: this.menuId,
          storeCls: 'tranCostMonthClosingList',
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
        if (this.savePage[key].storeCls == 'tranCostMonthClosingList') {
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
