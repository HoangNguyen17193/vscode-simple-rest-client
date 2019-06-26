const fs = require("fs");

export default class {
  static write(path: string, data: any) {
    return fs.writeFileSync(path, JSON.stringify(data), "utf8");
  }
  static getData(path: string) {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  }
}