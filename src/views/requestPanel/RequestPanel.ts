import * as vscode from 'vscode';
import Request from '../../models/request';
import { isBlank } from '../../utils';

export default class RapPanel {
  private _request: Request;
  private panel: vscode.WebviewPanel;

  constructor(request: Request) {
    this._request = request;
  }

  set request(request: Request) {
    this._request = request;
  }

  get request() {
    return this._request;
  }

  public reload(request: Request) {
    this._request = request;
    this.updateContent();
  }

  public create() {
    const panel = vscode.window.createWebviewPanel("RequestPanel", "New Request", vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    );
    this.panel = panel;
    this.updateContent();
    return panel;
  }

  private updateContent() {
    if(this.panel) {
      this.panel.webview.html = this.getWebviewContent();
    }
  }

  private escapeHtml(unsafe) {
    if(!unsafe) {
      return '';
    }
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  private getWebviewContent() {
    const result = this.beautifyJSON(this._request.result);
    const error = this.beautifyJSON(this._request.error);
    const options = this.beautifyJSON(this._request.options);
    return `<!DOCTYPE html>
          <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Request Panel</title>
            </head>
            <body>
              <form class="container" onsubmit="send()">
                <div class="row">
                  <div class="col">
                    <div class="input-label">Name</div>
                    <input placeholder="Request Name in Extension's Histrory" value="${this._request.name}" class="input request-name" id="request-name" type="text"/>
                  </div>
                  <div class="col">
                    <div class="input-label">URL*</div>
                    <input placeholder="URL string" required value="${this._request.url}" class="input request-url" id="request-url" type="text"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="input-label">Headers</div>
                    <textarea placeholder="Headers as JSON" class="input-area request-headers" id="request-headers" type="text" rows="4">${this._request.headers}</textarea>
                  </div>
                  <div class="col">
                    <div class="input-label">Method*</div>
                    <input placeholder="HTTP method" required value="${this._request.type}" class="input request-method" id="request-method" type="text" /> 
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="input-label">Options</div>
                    <textarea placeholder="Request Promise Library Options as JSON" class="input-area request-headers" id="request-options" type="text" rows="4">${options}</textarea>
                  </div>
                  <div class="col">
                    <div class="input-label">Body</div>
                    <textarea placeholder="Request Body" class="input-area request-body" id="request-body" type="text" rows="4">${this._request.body}</textarea>
                  </div>
                </div>
                <div class="footer">
                  <button type="submit" class="btn btn-request">Send</button>
                  <button onclick="copyResult()" class="btn btn-copy ${this.isHideCopyButton() ? 'hide' : ''}">Copy</button>
                  ${this._request.time ? '&nbsp;&nbsp;Time: ' + this._request.time +  'ms' : '' } 
                </div>
                <div class="row">
                  <pre><code id="result" class="${result ? 'result' : 'error'}">${result ? this.escapeHtml(result) : error}</code></pre>
                </div>
              </div>
                <script>
                  const vscode = acquireVsCodeApi();
                  (function init() {
                    document.vscode = vscode;
                  })();
                </script>
                <script>
                  function send() {
                    const name = document.getElementById('request-name').value;
                    const method = document.getElementById('request-method').value;
                    const url = document.getElementById('request-url').value;
                    const body = document.getElementById('request-body').value;
                    const headers = document.getElementById('request-headers').value;
                    const options = document.getElementById('request-options').value;
                    document.vscode.postMessage({command: 'request', name, url, type: method, headers, body, options});
                  }
                  function copyResult() {
                     const result = document.getElementById('result').innerText;
                     document.vscode.postMessage({command: 'copy', text: result});
                  }
                </script>
            </body>
            <style>
              .container {
                padding: 20px;
              }
              .row {
                display: flex;
                flex-wrap: wrap;
              }
              .col {
                margin-bottom: 20px;
                float: left;
              }
              .col {
                flex-basis: 0;
                -ms-flex-positive: 1;
                flex-grow: 1;
                max-width: 100%;
              }
              .input {
                background-color: rgba(194,199,203,0.2); 
                border-radius: 24px; 
                height: 38px; 
                border:none; 
                font-size: 16px;
                padding-left: 20px
              }
              .request-method {
                width: 200px; 
              }
              .request-url {
                width: 400px;
              }
              .request-name {
                width: 400px;
              }
              .input:focus {
                border:none;
              }
              .input-area {
                background-color: rgba(194,199,203,0.2);
                border-radius: 24px;
                border:none; 
                font-size: 16px;
                padding-left: 20px;
                width: 400px;
                margin-top: 10x;
              }
              .input-label {
                font-size: 14px;
                color: #98A5B3;
                display: inline-block;
                margin-bottom: .5rem;
                width: 100%;
                font-weight: 500;
              }
              .btn {
                box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
                border-radius: 20px;
                width: 120px;
                height: 40px;
                font-size: 14px;
                font-weight: 500;
                border:none;
                cursor: pointer
              }
              .footer {
                margin-top: 20px;
              }
              .btn-request {
                color: #FFFFFF;
                box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
                width: 150px;
                background-size: 300% 100%;
                transition: all .4s ease-in-out;
                background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
                box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
              }
              .btn-request:hover {
                background-position: 100% 0;
                transition: all .4s ease-in-out;
              }
              pre {
                background-color: rgba(194,199,203,0.2);
                font-size: 14px;
                position: relative;
              }
              .btn-copy {
                margin-top:20px;
                margin-left: 20px;
                width: 70px;
                height: 30px;
                font-size: 12px;
              }
              .hide {
               display: none;
              }
             
              body.vscode-light .input, body.vscode-light .input-area  {
                color: #616466;
              }
               body.vscode-light pre>code {
                color: #616466;
              }
              body.vscode-dark .input, body.vscode-dark .input-area {
                color: #C2C7CC;
              }
              body.vscode-dark pre>code {
                color: #ffffff;
              }
            </style>
          </html>`;
  }

  private beautifyJSON(jsonString) {
    if (isBlank(jsonString)) {
      return '';
    }
    try {
      const jsonResult = JSON.parse(jsonString.toString());
      return JSON.stringify(jsonResult, null, 4);
    } catch(error) {
      return jsonString;
    }
  }

  private isHideCopyButton() {
    const result = !this.request.result && !this.request.error;
    return result;
  }
}