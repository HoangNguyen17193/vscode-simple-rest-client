import * as vscode from 'vscode';
import Request from '../models/request';
import StorageService from '../services/storage';

const path = require('path');
const fs = require('fs');
const homedir = require("homedir");

const historyPathFile = path.join(homedir(), "SRC-history.json");

export default class History {
  static getAll() {
    if(!fs.existsSync(historyPathFile)) {
      return [];
    }
    return StorageService.getData(historyPathFile);
  }
  static write(request: Request) {
    const maxStored = vscode.workspace.getConfiguration('history').get('maxStored', 50);
    let history = this.getAll() || [];
    history.unshift(request.serialize());
    if(history.length > maxStored) {
      history = history.slice(0, maxStored);
    }
    return StorageService.write(historyPathFile, history);
  }
}
