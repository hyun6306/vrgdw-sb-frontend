<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { fields, columns, layout } from '@/consts/gridData/master/orderMonthManagement';
import RealGridCreate from '@/mixins/realGridCreate';
import commonGridJs from '@/mixins/system/commonGrid';

export default {
  props: ['listRows', 'gridLang', 'selectDate', 'page'],
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'orderMonthMng',
      realGrid: null,
      selectRow: -1,
    };
  },
  watch: {
    listRows() {
      this.listRows.forEach(row => {
        row.aplySttColon = ' : ';
        // vnDateFormatD
        row.aplySttDt = this.$vnDateFormatD(row.aplySttDt);
        row.aplyPropDt = this.$vnDateFormatD(row.aplyPropDt);
      });
      this.realGrid.dataProvider.setRows(this.listRows);
    },
    gridLang() {
      this.initGrid();
    },
    selectDate(data) {
      this.realGrid.dataProvider.setValue(this.selectRow, data.type, data.date);
    },
  },
  methods: {
    initGrid() {
      const vm = this;
      if (this.realGrid) {
        if (columns && this.gridLang) {
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
        }
        layout.forEach(field => {
          this.gridLang.forEach(lang => {
            if (field.name === lang.formKey) {
              field.header.text = lang.text;
            }
          });
        });

        this.realGrid.gridView.setColumns(columns);
        this.realGrid.gridView.setColumnLayout(layout);
      } else {
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          layout,
          vm,
          checkBarVisible: 'NO',
          existCalendar: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
      }

      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.column === 'aplySttHh' || clickData.column === 'aplySttMi') {
          const curr = this.realGrid.gridView.getCurrent();
          this.realGrid.gridView.beginUpdateRow(curr.itemIndex);
          this.realGrid.gridView.showEditor();
          this.realGrid.gridView.setFocus();
        }
      };

      // this.realGrid.gridView.onValidateColumn = (grid, column, inserting, value) => {
      //   let error = {};
      //   if (column.fieldName === 'aplySttHh') {
      //     if (value > 23) {
      //       error.level = 'error';
      //       error.message = this.$t('message.hourValidation');
      //     }
      //   } else if (column.fieldName === 'aplySttMi') {
      //     if (value > 59) {
      //       error.level = 'error';
      //       error.message = this.$t('message.minuteValidation');
      //     }
      //   }
      //   return error;
      // };
    },
    openCalendar(dataRow, index) {
      this.selectRow = dataRow;
      // index.column.fieldName

      // if (index.column.fieldName=='aplySttDt')
      const currentMonth = this.realGrid.dataProvider.getValue(dataRow, index.column.fieldName);
      this.$emit('openSingleCalendar', { month: currentMonth, field: index.column.fieldName });
    },
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      this.realGrid.gridView.commit();
      const fieldName = this.realGrid.dataProvider.getFieldName(field);

      if (fieldName == 'APLYSTTHH') {
        let aplySttHh = newValue;
        if (!aplySttHh || aplySttHh > 23) {
          if (aplySttHh > 23) this.$EventBus.$emit('openYesModal', 'message.msgCheckTime');
          this.realGrid.dataProvider.setValue(dataRow, 'aplySttHh', oldValue);
        } else {
          if (aplySttHh.length === 1) {
            this.realGrid.dataProvider.setValue(dataRow, 'aplySttHh', 0 + aplySttHh);
          } else {
            this.realGrid.dataProvider.setValue(dataRow, 'aplySttHh', aplySttHh);
          }
        }
      } else if (fieldName == 'APLYSTTMI') {
        let aplySttMi = newValue;
        if (!aplySttMi || aplySttMi > 59) {
          if (aplySttMi > 59) this.$EventBus.$emit('openYesModal', 'message.msgCheckTime');
          this.realGrid.dataProvider.setValue(dataRow, 'aplySttMi', oldValue);
        } else {
          if (aplySttMi.length === 1) {
            this.realGrid.dataProvider.setValue(dataRow, 'aplySttMi', 0 + aplySttMi);
          } else {
            this.realGrid.dataProvider.setValue(dataRow, 'aplySttMi', aplySttMi);
          }
        }
      }
    },
  },
  mounted() {
    this.initGrid();
  },
  created() {},
};
</script>
