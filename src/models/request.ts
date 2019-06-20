import { throws } from "assert";

export default class Request {
  private _url: string;
  private _type: string;
  private _headers: string;
  private _body: string;
  private _form: string;
  private _result: any;
  private _error: any;
  constructor(url: string, type: string, headers: string, body: string, form: string) {
    this._url = url;
    this._type = type || 'GET';
    this._headers = headers;
    this._body = body;
    this._form = form;
  }
  get url() {
    return this._url;
  }

  get type() {
    return this._type;
  }

  get headers() {
    return this._headers;
  }

  get body() {
    return this._body;
  }

  get form() {
    return this._form;
  }

  get result() {
    return this._result;
  }

  set result(result: any) {
    this._result = result;
  }

  get error(){
    return this._error;
  }

  set error(error) {
    this._error = error;
  }
  
} 