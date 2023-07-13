<!-- 일별 배차내역 -->
<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout, authBtn } from '@/consts/gridData/tran/disptTranCostManage';
import commonGridJs from '@/mixins/commonGrid';
import orderApi from '@/api/order/order';
import tranApi from '@/api/tran/tran';

export default {
  data() {
    return {
      realGrid: null,
      listData: [],
      //셀클릭
      disptRow: 0,
      //
      checkedData: [],
    };
  },
  mixins: [commonGridJs],
  props: ['gridLang', 'gridName', 'layoutData', 'savePage', 'menuId', 'authButton'],
  watch: {
    listData(data) {
      data.forEach(row => {
        row.trnReqDt ? (row.trnReqDt = this.$vnDateFormatD(row.trnReqDt)) : (row.trnReqDt = '');
        row.inDt ? (row.inDt = this.$vnDateFormatD(row.inDt)) : (row.inDt = '');
        row.outDt ? (row.outDt = this.$vnDateFormatD(row.outDt)) : (row.outDt = '');
        row.takeOverDt ? (row.takeOverDt = this.$vnDateFormatD(row.takeOverDt)) : (row.takeOverDt = '');
      });
      this.realGrid.dataProvider.setRows(data);
      this.$emit('sendDisptRowCount', this.realGrid.dataProvider.getRowCount());
    },
    gridLang() {
      this.initGrid();
    },
    disptRow() {
      this.disptColor();
    },
    layoutData() {
      //레이아웃 변경 props
    },
  },
  methods: {
    async initGrid() {
      const vm = this;
      if (this.realGrid) {
        if (columns && layout && this.gridLang) {
          // await this.getList();
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

        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridDisptNull'),
        });
        this.disptColor();
        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          if (clickData.cellType == 'data') {
            vm.disptRow = clickData.dataRow;
            if (clickData.fieldName == 'trnPlnNum') {
              let trnPlnNum = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
              vm.$parent.disptDetailModal({ type: 'trnplnNum', param: trnPlnNum });
            } else if (clickData.fieldName == 'etcTrnPriceAmt') {
              if (vm.authButton.fn1Auth === 'Y') {
                let closeYn = vm.realGrid.dataProvider.getValue(clickData.dataRow, 'closeYn');
                if (closeYn == 'N') {
                  let selectRowData = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
                  vm.$parent.disptDetailModal({ type: 'etcPrice', costInfo: selectRowData });
                } else {
                  vm.$parent.showModal({ type: 'closeY' });
                }
              }
            }
          }
        };
      }
      await this.layoutSetting();
    },
    async layoutSetting() {
      if (this.savePage.length > 0 && this.savePage !== null) {
        let key = this.savePage.length - 1;
        if (this.savePage[key].storeCls == 'tranCost') {
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
    disptColor() {
      //클릭한 로우 색상 지정
      let disptIndex = this.disptRow;
      this.realGrid.gridView.setRowStyleCallback(function (grid, item) {
        if (disptIndex == item.dataRow) {
          return 'rg-mfb';
        }
      });
    },
    resetRow() {
      this.disptRow = 0;
    },
    async getList(param) {
      this.realGrid.gridView.checkAll(false);
      try {
        const response = await tranApi.getTranDisptList(param);
        this.listData = response.data.ds;
        authBtn.auth = this.authButton;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
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
    fixGrid(type, isFixColumn, isFixRow) {
      const current = this.realGrid.gridView.getCurrent();
      if (type === 'column') {
        if (isFixColumn) {
          this.realGrid.gridView.setFixedOptions({ colCount: 0 });
        } else {
          const name = current.column;
          const index = this.realGrid.gridView.layoutByName(name).root.vindex;
          this.realGrid.gridView.setFixedOptions({ colCount: index + 1 });
        }
      } else if (type === 'row') {
        if (isFixRow) {
          this.realGrid.gridView.setFixedOptions({ rowCount: 0 });
        } else {
          this.realGrid.gridView.setFixedOptions({
            exceptFromSorting: false,
            rowCount: current.itemIndex + 1,
          });
        }
      }
    },
    //엑셀다운로드
    disptExcelExport(excelData) {
      this.realGrid.gridView.exportGrid({
        type: 'excel',
        target: 'local',
        fileName: excelData.fileNm, // 'gridExportSample.xlsx',
        showProgress: excelData.showProgress, // false,
        progressMessage: excelData.progressMessage, // '엑셀 Export중입니다.',
        indicator: excelData.indicator, // 'hidden',
        header: excelData.header, // 'default',
        footer: excelData.footer, // 'hidden',
        compatibility: excelData.compatibility, //true,
        //내보내기 완료 후 실행되는 함수
        // done: function () {
        // alert('done excel export');
        // },
      });
    },
    async saveLayout(data) {
      if (data == 'reset') this.realGrid.gridView.setColumnLayout(layout);
      try {
        let layouts = this.realGrid.gridView.saveColumnLayout();
        let param = {
          menuId: this.menuId,
          storeCls: 'tranCost',
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
    sendJsonRows() {
      return this.realGrid.dataProvider.getJsonRows();
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
};
</script>
