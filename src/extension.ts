import * as vscode from "vscode";
import TreeItem from './views/menu/TreeItem';
import RequestTreeItem from './views/menu/RequestTreeItem';
import TreeDataProvider from "./views/menu/TreeDataProvider";
import Request from './models/request';
import Controller from './controllers/mainController';

export function activate(context: vscode.ExtensionContext) {
  const treeDataProvider = new TreeDataProvider();
  const controller = new Controller(treeDataProvider);
  context.subscriptions.push(vscode.window.registerTreeDataProvider("Menu", treeDataProvider));

  context.subscriptions.push(vscode.commands.registerCommand("RestClient.newRequest", () => {
    const request = new Request('', '', 'GET', '{}', '', '{"proxy":""}');
    controller.createRequestPanel(request);
  }));
  context.subscriptions.push(vscode.commands.registerCommand("RestClient.historyRequest", (request: Request) => {
    controller.createRequestPanel(request);
  }));
  context.subscriptions.push(vscode.commands.registerCommand("RestClient.makeRequest", (name:string, url: string, type: string, headers:string, body:string, form:string) => {
    return controller.makeRequest(name, url, type, headers, body, form);
  }));
}

export function deactivate() {}
