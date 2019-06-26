import Request from '../models/request';
import RequestService from '../services/request';
import HistoryService from '../services/history';

export default class BaseRunner {
  public makeRequest(url: string, type: string, headers:string, body:string, form:string) {
    const requestModel = new Request(url, type, headers, body, form);
    HistoryService.write(requestModel);
    return RequestService.request(requestModel);
  }
}