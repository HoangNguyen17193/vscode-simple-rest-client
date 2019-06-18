import Request from '../models/request';
import RequestService from '../services/request';

export default class BaseRunner {
  public makeRequest(url: string, type: string, headers:string, body:string, form:string) {
    const requestModel = new Request(url, type, headers, body, form);
    return RequestService.request(requestModel);
  }
}