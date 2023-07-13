import { TreeView, LocalTreeDataProvider } from 'realgrid';

class RealGridTreeCreate {
  constructor(grideViewName, columns, fields, vm) {
    this.treeProvider = new LocalTreeDataProvider(false);
    this.treeView = new TreeView(grideViewName);

    if (this.treeView) {
      this.treeView.setDataSource(this.treeProvider);
      this.treeProvider.setFields(fields);
      this.treeView.setColumns(columns);
      this.vm = vm;
    }
  }
}
export default RealGridTreeCreate;
