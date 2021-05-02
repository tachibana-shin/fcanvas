import Store from "./Store.js";

class Stament {
  __store = new Store();

  on(name, callback) {
    if (this.__store[name]) {
      callback();
    } else {
      const watcher = this.__store.$watch(name, () => {
        callback();
        watcher();
      });
    }
  }
  emit(name) {
    this.__store.$set(this.__store, name, true);
  }
}

export default Stament