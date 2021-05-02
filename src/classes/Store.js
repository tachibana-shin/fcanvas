import Emitter from "./Emitter.js";

function reactiveDefine(value, callback, parent = []) {
  if (value !== null && typeof value === "object") {
    /// reactive children
    if (Array.isArray(value)) {
      /// bind to propertyes
      /// reactive method array
      if (!value.__reactive) {
        ["push", "pop", "shift", "unshift", "splice"].forEach((name) => {
          const proto = value[name];

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
        });

        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true,
        });
      }
      ////
      value.forEach((item, index) => {
        if (item !== null && typeof item === "object") {
          reactiveDefine(item, callback, [...parent, index]);
        }
      });
    } else {
      //// if object ===> reactive attribute
      /// create __store if not exists
      /// reactive social
      if (!value.__reactive) {
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
          get() {
            return value.__store[key];
          },
          enumerable: true,
          set(newValue) {
            const old = value.__store[key];
            value.__store[key] = newValue;
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
  __emitter = new Emitter();
  constructor(store = {}) {
    for (const key in store) {
      this[key] = store[key];
    }
    reactiveDefine(this, (paths, oldVal, newVal) => {
      this.__emitter.emit(paths.join("."), oldVal, newVal);
    });
  }

  $set(object, key, value) {
    object[key] = value;
    reactiveDefine(object, (paths, oldVal, newVal) => {
      this.__emitter.emit(paths.join("."), oldVal, newVal);
    });
    object[key] = value;
  }
  $watch(key, callback) {
    return this.__emitter.on(key, callback);
  }
}

export default Store;
