import Request from '../models/request';
import RequestService from '../services/request';
import HistoryService from '../services/history';
import RequestPanel from '../views/requestPanel/RequestPanel';

export default class BaseRunner {
  public makeRequest(name:string, url: string, type: string, headers:string, body:string, form:string) {
    const requestModel = new Request(name, url, type, headers, body, form);
    HistoryService.write(requestModel);
    return RequestService.request(requestModel);
  }

  public createRequestPanel(request: Request) {
    const rapPanel = new RequestPanel(request);
    const panel = rapPanel.create();
    panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "request": {
          const { name, url, type, headers, body, form } = message;
          try {
            const result = await this.makeRequest(name, url, type, headers, body, form);
            const newRequest = new Request(name, url, type, headers, body, form);
            newRequest.result = result || 'No Content';
            rapPanel.reload(newRequest);
          } catch (error) {
            const newRequest = new Request(name, url, type, headers, body, form);
            newRequest.error = error.response ? error.response : error;
            rapPanel.reload(newRequest);
          }
        }
      }
    });
  }
}