import * as vscode from 'vscode';
import TreeItem from './TreeItem';

export default class RapTreeDataProvider implements vscode.TreeDataProvider<TreeItem>{

  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined> = new vscode.EventEmitter<TreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined> = this._onDidChangeTreeData.event;

  getChildren(element?: TreeItem): Thenable<TreeItem[]> {
    return Promise.resolve(this.getMenuItems());
  }

  private getMenuItems() {
    return [
      new TreeItem("New Request", vscode.TreeItemCollapsibleState.None, {
        command: "RestClient.newRequest",
        title: "New Request"
      }, "new-request.png"),
      new TreeItem("History", vscode.TreeItemCollapsibleState.None, {
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