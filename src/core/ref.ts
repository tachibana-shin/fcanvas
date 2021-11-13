/* eslint-disable @typescript-eslint/no-explicit-any */
import { throwError } from "../helpers/throw";

// eslint-disable-next-line functional/prefer-readonly-type
type Listeners = Map<
  string,
  // eslint-disable-next-line functional/prefer-readonly-type
  ((newVal: any, oldValue: any) => void)[]
>;
// eslint-disable-next-line @typescript-eslint/ban-types
const weakCache = new WeakMap<Object, any>();
const listenersCache = new WeakMap<
  typeof Proxy,
  readonly [Listeners, Listeners]
>();

function mergeListeners(
  listenerRoot: Listeners,
  // eslint-disable-next-line functional/functional-parameters
  ...listListeners: readonly Listeners[]
): Listeners {
  listListeners.forEach((listeners) => {
    // merge
    listeners.forEach((cbs, key) => {
      if (listenerRoot.has(key)) {
        // eslint-disable-next-line functional/immutable-data
        listenerRoot.get(key)?.push(...cbs);
      } else {
        listenerRoot.set(key, cbs);
      }
    });
  });

  return listenerRoot;
}
function getValueOfPath(rootValue: any, path: string): any {
  return path.split(".").reduce((prev, prop) => {
    return prev[prop];
  }, rootValue);
}

function toProxy(
  obj: any,
  path: readonly string[] = [],
  [listenersDeep, listenersNoDeep]: readonly [Listeners, Listeners],
  rootValue: any,
  readonly: boolean,
  shallow: boolean
): typeof obj {
  if ( typeof obj !== "function" ) {
    return obj
  }
  if (obj === null || (typeof obj !== "object")) {
    // eslint-disable-next-line functional/no-throw-statement
    throw throwError(`can't reactive value typeof "${typeof obj}"`);
  }

  if (weakCache.has(obj)) {
    return weakCache.get(obj);
  }

  function setter(p: string, value: any, oldValue: any) {
    // call watch

    const propId = [...path, p.toString()].join(".");
    // no scan listenersNoDeep because use regular absolute
    listenersNoDeep.get(propId)?.forEach((cb) => {
      cb(value, oldValue);
    });
    listenersDeep.get(propId)?.forEach((cb) => {
      cb(value, oldValue);
    });
    // scan listenersDeep because use regular relative
    listenersDeep.forEach((cbs, key) => {
      if (propId.startsWith(`${key}.`)) {
        // call...
        const value = getValueOfPath(rootValue, key);
        cbs.forEach((cb) => {
          cb(value, value);
        });
      }
    });
  }

  const proxy = new Proxy(obj, {
    get(target, p) {
      if (typeof target[p] === "object") {
        return toProxy(
          target[p],
          [...path, p.toString()],
          [listenersDeep, listenersNoDeep],
          rootValue
        );
      }

      return target[p];
    },
    set(target, p, value) {
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
          throwError(`cant't delete "${p.toString()}" because unknown error.`);
        }

        setter(p.toString(), undefined, oldValue);
        return true;
      } catch {
        return false;
      }
    },
  });

  weakCache.set(obj, proxy);

  return proxy;
}
function createProxy<T>(obj: T): T {
  const listeners: readonly [Listeners, Listeners] = [new Map(), new Map()];
  const proxy = toProxy(obj, [], listeners, obj);

  // save to cache
  if (listenersCache.has(proxy)) {
    // merge listenersDeep
    mergeListeners(listenersCache.get(proxy)?.[0] as Listeners, listeners[0]);
    mergeListeners(listenersCache.get(proxy)?.[1] as Listeners, listeners[1]);
  } else {
    listenersCache.set(proxy, listeners);
  }

  return proxy;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function reactive<T = object | readonly any[]>(value: T): T {
  return createProxy(value);
}
export function watch<T>(obj: Ref<T>, cb: (newValue: T, oldValue: T) => void, options?: {
  deep?: boolean
  immediate?: boolean
}) : () => void {
  if ( options?.immediate ) {
    // get val
    return cb(obj.value, obj.value)
  }
  // get listeners haha;;
  const listeners = listenersCache.get(obj)
  
  if ( listeners ) {
    if ( options?.deep ) {
      // add to listenersDeep
      listeners[0].push(cb)
      return () => listeners[0].splice(listeners[0].indexOf(cb), 1)
    }
    
    listeners[1].push(cb)
    return () => listeners[1].splice(listeners[1].indexOf(cb), 1)
  } else {
    warn(`value not is proxy ref`)
  }
}

// export function createStore<T = any>(obj: T) {
//   const emitter = {}
//   return {
//     watch<N = any, O = N>(
//       path: string,
//       cb: (newValue: N, oldValue: O) => void,
//       {
//         immediate = false,
//         deep = false,
//       }: {
//         readonly immediate?: boolean;
//         readonly deep?: boolean;
//       } = {}
//     ) {
//       const handler = ([pathEmit, newValue, oldValue]: readonly [
//         readonly string[],
//         any,
//         any
//       ]) => {
//         if (
//           path === pathEmit.join(".") ||
//           (deep ? pathEmit.join(".").startsWith(`${path}.`) : false)
//         ) {
//           // emit
//           cb(newValue, oldValue);
//         }
//       };

//       if (immediate) {
//         const val = path.split(".").reduce((obj: any, p) => obj[p], obj);
//         cb(val, val);
//       }

//       emitter.on("*", handler);

//       return () => emitter.off("*", handler);
//     },
//     value: toProxy(obj, [], emitter) as T,
//   };
// }
