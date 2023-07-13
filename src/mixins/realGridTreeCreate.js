import { TreeView, LocalTreeDataProvider } from 'realgrid';

class RealGridTreeCreate {
  constructor(gridData) {
    this.treeProvider = new LocalTreeDataProvider();
    this.treeView = new TreeView(gridData.gridName);

    const merge = (target, source) => {
      // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
      for (let key of Object.keys(source)) {
        if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]));
      }

      // Join `target` and modified `source`
      Object.assign(target || {}, source);
      return target;
    };

    if (this.treeView) {
      this.treeView.setEditOptions({
        insertable: false,
        appendable: false,
        editable: false,
      });

      let options = {
        display: {
          rowHeight: 32,
          columnResizable: true,
        },
        header: {
          height: 50,
        },
        stateBar: { visible: false },
        footers: { visible: false },
        rowIndicator: {
          visible: gridData.rowIndicator === 'NO' ? false : true, // 행번호 visible 여부
          width: 30,
        },
        checkBar: {
          visible: gridData.checkBarVisible === 'NO' ? false : true, // 체크박스 visible 여부
          showAll: gridData.checkBarVisible === 'NO' ? false : true, // 전체 체크박스 visible 여부
          width: 30,
        },
        treeOptions: {},
      };

      if (gridData.treeOptions) {
        merge(options.treeOptions, gridData.treeOptions);
        this.treeView.setTreeOptions(options.treeOptions);
      }
      this.treeView.setOptions(options);

      this.treeView.setDataSource(this.treeProvider);
      this.treeProvider.setFields(gridData.fields);
      this.treeView.setColumns(gridData.columns);

      this.vm = gridData.vm;

      this.fnEditRowChanged(); // 셀 수정 완료 시 호출
    }
  }

  fnEditRowChanged() {
    this.treeView.onEditRowChanged = (grid, itemIndex, dataRow, field, oldValue, newValue) => {
      this.vm.onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue);
    };
  }
}
export default RealGridTreeCreate;
