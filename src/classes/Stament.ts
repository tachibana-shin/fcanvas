import Store from "./Store";

class Stament {
  private readonly __store = new Store({});

  on(name: string, callback: () => void): void {
    if (this.__store[name]) {
      callback();
    } else {
      const watcher = this.__store.$watch(name, () => {
        callback();
        watcher();
      });
    }
  }
  emit(name: string): void {
    this.__store.$set(this.__store, name, true);
  }
}

export default Stament;
