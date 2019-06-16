import * as vscode from "vscode";
import RapMenuItem from './views/rapMenu/RapTreeItem';
import RapTreeDataProvider from './views/rapMenu/RAPTreeDataProvider';


export function activate(context: vscode.ExtensionContext) {
  const rapTreeDataProvider = new RapTreeDataProvider();
  context.subscriptions.push(vscode.window.registerTreeDataProvider("RAPMenu", rapTreeDataProvider));

  context.subscriptions.push(vscode.commands.registerCommand("RAP.newRequest", (node: RapMenuItem) => {
    
  }));
}

export function deactivate() {}
