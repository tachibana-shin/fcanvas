import Emitter, { CallbackEvent } from "./Emitter";

interface ValueType {
  __reactive?: boolean;
  __store?: {
    [propName: string]: any;
  };
  [propName: string]: any;
}

function reactiveDefine(
  value: ValueType | null,
  callback: {
    (path: string[], oldValue: any, newValue: any): void;
  },
  parent: Array<string> = []
) {
  if (value !== null && typeof value === "object") {
    /// reactive children
    if (Array.isArray(value)) {
      /// bind to properties
      /// reactive method array
      if (!(value as ValueType).__reactive) {
        ["push", "pop", "shift", "unshift", "splice"].forEach(
          (name: string): void => {
            const proto = value[name as any];

            Object.defineProperty(value, name, {
              writable: false,
              enumerable: false,
              configurable: true,
              value() {
                const newValue = proto.apply(this, arguments);

                callback([...parent], this, newValue);

                return newValue;
              },
            });
          }
        );

        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true,
        });
      }
      ////
      value.forEach((item: any, index) => {
        if (item !== null && typeof item === "object") {
          reactiveDefine(item, callback, [...parent, index + ""]);
        }
      });
    } else {
      //// if object ===> reactive attribute
      /// create __store if not exists
      /// reactive social
      if (!(value as ValueType).__reactive) {
        Object.defineProperty(value, "__store", {
          writable: true,
          enumerable: false,
          configurable: true,
          value: { ...value },
        });
        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true,
        });
      } else {
        value.__store = { ...value };
      }

      for (const key in value) {
        Object.defineProperty(value, key, {
          get(): any {
            return value.__store?.[key as string];
          },
          enumerable: true,
          set(newValue: any): void {
            const old = value.__store?.[key as string];

            if (value.__store) {
              value.__store[key as string] = newValue;
            }

            if (newValue !== old) {
              reactiveDefine(newValue, callback, [...parent, key]);
              callback([...parent, key], old, newValue);
            }
          },
        });
        reactiveDefine(value[key as string], callback, [...parent, key]);
      }
    }
  }
}

class Store<
  State extends {
    [propName: string]: any;
  }
> {
  [propName: string]: any;
  private __emitter: Emitter = new Emitter();
  constructor(store: State) {
    for (const key in store) {
      (this as any)[key] = store[key];
    }
    reactiveDefine(this, (paths: string[], oldVal: any, newVal: any): void => {
      this.__emitter.emit(paths.join("."), oldVal, newVal);
    });
  }

  $set(object: Store<State> | State, key: string, value: any): void {
    if (!(key in object)) {
      //reactive
      (object as any)[key] = undefined;
      reactiveDefine(
        object,
        (paths: string[], oldVal: any, newVal: any): void => {
          this.__emitter.emit(paths.join("."), oldVal, newVal);
        }
      );
    }

    (object as any)[key] = value;
  }
  $watch(key: string, callback: CallbackEvent) {
    return this.__emitter.on(key, callback);
  }
}

export default Store;
