<template>
  <div :id="gridName" ref="CarInOut" style="width: 100%"></div>
</template>

<script>
import commonGridJs from '@/mixins/commonGrid.js';
import orderApi from '@/api/order/order';
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/carInOut';
import orderGridJs from '@/mixins/order/orderGrid';
import { mapGetters } from 'vuex';

export default {
  props: ['inOutList', 'menuId', 'savePage', 'gridLang'],
  data() {
    return {
      gridName: 'CarInOut',
      realGrid: null,
      menuList: [this.$store.state.menuList],
      inOutData: [],
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
    inOutList() {
      this.inOutList.forEach(list => {
        const row = list;
        if (row) this.inOutData.push(list);
        row.trnCmplAt ? (row.trnCmplAt = this.$vnDateFormatDt(row.trnCmplAt)) : (row.trnCmplAt = '');
        row.trnCfmAt ? (row.trnCfmAt = this.$vnDateFormatDt(row.trnCfmAt)) : (row.trnCfmAt = '');
        row.inExptAt ? (row.inExptAt = this.$vnDateFormatDt(row.inExptAt)) : (row.inExptAt = '');
        // if (row.inExptAt) {
        //   const split = row.inExptAt.split(' ');
        //   row.inExptDt = this.$vnDateFormatD(split[0]);
        //   row.at = split[1];
        // }
        row.inAt ? (row.inAt = this.$vnDateFormatDt(row.inAt)) : (row.inAt = '');
        row.outAt ? (row.outAt = this.$vnDateFormatDt(row.outAt)) : (row.outAt = '');
      });
      this.realGrid.dataProvider.setRows(this.inOutList);
      this.setMerge();
    },
    // 그리드에 뿌려지는 listData, WATCH, 돌 때 마다 아이템카운트 업데이트
    inOutData() {
      const itemCount = this.realGrid.gridView.getItemCount();
      this.$emit('count', itemCount);
    },
    // 다국어
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    // 셀클릭 => 차량번호 선택 팝업, 배차상세정보 팝업
    cellClick() {
      const vm = this;
      this.realGrid.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.cellType == 'data') {
          const clickRow = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
          // 차량번호 클릭 시, 차량번호 팝업 오픈
          if (clickData.fieldName == 'trnCarNum') {
            vm.$emit('showPop', clickRow);
            // 배차계획번호 클릭 시, 배차상세정보 오픈
          } else if (clickData.fieldName == 'trnPlnNum') {
            const trnPlnInfo = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            if (trnPlnInfo && trnPlnInfo.trnPlnNum && trnPlnInfo.trnPlnNum !== '') {
              const trncusId = trnPlnInfo.trncusId;
              if (!trncusId || trncusId === '') {
                vm.$emit('openForwardingCustCar', trnPlnInfo);
              } else {
                vm.$emit('openForwardingDetail', trnPlnInfo);
              }
            }
          }
        }
      };
    },
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
        // this.initGrid();
        // this.insertRows(JSON.parse(JSON.stringify(this.selectProductRows)));
      }
      await this.layoutSetting();
      this.setMerge();
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
          storeCls: 'carInOutManage',
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
        if (this.savePage[key].storeCls == 'carInOutManage') {
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
    setMerge() {
      this.realGrid.gridView.checkBar.mergeRule = { criteria: "values['trnPlnNum']" };
    },
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.gridView.setColumnProperty(column.fieldName, 'autoFilter', set);
      });
    },
  },
  mounted() {
    this.initGrid();
    this.cellClick();
  },
};
</script>

<style></style>
