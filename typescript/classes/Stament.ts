import { CallbackEvent } from "./Emitter";
import Store from "./Store";

class Stament {
  private __store: Store = new Store();

  on(name: string, callback: CallbackEvent): void {
    if (this.__store[name]) {
      callback();
    } else {
      const watcher = this.__store.$watch(name, () => {
        callback();
        watcher();
      });
    }
  }
  emit(name: string) {
    this.__store.$set(this.__store, name, true);
  }
}

export default Stament