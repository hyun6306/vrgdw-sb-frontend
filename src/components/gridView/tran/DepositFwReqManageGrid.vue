<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/depositFwReqManage';
import orderApi from '@/api/order/order';
import tranApi from '@/api/tran/tran';
import commonGridJs from '@/mixins/commonGrid';
import orderGridJs from '@/mixins/order/orderGrid';

export default {
  data() {
    return {
      gridName: 'DepositFwReqManageGrid',
      realGrid: null,
      listData: [],
      today: [],
    };
  },
  mixins: [commonGridJs, orderGridJs],
  props: ['savePage', 'menuId', 'gridLang', 'defaultDate'],
  watch: {
    listData(data) {
      data.forEach(row => {
        if (row.reqDt !== null) {
          row.reqDt = this.$vnDateFormatD(row.reqDt);
        }
        // row.cityDistr = row.cityNm + '  ' + row.distrNm;
      });
      this.realGrid.dataProvider.setRows(data);
      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
    },
    gridLang() {
      this.initGrid();
    },
    defaultDate(date) {
      this.today = date.time;
    },
  },
  methods: {
    async initGrid() {
      const vm = this;
      if (this.realGrid) {
        // let loadLayout = this.realGrid.gridView.saveColumnLayout();
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
          existFavorite: true,
          layout: layout,
          existCalendar: true,
          existAddr: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          if (clickData.cellType == 'data') {
            if (clickData.fieldName == 'custReqRemark') {
              let comment = vm.realGrid.dataProvider.getValue(clickData.dataRow, 'custReqRemark');
              if (comment || comment !== null) {
                vm.$emit('gridMent', comment);
              }
            }
          }
        };
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
      }
      await this.layoutSetting();
    },
    async getList(param) {
      if (param == null) {
        let params = {
          upPlntCd: '',
          sttDt: this.today[0],
          endDt: this.today[1],
          reqStatCd: '',
        };
        const response = await tranApi.getdepFwReqManageList(params);
        this.listData = response.data.ds;
      } else {
        const response = await tranApi.getdepFwReqManageList(param);
        this.listData = response.data.ds;
      }
    },
    async layoutSetting() {
      if (this.savePage.length > 0 && this.savePage !== null) {
        let key = this.savePage.length - 1;
        if (this.savePage[key].storeCls == 'depFwReqManage') {
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
    focusReset() {
      //포커스 초기화
      this.realGrid.gridView.clearCurrent();
    },
    focusCheck() {
      //그리드 포커스 여부 확인
      const focusCell = this.realGrid.gridView.getCurrent();
      if (focusCell.column !== null) {
        return true;
      } else {
        return false;
      }
    },
    async saveLayout(data) {
      if (data == 'reset') this.realGrid.gridView.setColumnLayout(layout);
      try {
        let layouts = this.realGrid.gridView.saveColumnLayout();
        let param = {
          menuId: this.menuId,
          storeCls: 'depFwReqManage',
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
    setFilter(set) {
      columns.forEach(column => {
        this.realGrid.gridView.setColumnProperty(column.fieldName, 'autoFilter', set);
      });
    },
    openAddrInfo() {},
  },
  mounted() {
    this.initGrid();
  },
};
</script>
