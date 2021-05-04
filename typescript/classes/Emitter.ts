export interface CallbackEvent {
  (...args: any[]): void;
}

export default class Emitter {
  private __events: {
    [name: string]: Array<CallbackEvent>;
  } = {};
  on(
    name: string,
    callback: { (): void }
  ): {
    (): void;
  } {
    if (typeof callback === "function") {
      if (name in this.__events) {
        this.__events[name].push(callback);
      } else {
        this.__events[name] = [callback];
      }
    }

    return () => {
      this.off(name, callback);
    };
  }
  off(name: string, callback?: CallbackEvent): void {
    if (typeof callback === "function") {
      this.__events[name] = this.__events[name].filter(
        (item) => item !== callback
      );

      if (this.__events[name].length === 0) {
        delete this.__events[name];
      }
    } else {
      delete this.__events[name];
    }
  }
  emit(name: string, ...payload: any[]): void {
    if (name in this.__events) {
      for (
        let index: number = this.__events[name].length - 1;
        index > -1;
        index--
      ) {
        this.__events[name][index](...payload);
      }
    }
  }
  once(name: string, callback: CallbackEvent): void {
    const handler = (...args: any[]) => {
      callback(...args);
      this.off(name, handler);
    };

    this.on(name, handler);
  }
}
