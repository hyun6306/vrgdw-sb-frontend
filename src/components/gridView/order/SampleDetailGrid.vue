<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { baseColumn, columns, fields, layout, ordColumn, labels } from '@/consts/gridData/order/SampleDetail';
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
      gridName: 'sampleDetaiGrid',
      realGrid: null,
      selectRow: -1,
      prdtData: [],
      checkedCount: 0,
      detailData: [],
      offrInfo: '',
      trnInfo: '',
      length: 0,
      test: false,
      baseColumnList: '',
      ordColumnList: '',
      totalInfo: '',
      focusCell: null,
      apprRow: [],
    };
  },
  watch: {
    openInfo() {
      this.loadDetail();
    },
    // selectMonth() {
    //   this.realGrid.dataProvider.setValue(this.selectRow, 'tranHopeMonth', this.selectMonth);
    // },
    // allHopeMonth() {
    //   const checkedRows = this.realGrid.gridView.getCheckedRows(false);
    //   checkedRows.forEach(row => {
    //     this.realGrid.dataProvider.setValue(row, 'tranHopeMonth', this.allHopeMonth);
    //   });
    // },
    gridLang() {
      this.initGrid();
    },
    layoutData(data) {
      this.layoutState(data);
    },
    detailData(data) {
      this.prdtData = [];
      this.realGrid.gridView.setAllCheck(false);
      data.forEach((row, index) => {
        let rowData = row;
        let productInfo = row.productInfo;
        if (row.apprDocNum == null) {
          row.apprDocNum = '';
        }
        if (row.sizeChgYn == 'Y' && row.offrDtlsStatCd == 'END') {
          row.salesResultCommt = 'Y';
        } else if (row.sizeChgYn == 'N' && (row.offrDtlsStatCd == 'ING' || row.offrDtlsStatCd == 'END') && (row.trnPsbBaseQty > 0 || row.trnEndBaseQty > 0)) {
          row.salesResultCommt = 'Y';
        } else {
          row.salesResultCommt = 'N';
        }
        if (row.smplEndTrnType === '우편') {
          row.smplEndTrnType = this.$t('message.post');
        } else if (row.smplEndTrnType === '영업방문') {
          row.smplEndTrnType = this.$t('message.salesVisit');
        }
        row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        delete row['productInfo'];
        this.prdtData[index] = { ...rowData, ...productInfo };
      });
      this.realGrid.dataProvider.setRows(this.prdtData);
      this.$emit('sendDetailData', this.prdtData);
      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
    },
  },
  methods: {
    chgUnitStat(type) {
      if (type) {
        this.$parent.chgUnitBtn(true);
      } else {
        this.$parent.chgUnitBtn(false);
      }
    },
    addApprNum(num) {
      this.apprRow.forEach(row => {
        this.realGrid.dataProvider.setValue(row, 'apprDocNum', num);
      });
    },
    apprCheckedData() {
      this.sendCheckedData();
      this.apprRow = this.realGrid.gridView.getCheckedRows(false);
    },
    async initGrid() {
      const vm = this;
      labels.push(this.$t('message.standard'));
      labels.push(this.$t('message.custom'));
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
          if (clickData.fieldName === 'salesResultCommt') {
            let salesResultCommt = vm.realGrid.dataProvider.getValue(clickData.dataRow, 'salesResultCommt');
            if (salesResultCommt == 'Y') {
              vm.sampleMemo(clickData.dataRow);
            }
          } else if (clickData.fieldName === 'prdtNm') {
            vm.realGrid.gridView.commit();
            if (vm.userMenuGrpCd !== 'CUSTOMER') {
              // let quotaStat = vm.dataProvider.getValue(clickData.itemIndex, 'offrDtlsStatCd');
              if (vm.totalInfo.offrStatCd == 'REQ') {
                vm.$emit('ment', 'message.msgMoveRequest');
                vm.$emit('modalType', 'sample');
                vm.$parent.showModal('DetailAlarmModal');
                // if (resp) {
                //   vm.$parent.loadOrderPage('generalOrder');
                // }
              } else {
                vm.$emit('ment', 'message.errorsVaildRequest');
                vm.$parent.showModal('QuoteDetailModal');
              }
            }
          } else if (clickData.fieldName === 'apprDocNum') {
            const sizeChgYn = vm.realGrid.dataProvider.getValue(clickData.dataRow, 'sizeChgYn');
            if (clickData.editable && sizeChgYn === 'N') {
              let clickedRow = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
              vm.apprRow = [];
              vm.apprRow.push(clickData.dataRow);
              const curr = vm.realGrid.gridView.getCurrent();
              vm.realGrid.gridView.beginUpdateRow(curr.itemIndex);
              vm.realGrid.gridView.showEditor();
              vm.realGrid.gridView.setFocus();
              vm.$emit('clickedRow', clickedRow);
            }
          }
          this.focusCell = clickData.fieldName;
          // if (clickData.column === 'apprDocNum') {
          //   const curr = this.realGrid.gridView.getCurrent();
          //   this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
          //   this.realGrid.gridView.showEditor();
          //   this.realGrid.gridView.setFocus();
          // }
        };
        this.realGrid.gridView.onEditCommit = function (grid, index, oldValue, newValue) {
          if (index.column === 'apprDocNum') {
            newValue = newValue.replaceAll('-', '');
            if (newValue.length == 20) {
              grid.cancel();
              vm.realGrid.dataProvider.setValue(index.dataRow, 'apprDocNum', newValue);
            } else {
              vm.$emit('ment', 'message.errorsVaildOffrDocumNum');
              vm.$parent.showModal('QuoteDetailModal');
              grid.cancel();
              vm.realGrid.dataProvider.setValue(index.dataRow, 'apprDocNum', '');
            }
          }
        };
      }
      await this.layoutSetting();
      this.layoutState(this.layoutData);
    },
    // cellClick() {
    //   this.realGrid.gridView.onCellClicked = (grid, clickData) => {
    //     if (clickData.column === 'apprDocNum') {
    //       const curr = this.realGrid.gridView.getCurrent();
    //       this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
    //       this.realGrid.gridView.showEditor();
    //       this.realGrid.gridView.setFocus();
    //     }
    //   };
    // },
    async sampleMemo(index) {
      let param = {
        // id: this.openInfo.id,
        // offrId: this.detailData[index].offrId,
        offrId: this.openInfo.id,
        id: this.detailData[index].id,
        custId: this.openInfo.custId,
      };
      const resp = await detailApi.getSalesMemo(param);
      this.$emit('ment', resp.data.rs.remark);
      this.$parent.showModal('DetailCommentModal');
    },
    apprCheck() {
      this.realGrid.gridView.orderBy(['apprStatNm', 'itemNum'], ['descending', 'ascending']);
    },
    layoutState(data) {
      // let baseColumn = this.authButton.fn5Auth == 'Y' ? custBaseColumn : salesBaseColumn;
      // let ordColumn = this.authButton.fn5Auth == 'Y' ? custOrdColumn : salesOrdColumn;
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
      if (this.userMenuGrpCd === 'CUSTOMER') {
        this.realGrid.gridView.columnByName('costCntrNm').visible = false;
        this.realGrid.gridView.columnByName('apprDocNum').visible = false;
      }
      let unitInfo = this.realGrid.gridView.layoutByName('reqOrdQty').visible;
      this.chgUnitStat(unitInfo);
    },
    costCenterEdit(data) {
      this.realGrid.gridView.commit(false);
      this.detailData.forEach((row, index) => {
        if (row.sizeChgYn == 'N') {
          this.realGrid.dataProvider.setValue(index, 'costCntrNm', data.costInfo.centerNm);
          this.realGrid.dataProvider.setValue(index, 'costCntrCd', data.costInfo.centerCd);
          // this.realGrid.dataProvider.setValue(index, 'trnExptDt', data.costDate);
        }
      });
    },
    getTotalData() {
      let totalData = this.realGrid.gridView.getJsonRows();
      return totalData;
    },
    async saveLayout(data) {
      if (data == 'reset') {
        this.realGrid.gridView.setColumnLayout(layout);
        this.layoutState(this.layoutData);
      }
      let layouts = this.realGrid.gridView.saveColumnLayout();
      let param = {
        menuId: this.menuId,
        storeCls: 'sampleDetail',
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
      this.realGrid.gridView.commit();
      this.checkedCount = 0;
      let respInfo = await detailApi.getOffrMng(this.openInfo);
      this.offrInfo = respInfo.data.rs;
      // if (!this.trnInfo) {
      //   this.trnInfo = await detailApi.getTrnInfo(this.openInfo.id);
      // }
      this.totalInfo = { ...this.offrInfo };
      // if (this.totalInfo.offrStatCd !== '확정' && this.userMenuGrpCd == 'VRGDW_SALES') {
      //   // this.realGrid.gridView.columnByName('costcenter').editable = false;
      // } else if (this.totalInfo.offrStatCd === '확정' && this.userMenuGrpCd == 'VRGDW_SALES') {
      // }
      let respDetail = await detailApi.getQuoteDetail({ ...this.openInfo, pageNumber: '', pageSize: '' });
      this.detailData = respDetail.data.ds;
      this.$emit('sendOffrInfo', this.totalInfo);
      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
    },
    async layoutSetting() {
      if (this.savePage.length > 0 && this.savePage !== null) {
        let key = this.savePage.length - 1;
        if (this.savePage[key].storeCls == 'sampleDetail') {
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
  },
  computed: {
    // ...mapGetters({
    //   userInfo: 'userInfo/getUserInfo',
    //   userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    // }),
  },
  created() {
    // if (this.authButton.fn5Auth == 'Y') {
    //   this.layout = custSampleLayout;
    // } else {
    //   this.layout = salesSampleLayout;
    // }
  },
};
</script>

<style></style>
