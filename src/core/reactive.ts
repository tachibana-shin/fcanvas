/* eslint-disable @typescript-eslint/no-explicit-any */
import { warn } from "../helpers/log";
import { throwError } from "../helpers/throw";

// eslint-disable-next-line functional/prefer-readonly-type
type Listeners = Map<
  string,
  // eslint-disable-next-line functional/prefer-readonly-type
  Set<(newVal: any, oldValue: any) => void>
>;
type SetterGetter<T = any> = {
  readonly get: () => T;
  readonly set?: (value: T) => void;
};

export class Ref<T = any> {
  readonly value: T;
  constructor(value: T) {
    this.value = value;
  }
}

export class ComputedRef<T = any> {
  constructor(
    private readonly getter: () => T,
    private readonly setter?: (value: T) => void
  ) {
    this.getter = getter;
    this.setter = setter;
  }

  get value(): T {
    const value = this.getter();

    return value;
  }
  set value(value: T) {
    if (this.setter) {
      this.setter(value);
    } else {
      warn("can't set value because this computed not exists setter");
    }
  }
}
// eslint-disable-next-line @typescript-eslint/ban-types
export type Reactive<T = object> = T;

// eslint-disable-next-line @typescript-eslint/ban-types
const weakCache = new WeakMap<Object, any>();
const listenersCache = new WeakMap<
  Ref | Reactive,
  readonly [Listeners, Listeners]
>();

function toProxy(
  obj: any,
  path: readonly string[] = [],
  rootObj: any,
  isCreateRef: boolean,
  readonly: 0 | 1 | 2, // 0: turn off, 1: shallow readonly, 2: readonly
  shallowReactive: boolean,
  limitWrite = -1
): typeof obj {
  if (isCreateRef) {
    obj = new Ref(obj);
    rootObj = obj;
  }

  if (typeof obj === "function") {
    return obj;
  }
  if (obj === null || typeof obj !== "object") {
    // eslint-disable-next-line functional/no-throw-statement
    throw throwError(`can't reactive value typeof "${typeof obj}"`);
  }

  if (weakCache.has(obj)) {
    return weakCache.get(obj);
  }

  function setter(p: string, value: any, oldValue: any) {
    // call watch
    const listeners = listenersCache.get(weakCache.get(obj));

    const propId = [...path, p.toString()].join(".");

    if (listeners) {
      const [listenersDeep, listenersNoDeep] = listeners;
      // no scan listenersNoDeep because use regular absolute
      listenersNoDeep.get(propId)?.forEach((cb) => {
        cb(value, oldValue);
      });

      listenersDeep.get(propId)?.forEach((cb) => {
        cb(value, oldValue);
      });
      // scan listenersDeep because use regular relative

      listenersDeep.forEach((cbs, key) => {
        // get value;

        const val = weakCache.get(obj);
        const valueByKey =
          key
            .split(".")
            .reduce((prev, prop) => prev[prop], isRef(val) ? val.value : val) ||
          (isRef(val) ? val.value : val);

        if (key === "" || propId.startsWith(`${key}.`)) {
          // call...
          // const value = getValueOfPath(rootValue, key);
          cbs.forEach((cb) => {
            cb(valueByKey, valueByKey);
          });
        }
      });
    }
  }

  const proxy = new Proxy(obj, {
    get(target, p) {
      if (shallowReactive === false && typeof target[p] === "object") {
        return toProxy(
          target[p],
          [...path, p.toString()],
          rootObj,
          false,
          limitWrite === 0 ? 2 : readonly === 1 ? 0 : readonly,
          shallowReactive
        );
      }

      return target[p];
    },
    set(target, p, value) {
      if (limitWrite > -1) {
        if (limitWrite === 0) {
          warn(
            `can't set new value to "${p.toString()}" because limited write`
          );

          return false;
        } else {
          limitWrite--;
        }
      }
      if (isCreateRef && p !== "value") {
        return false;
      }

      if (readonly > 0) {
        // eslint-disable-next-line functional/no-throw-statement
        throw throwError(
          `cant't set prop "${path
            .concat(p.toString())
            .join(".")}" because this is ${
            readonly === 1 ? "shallow " : ""
          }readonly`
        );
      }

      const oldValue = target[p];

      if (oldValue !== value) {
        // eslint-disable-next-line functional/immutable-data
        target[p] = value;
        setter(p.toString(), value, oldValue);
      }

      return true;
    },
    deleteProperty(target, p) {
      if (limitWrite > -1) {
        if (limitWrite === 0) {
          warn(
            `can't set new value to "${p.toString()}" because limited write`
          );

          return false;
        } else {
          limitWrite--;
        }
      }

      try {
        // call watch
        const oldValue = target[p];
        // eslint-disable-next-line functional/immutable-data
        if (delete target[p] === false) {
          // eslint-disable-next-line functional/no-throw-statement
          throw throwError(
            `cant't delete "${path
              .concat(p.toString())
              .join(".")}" because unknown error.`
          );
        }

        if (oldValue !== undefined) {
          setter(p.toString(), undefined, oldValue);
        }
        return true;
      } catch {
        return false;
      }
    },
  });

  weakCache.set(obj, proxy);

  return proxy;
}

function createProxy<T>(
  obj: T,
  isRef = false,
  readonly: 0 | 1 | 2 = 0,
  shallowReactive = false,
  limitWrite = -1
): T {
  const proxy = toProxy(
    obj,
    [],
    obj,
    isRef,
    readonly,
    shallowReactive,
    limitWrite
  );

  return proxy;
}

function isSetterGetter(options: any): options is SetterGetter {
  return typeof options === "object" && "get" in options;
}

export function ref<T = any>(value: T): Ref<T> {
  return createProxy(value, true) as any;
}
export function onewrite<T>(value: T): Ref<T> {
  return createProxy(value, true, 0, false, 1) as any;
}
export function shallowOnewrite<T>(value: T): Ref<T> {
  return createProxy(value, true, 0, true, 1) as any;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function reactive<T = object>(value: T): Reactive<T> {
  return createProxy(value) as any;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function shallowReactive<T = object>(value: T): Reactive<T> {
  return createProxy(value, false, 0, true) as any;
}
export function isRef(value: any): value is Ref {
  return value instanceof Ref;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function readonly<T = object>(value: T): Ref<T> {
  return createProxy(value, false, 2) as any;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function shallowReadonly<T = object>(value: T): Ref<T> {
  return createProxy(value, false, 1) as any;
}
export function watch<T = any>(
  proxy: Ref<T> | Reactive<T>,
  cb: (newValue: T, oldValue: T) => void,
  options?: {
    readonly deep?: boolean;
    readonly immediate?: boolean;
    readonly path?: string;
  }
): () => void {
  if (options?.immediate) {
    // get val
    if (isRef(proxy)) {
      cb(proxy.value, proxy.value);
    } else {
      cb(proxy, proxy);
    }
  }

  // save to cache
  if (listenersCache.has(proxy as any) === false) {
    listenersCache.set(proxy as any, [new Map(), new Map()]);
  }

  const listeners = listenersCache.get(proxy as any);

  if (listeners) {
    if (options?.deep) {
      const id = options?.path || "";
      // add to listenersDeep

      if (listeners[0].has(id) === false) {
        listeners[0].set(id, new Set());
      }

      listeners[0].get(id)?.add(cb);
      return () => listeners[0].get(id)?.delete(cb);
    }

    const id = [
      ...(isRef(proxy) ? ["value"] : []),
      ...(options?.path ? [options.path] : []),
    ].join(".");

    if (id !== "") {
      if (listeners[1].has(id) === false) {
        listeners[1].set(id, new Set());
      }

      listeners[1].get(id)?.add(cb);
      return () => listeners[1].get(id)?.delete(cb);
    }
  }

  // eslint-disable-next-line functional/no-throw-statement
  throw throwError("value not is proxy ref");
}
export function computed<T = any>(
  options: SetterGetter["get"] | SetterGetter
): ComputedRef<T> {
  if (isSetterGetter(options)) {
    return new ComputedRef(options.get, options.set);
  }

  return new ComputedRef(options);
}
