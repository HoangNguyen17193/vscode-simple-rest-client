import * as vscode from 'vscode';
import Request from '../models/request';
import StorageService from '../services/storage';

const path = require('path');
const fs = require('fs');

const historyPathFile = path.join(vscode.extensions.getExtension('Tino.simple-rest-client').extensionPath, 'history.json');

export default class History {
  static getAll() {
    if(!fs.existsSync(historyPathFile)) {
      return [];
    }
    return StorageService.getData(historyPathFile);
  }
  static write(request: Request) {
    const history = this.getAll() || [];
    history.unshift(request.serialize());
    return StorageService.write(historyPathFile, history);
  }
}
