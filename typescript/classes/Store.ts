import { Object } from "../types";
import Emitter, { CallbackEvent } from "./Emitter";

interface ValueType extends Object {
  __reactive?: boolean;
  __store?: Object;
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
      /// bind to propertyes
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
            return value.__store?.[key];
          },
          enumerable: true,
          set(newValue: any): void {
            const old = value.__store?.[key];

            if (value.__store) {
              value.__store[key] = newValue;
            }
            reactiveDefine(newValue, callback, [...parent, key]);
            callback([...parent, key], old, newValue);
          },
        });
        reactiveDefine(value[key], callback, [...parent, key]);
      }
    }
  }
}

class Store {
  [propName: string]: any;
  private __emitter: Emitter = new Emitter();
  /**
   * @param {Object} store?
   * @return {any}
   */
  constructor(store?: Object) {
    for (const key in store) {
      this[key] = store[key];
    }
    reactiveDefine(this, (paths: string[], oldVal: any, newVal: any): void => {
      this.__emitter.emit(paths.join("."), oldVal, newVal);
    });
  }

  /**
   * @param {Store|Object} object
   * @param {string} key
   * @param {any} value
   * @return {void}
   */
  $set(object: Store | Object, key: string, value: any): void {
    object[key] = value;
    reactiveDefine(
      object,
      (paths: string[], oldVal: any, newVal: any): void => {
        this.__emitter.emit(paths.join("."), oldVal, newVal);
      }
    );
    object[key] = value;
  }
  /**
   * @param {string} key
   * @param {CallbackEvent} callback
   * @return {any}
   */
  $watch(key: string, callback: CallbackEvent) {
    return this.__emitter.on(key, callback);
  }
}

export default Store;
