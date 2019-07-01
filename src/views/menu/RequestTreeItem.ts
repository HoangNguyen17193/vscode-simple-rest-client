import * as vscode from 'vscode';
import TreeItem from './TreeItem';
import Request from '../../models/request';

export default class extends TreeItem {
  request:Request;
  constructor(public readonly label: string, request:Request) {
    super(label, vscode.TreeItemCollapsibleState.None, {
      command: "RestClient.historyRequest",
      title: "History Request",
      arguments: [request] 
    }, "history-request.png");
    this.request = request;
  }

}