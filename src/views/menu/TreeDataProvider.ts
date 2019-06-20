import * as vscode from 'vscode';
import TreeItem from './TreeItem';
import HistoryTreeItem from './HistoryTreeItem';

export default class RapTreeDataProvider implements vscode.TreeDataProvider<TreeItem>{

  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined> = new vscode.EventEmitter<TreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined> = this._onDidChangeTreeData.event;

  getChildren(element?: TreeItem): Thenable<TreeItem[]> {
    if(!element){
      return Promise.resolve(this.getMenuItems());
    }
    return Promise.resolve(element.getChildren());
  }

  private getMenuItems() {
    return [
      new TreeItem("New Request", vscode.TreeItemCollapsibleState.None, {
        command: "RestClient.newRequest",
        title: "New Request"
      }, "new-request.png"),
      new HistoryTreeItem("History", vscode.TreeItemCollapsibleState.Collapsed, {
        command: '',
        title: "History"
      }, "history.png")
    ];
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
  
  getTreeItem(element: TreeItem): vscode.TreeItem {
    return element;
  }
}