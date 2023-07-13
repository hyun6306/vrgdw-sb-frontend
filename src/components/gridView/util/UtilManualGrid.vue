<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/util/utilManual';
import commonGridJs from '@/mixins/commonGrid';
import { mapGetters } from 'vuex';
// import dayjs from 'dayjs';

export default {
  props: ['utilListRows', 'gridLang', 'savePage', 'page'],
  data() {
    return {
      gridName: 'utilManualGrid',
      realGrid: null,
      selectRow: -1,
      checkedCount: 0,
    };
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  mixins: [commonGridJs],
  watch: {
    utilListRows() {
      this.utilListRows.forEach(row => {
        row.updatedAt = this.$vnDateFormatD(row.updatedAt);
      });
      this.realGrid.dataProvider.setRows(this.utilListRows);
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    // 23. 2. 17 파일다운로드 방식 변경으로 인한 주석 처리
    // fileDownload(dataRow) {
    //   this.$emit('fileDownload', this.realGrid.dataProvider.getJsonRow(dataRow));
    // },
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
          columns: columns,
          fields: fields,
          layout: layout,
          existFile: true,
          rowIndicator: 'NO',
          checkBarVisible: this.userMenuGrpCd !== 'SYSTEM_MANAGER' ? 'NO' : '',
          vm,
        };

        this.realGrid = new RealGridCreate(setGridData);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoProduct'),
        });
        this.realGrid.gridView.onCellClicked = (grid, clickData) => {
          if (clickData.cellType == 'data') {
            if (clickData.column === 'title') {
              const id = this.realGrid.dataProvider.getValue(clickData.dataRow, 'id');
              this.$emit('sendPostId', { id });
            }
          }
        };
      }
    },
  },
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
