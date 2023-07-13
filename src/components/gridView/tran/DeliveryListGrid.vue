<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout, baseColumn, ordColumn } from '@/consts/gridData/tran/deliveryStatus';
import commonGridJs from '@/mixins/commonGrid';
import orderApi from '@/api/order/order';
import { mapGetters } from 'vuex';

export default {
  props: ['deliveryStatusList', 'menuId', 'gridLang', 'savePage', 'page'],
  data() {
    return {
      gridName: 'DeliveryListGrid',
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
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  watch: {
    deliveryStatusList() {
      this.deliveryStatusList.forEach(row => {
        if (row.takeOverAt2) row.takeOverAt2 = this.$vnDateFormatDt(row.takeOverAt2);
        if (row.outAt2) row.outAt2 = this.$vnDateFormatDt(row.outAt2);
        if (row.trnHopeDt2) row.trnHopeDt2 = this.$vnDateFormatD(row.trnHopeDt2);
        if (row.trnPsbAt2) row.trnPsbAt2 = this.$vnDateFormatDt(row.trnPsbAt2);
        if (row.trnHopeDt) row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        if (row.reqDt) row.reqDt = this.$vnDateFormatD(row.reqDt);
        if (row.trnPsbAt) row.trnPsbAt = this.$vnDateFormatDt(row.trnPsbAt);
        if (row.trnCfmAt) row.trnCfmAt = this.$vnDateFormatDt(row.trnCfmAt);
        if (row.outAt) row.outAt = this.$vnDateFormatDt(row.outAt);
        if (row.takeOverAt) row.takeOverAt = this.$vnDateFormatDt(row.takeOverAt);
      });
      this.realGrid.dataProvider.setRows(this.deliveryStatusList);
      this.clearCheckCount();
      this.clearCurrent();
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    isEmpty() {
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
        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          if (clickData.cellType == 'data') {
            if (clickData.fieldName == 'trnReqRemark') {
              let trnReqRemark = vm.realGrid.dataProvider.getValue(clickData.dataRow, 'trnReqRemark');
              if (trnReqRemark) vm.$emit('sendTrnReqRemark', trnReqRemark);
            } else if (clickData.fieldName == 'trnNum') {
              let bokngNum = grid.getValue(clickData.itemIndex, 'bokngNum');
              let trnNum = grid.getValue(clickData.itemIndex, 'trnNum');
              let trnPlnNum = grid.getValue(clickData.itemIndex, 'trnPlnNum');
              if (bokngNum !== null) {
                vm.$parent.deliveryInfoModal(trnNum);
              } else {
                if (trnPlnNum !== null) {
                  vm.$parent.fwdDtlsModal(trnPlnNum);
                } else {
                  vm.$EventBus.$emit('openYesModal', 'message.errorsNullTrnPlnNum');
                }
              }
            }
          }
        };
        this.isEmpty();
      }
      let salesData = [
        //
        'custPoNum2', // 고객용 PO번호
        'trnPsbAt2', // 고객용 배송계획일
        'trnHopeDt2', // 고객용 배송희망일
        'takeOverAt2', // 고객용 배송완료일
        'outAt2', // 고객용 출차일
      ];
      let custData = [
        //
        'custNm', // 고객명
        'outStatNm', // OUT_STAUTS
        'trnDoNum', // D/O번호
        'trnDoItemNum', // D/O 아이템번호
        'bokngSoNum', // S/O번호
        'bokngSoItemNum', // S/O 아이템번호
        'reqDt', // 배송요청일
        'trnCfmAt', // 배차확정일
        'custPoNum',
        'trnPsbAt',
        'trnHopeDt',
        'takeOverAt',
        'outAt',
      ];
      if (this.userMenuGrpCd == 'CUSTOMER') {
        for (let i = 0; i < custData.length; i++) {
          this.realGrid.gridView.columnByName(custData[i]).visible = false;
        }
        // for (let i = 0; i < salesData.length; i++) {
        //   this.realGrid.gridView.columnByName(salesData[i]).visible = true;
        // }
      } else {
        for (let i = 0; i < salesData.length; i++) {
          this.realGrid.gridView.columnByName(salesData[i]).visible = false;
        }
        // for (let i = 0; i < custData.length; i++) {
        //   this.realGrid.gridView.columnByName(custData[i]).visible = true;
        // }
      }
      await this.layoutSetting();
      this.layoutState(this.layoutData);
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
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    openAddrInfo(clickInfo) {
      const offrId = this.realGrid.dataProvider.getValue(clickInfo.itemIndex, 'offrId');
      this.$emit('openAddrInfo', offrId);
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
              //
              let isSame = loadLayout.filter(loadLay => {
                if (cur.name == loadLay.name) {
                  let curItem = cur.items;
                  let layItem = loadLay.items;
                  let isSameItem = [];
                  curItem.forEach(cItem => {
                    let same = layItem.find(lItem => cItem.column === lItem.column); // 같은 이름의 ITEM 을 찾아서 isSameItem에 push
                    if (same) isSameItem.push(same);
                  });

                  if (isSameItem.length !== curItem.length) {
                    // items의 컬럼 수가 다를경우 레이아웃 업데이트로 간주
                    newCurrent.push(0);
                  }
                }
                return cur.name === loadLay.name;
              }); // 같은 이름의 병합 셀이 있는지 확인, 있을 경우 isSame 변수에 list형태로 반환됨.

              if (!newLayoutName && isSame.length === 0) {
                // 다른 이름의 병합 셀이 있을 경우 레이아웃 업데이트로 간주
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
