<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { columns, fields, layout } from '@/consts/gridData/tran/dispatchRequest';
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
import commonGridJs from '@/mixins/commonGrid';
import { mapGetters } from 'vuex';
import defs from '@/consts/defs';

export default {
  props: ['dispatchReqList', 'menuId', 'gridLang', 'savePage', 'page', 'selectDateShow', 'carInfo'],
  data() {
    return {
      gridName: 'DispatchRequestGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      selectRow: -1,
      inExptTiText: [],
      inExptTiValue: [],
      exptOption: [],
      timeOptions: [],
      inExptTi: {},
      currentCarInfo: [],
      result: '',
    };
  },
  mixins: [commonGridJs],
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  watch: {
    dispatchReqList() {
      let format = this.$vnDateFormatD;
      this.dispatchReqList.forEach(row => {
        if (row.inExptDt) row.inExptDt = format(row.inExptDt);
        if (row.inPsbDt) {
          row.inPsbDt = format(row.inPsbDt);
          if (!row.inExptDt) row.inExptDt = row.inPsbDt;
        }
        if (row.trnPsbDt) row.trnPsbDt = format(row.trnPsbDt);
        if (row.trnHopeDt) row.trnHopeDt = format(row.trnHopeDt);
        if (row.inExptTi) row.inExptTi = JSON.stringify({ value: row.inExptTi, text: row.inExptTiNm });
        if (row.inPsbTi && !row.inExptTi) {
          row.inExptTi = JSON.stringify({ value: row.inPsbTi, text: row.inPsbTiNm });
        }

        if (row.trnReqAt) row.trnReqAt = this.$vnDateFormatDt(row.trnReqAt);
      });
      this.realGrid.dataProvider.setRows(this.dispatchReqList);

      this.setSelectBox();
      this.clearCheckCount();
      this.clearCurrent();
      this.setMerge();
    },
    selectDateShow() {
      let mergeItems = this.realGrid.gridView.getMergedItems(this.selectRow, 'trnPlnNum', true, true);
      let mergeDataRows = this.realGrid.gridView.getRowsOfItems(mergeItems);
      mergeDataRows.forEach(index => {
        this.realGrid.dataProvider.setValue(index, 'inExptDt', this.selectDateShow);
      });
    },
    carInfo() {
      this.currentCarInfo = [];
      // let trnPlnNum = this.realGrid.dataProvider.getValue(this.selectRow, 'trnPlnNum');
      let trnCarNum = this.realGrid.dataProvider.getValue(this.selectRow, 'trnCarNum');
      let driverPhoneNum = this.realGrid.dataProvider.getValue(this.selectRow, 'driverPhoneNum');
      let driverNm = this.realGrid.dataProvider.getValue(this.selectRow, 'driverNm');
      if (this.carInfo.tranCarNum) {
        this.currentCarInfo = this.carInfo;
        this.realGrid.dataProvider.setValue(this.selectRow, 'trnCarNum', this.currentCarInfo.tranCarNum);
        this.realGrid.dataProvider.setValue(this.selectRow, 'driverPhoneNum', this.currentCarInfo.driverMobileNum);
        this.realGrid.dataProvider.setValue(this.selectRow, 'driverNm', this.currentCarInfo.driverNm);
      } else {
        this.realGrid.dataProvider.setValue(this.selectRow, 'trnCarNum', trnCarNum);
        this.realGrid.dataProvider.setValue(this.selectRow, 'driverPhoneNum', driverPhoneNum);
        this.realGrid.dataProvider.setValue(this.selectRow, 'driverNm', driverNm);
      }
      let mergeItems = this.realGrid.gridView.getMergedItems(this.selectRow, 'trnPlnNum', true, true);
      let mergeDataRows = this.realGrid.gridView.getRowsOfItems(mergeItems);
      mergeDataRows.forEach(index => {
        this.realGrid.dataProvider.setValue(index, 'trnCarNum', this.currentCarInfo.tranCarNum);
        this.realGrid.dataProvider.setValue(index, 'driverPhoneNum', this.currentCarInfo.driverMobileNum);
        this.realGrid.dataProvider.setValue(index, 'driverNm', this.currentCarInfo.driverNm);
      });
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
          existCalendar: true,
          existSearch: true,
        };
        this.realGrid = new RealGridCreate(setGridData);

        this.realGrid.gridView.onCellClicked = (grid, clickData) => {
          if (clickData.cellType == 'data') {
            this.selectRow = clickData.itemIndex;
            let outStatCd = grid.getValue(this.selectRow, 'outStatCd');
            let trnNum = grid.getValue(clickData.itemIndex, 'trnNum');
            if (clickData.fieldName === 'trnCarNum') {
              if (outStatCd !== defs.outStatCd.disEnd) {
                const jsonRow = this.realGrid.dataProvider.getJsonRow(this.selectRow);
                this.$emit('sendGridCarInfo', jsonRow);
              }
            } else if (clickData.fieldName === 'inExptDt') {
              if (outStatCd !== defs.outStatCd.disEnd) {
                const gridData = this.realGrid.dataProvider.getJsonRow(this.selectRow);
                this.$emit('sendGridData', gridData);
              }
            } else if (clickData.column === 'trnPlnNum') {
              let trnPlnInfo = this.realGrid.dataProvider.getJsonRow(clickData.dataRow);
              if (trnPlnInfo && trnPlnInfo.trnPlnNum && trnPlnInfo.trnPlnNum !== '') {
                const trnCarType = trnPlnInfo.trnCarType;
                if (trnCarType !== 'VRGDW') {
                  this.$emit('openForwardingCustCar', trnPlnInfo);
                } else {
                  this.$emit('openForwardingDetail', trnPlnInfo);
                }
              }
            } else if (clickData.fieldName == 'trnNum' && trnNum !== null) {
              let trnClsCd = grid.getValue(clickData.itemIndex, 'trnClsCd');
              let trnPlnNum = grid.getValue(clickData.itemIndex, 'trnPlnNum');
              if (trnClsCd == defs.trnClsCd.move || trnClsCd == defs.trnClsCd.etc) {
                if (trnPlnNum !== null && trnPlnNum !== '') {
                  this.$parent.fwdDtlsModal(trnPlnNum);
                } else {
                  this.$EventBus.$emit('openYesModal', 'message.errorsNullTrnPlnNum');
                }
              } else {
                this.$parent.deliveryInfoModal(trnNum);
              }
            }
          }
        };

        this.isEmpty();
        this.setMerge();
        this.fixGridColFirst(1);
      }
      await this.layoutSetting();
    },
    async getCommonCodeCombo(prntCd = '') {
      try {
        const param = {
          groupCd: 'TIME_CD',
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        this.timeOptions = response.data.ds;
        this.timeOptions.forEach(option => {
          this.inExptTiText.push(option.text);
          this.inExptTiValue.push(option.value);
          this.exptOption.push(JSON.stringify(option));
        });
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setSelectBox() {
      this.realGrid.gridView.setColumnProperty('inExptTi', 'editor', {
        type: 'list',
        labels: this.inExptTiText,
        values: this.exptOption, //trnHopeTiValue
        displayLabels: 'label',
        textReadOnly: true,
      });
    },
    onItemChecked(grid, itemIndex, checked) {
      const selectProductIndexs = this.realGrid.gridView.getCheckedRows(false);
      const selectProductRows = [];
      selectProductIndexs.forEach(index => {
        selectProductRows.push(this.realGrid.dataProvider.getJsonRow(index));
      });

      const dataRow = this.realGrid.gridView.getDataRow(itemIndex);
      const data = {
        trnReqOrdQty: this.realGrid.dataProvider.getValue(dataRow, 'trnReqOrdQty').toFixed(3),
        trnOrgWght: this.realGrid.dataProvider.getValue(dataRow, 'trnOrgWght').toFixed(3),
        trnOrgVol: this.realGrid.dataProvider.getValue(dataRow, 'trnOrgVol').toFixed(3),
        checked: checked,
      };
      this.$emit('checkedInfo', data);
    },
    onItemsChecked(grid, items, checked) {
      items.forEach(itemIndex => {
        const dataRow = this.realGrid.gridView.getDataRow(itemIndex);
        const data = {
          trnReqOrdQty: this.realGrid.dataProvider.getValue(dataRow, 'trnReqOrdQty').toFixed(3),
          trnOrgWght: this.realGrid.dataProvider.getValue(dataRow, 'trnOrgWght').toFixed(3),
          trnOrgVol: this.realGrid.dataProvider.getValue(dataRow, 'trnOrgVol').toFixed(3),
          checked: checked,
        };
        this.$emit('checkedInfo', data);
      });
    },
    onItemAllChecked(grid, checked) {
      const checkedAllRows = this.realGrid.gridView.getCheckedRows(false);
      const selectProductRows = [];
      checkedAllRows.forEach(index => {
        selectProductRows.push(this.realGrid.dataProvider.getJsonRow(index));
      });

      const data = {
        trnReqOrdQty: this.realGrid.gridView.getSummary('trnReqOrdQty', 'sum').toFixed(3) * 1,
        trnOrgWght: this.realGrid.gridView.getSummary('trnOrgWght', 'sum').toFixed(3) * 1,
        trnOrgVol: this.realGrid.gridView.getSummary('trnOrgVol', 'sum').toFixed(3) * 1,
        checked: checked,
        all: true,
      };
      this.$emit('checkedInfo', data);
    },
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    getNewAndChangeData() {
      const newRowsIndex = this.realGrid.dataProvider.getAllStateRows();
      const newRows = [];
      newRowsIndex.updated.forEach(index => {
        const row = this.realGrid.dataProvider.getJsonRow(index);
        newRows.push(row);
      });
      return newRows;
    },
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      const fieldName = this.realGrid.dataProvider.getFieldName(field);
      this.realGrid.gridView.commit();
      if (fieldName == 'INEXPTTI') {
        let inExptTi = newValue;

        let mergeItems = this.realGrid.gridView.getMergedItems(itemIndex, 'trnPlnNum', true, true);
        let mergeDataRows = this.realGrid.gridView.getRowsOfItems(mergeItems);
        mergeDataRows.forEach(index => {
          this.realGrid.dataProvider.setValue(index, 'inExptTi', inExptTi);
          if (oldValue === newValue) {
            this.realGrid.dataProvider.setRowState(index, 'none');
          }
        });
      }
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
    setMerge() {
      this.realGrid.gridView.checkBar.mergeRule = { criteria: "values['trnPlnNum']" };
      this.realGrid.gridView.columnByName('trnPlnNum').mergeRule = { criteria: "values['trnPlnNum']" };
      this.realGrid.gridView.columnByName('trnCarNum').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('driverPhoneNum').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('outStatNm').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('inExptDt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('inExptTi').mergeRule = { criteria: "values['trnPlnNum'] + value" };
    },
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.gridView.setColumnProperty(column.fieldName, 'autoFilter', set);
      });
      this.setSelectBox();
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {
    this.getCommonCodeCombo();
  },
};
</script>

<style></style>
