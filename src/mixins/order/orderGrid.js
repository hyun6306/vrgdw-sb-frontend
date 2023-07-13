import productApi from '@/api/order/product';
import defs from '@/consts/defs';

export default {
  methods: {
    onItemAllChecked(grid, checked) {
      this.sendCheckedData();
      checked;
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      this.checkedCount = checkedRows.length;
      this.$emit('sendCheckedCount', checkedRows.length);
    },
    clearProductList() {
      this.realGrid.dataProvider.clearRows();
      this.realGrid.gridView.checkAll(false);
      this.deleteSaveId(true);
      this.$emit('sendCheckedCount', 0);
      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
      const totalPrice = this.realGrid.gridView.getSummary('reqOffrPrice', 'sum');
      this.$emit('changeTotalPrice', isNaN(totalPrice) ? 0 : totalPrice);
    },
    async changeFavoriteUseYn(rowIndex) {
      try {
        const data = this.realGrid.dataProvider.getJsonRow(rowIndex);
        const param = {
          prdtCd: data.prdtCd,
          useYn: data.favoritYn === 'Y' ? 'N' : 'Y',
        };
        this.realGrid.dataProvider.setValue(rowIndex, 'favoritYn', param.useYn);
        // const resp =
        await productApi.saveProductFavorite(param);
        // this.$emit('gridSendModal', resp.data.message);
      } catch (e) {
        console.log(e);
      }
    },
    gridCommit() {
      this.realGrid.gridView.commit();
    },
    deleteRows() {
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      let allRowsCount = this.realGrid.dataProvider.getRowCount();
      if (checkedRows.length === allRowsCount) {
        this.deleteSaveId(true);
        this.clearProductList();
        return;
      } else {
        this.deleteSaveId(false, checkedRows);
        checkedRows.sort((a, b) => b - a);
        checkedRows.forEach(index => {
          this.realGrid.dataProvider.removeRow(index);
        });
        this.checkedCount -= checkedRows.length;
      }

      allRowsCount -= checkedRows.length;
      this.$emit('sendCheckedCount', this.checkedCount);
      this.$emit('sendRowCount', allRowsCount);
      const totalPrice = this.realGrid.gridView.getSummary('reqOffrPrice', 'sum');
      this.$emit('changeTotalPrice', isNaN(totalPrice) ? 0 : totalPrice);
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
    openCalendar(dataRow) {
      this.selectRow = dataRow;
      const currentMonth = this.realGrid.dataProvider.getValue(dataRow, 'trnHopeDt');
      this.$emit('openSingleCalendar', currentMonth);
    },
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      const fieldName = this.realGrid.dataProvider.getFieldName(field);
      if (fieldName == 'CHGQTYAMT' || fieldName == 'TRNADDAMT') {
        this.setAmt(dataRow, newValue, fieldName);
      }

      const ordUnitNmrtr = this.realGrid.dataProvider.getValue(dataRow, 'ordUnitNmrtr'); // 분자
      const ordUnitDenom = this.realGrid.dataProvider.getValue(dataRow, 'ordUnitDenom'); // 분모
      const prdtClsCd = this.realGrid.dataProvider.getValue(dataRow, 'prdtClsCd'); // 품목

      let value = '';
      if (fieldName === 'REQBASEQTY') {
        value = Math.round((ordUnitNmrtr / ordUnitDenom) * newValue * 1000) / 1000;
        if (!this.checkQty(value, prdtClsCd)) return;
        // value = (newValue / ordUnitDenom).toFixed(3);
        // value = (ordUnitNmrtr / ordUnitDenom).toFixed(3) * newValue; // 주만 단위(번들) 구하기
      } else if (fieldName === 'SIZECHGYN') {
        if (newValue == 'N') {
          const HrsnSize = this.realGrid.dataProvider.getValue(dataRow, 'hrsnSpec'); // 가로
          const VtclSize = this.realGrid.dataProvider.getValue(dataRow, 'vtclSpec'); // 세로
          const Tsk = this.realGrid.dataProvider.getValue(dataRow, 'tskSpec'); // 두께
          grid.columnByName('smplHrsnSize').editable = false;
          grid.columnByName('smplVtclSize').editable = false;
          grid.columnByName('smplTsk').editable = false;
          value = {
            smplHrsnSize: HrsnSize,
            smplVtclSize: VtclSize,
            smplTsk: Tsk,
          };
        } else if (newValue == 'Y') {
          value = {
            smplHrsnSize: 0,
            smplVtclSize: 0,
            smplTsk: 0,
          };
        }
      } else if (fieldName === 'PRDTCD') {
        const prdtClsCd = this.realGrid.dataProvider.getValue(dataRow, 'prdtClsCd');
        this.searchProduct({ prdtCd: newValue, prdtClsCd, dataRow });
      } else if (fieldName === 'SMPLHRSNSIZE' || fieldName === 'SMPLVTCLSIZE' || fieldName === 'SMPLTSK') {
        if (typeof newValue == 'undefined') {
          value = 0;
          // this.$emit('gridSendModal', 'message.msgRequireSize');
        } else {
          const HrsnSize = this.realGrid.dataProvider.getValue(dataRow, 'hrsnSpec'); // 가로
          const VtclSize = this.realGrid.dataProvider.getValue(dataRow, 'vtclSpec'); // 세로
          const TskSize = this.realGrid.dataProvider.getValue(dataRow, 'tskSpec'); // 두께
          if ((fieldName === 'SMPLHRSNSIZE' && HrsnSize < newValue) || (fieldName === 'SMPLVTCLSIZE' && VtclSize < newValue) || (fieldName === 'SMPLTSK' && TskSize < newValue)) {
            this.$emit('gridSendModal', 'message.msgOverSize');
            value = 0;
          } else {
            value = newValue;
          }
        }
      } else {
        if (newValue % 1 === 0) {
          if (this.checkQty(newValue, prdtClsCd)) value = (newValue * ordUnitDenom) / ordUnitNmrtr;
          else return;
        } else {
          this.realGrid.gridView.cancel();
          return;
        }
        // value = newValue * ordUnitDenom; // 기본 단위(매) 구하기
      }
      this.realGrid.gridView.commit();
      this.setValue(dataRow, fieldName, value, newValue, oldValue);
    },
    checkQty(value, prdtClsCd) {
      if (defs.prdtClsCd.MDF.includes(prdtClsCd) && value > 300000) {
        this.$EventBus.$emit('openYesModal', 'message.msgMdfOverQty');
        this.realGrid.gridView.cancel();
        return false;
      } else if (defs.prdtClsCd.MFB.includes(prdtClsCd) && value > 100000) {
        this.$EventBus.$emit('openYesModal', 'message.msgMfbOverQty');
        this.realGrid.gridView.cancel();
        return false;
      }
      return true;
    },
    sendJsonRows() {
      return this.realGrid.dataProvider.getJsonRows();
    },
    isCheckedItem() {
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      let isHopeMonthExist = false;
      checkedRows.forEach(rowIndex => {
        const row = this.realGrid.dataProvider.getJsonRow(rowIndex);
        if (row.trnHopeDt && row.trnHopeDt !== '') {
          isHopeMonthExist = true;
        }
      });
      const check = {
        isCheckedItem: checkedRows.length > 0,
        isHopeMonthExist,
      };
      return check;
    },
    deleteSaveId(all, checkedRows) {
      let rows = [];
      if (all) {
        rows = this.realGrid.dataProvider.getJsonRows();
      } else {
        checkedRows.forEach(rowIndex => {
          rows.push(this.realGrid.dataProvider.getJsonRow(rowIndex));
        });
      }
      rows.forEach(row => {
        if (row.id) {
          this.removeOffrDtlsIds.push(row.id * 1);
        }
      });
    },
    sendRemoveOffrDtlsIds() {
      return this.removeOffrDtlsIds;
    },
    resetRemoveOffrDtlsIds() {
      this.removeOffrDtlsIds = [];
    },
  },
};
