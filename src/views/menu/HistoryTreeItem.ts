import * as vscode from 'vscode';
import TreeItem from './TreeItem';
import HistoryService from '../../services/history';

export default class HistoryTreeItem extends TreeItem {
  getChildren() {
    const history = HistoryService.getAll() || [];
    return history.map((request: any) => new TreeItem(request.url, vscode.TreeItemCollapsibleState.None, null, ''))
  }
}
