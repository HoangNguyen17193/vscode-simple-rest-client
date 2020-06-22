import * as vscode from 'vscode';
import TreeItem from './TreeItem';
import RequestTreeItem from './RequestTreeItem';
import HistoryService from '../../services/history';
import Request from '../../models/request';

export default class HistoryTreeItem extends TreeItem {
  getChildren() {
    const history = HistoryService.getAll() || [];
    return history.map((requestData: any) => {
      const request = new Request(requestData.name, requestData.url, requestData.type, requestData.headers, requestData.body, requestData.form, requestData.options);
      return new RequestTreeItem(request.name || request.url, request);
    });
  }
}
