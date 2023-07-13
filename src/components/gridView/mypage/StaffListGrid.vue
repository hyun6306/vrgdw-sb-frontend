<template>
  <div :id="gridName" ref="StaffList" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout } from '@/consts/gridData/mypage/staffList';
import commonGridJs from '@/mixins/commonGrid';
import { mapGetters } from 'vuex';
import mypageApi from '@/api/mypage/staff';

export default {
  props: ['gridLang', 'authButton'],
  data() {
    return {
      gridName: 'staffListGrid',
      realGrid: null,
      staffList: [],
    };
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  mixins: [commonGridJs],
  watch: {
    gridLang() {
      this.initGrid();
    },
    staffList() {
      this.staffList.forEach(row => {
        row.useYn = row.useYn == 'Y' ? this.$t('message.work') : this.$t('message.resignation');
      });
      this.realGrid.dataProvider.setRows(this.staffList);
      this.$emit('sendRowCount', this.realGrid.dataProvider.getRowCount());
    },
  },
  methods: {
    // 그리드 다국어 설정
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
          vm,
          existFavorite: true,
          layout: layout,
          existCalendar: true,
        };
        this.realGrid = new RealGridCreate(setGridData);
        this.loadStaffList(null);
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
        this.cellClicked();
      }
    },
    cellClicked() {
      //그리드 셀 클릭
      this.realGrid.gridView.onCellClicked = (grid, clickData) => {
        if (clickData.cellType == 'data') {
          if (clickData.fieldName == 'userNm' && this.authButton.savAuth == 'Y') {
            //고객 이름 클릭시 직원상세 모달 호출
            let rowData = this.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            this.$parent.addStaff(rowData);
          }
        }
      };
    },
    async loadStaffList(params) {
      //직원 목록 조회
      try {
        let param = params == null ? { filter: '', useYn: 'Y' } : params;
        const response = await mypageApi.getStaffList(param);
        this.staffList = response.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  async mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
