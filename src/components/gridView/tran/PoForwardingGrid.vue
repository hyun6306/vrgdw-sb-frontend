<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { cityCdCodes, columns, distrCdCodes, fields, layout } from '@/consts/gridData/tran/poForwarding';
import commonGridJs from '@/mixins/commonGrid';
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
import { mapGetters } from 'vuex';
import defs from '@/consts/defs';

export default {
  props: {
    poRequestList: {
      type: Array,
    },
    selectDate: {
      type: String,
    },
    selectDateShow: {
      type: String,
    },
    menuId: {
      type: Number,
    },
    gridLang: {
      type: Array,
    },
    savePage: {
      type: Array,
    },
    page: {
      type: String,
    },
  },
  data() {
    return {
      gridName: 'PoForwardingGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      selectRow: -1,
      distrOptions: [],
      cityOptions: [],
      carTypeOptions: [],
      carTypeOption: [],
      timeOptions: [],
      timeOption: [],
      carTypeText: [],
      distrText: [],
      distrValue: [],
      trnHopeTiText: [],
      time: [],
      fieldName: '',
      dataRow: '',
      oldValue: '',
      count: {
        cdLvl1: 0,
        cdLvl2: 0,
      },
      result: '',
      rowIndex: [],
      trnCarType: {},
      trnHopeTi: {},
      // cityCd: {},
      defsCarType: defs.carTypeCd,
    };
  },
  mixins: [commonGridJs],
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  watch: {
    poRequestList() {
      this.poRequestList.forEach(row => {
        row.reqBaseQty = row.sapBaseQty - row.reqTotBaseQty;
        if (row.trnHopeDt) row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        if (row.reqDt) row.reqDt = this.$vnDateFormatD(row.reqDt);
        if (row.logitsPhoneNum1) {
          let phoneNum = row.logitsPhoneNum1.split('-');
          row.phoneNum1 = phoneNum[0];
          row.phoneNum2 = phoneNum[1];
          row.phoneNum3 = phoneNum[2];
        }
        this.carTypeOptions.forEach(list => {
          if (list.value === row.trnCarType) {
            this.trnCarType = JSON.stringify({ value: row.trnCarType, text: list.text });
          }
        });
        if (row.trnCarType) row.trnCarType = this.trnCarType;
        // this.trnHopeTi = this.timeOptions.find(option => (option.value = row.trnHopeTi));
        this.timeOptions.forEach(list => {
          if (list.value === row.trnHopeTi) {
            this.trnHopeTi = JSON.stringify({ value: row.trnHopeTi, text: list.text });
          }
        });
        if (row.trnHopeTi) row.trnHopeTi = this.trnHopeTi;
      });
      this.realGrid.dataProvider.setRows(this.poRequestList);
      this.setSelectBox();
      this.clearCurrent();
    },
    selectDateShow() {
      this.realGrid.dataProvider.setValue(this.selectRow, 'trnHopeDt', this.selectDateShow);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'VNM_CITY') {
          if (prntCd !== '') {
            this.distrOptions = [];
            this.distrOptions = response.data.ds;

            this.distrOptions.forEach(list => {
              distrCdCodes.tags.push(list.value);
              distrCdCodes.keys.push([prntCd, list.value]);
              distrCdCodes.values.push(list.text);
            });

            this.count.cdLvl2++;
            if (this.count.cdLvl1 === this.count.cdLvl2) {
              this.realGrid.gridView.addLookupSource(distrCdCodes);
            }
          } else {
            this.cityOptions = [];
            this.cityOptions = response.data.ds;
            this.cityOptions.forEach(list => {
              cityCdCodes.values.push(list.text);
              cityCdCodes.keys.push(list.value);
              this.count.cdLvl1++;
              this.getCommonCodeCombo(groupCd, list.value);
            });
          }
        } else if (groupCd === 'CAR_TYPE') {
          this.carTypeOptions = [];
          this.carTypeOptions = response.data.ds;
          this.carTypeOptions.forEach(list => {
            // if (list.value === this.defsCarType.VRGDW) { 그리드 영역 > 배송유형 셀렉박스 option에 고객차량도 선택 가능하게 if문 주석
            this.carTypeText.push(list.text);
            this.carTypeOption.push(JSON.stringify(list));
            // }
          });
        } else if (groupCd === 'TIME_CD') {
          this.timeOptions = [];
          this.timeOptions = response.data.ds;
          this.timeOptions.forEach(list => {
            this.trnHopeTiText.push(list.text);
            this.timeOption.push(JSON.stringify(list));
          });
        }
      } catch (e) {
        console.log(e);
      }
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
          // existCalendar: true,
          updatable: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.setSelectBox();
        this.setGridEvent(this.realGrid.gridView, this.realGrid.dataProvider);
        vm.cellClick();
        this.isEmpty();
      }
      await this.layoutSetting();
      this.fixGridColFirst(1);
    },
    setGridEvent(grid, provider) {
      provider;
      grid.onEditCommit = function (grid, index, oldValue, newValue) {
        if (index.fieldName === 'cityCd') {
          if (newValue) {
            grid.setValue(index.itemIndex, 'cityCd', newValue);
          }

          if (oldValue !== newValue) {
            grid.setValue(index.itemIndex, 'distrCd', '');
          }
        }
      };
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
    openCalendar(dataRow) {
      this.selectRow = dataRow;
      // const currentDate = this.realGrid.dataProvider.getValue(dataRow, 'trnHopeDt');
      // this.$emit('openSingleCalendar', currentDate);
    },
    isEmpty() {
      this.realGrid.gridView.setDisplayOptions({
        showEmptyMessage: true,
        emptyMessage: this.$t('message.gridMessageNoSearch'),
      });
    },
    onItemChecked() {
      const selectProductIndexs = this.realGrid.gridView.getCheckedRows(false);
      this.rowIndex = [];
      const selectProductRows = [];
      selectProductIndexs.forEach(index => {
        this.rowIndex.push(index);
        selectProductRows.push(this.realGrid.dataProvider.getJsonRow(index));
      });
      this.$emit('sendSelectProducts', selectProductRows);
    },
    onItemAllChecked(grid, checked) {
      checked;
      const checkedAllRows = this.realGrid.gridView.getCheckedRows(false);
      this.rowIndex = [];
      const selectProductRows = [];
      checkedAllRows.forEach(index => {
        this.rowIndex.push(index);
        selectProductRows.push(this.realGrid.dataProvider.getJsonRow(index));
      });
      this.$emit('sendSelectProducts', selectProductRows);
    },
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      this.realGrid.gridView.commit();
      this.dataRow = dataRow;
      this.oldValue = oldValue;
      this.fieldName = this.realGrid.dataProvider.getFieldName(field);

      if (this.fieldName == 'TRNCARTYPE') {
        let trnCarType = newValue;
        this.realGrid.dataProvider.setValue(this.dataRow, 'trnCarType', trnCarType);
      } else if (this.fieldName == 'ADDR') {
        let addr = newValue;
        this.realGrid.dataProvider.setValue(this.dataRow, 'addr', addr);
      } else if (this.fieldName == 'PHONENUM1') {
        let phoneNum1 = newValue;
        this.realGrid.dataProvider.setValue(this.dataRow, 'phoneNum1', phoneNum1);
      } else if (this.fieldName == 'PHONENUM2') {
        let phoneNum2 = newValue;
        this.realGrid.dataProvider.setValue(this.dataRow, 'phoneNum2', phoneNum2);
      } else if (this.fieldName == 'PHONENUM3') {
        let phoneNum3 = newValue;
        this.realGrid.dataProvider.setValue(this.dataRow, 'phoneNum3', phoneNum3);
      } else if (this.fieldName == 'REQBASEQTY') {
        let reqBaseQty = newValue;
        const sapBaseQty = this.realGrid.dataProvider.getValue(this.dataRow, 'sapBaseQty');
        const reqTotBaseQty = this.realGrid.dataProvider.getValue(this.dataRow, 'reqTotBaseQty');
        const qty = sapBaseQty - reqTotBaseQty;
        if (qty < reqBaseQty) {
          this.realGrid.dataProvider.setValue(this.dataRow, 'reqBaseQty', qty);
          this.$EventBus.$emit('openYesModal', 'message.msgConfirmReqBaseQty');
        } else {
          this.realGrid.dataProvider.setValue(this.dataRow, 'reqBaseQty', reqBaseQty);
        }
      } else if (this.fieldName == 'TRNHOPETI') {
        let trnHopeTi = newValue;
        this.realGrid.dataProvider.setValue(this.dataRow, 'trnHopeTi', trnHopeTi);
      } else if (this.fieldName == 'LOGITSALIAS') {
        let logitsAlias = newValue;
        this.realGrid.dataProvider.setValue(this.dataRow, 'logitsAlias', logitsAlias);
      } else if (this.fieldName == 'TRNREQREMARK') {
        let trnReqRemark = newValue;
        this.realGrid.dataProvider.setValue(this.dataRow, 'trnReqRemark', trnReqRemark);
      }
    },
    setSelectBox() {
      this.realGrid.gridView.setColumnProperty('trnCarType', 'editor', {
        type: 'list',
        labels: this.carTypeText,
        values: this.carTypeOption, //carTypeValue
        displayLabels: 'label',
        textReadOnly: true,
      });
      this.realGrid.gridView.setColumnProperty('cityCd', 'editor', {
        type: 'list',
        values: cityCdCodes.value,
        labels: cityCdCodes.text,
        displayLabels: 'label',
        textReadOnly: true,
      });

      this.realGrid.gridView.setColumnProperty('distrCd', 'editor', {
        type: 'list',
        values: this.distrValue,
        labels: this.distrText,
        displayLabels: 'label',
        textReadOnly: true,
      });

      this.realGrid.gridView.setColumnProperty('trnHopeTi', 'editor', {
        type: 'list',
        labels: this.trnHopeTiText,
        values: this.timeOption, //trnHopeTiValue
        displayLabels: 'label',
        textReadOnly: true,
      });
    },
    cellClick() {
      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.column === 'postNum' || clickData.column === 'addr' || clickData.column === 'phoneNum1' || clickData.column === 'phoneNum2' || clickData.column === 'phoneNum3' || clickData.column === 'reqBaseQty' || clickData.column === 'logitsAlias' || clickData.column === 'trnReqRemark') {
          const curr = this.realGrid.gridView.getCurrent();
          this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
          this.realGrid.gridView.showEditor();
          this.realGrid.gridView.setFocus();
        }
      };
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
    this.getCommonCodeCombo('CAR_TYPE');
    this.getCommonCodeCombo('VNM_CITY');
    this.getCommonCodeCombo('TIME_CD');
  },
};
</script>

<style></style>
