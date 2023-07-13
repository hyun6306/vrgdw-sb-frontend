<template>
  <div :id="gridName" ref="GeneralGrid" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout, baseColumn, ordColumn } from '@/consts/gridData/order/realgrid-generalList';
import orderGridJs from '@/mixins/order/orderGrid';
import orderApi from '@/api/order/order';
import { mapGetters } from 'vuex';
import defs from '@/consts/defs';
export default {
  props: ['menuId', 'savePage', 'pcUnit', 'bdlUnit', 'cancelId', 'refreshGrid', 'gridLang', 'prdtClsCd', 'offrStatusCd', 'sttDt', 'endDt', 'offrClsCd', 'emitPrdtList', 'newSearchResult'],
  data() {
    return {
      count: '',
      idInfo: '',
      gridName: 'GeneralListGrid',
      realGrid: null,
      menuList: [this.$store.state.menuList],
      orderGeneralObj: {},
      orderDtlsObj: {},
      setNewGrid: [],
      id: null,
      custId: null,
      gridSearchResult: [],
      setSelectProductRows: [],
      pageObj: {},
      offrId: '',
      offrIds: [],
      fieldName: '',
      layoutData: false,
    };
  },
  mixins: [orderGridJs],
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  watch: {
    refreshGrid() {
      const refreshGrid = [];
      this.refreshGrid.forEach(eachList => {
        let list = eachList;
        let customerInfo = list.customerInfo;
        delete list['customerInfo'];
        let item = { ...list, ...customerInfo };
        const row = item;
        row.offrDt = this.$vnDateFormatD(row.offrDt);
        // 진행상태에 따른 priceInfo visible 처리
        if (row.offrStatCd == 'REQ' || row.offrStatCd == 'TMP') {
          row.offrTotal = '';
          row.offrTotPrice = '';
          row.offrTotVat = '';
        }
        if (row.trnHopeDt) row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        if (row.offrEndDt) row.offrEndDt = this.$vnDateFormatD(row.offrEndDt);
        row.updatedAt = this.$vnDateFormatD(row.updatedAt);
        row.ordUnitNm = this.bdlUnit;
        row.baseUnitNm = this.pcUnit;
        row.paymentCond = row.paymentCondNm;
        refreshGrid.push(item);
      });
      this.realGrid.dataProvider.setRows(refreshGrid);
      // this.realGrid.gridView.setCurrent({ itemIndex: 0, column: 'offrDt' });
      this.count = this.realGrid.gridView.getItemCount();
      this.clearCheckCount();
      if (this.cancelId) {
        this.setCancelRow();
      }
    },
    gridLang() {
      this.initGrid();
    },
    clickInfo(clickInfo) {
      this.$emit('clickInfo', clickInfo);
    },
    count(count) {
      this.count = count;
      this.$emit('emitCount', this.count);
    },
    idInfo(idInfo) {
      this.$emit('idInfo', idInfo);
    },
    emitPrdtList() {
      this.emitPrdtList.forEach(eachList => {
        let list = eachList;
        let customerInfo = list.customerInfo;
        delete list['customerInfo'];
        let item = { ...list, ...customerInfo };
        const row = item;
        // 진행상태에 따른 priceInfo visible 처리 => 고객일 경우만
        if (row.offrStatCd == 'REQ' || row.offrStatCd == 'TMP') {
          row.offrTotal = '';
          row.offrTotPrice = '';
          row.offrTotVat = '';
        }
        row.offrDt = this.$vnDateFormatD(row.offrDt);
        if (row.trnHopeDt) row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        if (row.offrEndDt) row.offrEndDt = this.$vnDateFormatD(row.offrEndDt);
        row.updatedAt = this.$vnDateFormatD(row.updatedAt);
        row.ordUnitNm = this.bdlUnit;
        row.baseUnitNm = this.pcUnit;
        row.paymentCond = row.paymentCondNm;
        this.setNewGrid.push(item);
      });
      this.realGrid.dataProvider.setRows(this.setNewGrid);
      // this.realGrid.gridView.setCurrent({ itemIndex: 0, column: 'offrDt' });
      this.count = this.realGrid.gridView.getItemCount();
      this.setNewGrid.forEach(row => {
        this.offrIds.push({ offrId: row.id });
        const param = JSON.parse(JSON.stringify(this.offrIds));
        this.offrIds = param;
      });
      this.clearCheckCount();
      this.clearCurrent();
      this.$emit('setOfrrIds', this.offrIds);
    },
  },
  methods: {
    initGrid() {
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
      }
      this.layoutSetting();
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
          storeCls: 'management',
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
        if (this.savePage[key].storeCls == 'management') {
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
    isChooseCell() {
      const current = this.realGrid.gridView.getCurrent();
      return current.itemIndex !== -1 ? true : false;
    },
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    setCancelRow() {
      if (this.cancelId) {
        let value = this.cancelId;
        let fields = 'id';
        let startFieldIndex = fields.indexOf(this.realGrid.gridView.getCurrent().fieldName) + 1;
        let options = {
          fields: fields,
          value: value,
          startIndex: this.realGrid.gridView.getCurrent().itemIndex,
          startFieldIndex: startFieldIndex,
          wrap: true,
          caseSensitive: false,
          partialMatch: true,
        };
        let index = this.realGrid.gridView.searchCell(options);
        if (this.cancelId && index !== null) {
          this.realGrid.dataProvider.moveRow(index.itemIndex, 0);
          // this.realGrid.gridView.setCurrent({ dataRow: 0, column: 'offrStatNm' });
          this.realGrid.gridView.setFocus();
        }
      }
    },
    clearCheckCount() {
      if (this.realGrid) {
        this.realGrid.gridView.checkAll(false);
      }
    },
    cellClickTest() {
      const vm = this;
      this.realGrid.gridView.onCellClicked = function (grid, clickData) {
        // if (vm.realGrid.gridView.onItemChecked) {
        //   this.clearCurrent();
        // }
        // showEditor설정
        // if (clickData.column === 'reqOrdQty' || clickData.column === 'reqBaseQty') {
        //   const curr = this.realGrid.gridView.getCurrent();
        //   this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
        //   this.realGrid.gridView.showEditor();
        //   this.realGrid.gridView.setFocus();
        // }
        if (clickData.cellType !== 'header') {
          // 견적번호 클릭 시 페이지 이동
          if (clickData.fieldName == 'offrNum') {
            const clickInfo = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            // 견적요청 이동
            if (clickInfo.offrStatCd == defs.offrStatCd.temp) {
              vm.id = clickInfo.id;
              vm.custId = clickInfo.custId;
              vm.setMenuList();
              vm.pageObj = vm.orderGeneralObj;
              vm.$emit('setObject', vm.pageObj, vm.id, vm.custId);
              // 견적상세 이동
            } else if (clickInfo.offrStatCd == defs.offrStatCd.request || clickInfo.offrStatCd == defs.offrStatCd.proceed || clickInfo.offrStatCd == defs.offrStatCd.confirm || clickInfo.offrStatCd == defs.offrStatCd.end || clickInfo.offrStatCd == defs.offrStatCd.cancel) {
              vm.id = clickInfo.id;
              vm.custId = clickInfo.custId;
              vm.setMenuList();
              vm.pageObj = vm.orderDtlsObj;
              vm.$emit('setObject', vm.pageObj, vm.id, vm.custId);
            }
            // 고객 메모 클릭 시, 메모 조회
          } else if (clickData.fieldName == 'custReqRemarkYn') {
            const addrInfoVal = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            if (addrInfoVal.custReqRemarkYn == 'Y') {
              const clickInfo = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
              vm.openMemo(clickInfo);
            }
          } else if (clickData.fieldName == 'salesMngRemarkYn') {
            const salesMemoYn = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            const registYn = vm.realGrid.dataProvider.getValue(clickData.dataRow, 'salesMngRemarkYn');
            const clickInfo = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            if (salesMemoYn.salesMngRemarkYn == 'Y') {
              vm.openSalesMemo(registYn, clickInfo);
            }
          } else {
            return;
          }
        }
      };
    },
    // 선택삭제
    deleteSelectRows() {
      const checkedRow = this.realGrid.gridView.getCheckedRows();
      checkedRow.forEach(row => {
        this.realGrid.dataProvider.removeRow(row);
      });
    },
    openMemo(clickInfo) {
      const param = {
        id: clickInfo.id,
        memoType: 'CUSTOMER',
        custId: clickInfo.custId,
      };
      this.$emit('openMemo', param, this.userMenuGrpCd);
    },
    openSalesMemo(registYn, clickInfo) {
      if (clickInfo) {
        const param = {
          id: clickInfo.id,
          memoType: 'SALES',
          custId: clickInfo.custId,
        };
        this.$emit('salesMemo', param, registYn);
      }
    },
    getCustIdInfo() {
      const checkedRow = this.realGrid.gridView.getCheckedRows();
      const custExcelInfos = [];
      checkedRow.forEach(rows => {
        const excelRow = this.realGrid.dataProvider.getJsonRow(rows);
        custExcelInfos.push({ offrId: excelRow.id });
      });
      this.$emit('sendCustIdInfo', custExcelInfos);
    },
    openAddrInfo(clickInfo) {
      const clickValue = this.realGrid.dataProvider.getJsonRow(clickInfo.dataRow);
      const offrId = clickValue.id;
      this.$emit('openAddrInfo', clickInfo, offrId);
    },
    getCheckedClickInfos() {
      const checkedClickInfos = this.realGrid.gridView.getCheckedRows(false);
      const setCheckedClickInfos = [];
      checkedClickInfos.forEach(data => {
        setCheckedClickInfos.push(this.realGrid.dataProvider.getJsonRow(data).offrStatCd);
      });
      this.$emit('setClickInfos', setCheckedClickInfos);
      // return setSelectProductRows;
    },
    getCheckedRowsData() {
      const selectProductIndexs = this.realGrid.gridView.getCheckedRows(false);
      this.setSelectProductRows = [];
      selectProductIndexs.forEach(data => {
        this.setSelectProductRows.push({ custId: this.realGrid.dataProvider.getJsonRow(data).custId, id: this.realGrid.dataProvider.getJsonRow(data).id, offrStatCd: this.realGrid.dataProvider.getJsonRow(data).offrStatCd });
      });
      this.$emit('setProductRows', this.setSelectProductRows);
    },
    setNewSearchResult() {
      this.gridSearchResult = this.newSearchResult;
      this.realGrid.dataProvider.setRows(this.gridSearchResult);
      this.realGrid.gridView.setDisplayOptions({
        showEmptyMessage: true,
        emptyMessage: this.$t('message.gridMessageNoSearch'),
      });
      this.clearCheckCount();
      this.count = this.realGrid.gridView.getItemCount();
    },
    setMenuList() {
      const fourthResult = [];
      this.menuList.forEach(first => {
        first.menuList.forEach(second => {
          // 1 Depth
          second.children.forEach(third => {
            // 2 Depth
            third.children.forEach(fourth => {
              // 3 Depth
              fourthResult.push(fourth);
            });
          });
        });
      });
      // 견적 요청 FIND
      fourthResult.find(element => {
        if (element.routerPath == '/order/general') {
          this.orderGeneralObj = element;
        }
      });
      // 견적 상세 FIND
      fourthResult.find(data => {
        if (data.routerPath === '/order/general-dtls-list') {
          this.orderDtlsObj = data;
        }
      });
    },
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.gridView.setColumnProperty(column.fieldName, 'autoFilter', set);
      });
    },
  },
  mounted() {
    const that = this;
    const vm = this;
    const setGridData = {
      gridName: this.gridName,
      columns,
      fields,
      vm,
      layout: layout,
      existAddr: true,
      updatable: true,
    };
    this.realGrid = new RealGridCreate(setGridData);
    that.initGrid();
    that.cellClickTest();
  },
};
</script>

<style>
.decoration {
  text-decoration: underline;
}
</style>
