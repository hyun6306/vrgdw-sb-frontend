<template>
  <div :id="gridName" ref="TranCostList" style="width: 100%"></div>
</template>

<script>
import commonGridJs from '@/mixins/commonGrid.js';
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/tranCostList';
import orderApi from '@/api/order/order';
// import commonGridJs from '@/mixins/commonGrid';
import orderGridJs from '@/mixins/order/orderGrid';
import { mapGetters } from 'vuex';
// import dayjs from 'dayjs';
import defs from '@/consts/defs';

export default {
  props: ['menuId', 'savePage', 'costList', 'gridLang'],
  data() {
    return {
      listData: [],
      gridName: 'TranCostList',
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
    costList() {
      this.costList.forEach(list => {
        const row = list;
        if (row) this.listData.push(list);
        row.outDt ? (row.outDt = this.$vnDateFormatD(row.outDt)) : (row.outDt = '');
        row.trnHopeDt ? (row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt)) : (row.trnHopeDt = '');
        row.trnCfmDt ? (row.trnCfmDt = this.$vnDateFormatD(row.trnCfmDt)) : (row.trnCfmDt = '');
      });
      this.realGrid.dataProvider.setRows(this.costList);
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
    // 총운송비 클릭 시, 금액상세 모달 열기
    openPriceDetail() {
      const vm = this;
      this.realGrid.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.cellType == 'data') {
          if (clickData.fieldName == 'totTrnPrice') {
            // 운송비유형, 운송비, 조정사유, 기타조정사유
            const rowData = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);

            const priceInfo = {
              areaPriceAmt: rowData.areaPriceAmt, // 기본운송비
              etcTrnPriceAmt: rowData.etcTrnPriceAmt, // 기타운송비
              modiReasonNm: rowData.modiReasonNm, // 운송비조정사유
              etcModiReason: rowData.etcModiReason, // 기타조정사유
            };
            vm.$emit('openPriceDetail', priceInfo);
          } else if (clickData.fieldName == 'trnNum') {
            //배송요청번호 클릭시 모달
            let trnNum = grid.getValue(clickData.itemIndex, 'trnNum');
            let trnClsCd = grid.getValue(clickData.itemIndex, 'trnClsCd');
            let trnPlnNum = grid.getValue(clickData.itemIndex, 'trnPlnNum');
            if (trnNum !== null && trnNum !== '') {
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

            // vm.$parent.deliveryInfoModal(trnNum);
          } else if (clickData.column === 'trnPlnNum') {
            let trnPlnInfo = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            if (trnPlnInfo && trnPlnInfo.trnPlnNum && trnPlnInfo.trnPlnNum !== '') {
              vm.$emit('openForwardingDetail', trnPlnInfo);
            }
          }
        }
      };
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
        if (!this.realGrid) this.initGrid();
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
          storeCls: 'tranCostList',
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
        if (this.savePage[key].storeCls == 'tranCostList') {
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
      this.realGrid.gridView.columnByName('closeYn').mergeRule = { criteria: "values['trnPlnNum']" };
      this.realGrid.gridView.columnByName('modiYn').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('trncusNm').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('trnCfmDt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('outDt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('outTypeNm').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('trnCarNum').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('deliCarTypeNm').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('totTrnPrice').mergeRule = { criteria: "values['trnPlnNum'] + value" };
    },
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.gridView.setColumnProperty(column.fieldName, 'autoFilter', set);
      });
    },
  },
  mounted() {
    this.initGrid();
    this.openPriceDetail();
  },
};
</script>

<style></style>
