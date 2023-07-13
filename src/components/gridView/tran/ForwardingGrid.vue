<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { cityCdCodes, columns, distrCdCodes, fields, layout } from '@/consts/gridData/tran/Forwarding';
import commonGridJs from '@/mixins/commonGrid';
import { mapGetters } from 'vuex';
import defs from '@/consts/defs';

export default {
  props: ['requestList', 'selectDate', 'selectDateShow', 'menuId', 'gridLang', 'savePage', 'page', 'commonCodes'],
  data() {
    return {
      gridName: 'ForwardingGrid',
      realGrid: null,
      trnTiText: [],
      trnOption: [],
      timeOptions: [],
      cityOptions: [],
      distrOptions: [],
      carTypeOptions: [],
      carText: [],
      carValue: [],
      carTypeOption: [],
    };
  },
  mixins: [commonGridJs],
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  watch: {
    commonCodes() {
      this.setCommonCode(this.commonCodes);
    },
    requestList() {
      this.requestList.forEach(row => {
        if (row.trnPsbDt) row.trnPsbDt = this.$vnDateFormatD(row.trnPsbDt);
        if (row.inPsbDt) row.inPsbDt = this.$vnDateFormatD(row.inPsbDt);
        if (row.trnHopeDt) row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        if (!row.trnPsbDt) row.trnPsbDt = row.trnHopeDt;
        if (!row.inPsbDt) row.inPsbDt = row.trnHopeDt;
        if (row.reqDt) row.reqDt = this.$vnDateFormatD(row.reqDt);
        if (row.logitsPhoneNum1) {
          const phoneNum = row.logitsPhoneNum1.split('-');
          row.phoneNum1 = phoneNum[0];
          row.phoneNum2 = phoneNum[1];
          row.phoneNum3 = phoneNum[2];
        }
        row.baseUnitNm2 = row.baseUnitNm;
        row.ordUnitNm2 = row.ordeUnitNm;
        row.wghtUnitNm2 = row.wghtUnitNm;
        row.volUnitNm2 = row.volUnitNm;
        if (row.trnPlnNum === null) row.trnPlnNum = '';
        if (row.trnNum === null) row.trnNum = '';

        this.timeOptions.forEach(list => {
          if (list.value === row.trnPsbTi) {
            if (row.trnPsbTi) row.trnPsbTi = JSON.stringify({ value: row.trnPsbTi, text: list.text });
          }
          if (list.value === row.inPsbTi) {
            if (row.inPsbTi) row.inPsbTi = JSON.stringify({ value: row.inPsbTi, text: list.text });
          }
          if (list.value === row.trnHopeTi) {
            if (row.trnHopeTi) row.trnHopeTi = JSON.stringify({ value: row.trnHopeTi, text: list.text });
            if (!row.trnPsbTi) row.trnPsbTi = JSON.stringify({ value: list.value, text: list.text });
            if (!row.inPsbTi) row.inPsbTi = JSON.stringify({ value: list.value, text: list.text });
          }
        });
        this.carTypeOptions.forEach(list => {
          if (list.value === row.trnCarType) {
            if (row.trnCarType) row.trnCarType = JSON.stringify({ value: row.trnCarType, text: list.text });
          }
        });
      });
      this.realGrid.dataProvider.setRows(this.requestList);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    initGrid() {
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
      } else {
        const vm = this;
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
          layout: layout,
          existCalendar: true,
          updatable: true,
        };

        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
        this.fixGridColFirst(1);
      }
      this.realGrid.gridView.setColumns(columns);
      this.realGrid.gridView.setColumnLayout(layout);
      this.setSelectBox();
      this.setGridEvent(this.realGrid.gridView, this.realGrid.dataProvider);
      this.cellClick();
      this.savePage.forEach(page => {
        if (page.storeCls === this.page) {
          const loadLayout = page.uiJson;
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
            this.$parent.layoutSave('update', true);
          } else if (newLayoutName) {
            this.realGrid.gridView.setColumnLayout(layout);
            this.$parent.layoutSave('update', true);
          } else {
            this.realGrid.gridView.setColumnLayout(loadLayout);
          }
        }
      });

      // this.realGrid.gridView.columnByName('trnPlnNum').mergeRule = { criteria: "values['trnPlnNum']" };
      // this.realGrid.gridView.columnByName('totalTrnOrgOrdQty').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      // this.realGrid.gridView.columnByName('baseUnitNm2').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      // this.realGrid.gridView.columnByName('totalTrnReqVol').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      // this.realGrid.gridView.columnByName('volUnitNm2').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      // this.realGrid.gridView.columnByName('totalTrnReqWght').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      // this.realGrid.gridView.columnByName('wghtUnitNm2').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      // this.realGrid.gridView.columnByName('trncusNm').mergeRule = { criteria: "values['trnPlnNum'] + value" };

      this.realGrid.gridView.setRowStyleCallback((grid, item, fixed) => {
        fixed;
        let ret = {};
        let trnPlnNum = grid.getValue(item.index, 'trnPlnNum');

        if (trnPlnNum !== '') {
          ret.editable = false;
        }

        // let background = 'rg-prdt-disble';
        let outStatCd = grid.getValue(item.index, 'outStatCd');

        if (outStatCd == defs.outStatCd.trnReq) {
          ret.styleName = 'rg-outstate-row';
        }

        // else {
        //   ret.mergeRule = { criteria: null };
        // }
        return ret;
      });
    },
    setGridEvent(gridView, provider) {
      let vm = this;
      gridView.onEditRowChanged = function (grid, itemIndex, dataRow, field, oldValue, newValue) {
        const fieldName = provider.getOrgFieldName(field);

        if (fieldName === 'trnSpltQty') {
          let trnReqBaseQty = provider.getValue(dataRow, 'trnReqBaseQty');
          if (trnReqBaseQty < newValue || newValue < 1) {
            grid.cancel();
            vm.$EventBus.$emit('openYesModal', 'message.msgValidQty');
            return;
          }
        }
        grid.commit();
        if (fieldName === 'cityCd') {
          if (newValue) {
            provider.setValue(itemIndex, 'cityCd', newValue);
          }
          if (oldValue !== newValue) {
            provider.setValue(itemIndex, 'distrCd', '');
          }
        }
      };

      gridView.onItemChecked = (grid, itemIndex, checked) => {
        // itemIndex > 실제 item index
        // dataRow > 화면 상 보이는 row 순서
        let dataRow = this.realGrid.gridView.getDataRow(itemIndex);
        let trnPlnNum = this.realGrid.dataProvider.getValue(dataRow, 'trnPlnNum');
        if (trnPlnNum && trnPlnNum !== '') {
          let rows = this.realGrid.dataProvider.getJsonRows();
          let indexList = [];
          rows.forEach((row, index) => {
            if (row.trnPlnNum === trnPlnNum) {
              indexList.push(index);
            }
          });

          this.realGrid.gridView.checkRows(indexList, checked, false);
        } else {
          this.sendCheckedData();
        }
      };
      gridView.onItemAllChecked = (grid, checked) => {
        checked;
        this.sendCheckedData();
      };
    },
    setCityDistrValue() {},
    resetLayout() {
      this.realGrid.gridView.setColumnLayout(layout);
    },
    setSelectBox() {
      this.realGrid.gridView.setColumnProperty('trnCarType', 'editor', {
        type: 'list',
        labels: this.carText,
        values: this.carTypeOption,
        displayLabels: 'label',
        textReadOnly: true,
        dropDownWhenClick: true,
      });

      this.realGrid.gridView.setColumnProperty('trnPsbTi', 'editor', {
        type: 'list',
        labels: this.trnTiText,
        values: this.trnOption,
        displayLabels: 'label',
        textReadOnly: true,
        dropDownWhenClick: true,
      });

      this.realGrid.gridView.setColumnProperty('inPsbTi', 'editor', {
        type: 'list',
        labels: this.trnTiText,
        values: this.trnOption,
        displayLabels: 'label',
        textReadOnly: true,
        dropDownWhenClick: true,
      });

      this.realGrid.gridView.setColumnProperty('cityCd', 'editor', {
        type: 'list',
        displayLabels: 'label',
        textReadOnly: true,
        dropDownWhenClick: true,
      });

      this.realGrid.gridView.setColumnProperty('distrCd', 'editor', {
        type: 'list',
        displayLabels: 'label',
        textReadOnly: true,
        dropDownWhenClick: true,
      });
    },
    cellClick() {
      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.cellType == 'data') {
          if (clickData.editable && (clickData.column === 'trnSpltQty' || clickData.column === 'addr' || clickData.column === 'phoneNum1' || clickData.column === 'phoneNum2' || clickData.column === 'phoneNum3' || clickData.column === 'reqBaseQty' || clickData.column === 'logitsAlias' || clickData.column === 'trnReqRemark' || clickData.column === 'postNum')) {
            const curr = this.realGrid.gridView.getCurrent();
            this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
            this.realGrid.gridView.showEditor();
            this.realGrid.gridView.setFocus();
          } else if (clickData.column === 'trnPlnNum') {
            let trnPlnInfo = this.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            if (trnPlnInfo && trnPlnInfo.trnPlnNum && trnPlnInfo.trnPlnNum !== '') {
              const trnCarType = JSON.parse(trnPlnInfo.trnCarType);
              if (trnCarType.value !== 'VRGDW') {
                this.$emit('openForwardingCustCar', trnPlnInfo);
              } else {
                this.$emit('openForwardingDetail', trnPlnInfo);
              }
            }
          } else if (clickData.column == 'trnNum') {
            let trnNum = grid.getValue(clickData.itemIndex, 'trnNum');
            let trnPlnNum = grid.getValue(clickData.itemIndex, 'trnPlnNum');
            let trnClsCd = grid.getValue(clickData.itemIndex, 'trnClsCd');
            if (trnNum !== '' && trnNum !== null) {
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
        }
      };
    },
    setCommonCode(codes) {
      if (this.commonCodes) {
        this.timeOptions = codes.timeOptions;
        this.cityOptions = codes.cityOptions;
        this.distrOptions = codes.distrOptions;
        this.carTypeOptions = JSON.parse(JSON.stringify(codes.carTypeOptions));
        // this.carTypeOptions.splice(0, 1);

        this.cityOptions.forEach(list => {
          cityCdCodes.values.push(list.text);
          cityCdCodes.keys.push(list.value);
        });
        this.distrOptions.forEach(list => {
          distrCdCodes.tags.push(list.value);
          distrCdCodes.keys.push([list.prntCd, list.value]);
          distrCdCodes.values.push(list.text);
        });
        this.timeOptions.forEach(list => {
          this.trnTiText.push(list.text);
          this.trnOption.push(JSON.stringify(list));
        });
        this.carTypeOptions.forEach(list => {
          this.carText.push(list.text);
          this.carValue.push(list.value);
          this.carTypeOption.push(JSON.stringify(list));
        });
        this.initGrid();
        this.realGrid.gridView.addLookupSource(distrCdCodes);
      }
    },
    openCalendar(dataRow, clickInfo) {
      let data = {
        dataRow,
        column: clickInfo.column.name,
      };
      const currentDate = this.realGrid.dataProvider.getValue(data.dataRow, data.column);
      this.$emit('openSingleCalendar', { currentDate, type: JSON.stringify(data) });
    },
    setDate(date, info) {
      this.realGrid.dataProvider.setValue(info.dataRow, info.column, date);
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
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.gridView.setColumnProperty(column.fieldName, 'autoFilter', set);
      });
      this.setSelectBox();
    },
  },
  mounted() {
    this.initGrid();
    if (this.commonCodes) this.setCommonCode(this.commonCodes);
  },
  created() {},
};
</script>

<style></style>
