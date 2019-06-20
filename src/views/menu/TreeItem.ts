import * as vscode from "vscode";
import * as path from "path";

export default class RapTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
    public readonly iconName: string = ''
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return '';
  }

  get description(): string {
    return '';
  }

  
  getChildren() {
    return [];
  }

  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "..",
      "..",
      "resources",
      "light",
      this.iconName
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "..",
      "resources",
      "dark",
      this.iconName
    )
  };
}