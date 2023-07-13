<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { columns, fields, layout } from '@/consts/gridData/tran/takeOver';
import commonGridJs from '@/mixins/commonGrid';
import defs from '@/consts/defs';

export default {
  props: ['listRows', 'gridLang', 'savePage', 'page'],
  data() {
    return {
      gridName: 'takeOverGrid',
      realGrid: null,
    };
  },
  computed: {},
  mixins: [commonGridJs],
  watch: {
    listRows() {
      this.resetAllChecked();
      this.listRows.forEach(row => {
        if (row.trnCfmAt) row.trnCfmAt = this.$vnDateFormatDt(row.trnCfmAt);
        if (row.outAt) row.outAt = this.$vnDateFormatDt(row.outAt);
        if (row.trnPsbDt) {
          row.trnPsbDt = this.$vnDateFormatD(row.trnPsbDt);
          row.trnPsbDtTo = row.trnPsbDt;
        }
        if (row.trnHopeDt) row.trnHopeDt = this.$vnDateFormatD(row.trnHopeDt);
        if (row.takeOverAt) row.takeOverDt = this.$vnDateFormatD(row.takeOverAt);
        if (row.takeOverAt) row.takeOverAt = this.$vnDateFormatDt(row.takeOverAt);
      });
      this.realGrid.dataProvider.setRows(this.listRows);
      // this.realGrid.gridView.fitLayoutWidth(null, 600, 50, true);
      this.setMerge();
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    resetAllChecked() {
      this.realGrid.gridView.checkAll(false);
    },
    resetLayout() {
      this.realGrid.gridView.setColumnLayout(layout);
    },
    initGrid() {
      const vm = this;
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
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          // columns: columns,
          // fields: fields,
          layout: layout,
          existAddr: true,
          vm,
        };

        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
      }

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
      this.setMerge();
      this.cellClick();
    },
    cellClick() {
      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.cellType == 'data') {
          if (clickData.column === 'trnPlnNum') {
            let trnPlnInfo = this.realGrid.dataProvider.getJsonRow(clickData.itemIndex);
            if (trnPlnInfo && trnPlnInfo.trnPlnNum && trnPlnInfo.trnPlnNum !== '') {
              const trnCarType = trnPlnInfo.trnCarType;
              if (trnCarType !== 'VRGDW') {
                this.$emit('openForwardingCustCar', trnPlnInfo);
              } else {
                this.$emit('openForwardingDetail', trnPlnInfo);
              }
            }
          } else if (clickData.column === 'trnCarNum') {
            let trnCarInfo = this.realGrid.dataProvider.getJsonRow(clickData.itemIndex);
            this.$emit('openCarInfo', trnCarInfo);
          } else if (clickData.fieldName == 'trnNum') {
            let trnNum = grid.getValue(clickData.itemIndex, 'trnNum');
            if (trnNum !== null) {
              let trnClsCd = grid.getValue(clickData.itemIndex, 'trnClsCd');
              let trnPlnNum = grid.getValue(clickData.itemIndex, 'trnPlnNum');
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
    setMerge() {
      this.realGrid.gridView.checkBar.mergeRule = { criteria: "values['trnPlnNum']" };
      this.realGrid.gridView.columnByName('trncusNm').mergeRule = { criteria: "values['trnPlnNum']" };
      this.realGrid.gridView.columnByName('trnPlnNum').mergeRule = { criteria: "values['trnPlnNum']" };
      this.realGrid.gridView.columnByName('trnCarNum').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('trnCfmAt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('outAt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('outStatNm').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      // this.realGrid.gridView.columnByName('trnPsbDt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('takeOverDt').mergeRule = { criteria: "values['trnPlnNum'] + value" };
      this.realGrid.gridView.columnByName('kpiComplianceYn').mergeRule = { criteria: "values['trnPlnNum'] + value" };
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

<style></style>
