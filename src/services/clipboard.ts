const clipboardy = require("clipboardy");

export default class {
  static copy(text) {
    return clipboardy.writeSync(text);
  }
}