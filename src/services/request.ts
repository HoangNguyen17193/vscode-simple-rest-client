import * as vscode from "vscode";
import RequestModel from '../models/request';
import { isBlank } from '../utils/index';

const request = require("request-promise");

export default class Request {
  static request(requestModel:RequestModel) {
    try {

     const options: any = {
       method: requestModel.type,
       uri: requestModel.url
     };
     if (!isBlank(requestModel.body)) {
       options.body = JSON.stringify(JSON.parse(requestModel.body));
     }
     if (!isBlank(requestModel.headers)) {
       options.headers = JSON.parse(requestModel.headers);
     }
     return request(options);
    }catch(error) {
      console.log(error);
      return Promise.reject("Invalid JSON format");
    }
  }
}