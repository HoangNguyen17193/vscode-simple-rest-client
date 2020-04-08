import * as vscode from 'vscode';
import Request from '../models/request';
import RequestService from '../services/request';
import HistoryService from '../services/history';
import ClipboardService from "../services/clipboard";
import RequestPanel from '../views/requestPanel/RequestPanel';
import TreeDataProvider from '../views/menu/TreeDataProvider';

export default class BaseRunner {
  private _menu:TreeDataProvider;

  constructor(menu: TreeDataProvider) {
    this._menu = menu;
  }
  public makeRequest(name: string, url: string, type: string, headers: string, body: string, form: string, options = '') {
    const requestModel = new Request(name, url, type, headers, body, form, options);
    HistoryService.write(requestModel);
    return RequestService.request(requestModel);
  }
  public createRequestPanel(request: Request) {
    const rapPanel = new RequestPanel(request);
    const panel = rapPanel.create();
    panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "request": {
          const { name, url, type, headers, body, form, options } = message;
          try {
            const result = await this.makeRequest(name, url, type, headers, body, form, options);
            const newRequest = new Request(name, url, type, headers, body, form, options);
            newRequest.result = result || 'No Content';
            rapPanel.reload(newRequest);
            this._menu.refresh();
          } catch (error) {
            const newRequest = new Request(name, url, type, headers, body, form, options);
            newRequest.error = error.response ? error.response : error;
            rapPanel.reload(newRequest);
            this._menu.refresh();
          }
          break;
        }
        case "copy": {
          ClipboardService.copy(message.text);
          vscode.window.showInformationMessage("Copied");
        }
      }
    });
  }
}