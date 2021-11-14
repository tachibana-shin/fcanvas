import { reactive, watch } from "../core/reactive";

export class OneTimeEvent<
  States extends {
    readonly [name: string]: boolean;
  }
> {
  private readonly store;
  constructor(obj: States) {
    this.store = reactive(obj)
  }

  on(name: keyof States, callback: () => void): void {
    if (this.store[name]) {
      callback();
    } else {
      const watcher = watch(this.store, () => {
        callback();
        watcher();
      }, {
        path: name
      });
    }
  }
  emit(name: keyof States): void {
    (this.store[name] as boolean) = true;
  }
}

export function createOneTimeEvent<
  States extends {
    readonly [name: string]: boolean;
  }
>(states: States): OneTimeEvent<States> {
  return new OneTimeEvent(states);
}
