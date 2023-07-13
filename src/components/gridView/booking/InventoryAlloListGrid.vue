<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { baseColumns, columns, fields, layout, ordColumns } from '@/consts/gridData/booking/inventoryAlloList';
import commonGridJs from '@/mixins/commonGrid';
import { mapGetters } from 'vuex';

export default {
  props: ['listRows', 'gridLang', 'savePage', 'page', 'plntCdOptions'],
  data() {
    return {
      gridName: 'inventoryAlloGrid',
      realGrid: null,
      selectRow: -1,
      checkedCount: 0,
      plntText: [],
      plntValue: [],
    };
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  mixins: [commonGridJs],
  watch: {
    listRows() {
      this.gridCommit();
      if (this.listRows && this.listRows.length > 0 && this.listRows[0].plantIn) {
        this.realGrid.dataProvider.fillJsonData(this.listRows, {
          fillMode: 'update',
        });
      } else {
        this.listRows.forEach(row => {
          if (row.prdcExpctDt) row.prdcExpctDt = this.$vnDateFormatD(row.prdcExpctDt);
          if (row.prdcSttDt) row.prdcSttDt = this.$vnDateFormatD(row.prdcSttDt);
          if (row.cfmDt) row.cfmDt = this.$vnDateFormatD(row.cfmDt);
          if (row.asgnReqDt) row.asgnReqDt = this.$vnDateFormatD(row.asgnReqDt);
          if (row.salesMngRemarkYn === 'N') row.salesMngRemarkYn = '';
        });
        this.realGrid.dataProvider.setRows(this.listRows);
        this.$emit('checkedInfo');
      }
      // columns 간격조정
      let columnItem;
      const columnWidth = 40;
      for (let i of columns) {
        columnItem = this.realGrid.gridView.layoutByColumn(i.name);
        if (columnItem && columnItem.cellWidth) {
          // console.log('columns', columnItem.cellWidth);
          columnItem.cellWidth += columnWidth;
        }
      }
    },
    gridLang() {
      this.initGrid();
    },
    plntCdOptions() {
      this.plntText = [];
      this.plntValue = [];
      this.plntCdOptions.forEach(option => {
        this.plntText.push(option.text);
        this.plntValue.push(option.value);
      });
    },
  },
  methods: {
    resetAllChecked() {
      this.realGrid.gridView.checkAll(false);
    },
    onItemAllChecked(grid, checked) {
      const data = {
        bokngBaseQty: this.realGrid.gridView.getSummary('bokngBaseQty', 'sum'),
        bokngOrdQty: this.realGrid.gridView.getSummary('bokngOrdQty', 'sum'),
        asgnBaseNedQty: this.realGrid.gridView.getSummary('asgnBaseNedQty', 'sum'),
        asgnOrdNedQty: this.realGrid.gridView.getSummary('asgnOrdNedQty', 'sum'),
        checked: checked,
        all: true,
      };
      this.$emit('checkedInfo', data);
    },
    onItemChecked(grid, itemIndex, checked) {
      const dataRow = this.realGrid.gridView.getDataRow(itemIndex);
      const data = {
        bokngBaseQty: this.realGrid.dataProvider.getValue(dataRow, 'bokngBaseQty'),
        bokngOrdQty: this.realGrid.dataProvider.getValue(dataRow, 'bokngOrdQty'),
        asgnBaseNedQty: this.realGrid.dataProvider.getValue(dataRow, 'asgnBaseNedQty'),
        asgnOrdNedQty: this.realGrid.dataProvider.getValue(dataRow, 'asgnOrdNedQty'),
        checked: checked,
      };
      this.$emit('checkedInfo', data);
    },
    resetLayout(baseOrOrd) {
      this.realGrid.gridView.setColumnLayout(layout);
      this.layoutState(baseOrOrd);
    },
    layoutState(baseOrOrd) {
      if (baseOrOrd) {
        // base true
        for (let key in baseColumns) {
          this.realGrid.gridView.layoutByName(baseColumns[key]).visible = true;
        }
        for (let key in ordColumns) {
          this.realGrid.gridView.layoutByName(ordColumns[key]).visible = false;
        }
      } else {
        // ord false
        for (let key in baseColumns) {
          this.realGrid.gridView.layoutByName(baseColumns[key]).visible = false;
        }
        for (let key in ordColumns) {
          this.realGrid.gridView.layoutByName(ordColumns[key]).visible = true;
        }
      }
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
        // this.realGrid.gridView.setColumnProperty('plntCd', 'editor', {
        //   type: 'list',
        //   labels: this.plntValue,
        //   values: this.plntValue,
        //   displayLabels: 'label',
        //   textReadOnly: true,
        // });
      } else {
        const setGridData = {
          gridName: this.gridName,
          columns: columns,
          fields: fields,
          layout: layout,
          existAddr: true,
          vm,
        };

        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });

        this.realGrid.gridView.onCellClicked = (grid, clickData) => {
          clickData;
        };
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
              //
              let isSame = loadLayout.filter(loadLay => {
                if (cur.name == loadLay.name) {
                  let curItem = cur.items;
                  let layItem = loadLay.items;
                  let isSameItem = [];
                  curItem.forEach(cItem => {
                    let same = layItem.filter(lItem => cItem.column === lItem.column);
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
            // this.realGrid.gridView.setColumnLayout(layout);
            this.$parent.layoutSave('update', true);
          } else if (newLayoutName) {
            this.realGrid.gridView.setColumnLayout(loadLayout);
            this.$parent.layoutSave('update', true);
          } else {
            this.realGrid.gridView.setColumnLayout(loadLayout);
          }
        }
      });
      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.column === 'bokngOrdQty' || clickData.column === 'bokngBaseQty') {
          let bokngSoNum = grid.getValue(clickData.itemIndex, 'bokngSoNum');
          if (!bokngSoNum && bokngSoNum !== '') {
            const curr = this.realGrid.gridView.getCurrent();
            this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
            this.realGrid.gridView.showEditor();
            this.realGrid.gridView.setFocus();
          }
        }
      };
      this.layoutState(false);
    },
    openAddrInfo(clickInfo) {
      const offrId = this.realGrid.dataProvider.getValue(clickInfo.dataRow, 'offrId');
      this.$emit('openAddrInfo', offrId);
    },
    openSalesMemo(clickInfo) {
      const offrId = this.realGrid.dataProvider.getValue(clickInfo.dataRow, 'offrId');
      const custId = this.realGrid.dataProvider.getValue(clickInfo.dataRow, 'custId');
      const data = {
        id: offrId,
        memoType: 'SALES',
        custId,
      };
      this.$emit('openSalesMemo', data);
    },
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      const fieldName = this.realGrid.dataProvider.getFieldName(field);
      const ordUnitNmrtr = this.realGrid.dataProvider.getValue(dataRow, 'ordUnitNmrtr'); // 분자
      const ordUnitDenom = this.realGrid.dataProvider.getValue(dataRow, 'ordUnitDenom'); // 분모

      let value = '';
      if (fieldName === 'BOKNGBASEQTY') {
        if (this.checkQty(newValue, oldValue)) value = Math.round((ordUnitNmrtr / ordUnitDenom) * newValue * 1000) / 1000;
        else return;
        // value = (newValue / ordUnitDenom).toFixed(3);
        // value = (ordUnitNmrtr / ordUnitDenom).toFixed(3) * newValue; // 주만 단위(번들) 구하기
      } else {
        if (newValue % 1 === 0) {
          if (this.checkQty(newValue, oldValue)) value = (newValue * ordUnitDenom) / ordUnitNmrtr;
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
    checkQty(newValue, oldValue) {
      if (newValue > oldValue || newValue < 1) {
        this.realGrid.gridView.cancel();
        return false;
      }
      return true;
    },
    setValue(dataRow, fieldName, value) {
      if (fieldName === 'BOKNGBASEQTY') {
        this.realGrid.dataProvider.setValue(dataRow, 'bokngOrdQty', value);
      } else if (fieldName === 'BOKNGORDQTY') {
        this.realGrid.dataProvider.setValue(dataRow, 'bokngBaseQty', value);
      }
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
