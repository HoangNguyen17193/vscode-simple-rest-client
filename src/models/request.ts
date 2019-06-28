import { throws } from "assert";

export default class Request {
  private _name: string;
  private _url: string;
  private _type: string;
  private _headers: string;
  private _body: string;
  private _form: string;
  private _result: any;
  private _error: any;
  constructor(name:string, url: string, type: string, headers: string, body: string, form: string) {
    this._name = name;
    this._url = url;
    this._type = type || 'GET';
    this._headers = headers;
    this._body = body;
    this._form = form;
  }

  get name() {
    return this._name;
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
  
  public serialize() {
    return {
      name: this._name,
      url: this._url,
      type: this._type,
      headers: this._headers,
      body: this._body,
      form: this._form
    };
  }
} 