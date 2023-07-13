<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout, baseColumn, ordColumn } from '@/consts/gridData/order/QuoteDetail';
import orderGridJs from '@/mixins/order/orderGrid';
import orderApi from '@/api/order/order';
import commonGridJs from '@/mixins/commonGrid';
import detailApi from '@/api/order/detail';
// import { mapGetters } from 'vuex';

export default {
  mixins: [orderGridJs, commonGridJs],
  props: ['selectMonth', 'allHopeMonth', 'layoutData', 'savePage', 'menuId', 'page', 'openInfo', 'gridLang', 'authButton', 'userMenuGrpCd'],
  data() {
    return {
      gridName: 'quoteDetaiGrid',
      realGrid: null,
      selectRow: -1,
      prdtData: [],
      checkedCount: 0,
      detailData: [],
      offrInfo: '',
      trnInfo: '',
      chgQtyAmt: 0,
      trnAddAmt: 0,
      length: 0,
      baseColumnList: '',
      ordColumnList: '',
      totalInfo: '',
    };
  },
  watch: {
    openInfo() {
      this.loadDetail();
    },
    gridLang() {
      this.initGrid();
    },
    selectMonth() {
      this.realGrid.dataProvider.setValue(this.selectRow, 'tranHopeMonth', this.selectMonth);
    },
    allHopeMonth() {
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      checkedRows.forEach(row => {
        this.realGrid.dataProvider.setValue(row, 'tranHopeMonth', this.allHopeMonth);
      });
    },
    layoutData(data) {
      this.layoutState(data);
    },
    detailData(data) {
      this.realGrid.gridView.cancel();
      this.prdtData = [];
      this.realGrid.gridView.setAllCheck(false);
      data.forEach((row, index) => {
        let rowData = row;
        let productInfo = row.productInfo;
        if (row.trnAddAmt == null) {
          row.trnAddAmt = 0;
          if (row.chgQtyAmt === null) row.chgQtyAmt = row.reqQtyAmt;
        }
        if (this.offrInfo.offrStatCd == 'REQ' && this.userMenuGrpCd == 'CUSTOMER') {
          row.trnAddAmt = 0; // 운임조정액
          row.reqQtyAmt = 0; // 기본단가
          row.prdtQtyAmt = 0; // 합계
          row.chgQtyAmt = 0; // 기준단가
          if (row.chgQtyAmt === null) row.chgQtyAmt = row.reqQtyAmt;
          row.offrDtlsTotal = 0; // 합계금액
          row.cfmOffrPrice = 0; // 공급가액
          row.cfmOffrVat = 0; // 부가가치세
        }
        if (row.rmnCanBaseQty == null) {
          row.rmnCanBaseQty = 0;
          row.rmnCanOrdQty = 0;
        }
        row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        if (row.rmnCanDt) {
          row.rmnCanDt = this.$vnDateFormatD(row.rmnCanDt);
        }
        delete row['productInfo'];
        this.prdtData[index] = { ...rowData, ...productInfo };
      });
      this.realGrid.dataProvider.setRows(this.prdtData);
      this.$emit('sendDetailData', this.prdtData);
      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
      this.layoutVisible();
    },
  },
  methods: {
    async initGrid() {
      const vm = this;
      if (this.realGrid) {
        if (columns && layout && this.gridLang) {
          await this.loadDetail();
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

        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          if (clickData.cellType == 'data') {
            if (clickData.fieldName === 'trnPsbOrdQty' || clickData.fieldName == 'trnPsbBaseQty') {
              let trnPsbBaseQty = vm.realGrid.dataProvider.getValue(clickData.dataRow, 'trnPsbBaseQty');
              if (vm.page == 'orderDtls' && vm.authButton.fn4Auth == 'Y' && trnPsbBaseQty > 0) {
                vm.$parent.loadOrderPage('trnPsbOrdQty');
              }
            } else if (clickData.fieldName === 'prdtNm') {
              vm.realGrid.gridView.commit();
              if (vm.userMenuGrpCd !== 'CUSTOMER') {
                // let quotaStat = vm.realGrid.dataProvider.getValue(clickData.itemIndex, 'offrDtlsStatCd');
                if (vm.totalInfo.offrStatCd == 'REQ') {
                  vm.$emit('ment', 'message.msgMoveRequest');
                  vm.$emit('modalType', 'order');
                  vm.$parent.showModal('DetailAlarmModal');
                  // if (resp) {
                  //   vm.$parent.loadOrderPage('generalOrder');
                  // }
                } else {
                  vm.$emit('ment', 'message.errorsVaildRequest');
                  vm.$parent.showModal('QuoteDetailModal');
                }
              }
            } else if (clickData.fieldName == 'apprDocNum') {
              let clickedRow = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
              if (clickedRow.apprStatCd == 'NED') {
                vm.$emit('clickedRow', clickedRow);
              }
            }
            if (clickData.column === 'trnAddAmt' || clickData.column === 'chgQtyAmt') {
              const curr = vm.realGrid.gridView.getCurrent();
              vm.realGrid.gridView.beginUpdateRow(curr.itemIndex);
              vm.realGrid.gridView.showEditor();
              vm.realGrid.gridView.setFocus();
            }
          }
        };
      }
      await this.layoutSetting();
      this.layoutState(this.layoutData);
      if (this.prdtData && this.prdtData.length > 0) this.layoutVisible();
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.realGrid.gridView.columnByName('trnAddAmt').renderer = '';
        this.realGrid.gridView.columnByName('chgQtyAmt').renderer = '';
        this.realGrid.gridView.columnByName('apprDocNum').renderer = '';
        this.realGrid.gridView.columnByName('trnAddAmt').styleCallback = false;
        this.realGrid.gridView.columnByName('chgQtyAmt').styleCallback = false;
        this.realGrid.gridView.columnByName('apprDocNum').styleCallback = false;
        const visibleData = [
          //
          'apprStatNm', // 결재상태
          'apprDocNum', // 결재번호
          'createdByNm', // 생성자
          'updatedByNm', // 수정자
          'rmnCanDt', // 취소일
          'rmnCanByNm', // 취소자
          'trnAddAmt', // 운임조정액
          'reqQtyAmt', // 기준단가
          'prdtQtyAmt', // 합계
          'chgQtyAmt', // 견적단가
        ];
        for (let i = 0; i < visibleData.length; i++) {
          this.realGrid.gridView.columnByName(visibleData[i]).visible = false;
        }
      } else {
        // 로그인 유저가 고객이 아닐 때 visible false, 처리
        this.realGrid.gridView.columnByName('prdtQtyAmt2').visible = false;
      }
      if (this.userMenuGrpCd == 'CUSTOMER') {
        this.realGrid.gridView.layoutByName('reqQtyAmt').visible = false;
      }
    },
    async layoutSetting() {
      if (this.savePage.length > 0 && this.savePage !== null) {
        let key = this.savePage.length - 1;
        if (this.savePage[key].storeCls == 'quoteDetail') {
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
              let isSame = loadLayout.some(loadLay => {
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
              if (loadLayout.some(field => field.column === cur.column)) {
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

    chgUnitStat(type) {
      if (type) {
        this.$parent.chgUnitBtn(true);
      } else {
        this.$parent.chgUnitBtn(false);
      }
    },
    apprCheck() {
      this.realGrid.gridView.orderBy(['apprStatNm', 'itemNum'], ['descending', 'ascending']);
    },
    layoutState(data) {
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
      let unitInfo = this.realGrid.gridView.layoutByName('reqOrdQty').visible;
      this.chgUnitStat(unitInfo);
    },
    layoutVisible() {
      let coulnms = ['lpmFrtPttnNm', 'lpmBckPttnNm', 'prsUpPttnNm', 'prsDwPttnNm'];
      if (this.prdtData[0].prdtClsNm == 'MDF') {
        coulnms.forEach(data => {
          this.realGrid.gridView.layoutByName(data).visible = false;
        });
      } else {
        coulnms.forEach(data => {
          this.realGrid.gridView.layoutByName(data).visible = true;
        });
      }
    },
    async saveLayout(data) {
      if (data == 'reset') {
        this.realGrid.gridView.setColumnLayout(layout);
        this.layoutVisible();
        this.layoutState(this.layoutData);
      }
      let layouts = this.realGrid.gridView.saveColumnLayout();
      let param = {
        menuId: this.menuId,
        storeCls: 'quoteDetail',
        uiJson: layouts,
      };
      const response = await orderApi.putSaveUi(param);
      if (response.data.status == 200) {
        if (data == 'save') {
          this.$EventBus.$emit('openYesModal', 'message.msgResultSave');
        } else if (data == 'reset') {
          this.$EventBus.$emit('openYesModal', 'message.msgClearRefresh');
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgLayoutUpdate');
        }
      }
    },
    async loadDetail() {
      this.checkedCount = 0;
      let respInfo = await detailApi.getOffrMng(this.openInfo);
      this.offrInfo = respInfo.data.rs;
      // if (!this.trnInfo) {
      //   this.trnInfo = await detailApi.getTrnInfo(this.openInfo.id);
      // }
      this.totalInfo = { ...this.offrInfo };
      this.$emit('sendOffrInfo', this.totalInfo);
      let respDetail = await detailApi.getQuoteDetail({ ...this.openInfo, pageNumber: '', pageSize: '' });
      this.detailData = respDetail.data.ds;

      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
    },
    setAmt(dataRow, newValue, fieldName) {
      this.realGrid.gridView.commit();
      if (fieldName == 'CHGQTYAMT') {
        this.trnAddAmt = this.realGrid.dataProvider.getValue(dataRow, 'trnAddAmt');
        this.chgQtyAmt = newValue == undefined ? 0 : newValue;
        this.realGrid.dataProvider.setValue(dataRow, 'chgQtyAmt', newValue);
      } else if (fieldName == 'TRNADDAMT') {
        this.chgQtyAmt = this.realGrid.dataProvider.getValue(dataRow, 'chgQtyAmt');
        this.trnAddAmt = newValue == undefined ? 0 : newValue;
        this.realGrid.dataProvider.setValue(dataRow, 'trnAddAmt', newValue);
      }

      let total = this.chgQtyAmt + this.trnAddAmt;
      this.realGrid.dataProvider.setValue(dataRow, 'prdtQtyAmt', total);
    },
    focusCheck() {
      const focusCell = this.realGrid.gridView.getCurrent();
      if (focusCell.column !== null) {
        return true;
      } else {
        return false;
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
    // this.realGrid.gridView.onEditCommit = function (grid, index, oldValue, newValue) {
    //   if (index.column === 'apprDocNum') {
    //     grid.cancel();
    //     vm.realGrid.dataProvider.setValue(index.dataRow, 'apprDocNum', newValue);
    //     vm.realGrid.dataProvider.setValue(index.dataRow, 'apprDocNum', newValue);
    //   }
    // };
  },
  computed: {
    // ...mapGetters({
    //   userInfo: 'userInfo/getUserInfo',
    //   userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    // }),
  },
  created() {
    // if (this.authButton.fn5Auth == 'Y') {
    //   this.layout = custLayout;
    // } else {
    //   this.layout = salesLayout;
    // }
  },
};
</script>

<style></style>
