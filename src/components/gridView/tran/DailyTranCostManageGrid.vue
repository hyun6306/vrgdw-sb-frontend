<!-- 일별 배차내역 -->
<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/dailyTranCostManage';
import commonGridJs from '@/mixins/commonGrid';
// import dayjs from 'dayjs';
import tranApi from '@/api/tran/tran';

export default {
  data() {
    return {
      realGrid: null,
      listData: [],
      //셀클릭
      dailyRow: 0,
      //
      dailyTrnDt: '',
      //합계
      totalCarCount: 0,
      totalTranCost: 0,
    };
  },
  mixins: [commonGridJs],
  props: ['gridLang', 'gridName'],
  watch: {
    listData(data) {
      this.totalCarCount = 0;
      this.totalTranCost = 0;
      data.forEach(row => {
        this.totalCarCount += row.carCount;
        this.totalTranCost += row.trnPrice;
        row.trnDt = this.$vnDateFormatD(row.trnDt);
      });
      this.$emit('sentTotal', { carCount: this.totalCarCount, tranCost: this.totalTranCost });
      this.realGrid.dataProvider.setRows(data);
      this.$emit('sendDailyRowCount', this.realGrid.dataProvider.getRowCount());
    },
    gridLang() {
      this.initGrid();
    },
    dailyRow() {
      this.dailyColor();
    },
    dailyTrnDt(dt) {
      this.$emit('sendDailyTrnDt', dt);
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
        this.realGrid.gridView.setColumnLayout(layout);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridDailyCostNull'),
        });
        this.dailyColor();
        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          if (clickData.cellType == 'data') {
            vm.dailyRow = clickData.dataRow;
            const getTrnDt = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            vm.dailyTrnDt = getTrnDt.trnDt;
          }
        };
      }
    },
    dailyColor() {
      //클릭한 로우 색상 지정
      let dailyIndex = this.dailyRow;
      this.realGrid.gridView.setRowStyleCallback(function (grid, item) {
        if (dailyIndex == item.dataRow) {
          return 'rg-mfb';
        }
      });
    },
    resetRow() {
      this.dailyRow = 0;
    },
    async getList(param, type = null) {
      const response = await tranApi.getTranDailyList(param);
      this.listData = response.data.ds;
      if (type == null) {
        if (this.listData.length > 0) {
          this.dailyTrnDt = this.listData[0].trnDt;
        } else {
          this.dailyTrnDt = '';
        }
      }
    },
    //엑셀다운로드
    dailyExcelExport(excelData) {
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
  },
  mounted() {
    this.initGrid();
  },
};
</script>
