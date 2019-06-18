const request = require('request-promise');
import RequestModel from '../models/request';
import { isBlank } from '../utils/index';

export default class Request {
  static request(requestModel:RequestModel) {
    try {

     const options = {
       method: requestModel.type,
       uri: requestModel.url
     };
    // TODO: handle headers, body
    //  if (isBlank(requestModel.body)) {
    //    options.body = JSON.parse(requestModel.body);
    //  }
    //  if (isBlank(requestModel.headers)) {
    //    options.headers = JSON.parse(requestModel.headers);
    //  }
     return request(options);
    }catch(error) {
      console.log(error);
    }
  }
}