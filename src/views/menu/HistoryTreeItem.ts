import * as vscode from 'vscode';
import TreeItem from './TreeItem';

export default class HistoryTreeItem extends TreeItem {
  getChildren() {
    return [
      new TreeItem("comming soon....", vscode.TreeItemCollapsibleState.None, null, '')
    ];
  }
}
