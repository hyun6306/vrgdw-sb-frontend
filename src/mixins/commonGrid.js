export default {
  methods: {
    clearAllCheck() {
      this.realGrid.gridView.checkAll(false);
    },
    onItemAllChecked(grid, checked) {
      this.sendCheckedData();
      checked;
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      this.checkedCount = checkedRows.length;
      this.$emit('sendCheckedCount', checkedRows.length);
    },
    onItemChecked(grid, itemIndex, checked) {
      this.sendCheckedData();
      if (checked) {
        this.checkedCount++;
      } else {
        this.checkedCount--;
      }
      this.$emit('sendCheckedCount', this.checkedCount);
    },
    onItemsChecked(grid, items, checked) {
      checked;
    },
    sendCheckedData() {
      this.gridCommit();
      const selectProductIndexs = this.realGrid.gridView.getCheckedRows(false);
      const selectProductRows = [];
      selectProductIndexs.forEach(index => {
        selectProductRows.push(this.realGrid.dataProvider.getJsonRow(index));
      });
      this.$emit('sendCheckedData', selectProductRows);
      return selectProductRows;
    },
    sendChecked() {
      this.gridCommit();
      const selectProductIndexs = this.realGrid.gridView.getCheckedRows(false);
      return selectProductIndexs.length > 0 ? true : false;
    },
    isChooseCell() {
      const current = this.realGrid.gridView.getCurrent();
      return current.itemIndex !== -1 ? true : false;
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
    fixGridColFirst(index) {
      this.realGrid.gridView.setFixedOptions({ colCount: index + 1 });
    },
    sendJsonRows() {
      return this.realGrid.dataProvider.getJsonRows();
    },
    getLayout() {
      return this.realGrid.gridView.saveColumnLayout();
    },
    deleteRows() {
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      let allRowsCount = this.realGrid.dataProvider.getRowCount();
      if (checkedRows.length === allRowsCount) {
        this.realGrid.dataProvider.clearRows();
        return;
      } else {
        checkedRows.sort((a, b) => b - a);
        checkedRows.forEach(index => {
          this.realGrid.dataProvider.removeRow(index);
        });
        this.checkedCount -= checkedRows.length;
      }
    },
    excelExport(excelData) {
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
        lookupDisplay: true, // column, renderer에 input 적용한 data 정상 노출시켜줌.
        exportTemplate: excelData.exportTemplate, // column, renderer에 dropbox 적용된 data 정상 노출시켜줌.
        //내보내기 완료 후 실행되는 함수
        // done: function () {
        // alert('done excel export');
        // },
      });
    },
    gridCommit() {
      this.realGrid.gridView.commit();
    },
    getRowCount() {
      return this.realGrid.dataProvider.getRowCount();
    },
  },
};
