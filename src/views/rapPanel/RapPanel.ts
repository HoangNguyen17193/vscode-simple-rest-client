import * as vscode from 'vscode';
import Request from '../../models/request';
import RequestService from '../../services/request';

export default class RapPanel {
  result = JSON.stringify({
      id: 8652,
      status: 1,
      expiration_date: "May 8th 2019, 7:43 am",
      created_at: "2019-05-27T09:00:45.890Z",
      updated_at: "2019-05-27T14:00:06.733Z",
      active: true,
      send_expiration_mail: true,
      send_expiration_reminder_mail: true,
      user_id: 1
  }, null, 4).trim();

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
                <div class="block">
                  <label class="input-label">Method</label> <br/><br/>
                  <input class="input request-method" id="request-method" type="text" width="200px"/> 
                </div>
                <div class="block">
                  <label class="input-label">URL</label> <br/><br/>
                  <input class="input request-url" id="request-url" type="text" width="500px"/>
                </div>
                <div class="block">
                  <label class="input-label">Headers</label> <br/><br/>
                  <textarea class="input request-headers" id="request-headers" type="text" col=3>
                  </textarea
                </div>
                <div class="block">
                  <label class="input-label">Body</label> <br/><br/>
                  <textarea class="input request-body" id="request-body" type="text" col=3>
                  </textarea
                </div>
                <div class="footer">
                  <button class="btn btn-signin" id="btn-signin" onclick="send()">Sign in</button>
                  <button class="btn btn-signin" id="btn-reload" onclick="reload()">reload</button>
                </div>
                <pre>
                  <code id="result">${result}</code>
                </pre>
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
                padding-left: 20px;
              }
              .block {
                margin-bottom: 20px;
              }
              .input {
                background-color: rgba(194,199,203,0.2); 
                border-radius: 24px; 
                height: 38px; 
                width: 500px; 
                border:none; 
                font-size: 16px;
                padding-left: 20px
              }
              input:focus
                border:none;
              }
              .input-label {
                font-size: 14px;
                display: inline;
                margin-bottom 10px;
                color: #98A5B3;
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
              .btn-signin {
                background-color: #00A9FF;
                color: #FFFFFF;
              }
              .btn-signup {
                background-color: #E6E6E6;
                color: #98A5B3;
                margin-left: 15px;
              }
              .signup-link {
                color: #00A9FF;
                font-size: 14px;
                font-weight: 500;
                margin-left: 15px;
                text-decoration: none;
              }
              body.vscode-light .username, body.vscode-light .password {
                color: #616466;
              }
              body.vscode-dark .username, body.vscode-dark .password {
                color: #C2C7CC;
              }
            </style>
          </html>`;
  }
}