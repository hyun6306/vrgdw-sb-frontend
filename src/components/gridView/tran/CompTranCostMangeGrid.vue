<!-- 일별 배차내역 -->
<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/tran/compTranCostManage';
import commonGridJs from '@/mixins/commonGrid';
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';
import tranApi from '@/api/tran/tran';

export default {
  data() {
    return {
      realGrid: null,
      listData: [],
      //셀클릭
      compRow: 0,
      //
      compTrncusCd: '',
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  mixins: [commonGridJs],
  props: ['gridLang', 'gridName'],
  watch: {
    listData(data) {
      this.realGrid.dataProvider.setRows(data);
      this.$emit('sendCompRowCount', this.realGrid.dataProvider.getRowCount());
    },
    gridLang() {
      this.initGrid();
    },
    compRow() {
      this.compColor();
    },
    compTrncusCd(cd) {
      this.$emit('sendCompTrncusCd', cd);
    },
  },
  methods: {
    async initGrid() {
      const vm = this;
      if (this.realGrid) {
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
        this.realGrid.gridView.setColumnLayout(layout);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridTrnCostNull'),
        });
        this.compColor();
        this.realGrid.gridView.onCellClicked = function (grid, clickData) {
          if (clickData.cellType == 'data') {
            vm.compRow = clickData.dataRow;
            vm.compTrncusCd = vm.realGrid.dataProvider.getValue(clickData.dataRow, 'trncusCd');
          }
        };
      }
    },
    compColor() {
      //클릭한 로우 색상 지정
      let compIndex = this.compRow;
      this.realGrid.gridView.setRowStyleCallback(function (grid, item) {
        if (compIndex == item.dataRow) {
          return 'rg-mfb';
        }
      });
    },
    resetRow() {
      this.compRow = 0;
    },
    async getList(param, type = null) {
      let params = {};
      if (param == null) {
        let trncusId = this.userInfo.menuGrpCd == 'TRANSCUS' ? this.userInfo.trncusId : '';
        params = {
          //수정필요
          trncusId: trncusId,
          dateCls: 'cfmDt',
          sttDt: '2022-09-29',
          endDt: dayjs().format('YYYY-MM-DD'),
          compCd: '',
        };
      } else {
        params = param;
      }
      const response = await tranApi.getTranCompList(params);
      this.listData = response.data.ds;
      if (type == null) {
        if (this.listData.length > 0) {
          this.compTrncusCd = this.listData[0].trncusCd;
        } else {
          this.compTrncusCd = '';
        }
      }
    },
    //엑셀다운로드
    compExcelExport(excelData) {
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
