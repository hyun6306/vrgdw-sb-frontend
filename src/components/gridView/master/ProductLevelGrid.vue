<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import masterApi from '@/api/master/master';
import RealGridTreeCreate from '@/mixins/realGridTreeCreate';
import { fields, columns } from '@/consts/gridData/master/productLevel';
export default {
  props: ['levelList', 'gridLang', 'page'],
  data() {
    return {
      gridName: 'ProductLevelGrid',
      realGrid: null,
      treeView: null,
      treeProvider: null,
      useYnSelect: [
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      useYnText: [],
      useYnOption: [],
      clickRow: 0,
      clickJsonRow: {},
      isLookup: false,
    };
  },
  computed: {},
  watch: {
    //tree.expandAll(); 모든행을 펼친다. //tree.collapseAll(); 모든행을 접는다.
    levelList() {
      if (this.realGrid) {
        this.levelList.children.forEach(first => {
          this.changeData(first);
          first.children.forEach(second => {
            this.changeData(second);
            second.children.forEach(third => {
              this.changeData(third);
              third.children.forEach(fourth => {
                this.changeData(fourth);
                fourth.children.forEach(fifth => {
                  this.changeData(fifth);
                });
              });
            });
          });
        });
        this.realGrid.treeProvider.setObjectRows(this.levelList, 'children');
        this.realGrid.treeView.refresh();
        this.realGrid.treeView.expandAll();
      }
      this.setSelectBox();
    },
    gridLang() {
      this.initGrid();
    },
  },
  methods: {
    changeData(depth) {
      if (depth.level !== 'top') depth.levelNm = 'Level ' + depth.level;
      if (depth.useYn) depth.useYn = JSON.stringify({ text: depth.useYn, value: depth.useYn });
    },
    initGrid() {
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
        this.realGrid.treeView.setColumns(columns);
      } else {
        const vm = this;
        const setGridData = {
          gridName: this.gridName,
          columns,
          fields,
          vm,
          checkBarVisible: 'NO',
        };
        this.realGrid = new RealGridTreeCreate(setGridData);
        this.realGrid.treeProvider.setObjectRows(this.levelList, 'children');
        vm.cellClick();
      }
    },
    getNewAndChangeData() {
      const newRowsIndex = this.realGrid.treeProvider.getAllStateRows();
      const newRows = [];
      newRowsIndex.updated.forEach(index => {
        const row = this.realGrid.treeProvider.getJsonRow(index);
        newRows.push(row);
      });
      newRowsIndex.created.forEach(index => {
        const row = this.realGrid.treeProvider.getJsonRow(index);
        newRows.push(row);
      });
      return newRows;
    },
    onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      const fieldName = this.realGrid.treeProvider.getFieldName(field);
      this.realGrid.treeView.commit();
      if (fieldName == 'LVLKORNM') {
        let lvlKorNm = newValue;
        this.realGrid.treeProvider.setValue(dataRow, 'lvlKorNm', lvlKorNm);
        if (oldValue === newValue) {
          this.realGrid.treeProvider.setRowState(dataRow, 'none');
        }
      } else if (fieldName == 'LVLENGNM') {
        let lvlEngNm = newValue;
        this.realGrid.treeProvider.setValue(dataRow, 'lvlEngNm', lvlEngNm);
        if (oldValue === newValue) {
          this.realGrid.treeProvider.setRowState(dataRow, 'none');
        }
      } else if (fieldName == 'LVLVNMNM') {
        let lvlVnmNm = newValue;
        this.realGrid.treeProvider.setValue(dataRow, 'lvlVnmNm', lvlVnmNm);
        if (oldValue === newValue) {
          this.realGrid.treeProvider.setRowState(dataRow, 'none');
        }
      } else if (fieldName == 'SORT') {
        let sort = newValue;
        this.realGrid.treeProvider.setValue(dataRow, 'sort', sort);
        if (oldValue === newValue) {
          this.realGrid.treeProvider.setRowState(dataRow, 'none');
        }
      } else if (fieldName == 'USEYN') {
        let useYn = newValue;
        this.realGrid.treeProvider.setValue(dataRow, 'useYn', useYn);
        if (oldValue === newValue) {
          this.realGrid.treeProvider.setRowState(dataRow, 'none');
        }
      }
    },
    isChooseCell() {
      const current = this.realGrid.treeView.getCurrent();
      return current.itemIndex !== -1 ? true : false;
    },
    getRowData() {
      let clickRow = this.realGrid.treeView.getCurrent().dataRow;
      let children = this.realGrid.treeProvider.getChildren(clickRow);
      this.clickJsonRow = this.realGrid.treeProvider.getJsonRow(clickRow);
      this.$emit('sendChildrenData', children);
      this.$emit('sendClickJsonRow', this.clickJsonRow);
    },
    addRow() {
      const jsonRow = this.clickJsonRow;
      this.realGrid.treeProvider.insertChildRow(
        this.clickRow,
        '',
        {
          level: jsonRow.level == 'top' ? 0 : Number(jsonRow.level) + 1,
          levelNm: jsonRow.level == 'top' ? 'Level 0' : 'Level ' + (Number(jsonRow.level) + 1),
          useYn: JSON.stringify({ text: this.useYnSelect[0].text, value: this.useYnSelect[0].value }),
          parentId: jsonRow.lvlId,
        },
        -1,
        true,
      );
    },
    newRowDelete() {
      //방금 추가하려했던 행은 그냥 삭제될 수 있도록 하자
      const clickRow = this.realGrid.treeView.getCurrent().dataRow;
      const jsonRow = this.realGrid.treeProvider.getJsonRow(clickRow);
      if (jsonRow.level && jsonRow.levelNm) {
        if (!jsonRow.lvlNm) {
          this.realGrid.treeProvider.removeRow(clickRow);
          return true;
        }
      }
    },
    async deleteRow() {
      const jsonRow = this.clickJsonRow;

      const deletedList = [];
      deletedList.push({
        lvlId: jsonRow.lvlId,
        level: jsonRow.level,
        lvlCd: jsonRow.lvlCd,
        lvlKorNm: jsonRow.lvlKorNm,
        lvlEngNm: jsonRow.lvlEngNm,
        lvlVnmNm: jsonRow.lvlVnmNm,
        parentId: jsonRow.parentId,
        sort: jsonRow.sort,
        useYn: JSON.parse(jsonRow.useYn).value,
        // children: [],
      });
      const paramData = {
        deletedList,
      };
      const param = JSON.parse(JSON.stringify(paramData));
      try {
        const response = await masterApi.saveProductLevel(param);
        if (response.data.rs) {
          await this.lookup(); //재조회
          this.$EventBus.$emit('openYesModal', 'message.msgSelectDelete');
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async lookup() {
      this.isLookup = true;
      this.$emit('isLookup', this.isLookup);
    },
    cellClick() {
      this.realGrid.treeView.onCellClicked = (grid, clickData) => {
        this.clickRow = this.realGrid.treeView.getCurrent().dataRow;
        this.$emit('sendClickData', clickData);
        if (clickData.column === 'lvlCd' || clickData.column === 'lvlKorNm' || clickData.column === 'lvlEngNm' || clickData.column === 'lvlVnmNm' || clickData.column === 'sort') {
          const curr = this.realGrid.treeView.getCurrent();
          curr;
          // this.realGrid.treeView.beginUpdateRow(curr.itemIndex);
          this.realGrid.treeView.showEditor();
          this.realGrid.treeView.setFocus();
        }
      };
    },
    setSelectBox() {
      this.useYnOption = [];
      this.useYnSelect.forEach(option => {
        this.useYnText.push(option.text);
        this.useYnOption.push(JSON.stringify(option));
      });

      this.realGrid.treeView.setColumnProperty('useYn', 'editor', {
        type: 'list',
        labels: this.useYnText,
        values: this.useYnOption,
        displayLabels: 'label',
        textReadOnly: true,
      });
    },
    gridCommit() {
      if (this.realGrid) {
        this.realGrid.treeView.commit();
      }
    },
  },
  mounted() {
    this.initGrid();
  },
};
</script>

<style></style>
