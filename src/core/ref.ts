/* eslint-disable @typescript-eslint/no-explicit-any */
import { throwError } from "../helpers/throw";

// eslint-disable-next-line functional/prefer-readonly-type
type Listeners = Map <
  string,
  // eslint-disable-next-line functional/prefer-readonly-type
  Set < (newVal: any, oldValue: any) => void >
  >
;
export class Ref < T = any > {
  // eslint-disable-next-line functional/prefer-readonly-type
  readonly value: T;
  constructor(value: T) {
    this.value = value;
  }
}

export class ComputedRef < T=any > {
  
  constructor(private getter: () => T, private setter?:(value: T) => void) {
    this.getter = getter
    this.setter = setter
  }
  }

  get value(): T {
    const value = this.getter()
    
    return value
  }
  set value(value: T): void {
    if (this.setter) {
      this.setter(value)
    } else {
      warn(`can't set value because this computed not exists setter`)
    }
  }
}
// eslint-disable-next-line @typescript-eslint/ban-types
export type Reactive < T = object > = T;

// eslint-disable-next-line @typescript-eslint/ban-types
const weakCache = new WeakMap < Object,
  any > ();
const listenersCache = new WeakMap <
  Ref | Reactive ,
  readonly[Listeners, Listeners] >
  ();

function toProxy(
  obj: any,
  path: readonly string[] = [],
  rootObj: any,
  isCreateRef: boolean,
  readonly: boolean,
  shallow: boolean
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
      if (typeof target[p] === "object") {
        return toProxy(
          target[p],
          [...path, p.toString()],
          rootObj,
          false,
          readonly && !shallow,
          shallow
        );
      }

      return target[p];
    },
    set(target, p, value) {
      if (isCreateRef && p !== "value") {
        return false;
      }

      if (readonly) {
        // eslint-disable-next-line functional/no-throw-statement
        throw throwError(
          `cant't set prop "${path
            .concat(p.toString())
            .join(".")}" because this is ${shallow ? "shallow " : ""}readonly`
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

if ( oldValue !== undefined ) {
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

function createProxy < T > (
  obj: T,
  isRef = false,
  readonly = false,
  shallow = false
): T {
  const proxy = toProxy(obj, [], obj, isRef, readonly, shallow);

  return proxy;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function ref < T = object > (value: T): Ref < T > {
  return createProxy(value, true) as any;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function reactive < T = object > (value: T): Reactive < T > {
  return createProxy(value) as any;
}
export function isRef(value: any): value is Ref {
  return value instanceof Ref;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function readonly < T = object > (value: T): Ref < T > {
  return createProxy(value, false, true) as any;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function shallowReadonly < T = object > (value: T): Ref < T > {
  return createProxy(value, false, true, true) as any;
}
export function watch < T = any > (
  proxy: Ref < T > | Reactive < T > ,
  cb: (newValue: T, oldValue: T) => void,
  options?:{
    readonly deep?:boolean;
    readonly immediate?:boolean;
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
      // add to listenersDeep

      if (listeners[0].has("") === false) {
        listeners[0].set("", new Set());
      }

      listeners[0].get("")?.add(cb);
      return () => listeners[0].get("")?.delete(cb);
    }
    if (isRef(proxy)) {
      if (listeners[1].has("value") === false) {
        listeners[1].set("value", new Set());
      }

      listeners[1].get("value")?.add(cb);
      return () => listeners[1].get("value")?.delete(cb);
    } else {
      return () => void 0;
    }
  }

  // eslint-disable-next-line functional/no-throw-statement
  throw throwError("value not is proxy ref");
}

type SetterGetter = {
  get: () => T,
  set?:(value: T) => void
}

function isSetterGetter(options: any): options is SetterGetter {
  return typeof options === "object" && ("get" in options)
}
export function computed < T = any> (options: SetterGetter["get"] | SetterGetter): ComputedRef < T > {
  if (isComputedOptions(options) === false) {
    options = {
      get: options
    }
  }

  return new ComputedRef(options.get, options.set)
}