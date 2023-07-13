<template>
  <div :id="gridName" ref="ForwardingStat" style="width: 100%"></div>
</template>

<script>
import commonGridJs from '@/mixins/commonGrid.js';
import orderApi from '@/api/order/order';
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/forwardingStatus';
import orderGridJs from '@/mixins/order/orderGrid';
import { mapGetters } from 'vuex';
import defs from '@/consts/defs';

export default {
  props: ['menuId', 'statList', 'savePage', 'gridLang'],
  data() {
    return {
      gridName: 'ForwardingStatus',
      realGrid: null,
      menuList: [this.$store.state.menuList],
      statData: [],
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
    statList() {
      this.statList.forEach(list => {
        const row = list;
        if (row) this.statData.push(list);
        row.trnHopeDt ? (row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt)) : (row.trnHopeDt = '');
        row.trnReqAt ? (row.trnReqAt = this.$vnDateFormatDt(row.trnReqAt)) : (row.trnReqAt = '');
        row.trnCmplAt ? (row.trnCmplAt = this.$vnDateFormatDt(row.trnCmplAt)) : (row.trnCmplAt = '');
        row.trnCfmAt ? (row.trnCfmAt = this.$vnDateFormatDt(row.trnCfmAt)) : (row.trnCfmAt = '');
        row.inAt ? (row.inAt = this.$vnDateFormatDt(row.inAt)) : (row.inAt = '');
        row.outAt ? (row.outAt = this.$vnDateFormatDt(row.outAt)) : (row.outAt = '');
        row.takeOverAt ? (row.takeOverAt = this.$vnDateFormatDt(row.takeOverAt)) : (row.takeOverAt = '');
        if (row.trnPlnNum == null) row.trnPlnNum = '';
        row.reqDt ? (row.reqDt = this.$vnDateFormatD(row.reqDt)) : (row.reqDt = '');
        row.trnPsbDt ? (row.trnPsbDt = this.$vnDateFormatD(row.trnPsbDt)) : (row.trnPsbDt = '');
        row.inPsbDt ? (row.inPsbDt = this.$vnDateFormatD(row.inPsbDt)) : (row.inPsbDt = '');
        row.inExptDt ? (row.inExptDt = this.$vnDateFormatD(row.inExptDt)) : (row.inExptDt = '');
      });
      this.realGrid.dataProvider.setRows(this.statList);
      this.count = this.realGrid.gridView.getItemCount();
    },
    // 그리드에 뿌려지는 listData, WATCH, 돌 때 마다 아이템카운트 업데이트
    count() {
      const itemCount = this.count;
      this.$emit('count', itemCount);
    },
    // 다국어
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    cellClick() {
      const vm = this;
      this.realGrid.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.cellType == 'data') {
          const clickRow = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
          if (clickData.fieldName == 'trnPlnNum') {
            let trnPlnInfo = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            if (trnPlnInfo && trnPlnInfo.trnPlnNum && trnPlnInfo.trnPlnNum !== '') {
              const trnCarType = trnPlnInfo.trnCarType;
              if (trnCarType !== 'VRGDW') {
                vm.$emit('openForwardingCustCar', trnPlnInfo);
              } else {
                vm.$emit('openForwardingDetail', trnPlnInfo);
              }
            }
          } else if (clickData.fieldName == 'trnNum' && clickRow.trnNum !== null) {
            let trnNum = grid.getValue(clickData.itemIndex, 'trnNum');
            let trnClsCd = grid.getValue(clickData.itemIndex, 'trnClsCd');
            let trnPlnNum = grid.getValue(clickData.itemIndex, 'trnPlnNum');
            if (trnNum !== null) {
              if (trnClsCd == defs.trnClsCd.move || trnClsCd == defs.trnClsCd.etc) {
                if (trnPlnNum !== null && trnPlnNum !== '') {
                  vm.$parent.fwdDtlsModal(trnPlnNum);
                } else {
                  vm.$EventBus.$emit('openYesModal', 'message.errorsNullTrnPlnNum');
                }
              } else {
                vm.$parent.deliveryInfoModal(trnNum);
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
          storeCls: 'forwardingStatList',
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
        if (this.savePage[key].storeCls == 'forwardingStatList') {
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
    this.cellClick();
  },
};
</script>

<style></style>
