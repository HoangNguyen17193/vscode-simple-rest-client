import * as vscode from "vscode";
import RapMenuItem from './views/rapMenu/RapTreeItem';
import RapTreeDataProvider from './views/rapMenu/RAPTreeDataProvider';
import RapPanel from './views/rapPanel/RapPanel';
import Request from './models/request';
import Runner from './runners/baseRunner';

export function activate(context: vscode.ExtensionContext) {
  const runner = new Runner();
  const rapTreeDataProvider = new RapTreeDataProvider();
  context.subscriptions.push(vscode.window.registerTreeDataProvider("RAPMenu", rapTreeDataProvider));

  context.subscriptions.push(vscode.commands.registerCommand("RAP.newRequest", (node: RapMenuItem) => {
    const request = new Request('', '', '', '', '');
    const rapPanel = new RapPanel(request);
    const panel = rapPanel.create();
    panel.webview.onDidReceiveMessage(async (message) => {
      console.log(message);
      switch (message.command) {
        case "request": {
          const { url, type, headers, body, form } = message;
          // TODO: handle error
          const result = await runner.makeRequest(url, type, headers, body, form);
          const newRequest = new Request(url, type, headers, body, form);
          newRequest.result = result;
          rapPanel.reload(newRequest);
        }
      }
    });
  }));
  context.subscriptions.push(vscode.commands.registerCommand("RAP.makeRequest", 
  (url: string, type: string, headers:string, body:string, form:string) => {
    return runner.makeRequest(url, type, headers, body, form);
  }));
}

export function deactivate() {}
