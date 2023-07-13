export default {
  methods: {
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      const fieldName = this.realGrid.dataProvider.getFieldName(field);
      this.realGrid.gridView.commit();
      this.realGrid.dataProvider.setValue(dataRow, fieldName, newValue);
    },
    addRow(num, data = {}) {
      let dataRow = -1;

      if (Object.keys(data).length > 0) {
        dataRow = this.realGrid.dataProvider.addRow({ cdLvl: num, prntCd: data.code, groupCd: data.groupCd, groupNm: data.groupNm });
      } else {
        dataRow = this.realGrid.dataProvider.addRow({ cdLvl: num });
      }
      // this.realGrid.gridView.beginAppendRow();
      // this.realGrid.gridView.commit(true);
      // this.realGrid.gridView.showEditor();
      // this.realGrid.gridView.setFocus();
      this.realGrid.gridView.setCurrent({ dataRow });
      // this.realGrid.gridView.setCurrent(this.realGrid.dataProvider.getRowCount());
      // setTimeout(() => {
      //   this.realGrid.gridView.showEditor();
      // }, 500);
      // this.realGrid.dataProvider.setRowState(this.realGrid.dataProvider.getRowCount(), 'created', true);
    },
    checkedRows() {
      const checkedRowIndex = this.realGrid.gridView.getCheckedRows(false);
      const checkedRows = [];
      checkedRowIndex.forEach(rowIndex => {
        checkedRows.push(this.realGrid.dataProvider.getJsonRow(rowIndex));
      });
      return checkedRows;
    },
    getNewAndChangeData() {
      this.realGrid.gridView.commit();
      const newRowsIndex = this.realGrid.dataProvider.getAllStateRows();
      const newRows = [];
      newRowsIndex.updated.forEach(index => {
        const row = this.realGrid.dataProvider.getJsonRow(index);
        newRows.push(row);
      });
      newRowsIndex.created.forEach(index => {
        const row = this.realGrid.dataProvider.getJsonRow(index);
        row['rowType'] = 'created';
        newRows.push(row);
      });
      return newRows;
    },
    getCheckedData() {
      const checkedRowsIndex = this.realGrid.gridView.getCheckedRows(false);
      const checkedRows = [];
      checkedRowsIndex.forEach(rowIndex => {
        const row = this.realGrid.dataProvider.getJsonRow(rowIndex);
        checkedRows.push(row);
      });

      return checkedRows;
    },
    deleteRows() {
      const checkedRowsIndex = this.realGrid.gridView.getCheckedRows(false);
      let allRowsCount = this.realGrid.dataProvider.getRowCount();
      if (checkedRowsIndex.length === allRowsCount) {
        this.realGrid.dataProvider.clearRows();
        this.realGrid.gridView.checkAll(false);
      } else {
        checkedRowsIndex.sort((a, b) => b - a);
        checkedRowsIndex.forEach(index => {
          this.realGrid.dataProvider.removeRow(index);
        });
      }
    },
    onItemChecked(grid, itemIndex, checked) {
      checked;
    },
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
    clearCurrent() {
      if (this.realGrid) {
        this.realGrid.gridView.clearCurrent();
      }
    },
    gridCommit() {
      if (this.realGrid) {
        this.realGrid.gridView.commit();
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
        done: function () {
          //내보내기 완료 후 실행되는 함수
          alert('done excel export');
        },
      });
    },
  },
};
