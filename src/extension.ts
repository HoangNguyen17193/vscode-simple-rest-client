import * as vscode from "vscode";
import TreeItem from './views/menu/TreeItem';
import RequestTreeItem from './views/menu/RequestTreeItem';
import TreeDataProvider from "./views/menu/TreeDataProvider";
import Request from './models/request';
import Controller from './controllers/mainController';

export function activate(context: vscode.ExtensionContext) {
  const controller = new Controller();
  const treeDataProvider = new TreeDataProvider();
  context.subscriptions.push(vscode.window.registerTreeDataProvider("Menu", treeDataProvider));

  context.subscriptions.push(vscode.commands.registerCommand("RestClient.newRequest", (node: TreeItem) => {
    const request = new Request('', '', '', '', '');
    controller.createRequestPanel(request);
  }));
  context.subscriptions.push(vscode.commands.registerCommand("RestClient.historyRequest", (node: RequestTreeItem) => {
    const request = node.request;
    controller.createRequestPanel(request);
  }));
  context.subscriptions.push(vscode.commands.registerCommand("RestClient.makeRequest", (url: string, type: string, headers:string, body:string, form:string) => {
    return controller.makeRequest(url, type, headers, body, form);
  }));
}

export function deactivate() {}
