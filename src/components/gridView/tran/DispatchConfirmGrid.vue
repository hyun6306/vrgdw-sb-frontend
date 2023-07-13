<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/dispatchConfirm';
import commonApi from '@/api/common';
import orderApi from '@/api/order/order';
import commonGridJs from '@/mixins/commonGrid';
import { mapGetters } from 'vuex';
import defs from '@/consts/defs';

export default {
  props: ['dispatchConfirmList', 'menuId', 'gridLang', 'savePage', 'page'],
  data() {
    return {
      gridName: 'DispatchConfirmGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      selectRow: -1,
      outTypeCdText: [],
      outTypeCdValue: [],
      outTypeOptions: [],
      typeOption: [],
      outTypeCd: {},
      rowIndex: [],
      defOutTypeCd: defs.outTypeCd,
    };
  },
  mixins: [commonGridJs],
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  watch: {
    dispatchConfirmList() {
      this.dispatchConfirmList.forEach(row => {
        if (row.trnCfmAt) row.trnCfmAt = this.$vnDateFormatDt(row.trnCfmAt);
        if (row.inExptDt) row.inExptDt = this.$vnDateFormatD(row.inExptDt);
        if (row.inPsbDt) row.inPsbDt = this.$vnDateFormatD(row.inPsbDt);
        if (row.trnCmplAt) row.trnCmplAt = this.$vnDateFormatDt(row.trnCmplAt);
        if (row.trnReqAt) row.trnReqAt = this.$vnDateFormatDt(row.trnReqAt);
        if (row.trnHopeDt) row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        if (row.outTypeCd) row.outTypeCd = JSON.stringify({ value: row.outTypeCd, text: row.outTypeNm });
        if (row.trnPlnNum == null) row.trnPlnNum = '';
        // if (!row.outTypeCd) {
        //   let option = this.outTypeOptions.find(option => option.value === this.defOutTypeCd.판매운송);
        //   if (option) row.outTypeCd = JSON.stringify(option);
        // }
      });
      this.realGrid.dataProvider.setRows(this.dispatchConfirmList);
      this.setSelectBox();
      this.clearCheckCount();
      this.clearCurrent();
      this.setMerge();
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
        };
        this.realGrid = new RealGridCreate(setGridData);

        this.realGrid.gridView.onCellClicked = (grid, clickData) => {
          if (clickData.cellType == 'data') {
            this.selectRow = clickData.itemIndex;
            if (clickData.fieldName === 'trnPlnNum') {
              const trnPlnInfo = this.realGrid.dataProvider.getJsonRow(clickData.dataRow);
              if (trnPlnInfo && trnPlnInfo.trnPlnNum && trnPlnInfo.trnPlnNum !== '') {
                const trnCarType = trnPlnInfo.trnCarType;
                if (trnCarType !== 'VRGDW') {
                  this.$emit('openForwardingCustCar', trnPlnInfo);
                } else {
                  this.$emit('sendGridtrnPlnInfo', trnPlnInfo);
                }
              }
            } else if (clickData.fieldName == 'trnNum') {
              let trnNum = grid.getValue(clickData.itemIndex, 'trnNum');
              let trnClsCd = grid.getValue(clickData.itemIndex, 'trnClsCd');
              let trnPlnNum = grid.getValue(clickData.itemIndex, 'trnPlnNum');
              if (trnNum !== null) {
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
            // else if (clickData.fieldName === 'trnCarNum') {
            //   const trnCarNum = this.realGrid.dataProvider.getJsonRow(clickData.itemIndex);
            //   // this.$emit('sendGridData', gridData);
            // }
          }
        };

        this.isEmpty();
      }
      this.setMerge();
      await this.layoutSetting();
    },
    async getCommonCodeCombo(prntCd = '') {
      try {
        const param = {
          groupCd: 'OUT_TYPE',
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        this.outTypeOptions = response.data.ds;
        // this.outTypeOptions.splice(0, 1);
        this.outTypeOptions.forEach(option => {
          this.outTypeCdText.push(option.text);
          this.outTypeCdValue.push(option.value);
          this.typeOption.push(JSON.stringify(option));
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
      this.realGrid.gridView.setColumnProperty('outTypeCd', 'editor', {
        type: 'list',
        labels: this.outTypeCdText,
        values: this.typeOption, //outTypeCdValue
        displayLabels: 'label',
        textReadOnly: true,
      });
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
      this.realGrid.gridView.commit();
      if (this.fieldName == 'OUTTYPECD') {
        let outTypeCd = newValue;
        this.realGrid.dataProvider.setValue(itemIndex, 'outTypeCd', outTypeCd);
        if (oldValue === newValue) this.realGrid.dataProvider.setRowState(itemIndex, 'none');
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
      this.realGrid.gridView.columnByName('trncusNm').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('trnCarNm').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('outStatNm').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('trnCfmAt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('trnCmplAt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('trnReqAt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
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
