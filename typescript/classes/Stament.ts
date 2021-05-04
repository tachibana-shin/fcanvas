import { CallbackEvent } from "./Emitter";
import Store from "./Store";

class Stament {
  private __store: Store = new Store();

  /**
   * @param {string} name
   * @param {CallbackEvent} callback
   * @return {void}
   */
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
  /**
   * @param {string} name
   * @return {void}
   */
  emit(name: string): void {
    this.__store.$set(this.__store, name, true);
  }
}

export default Stament;
