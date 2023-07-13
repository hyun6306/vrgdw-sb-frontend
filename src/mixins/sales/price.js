import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/sales/salesPrice';
import { fields as itemF, columns as itemC, layout as itemL } from '@/consts/gridData/sales/itemPrice';

export default {
  data() {
    return {
      // setFilter: ['prdtNm', 'apprStat', 'apprDocNum', 'updatedAt'],
    };
  },
  watch: {
    priceListRows() {
      if (this.realGrid) {
        this.priceListRows.forEach(row => {
          row.rangeDt = this.$vnDateFormatD(row.sttDt) + ' ~ ' + this.$vnDateFormatD(row.endDt);
          row.updatedAt = this.$vnDateFormatD(row.updatedAt);
          row.currency = 'VND';

          if (row.apprDocNum !== '' && row.apprDocNum) {
            row.apprStat = this.apprDocNumText.apprDocNumY;
          } else if (!row.apprDocNum) {
            row.apprStat = this.apprDocNumText.apprDocNumN;
          }
        });
        this.realGrid.dataProvider.fillJsonData(this.priceListRows, {
          fillMode: 'set',
        });
      }
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    resetLayout() {
      const layout = this.page === 'itemPriceList' ? itemL : layout;
      this.realGrid.gridView.setColumnLayout(layout);
      // this.setFilter.forEach(filterNm => {
      //   this.realGrid.gridView.setColumnProperty(filterNm, 'autoFilter', true);
      // });
    },
    initGrid() {
      const vm = this;
      if (this.realGrid) {
        if (this.page === 'itemPriceList' && itemC && itemL && this.gridLang) {
          itemC.forEach(col => {
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
          itemL.forEach(field => {
            this.gridLang.forEach(lang => {
              if (field.name === lang.formKey) {
                field.header.text = lang.text;
              }
            });
          });
          this.realGrid.gridView.setColumns(itemC);
          this.realGrid.gridView.setColumnLayout(itemL);
          // this.setFilter.forEach(filterNm => {
          //   this.realGrid.gridView.setColumnProperty(filterNm, 'autoFilter', true);
          // });
        } else if (this.page === 'salePriceList' && columns && layout && this.gridLang) {
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
          columns: this.page === 'itemPriceList' ? itemC : columns,
          fields: this.page === 'itemPriceList' ? itemF : fields,
          layout: this.page === 'itemPriceList' ? itemL : layout,
          // setFilter: this.setFilter,
          existAddr: true,
          vm,
        };

        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageInsertData'),
        });

        this.realGrid.gridView.onCellClicked = (grid, clickData) => {
          if (clickData.cellType == 'data') {
            if (clickData.column === 'info') {
              const prdtCd = this.realGrid.dataProvider.getValue(clickData.dataRow, 'prdtCd');
              const prdtNm = this.realGrid.dataProvider.getValue(clickData.dataRow, 'prdtNm');
              this.$emit('sendInfoPrdtCd', { prdtCd, prdtNm });
            }
          }
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
            if (this.page === 'itemPriceList') this.realGrid.gridView.setColumnLayout(itemL);
            if (this.page === 'salePriceList') this.realGrid.gridView.setColumnLayout(layout);
            this.$parent.layoutSave('update', true);
          } else if (newLayoutName) {
            if (this.page === 'itemPriceList') this.realGrid.gridView.setColumnLayout(itemL);
            if (this.page === 'salePriceList') this.realGrid.gridView.setColumnLayout(layout);
            this.$parent.layoutSave('update', true);
          } else {
            this.realGrid.gridView.setColumnLayout(loadLayout);
          }
        }
      });
      // this.setFilter.forEach(filterNm => {
      //   this.realGrid.gridView.setColumnProperty(filterNm, 'autoFilter', true);
      // });
    },
    setFilter(set) {
      if (this.page === 'itemPriceList') {
        itemC.forEach(column => {
          column.autoFilter = set;
        });
        this.realGrid.gridView.setColumns(itemC);
        this.realGrid.gridView.setColumnLayout(itemL);
      } else {
        columns.forEach(column => {
          column.autoFilter = set;
        });
        this.realGrid.gridView.setColumns(columns);
        this.realGrid.gridView.setColumnLayout(layout);
      }
    },
  },
  mounted() {
    this.initGrid();
  },
};
