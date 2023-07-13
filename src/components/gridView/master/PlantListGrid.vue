<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout, cityCdCodes, distrCdCodes } from '@/consts/gridData/master/plantList';
import commonGridJs from '@/mixins/commonGrid';
import orderGridJs from '@/mixins/order/orderGrid';
import commonApi from '@/api/common';
import masterApi from '@/api/master/master';
import orderApi from '@/api/order/order';

export default {
  data() {
    return {
      gridName: 'PlantListGrid',
      realGrid: null,
      listData: [],
      ment: '',
      //콤보박스
      distrOptions: [],
      cityOptions: [],
      count: {
        cdLvl1: 0,
        cdLvl2: 0,
      },
      //
      nameList: [],
      indexList: [],
      rowCount: 0,
    };
  },
  mixins: [commonGridJs, orderGridJs],
  props: ['gridLang', 'savePage', 'menuId'],
  watch: {
    listData(data) {
      // clickedRow.index = [];
      // clickedRow.name = [];
      this.realGrid.dataProvider.setRows(data);
      this.gridCount();
      this.setSelectBox();
    },
    ment(ment) {
      this.$emit('gridMent', ment);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    gridCommit() {
      this.realGrid.gridView.commit();
    },
    gridCount() {
      this.rowCount = this.realGrid.dataProvider.getRowCount();
      this.$emit('sendRowCount', this.rowCount);
    },
    addRows() {
      //행추가
      let values = [this.rowCount + 1, 'V100', 'Y', '', '', '', '', '', '', '', '', '', '', '', ''];
      this.realGrid.dataProvider.insertRow(0, values);
    },
    async initGrid() {
      const vm = this;
      if (this.realGrid) {
        if (columns && layout && this.gridLang) {
          await this.getList();
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
          layout: layout,
          existCalendar: true,
          updatable: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.setGridEvent(this.realGrid.gridView, this.realGrid.dataProvider);
        this.realGrid.gridView.addLookupSource(distrCdCodes);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridPlantListNull'),
        });
        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          if (clickData.cellType == 'data') {
            if (clickData.column !== 'cityCd' && clickData.column !== 'distrCd' && clickData.column !== 'useYn') {
              const curr = vm.realGrid.gridView.getCurrent();
              vm.realGrid.gridView.beginUpdateRow(curr.itemIndex);
              vm.realGrid.gridView.showEditor();
              vm.realGrid.gridView.setFocus();
            }
          }
        };
        // this.realGrid.gridView.onCellDblClicked = (grid, clickData) => {
        //   if (clickData.fieldName !== 'cityCd' && clickData.fieldName !== 'distrCd') {
        //     clickedRow.index.push(clickData.itemIndex);
        //     clickedRow.name.push(clickData.fieldName);

        //     let htmlRenderer = {
        //       type: 'html',
        //       inputFocusable: false,
        //       callback: function (grid, cell) {
        //         let str = cell.value;
        //         for (let i = 0; i < clickedRow.index.length; i++) {
        //           if (cell.index.itemIndex == clickedRow.index[i] && cell.dataColumn.fieldName == clickedRow.name[i]) {
        //             str = `<div class='real_form_input'><input type='text' value='${cell.value}' /></div>`;
        //             // } else if (cell.dataColumn.fieldName !== 'cityCd' || cell.dataColumn.fieldName !== 'distrCd') {
        //             //   str = cell.label;
        //           }
        //         }
        //         return str;
        //       },
        //     };
        //     let styleCallback = function (grid, cell) {
        //       let ret = {};
        //       for (let j = 0; j < clickedRow.index.length; j++) {
        //         if (cell.index.itemIndex == clickedRow.index[j] && cell.dataColumn.fieldName == clickedRow.name[j]) {
        //           ret.editable = true;
        //         }
        //       }
        //       return ret;
        //     };
        //     this.realGrid.gridView.columnByName(clickData.fieldName).renderer = htmlRenderer;
        //     this.realGrid.gridView.columnByName(clickData.fieldName).styleCallback = styleCallback;
        //   } else {
        //     if (clickData.fieldName == 'cityCd') {
        //       this.setCitySelectBox();
        //       this.setGridEvent(this.realGrid.gridView, this.realGrid.dataProvider);
        //     } else if (clickData.fieldName == 'distrCd') {
        //       this.setDistrSelectBox();
        //     }
        //     // this.setSelectBox();
        //     clickedRow.areaIndex.push(clickData.itemIndex);
        //     clickedRow.areaName.push(clickData.fieldName);
        //     let areaStyleCallback = function (grid, cell) {
        //       let ret = {};
        //       for (let k = 0; k < clickedRow.areaIndex.length; k++) {
        //         if (cell.index.itemIndex == clickedRow.areaIndex[k] && cell.dataColumn.fieldName == clickedRow.areaName[k]) {
        //           ret.editable = true;
        //           // ret.editButtonVisibility = 'always';
        //         }
        //       }
        //       return ret;
        //     };
        //     this.realGrid.gridView.columnByName(clickData.fieldName).styleCallback = areaStyleCallback;
        //   }
        // };
      }
      await this.layoutSetting();
    },
    async layoutSetting() {
      if (this.savePage.length > 0 && this.savePage !== null) {
        let key = this.savePage.length - 1;
        if (this.savePage[key].storeCls == 'plantList') {
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
                    let same = layItem.find(lItem => cItem.column === lItem.column); // 같은 이름의 ITEM 을 찾아서 isSameItem에 push
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
    async saveLayout(data) {
      if (data == 'reset') this.realGrid.gridView.setColumnLayout(layout);
      try {
        let layouts = this.realGrid.gridView.saveColumnLayout();
        let param = {
          menuId: this.menuId,
          storeCls: 'plantList',
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
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getCommonCodeCombo(prntCd = '') {
      try {
        const param = {
          groupCd: 'VNM_CITY',
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
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
            // this.initGrid();
          }
        } else {
          this.cityOptions = [];
          this.cityOptions = response.data.ds;
          this.cityOptions.forEach(list => {
            cityCdCodes.values.push(list.text);
            cityCdCodes.keys.push(list.value);
            this.count.cdLvl1++;
            this.getCommonCodeCombo(list.value);
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    setGridEvent(gridView, provider) {
      gridView.onEditRowChanged = function (grid, itemIndex, dataRow, field, oldValue, newValue) {
        const fieldName = provider.getOrgFieldName(field);

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
    },
    setSelectBox() {
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
    },
    // setCitySelectBox() {
    //   this.realGrid.gridView.setColumnProperty('cityCd', 'editor', {
    //     type: 'list',
    //     values: cityCdCodes.value,
    //     labels: cityCdCodes.text,
    //     displayLabels: 'label',
    //     textReadOnly: true,
    //   });
    // },
    // setDistrSelectBox() {
    //   this.realGrid.gridView.setColumnProperty('distrCd', 'editor', {
    //     type: 'list',
    //     values: this.distrValue,
    //     labels: this.distrText,
    //     displayLabels: 'label',
    //     textReadOnly: true,
    //   });
    // },
    async getList(param) {
      try {
        let params = {};
        if (param == null) {
          params = {
            filter: '',
            useYn: '',
          };
        } else {
          params = param;
        }
        const response = await masterApi.getPlantList(params);
        this.listData = response.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
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
