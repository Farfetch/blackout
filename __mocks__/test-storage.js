// Dummy storage to be used only in tests that
// need to call analytics.setStorage
export default class TestStorage {
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
