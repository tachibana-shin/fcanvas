import { createStore } from "./Store";

class Stament<
  States extends {
    readonly [name: string]: boolean;
  }
> {
  private readonly store;
  constructor(obj: States) {
    this.store = createStore<States>(obj);
  }

  on(name: keyof States, callback: () => void): void {
    if (this.store.value[name]) {
      callback();
    } else {
      const watcher = this.store.watch(name as string, () => {
        callback();
        watcher();
      });
    }
  }
  emit(name: keyof States): void {
    (this.store.value[name] as boolean) = true;
  }
}

export default Stament;
