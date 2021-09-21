/* eslint-disable @typescript-eslint/no-explicit-any */
import mitt from "mitt";

type ValueType = {
  readonly [propName: string]: any;
} & {
  readonly __reactive?: boolean;
  // eslint-disable-next-line functional/prefer-readonly-type
  __store?: {
    // eslint-disable-next-line functional/prefer-readonly-type
    [propName: string]: any;
  };
};

function reactiveDefine(
  value: ValueType | null,
  callback: {
    (path: readonly string[], oldValue: any, newValue: any): void;
  },
  parent: ReadonlyArray<string> = []
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

            // eslint-disable-next-line functional/immutable-data
            Object.defineProperty(value, name, {
              writable: false,
              enumerable: false,
              configurable: true,
              value() {
                // eslint-disable-next-line functional/functional-parameters, prefer-rest-params
                const newValue = proto.apply(this, arguments);

                callback([...parent], this, newValue);

                return newValue;
              },
            });
          }
        );

        // eslint-disable-next-line functional/immutable-data
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
        // eslint-disable-next-line functional/immutable-data
        Object.defineProperty(value, "__store", {
          writable: true,
          enumerable: false,
          configurable: true,
          value: { ...value },
        });
        // eslint-disable-next-line functional/immutable-data
        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true,
        });
      } else {
        // eslint-disable-next-line functional/immutable-data
        value.__store = { ...value };
      }

      // eslint-disable-next-line functional/no-loop-statement
      for (const key in value) {
        // eslint-disable-next-line functional/immutable-data
        Object.defineProperty(value, key, {
          get(): any {
            return value.__store?.[key as string];
          },
          enumerable: true,
          set(newValue: any): void {
            const old = value.__store?.[key as string];

            if (value.__store) {
              // eslint-disable-next-line functional/immutable-data
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
    readonly [propName: string]: any;
  }
> {
  readonly [propName: string]: any;
  private readonly __emitter = mitt<{
    readonly [key: string]: readonly [any, any];
  }>();
  constructor(store: State) {
    // eslint-disable-next-line functional/no-loop-statement
    for (const key in store) {
      (this as any)[key] = store[key];
    }
    reactiveDefine(
      this,
      (paths: readonly string[], oldVal: any, newVal: any): void => {
        this.__emitter.emit(paths.join("."), [oldVal, newVal]);
      }
    );
  }

  $set(object: Store<State> | State, key: string, value: any): void {
    if (!(key in object)) {
      //reactive
      // eslint-disable-next-line functional/immutable-data
      (object as any)[key] = undefined;
      reactiveDefine(
        object,
        (paths: readonly string[], oldVal: any, newVal: any): void => {
          this.__emitter.emit(paths.join("."), [oldVal, newVal]);
        }
      );
    }

    // eslint-disable-next-line functional/immutable-data
    (object as any)[key] = value;
  }
  $watch(key: string, callback: (oldValue: any, newValue: any) => void) {
    const handler = ([oldValue, newValue]: readonly [any, any]) =>
      callback(newValue, oldValue);
    this.__emitter.on(key, handler);

    return () => this.__emitter.off(key, handler);
  }
}

export default Store;
