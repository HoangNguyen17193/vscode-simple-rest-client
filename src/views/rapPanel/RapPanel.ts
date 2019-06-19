import * as vscode from 'vscode';
import Request from '../../models/request';
import RequestService from '../../services/request';

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
        enableScripts: true
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

  private getWebviewContent() {
    const result = this._request.result ? JSON.stringify(JSON.parse(this._request.result.toString()), null, 2): '';
    return `<!DOCTYPE html>
          <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Signin</title>
            </head>
            <body>
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div class="input-label">URL*</div>
                    <input class="input request-url" id="request-url" type="text"/>
                  </div>
                  <div class="col">
                    <div class="input-label">Method*</div>
                    <input class="input request-method" id="request-method" type="text" /> 
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="input-label">Headers</div>
                    <textarea class="input-area request-headers" id="request-headers" type="text" rows="5"></textarea>
                  </div>
                  <div class="col">
                    <div class="input-label">Body</div>
                    <textarea class="input-area request-body" id="request-body" type="text" rows="5"></textarea>
                  </div>
                </div>
                <div class="footer">
                  <button class="btn btn-request" onclick="send()">Send</button>
                </div>
                <div class="row">
                  <pre><code id="result">${result}</code></pre>
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
                    const method = document.getElementById('request-method').value;
                    const url = document.getElementById('request-url').value;
                    const body = document.getElementById('request-body').value;
                    const headers = document.getElementById('request-headers').value;
                    //document.getElementById('result').innerHTML = url;
                    document.vscode.postMessage({command: 'request',url: url, type: method, headers: headers, body: body});
                  }
                  function reload() {
                     document.vscode.postMessage({command: 'reload'});
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
                background: linear-gradient(45deg, #3949ab, #4fc3f7);
                color: #FFFFFF;
                box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
                width: 150px;
              }
              pre {
                background-color: #3F4041; 
                font-size: 14px;
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
}