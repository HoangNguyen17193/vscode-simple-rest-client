import * as vscode from 'vscode';
import RapTreeItem from './RapTreeItem';

export default class RapTreeDataProvider implements vscode.TreeDataProvider<RapTreeItem>{

  private _onDidChangeTreeData: vscode.EventEmitter<RapTreeItem | undefined> = new vscode.EventEmitter<RapTreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<RapTreeItem | undefined> = this._onDidChangeTreeData.event;

  getChildren(element?: RapTreeItem): Thenable<RapTreeItem[]> {
    return Promise.resolve(this.getMenuItems());
  }

  private getMenuItems() {
    return [
      new RapTreeItem("New Request", vscode.TreeItemCollapsibleState.None, {
        command: "RAP.newRequest",
        title: "New Request"
      }, "new-request.png"),
      new RapTreeItem("History", vscode.TreeItemCollapsibleState.None, {
        command: '',
        title: "History"
      }, "history.png")
    ];
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
  
  getTreeItem(element: RapTreeItem): vscode.TreeItem {
    return element;
  }
}