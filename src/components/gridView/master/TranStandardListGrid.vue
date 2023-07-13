<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/master/standardList';
import commonGridJs from '@/mixins/commonGrid';
import orderApi from '@/api/order/order';

export default {
  props: ['standardList', 'gridLang', 'savePage', 'menuId', 'page'],
  data() {
    return {
      gridName: 'TranStandardListGrid',
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
      ment: '',
      trnOptions: [],
      trnHourOptions: [],
      trnBforOption: [],
      trnAftrOption: [],
      trnHourOption: [],
      trnBforText: [],
      trnAftrText: [],
      trnHourText: [],
    };
  },
  mixins: [commonGridJs],
  watch: {
    standardList() {
      this.standardList.forEach(row => {
        row.closeTiColon = ' : ';
        if (row.closeTi) {
          //closeTiHour closeTiMin
          let closeTi = row.closeTi.split(':', 3);
          row.closeTiHour = closeTi[0];
          row.closeTiMin = closeTi[1];
        }
        this.trnOptions.forEach(list => {
          if (list.value === row.trnBfor) {
            if (row.trnBfor || row.trnBfor === 0) row.trnBfor = JSON.stringify({ text: list.text, value: row.trnBfor });
          }
          if (list.value === row.trnAftr) {
            if (row.trnAftr || row.trnAftr === 0) row.trnAftr = JSON.stringify({ text: list.text, value: row.trnAftr });
          }
        });
        this.trnHourOptions.forEach(list => {
          if (list.value === row.trnHour) {
            if (row.trnHour) row.trnHour = JSON.stringify({ text: list.text, value: row.trnHour });
          }
        });
      });
      this.realGrid.dataProvider.setRows(this.standardList);
      this.clearCheckCount();
      this.clearCurrent();
      this.setSelectBox();
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
    setSelectBox() {
      this.realGrid.gridView.setColumnProperty('trnBfor', 'editor', {
        type: 'list',
        labels: this.trnBforText,
        values: this.trnBforOption,
        displayLabels: 'label',
        textReadOnly: true,
      });

      this.realGrid.gridView.setColumnProperty('trnAftr', 'editor', {
        type: 'list',
        labels: this.trnAftrText,
        values: this.trnAftrOption,
        displayLabels: 'label',
        textReadOnly: true,
      });

      this.realGrid.gridView.setColumnProperty('trnHour', 'editor', {
        type: 'list',
        labels: this.trnHourText,
        values: this.trnHourOption,
        displayLabels: 'label',
        textReadOnly: true,
      });
    },
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      this.realGrid.gridView.commit();
      const fieldName = this.realGrid.dataProvider.getFieldName(field);

      if (fieldName == 'CLOSETIHOUR') {
        let closeTiHour = newValue;
        if (!closeTiHour || closeTiHour > 23) {
          if (closeTiHour > 23) this.$EventBus.$emit('openYesModal', 'message.msgCheckTime');
          this.realGrid.dataProvider.setValue(dataRow, 'closeTiHour', oldValue);
        } else {
          if (closeTiHour.length === 1) {
            this.realGrid.dataProvider.setValue(dataRow, 'closeTiHour', 0 + closeTiHour);
          } else {
            this.realGrid.dataProvider.setValue(dataRow, 'closeTiHour', closeTiHour);
          }
        }
      } else if (fieldName == 'CLOSETIMIN') {
        let closeTiMin = newValue;
        if (!closeTiMin || closeTiMin > 59) {
          if (closeTiMin > 59) this.$EventBus.$emit('openYesModal', 'message.msgCheckTime');
          this.realGrid.dataProvider.setValue(dataRow, 'closeTiMin', oldValue);
        } else {
          if (closeTiMin.length === 1) {
            this.realGrid.dataProvider.setValue(dataRow, 'closeTiMin', 0 + closeTiMin);
          } else {
            this.realGrid.dataProvider.setValue(dataRow, 'closeTiMin', closeTiMin);
          }
        }
      }
    },
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
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
        this.isEmpty();
        this.realGrid.dataProvider.setRows(this.standardList);
        this.realGrid.gridView.onCellClicked = (grid, clickData) => {
          if (clickData.cellType == 'data') {
            if (clickData.column === 'closeTiHour' || clickData.column === 'closeTiMin') {
              const curr = this.realGrid.gridView.getCurrent();
              this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
              this.realGrid.gridView.showEditor();
              this.realGrid.gridView.setFocus();
            }
          }
        };
      }
      await this.layoutSetting();
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
    selectBox() {
      let i = '';
      for (i = 1; i <= 31; i++) {
        this.trnOptions.push({ text: i + 'DAY', value: i });
      }
      this.trnOptions.unshift({ text: '0', value: 0 });

      this.trnOptions.forEach(list => {
        this.trnBforText.push(list.text);
        this.trnBforOption.push(JSON.stringify(list));
        this.trnAftrText.push(list.text);
        this.trnAftrOption.push(JSON.stringify(list));
      });

      let j = '';
      for (j = 1; j <= 24; j++) {
        this.trnHourOptions.push({ text: j + 'H', value: j });
      }

      this.trnHourOptions.forEach(list => {
        this.trnHourText.push(list.text);
        this.trnHourOption.push(JSON.stringify(list));
      });
    },
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.gridView.setColumnProperty(column.fieldName, 'autoFilter', set);
      });
      this.setSelectBox();
    },
  },
  mounted() {
    this.selectBox();
    this.initGrid();
  },
};
</script>

<style></style>
