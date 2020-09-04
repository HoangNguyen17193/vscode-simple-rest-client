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
  private _options: string;
  private _time: any;
  constructor(name:string, url: string, type: string, headers: string, body: string, options: string) {
    this._name = name;
    this._url = url;
    this._type = type || 'GET';
    this._headers = headers;
    this._body = body;
     this._options = options;
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

  get result() {
    return this._result;
  }

  get options() {
    return this._options;
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

  get time() {
    return this._time;
  }

  set time(time) {
    this._time = time;
  }
  
  public serialize() {
    return {
      name: this._name,
      url: this._url,
      type: this._type,
      headers: this._headers,
      body: this._body,
      options: this._options
    };
  }
} 