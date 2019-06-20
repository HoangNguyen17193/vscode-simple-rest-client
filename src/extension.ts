import * as vscode from "vscode";
import TreeItem from './views/Menu/TreeItem';
import TreeDataProvider from "./views/Menu/TreeDataProvider";
import RequestPanel from "./views/requestPanel/RequestPanel";
import Request from './models/request';
import Runner from './runners/baseRunner';

export function activate(context: vscode.ExtensionContext) {
  const runner = new Runner();
  const treeDataProvider = new TreeDataProvider();
  context.subscriptions.push(vscode.window.registerTreeDataProvider("Menu", treeDataProvider));

  context.subscriptions.push(vscode.commands.registerCommand("RestClient.newRequest", (node: TreeItem) => {
    const request = new Request('', '', '', '', '');
    const rapPanel = new RequestPanel(request);
    const panel = rapPanel.create();
    panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "request": {
          const { url, type, headers, body, form } = message;
          try {
            const result = await runner.makeRequest(url, type, headers, body, form);
            const newRequest = new Request(url, type, headers, body, form);
            newRequest.result = result || 'No Content';
            rapPanel.reload(newRequest);
          } catch(error) {
            const newRequest = new Request(url, type, headers, body, form);
            newRequest.error = error.response ? error.response: error;
            rapPanel.reload(newRequest);
          }
        }
      }
    });
  }));
  context.subscriptions.push(vscode.commands.registerCommand("RestClient.makeRequest", 
  (url: string, type: string, headers:string, body:string, form:string) => {
    return runner.makeRequest(url, type, headers, body, form);
  }));
}

export function deactivate() {}
