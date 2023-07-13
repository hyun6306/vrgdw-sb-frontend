<template>
  <div :id="gridName" style="width: 100%; height: 100%"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import { fields, columns, layout } from '@/consts/gridData/master/productManagement';
import RealGridCreate from '@/mixins/realGridCreate';
import commonGridJs from '@/mixins/commonGrid';
import commonApi from '@/api/common';

export default {
  props: ['listRows', 'gridLang', 'page', 'menuId', 'savePage'],
  mixins: [commonGridJs],
  data() {
    return {
      gridName: 'productManagement',
      realGrid: null,
    };
  },
  computed: {
    ...mapGetters({
      menuList: 'menuList/getMenuListAll',
    }),
  },
  watch: {
    listRows() {
      this.listRows.forEach(list => {
        if (list.loginAt) list.loginAt = this.$vnDateFormatDt(list.loginAt);
      });
      this.realGrid.dataProvider.setRows(this.listRows);
    },
    gridLang() {
      this.initGrid();
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
        };
        this.realGrid = new RealGridCreate(setGridData);
        // this.realGrid.gridView.displayOptions.rowHeight = -1;
        // this.realGrid.gridView.displayOptions.minRowHeight = 36;
        this.realGrid.gridView.setDisplayOptions({
          showEmptyMessage: true,
          emptyMessage: this.$t('message.gridMessageNoSearch'),
        });
      }
      this.cellClick();
      this.layoutSetting();
    },
    isChooseCell() {
      const current = this.realGrid.gridView.getCurrent();
      return current.itemIndex !== -1 ? true : false;
    },
    cellClick() {
      const vm = this;
      this.realGrid.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.cellType !== 'header') {
          // 제품명 클릭 시 페이지 이동
          if (clickData.fieldName == 'erpPrdtNm') {
            const clickInfo = vm.realGrid.dataProvider.getValues(clickData.dataRow);
            const rowData = vm.realGrid.dataProvider.getJsonRow(clickData.dataRow);
            // 제품 상세 이동
            // vm.id = clickInfo[0];
            // vm.custId = clickInfo[1];
            // vm.getMenuList();
            // vm.pageObj = vm.orderGeneralObj;
            vm.pageObj = vm.getMenuList();
            vm.$emit('setObject', vm.pageObj, clickInfo[1], rowData);
          } else {
            return;
          }
        }
      };
    },
    async resetLayout() {
      this.saveLayout('reset');
    },
    async saveLayout(type) {
      if (type == 'reset') this.realGrid.gridView.setColumnLayout(layout);
      try {
        let layouts = this.realGrid.gridView.saveColumnLayout();
        let param = {
          menuId: this.menuId,
          storeCls: this.page,
          uiJson: layouts,
        };

        const response = await commonApi.putSaveUi(param);
        if (response.data.rs) {
          if (type === 'update') {
            this.$EventBus.$emit('openYesModal', 'message.msgLayoutUpdate');
          } else if (type === 'reset') {
            this.$EventBus.$emit('openYesModal', 'message.msgClearRefresh');
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgResultSave');
          }
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async layoutSetting() {
      if (this.savePage.length > 0 && this.savePage !== null) {
        let key = this.savePage.length - 1;
        if (this.savePage[key].storeCls == this.page) {
          const loadLayout = this.savePage[key].uiJson;
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
            this.realGrid.gridView.setColumnLayout(layout);
            await this.saveLayout('update');
          } else if (newLayoutName) {
            this.realGrid.gridView.setColumnLayout(layout);
            await this.saveLayout('update');
          } else {
            this.realGrid.gridView.setColumnLayout(loadLayout);
          }
        }
      }
    },

    getMenuList() {
      function findMenu(menuObj) {
        return menuObj.routerPath == '/master/product-management-detail';
      }
      let menuObj = null;
      let findResult = false;
      this.menuList.forEach(oneDepth => {
        findResult = findMenu(oneDepth);
        if (findResult) {
          if (menuObj == null) menuObj = oneDepth;
          return false;
        }
        oneDepth.children.forEach(twoDepth => {
          findResult = findMenu(twoDepth);
          if (findResult) {
            if (menuObj == null) menuObj = twoDepth;
            return false;
          }
          twoDepth.children.forEach(threeDepth => {
            findResult = findMenu(threeDepth);
            if (findResult) {
              if (menuObj == null) menuObj = threeDepth;
              return false;
            }
          });
        });
      });

      return menuObj;
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
  created() {},
};
</script>
