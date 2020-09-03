import * as vscode from 'vscode';
import Request from '../models/request';
import RequestService from '../services/request';
import HistoryService from '../services/history';
import ClipboardService from "../services/clipboard";
import RequestPanel from '../views/requestPanel/RequestPanel';
import TreeDataProvider from '../views/menu/TreeDataProvider';
import { performance } from 'perf_hooks';

export default class BaseRunner {
  private _menu:TreeDataProvider;

  constructor(menu: TreeDataProvider) {
    this._menu = menu;
  }
  public makeRequest(name: string, url: string, type: string, headers: string, body: string, options: string) {
    const requestModel = new Request(name, url, type, headers, body, options);
    HistoryService.write(requestModel);
    return RequestService.request(requestModel);
  }
  public createRequestPanel(request: Request) {
    const rapPanel = new RequestPanel(request);
    const panel = rapPanel.create();
    panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "request": {
          const { name, url, type, headers, body, options } = message;
          const t1 = performance.now();
          let newRequest: Request; 
          try {
            const result = await this.makeRequest(name, url, type, headers, body, options);
            newRequest = new Request(name, url, type, headers, body, options);
            newRequest.result = result || 'No Content';
          } catch (error) {
            newRequest = new Request(name, url, type, headers, body, options);
            newRequest.error = error.response ? error.response : error;
          } finally {
            newRequest.time = performance.now() - t1;
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