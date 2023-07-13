<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout, baseColumn, ordColumn } from '@/consts/gridData/booking/bookingListOrder';
import commonGridJs from '@/mixins/commonGrid';
import orderApi from '@/api/order/order';
import { mapGetters } from 'vuex';
import defs from '@/consts/defs';

export default {
  props: ['bookingData', 'gridLang', 'savePage', 'menuId', 'page'],
  data() {
    return {
      gridName: 'BookingOrderGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      fieldName: '',
      dataRow: '',
      oldValue: '',
      ment: '',
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
        if (row.asgnReqDt) row.asgnReqDt = format(row.asgnReqDt);
        if (row.stockAsgnDt) row.stockAsgnDt = format(row.stockAsgnDt);
        if (row.lstTrnReqDt) row.lstTrnReqDt = format(row.lstTrnReqDt);
        if (row.prdcExpctDt) row.prdcExpctDt = format(row.prdcExpctDt);
        if (row.prdcSttDt) row.prdcSttDt = format(row.prdcSttDt);
        if (row.dfcEndDt) row.dfcEndDt = format(row.dfcEndDt);
        if (row.createdDt) row.createdDt = format(row.createdDt);
        if (row.updatedDt) row.updatedDt = format(row.updatedDt);
        if (row.canDt) row.canDt = format(row.canDt);
        if (row.trnHopeDt) row.trnHopeDt = format(row.trnHopeDt);
        if (row.trnExpctDt) row.trnExpctDt = format(row.trnExpctDt);
      });
      this.realGrid.dataProvider.setRows(this.bookingData);
      this.clearCurrent();
      // setTimeout(() => {
      //   this.realGrid.gridView.fitLayoutWidth(null, 1000, 300, true);
      // }, 100);

      // columns 간격조정
      let columnItem;
      const columnWidth = 30;
      for (let i of columns) {
        columnItem = this.realGrid.gridView.layoutByColumn(i.name);
        if (columnItem && columnItem.cellWidth) {
          // console.log('columns', columnItem.cellWidth);
          columnItem.cellWidth += columnWidth;
        }
      }
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    cellClick() {
      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.editable && (clickData.column === 'bokngOrdQty' || clickData.column === 'bokngBaseQty' || clickData.column === 'bokngTrnAddAmt' || clickData.column === 'bokngPrdtQtyAmt' || clickData.column === 'bokngQtyAmt')) {
          const curr = this.realGrid.gridView.getCurrent();
          this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
          this.realGrid.gridView.showEditor();
          this.realGrid.gridView.setFocus();
        } else if (clickData.column === 'apprDocNum') {
          let apprStatCd = grid.getValue(clickData.itemIndex, 'apprStatCd');
          if (apprStatCd === defs.apprStatCd.need) {
            const apprRowInfo = this.realGrid.dataProvider.getJsonRow(clickData.itemIndex);
            this.$emit('sendApprRowInfo', apprRowInfo);
          }
        }
      };
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

        // this.filterManual();
      } else {
        const vm = this;
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
          layout: layout,
          existAddr: true,
          existCalendar: true,
          updatable: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.init();
        vm.cellClick();
      }
      await this.layoutSetting();
      this.layoutState(this.layoutData);
    },
    filterManual() {
      let filterFunc2 = function (ds, dataRow, level, field, filter, value) {
        if (value === 0) {
          return true;
        }
      };
      let filterFunc = function (ds, dataRow, level, field, filter, value) {
        if (value !== 0) {
          return true;
        }
      };
      const filter = [
        {
          name: '0',
          callback: filterFunc2,
        },
        {
          name: this.$t('message.else'),
          callback: filterFunc,
        },
      ];
      this.realGrid.gridView.setColumnFilters('trnPsbBaseQty', filter);
      this.realGrid.gridView.setColumnFilters('trnPsbOrdQty', filter);
    },
    // getNewAndChangeData() {
    //   const newRowsIndex = this.realGrid.dataProvider.getAllStateRows();
    //   const newRows = [];
    //   newRowsIndex.updated.forEach(index => {
    //     const row = this.realGrid.dataProvider.getJsonRow(index);
    //     newRows.push(row);
    //   });
    //   return newRows;
    // },
    oldLoad() {
      if (this.fieldName == 'BOKNGQTYAMT') {
        this.realGrid.dataProvider.setValue(this.dataRow, 'bokngQtyAmt', this.oldValue);
      } else if (this.fieldName == 'BOKNGTRNADDAMT') {
        this.realGrid.dataProvider.setValue(this.dataRow, 'bokngTrnAddAmt', this.oldValue);
      } else if (this.fieldName == 'BOKNGBASEQTY' || this.fieldName == 'BOKNGORDQTY') {
        this.realGrid.dataProvider.setValue(this.dataRow, 'bokngBaseQty', this.oldValue);
        this.realGrid.dataProvider.setValue(this.dataRow, 'bokngOrdQty', this.oldValue);
      }
      // this.realGrid.dataProvider.setRowState(this.dataRow, 'none');
    },
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      this.realGrid.gridView.commit();
      this.dataRow = dataRow;
      this.oldValue = oldValue;
      this.fieldName = this.realGrid.dataProvider.getFieldName(field);
      let getBokngQtyAmt = this.realGrid.dataProvider.getValue(this.dataRow, 'bokngQtyAmt');
      let getBokngTrnAddAmt = this.realGrid.dataProvider.getValue(this.dataRow, 'bokngTrnAddAmt');
      let getBokngBaseQty = this.realGrid.dataProvider.getValue(this.dataRow, 'bokngBaseQty');
      let getBokngOrdQty = this.realGrid.dataProvider.getValue(this.dataRow, 'bokngOrdQty');

      let ordUnitNmrtr = this.realGrid.dataProvider.getValue(this.dataRow, 'ordUnitNmrtr');
      let ordUnitDenom = this.realGrid.dataProvider.getValue(this.dataRow, 'ordUnitDenom');
      newValue = newValue ? newValue : 0;

      if (this.fieldName == 'BOKNGQTYAMT' || this.fieldName == 'BOKNGTRNADDAMT') {
        //부킹조정 판매가, 운임조정액
        if (this.fieldName == 'BOKNGQTYAMT') {
          getBokngQtyAmt = newValue;
          this.realGrid.dataProvider.setValue(this.dataRow, 'bokngQtyAmt', getBokngQtyAmt);
        } else if (this.fieldName == 'BOKNGTRNADDAMT') {
          getBokngTrnAddAmt = newValue;
          this.realGrid.dataProvider.setValue(this.dataRow, 'bokngTrnAddAmt', getBokngTrnAddAmt);
        }
        let sum = getBokngQtyAmt + getBokngTrnAddAmt;
        this.realGrid.dataProvider.setValue(this.dataRow, 'bokngPrdtQtyAmt', sum);
      } else if (this.fieldName == 'BOKNGBASEQTY' || this.fieldName == 'BOKNGORDQTY') {
        //부킹량(주문, 기본)
        let reqBaseQty = this.realGrid.dataProvider.getValue(this.dataRow, 'reqBaseQty');
        let reqOrdQty = this.realGrid.dataProvider.getValue(this.dataRow, 'reqOrdQty');
        let reqRmnBaseQty = reqRmnBaseQty ? reqBaseQty - getBokngBaseQty : 0; //견적 요청 남은수량-기본
        let reqRmnOrdQty = reqRmnOrdQty ? reqOrdQty - getBokngOrdQty : 0; //견적 요청 남은수량-주문

        if (this.fieldName == 'BOKNGBASEQTY') {
          if (reqBaseQty < newValue) {
            this.$EventBus.$emit('openYesModal', 'message.msgExcessQty');
            this.oldLoad();
          } else {
            let value = Math.round((ordUnitNmrtr / ordUnitDenom) * newValue * 1000) / 1000;
            reqRmnBaseQty = reqBaseQty - newValue;
            this.realGrid.dataProvider.setValue(this.dataRow, 'reqRmnBaseQty', reqRmnBaseQty);
            this.realGrid.dataProvider.setValue(this.dataRow, 'bokngOrdQty', value);
            reqRmnOrdQty = reqOrdQty - value;
            this.realGrid.dataProvider.setValue(this.dataRow, 'reqRmnOrdQty', reqRmnOrdQty);
          }
        } else if (this.fieldName == 'BOKNGORDQTY') {
          if (reqOrdQty < newValue) {
            this.$EventBus.$emit('openYesModal', 'message.msgExcessQty');
            this.oldLoad();
          } else if (newValue % 1 === 0) {
            let value = (newValue * ordUnitDenom) / ordUnitNmrtr;
            reqRmnOrdQty = reqOrdQty - newValue;
            this.realGrid.dataProvider.setValue(this.dataRow, 'reqRmnOrdQty', reqRmnOrdQty);
            this.realGrid.dataProvider.setValue(this.dataRow, 'bokngBaseQty', value);
            reqRmnBaseQty = reqBaseQty - value;
            this.realGrid.dataProvider.setValue(this.dataRow, 'reqRmnBaseQty', reqRmnBaseQty);
          }
        }
        // this.getNewAndChangeData();
      }
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
      //   this.realGrid.gridView.fitLayoutWidth(null, 1000, 300, true);
      // }, 100);
    },
  },
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
