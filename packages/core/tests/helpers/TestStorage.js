export default class {
  items = {};

  getItem(key) {
    return this.items[key];
  }

  setItem(key, data) {
    this.items[key] = data;
  }

  removeItem(key) {
    delete this.items[key];
  }

  clear() {
    this.items = {};
  }
}
