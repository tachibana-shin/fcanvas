/* eslint-disable @typescript-eslint/no-explicit-any */
import { throwError } from "../helpers/throw"

type Listeners = Map < string, {
  cb: (newVal: any, oldValue: any) => void,
  deep: boolean
}[] >
// eslint-disable-next-line @typescript-eslint/ban-types
const weakCache = new WeakMap<Object, any>();
const listenersCache = new WeakMap<Proxy, Listeners>()

function mergeListeners(listenerRoot: Listeners, ...listListeners: Listeners[]): Listeners {
  listListeners.forEach(listeners => {
    // merge
    listeners.forEach((cbs, key) => {
      if ( listenerRoot.has(key) ) {
        listenerRoot.get(key).push(...cbs)
      } else {
        listenerRoot.set(key, cbs)
      }
    })
  })
}

function toProxy(
  obj: any,
  path: readonly string[] = [],
  listeners: Listeners
): typeof obj {
  if ( obj === null || (typeof obj !== "object" && typeof obj !== "function") ) {
    throwError(`can't reactive value typeof "${typeof obj}"`)
  }
   
  if (weakCache.has(obj)) {
    return weakCache.get(obj);
  }

  const proxy = new Proxy(obj, {
    get(target, p) {
      if (typeof target[p] === "object") {
        return toProxy(target[p], [...path, p.toString()], listeners);
      }

      return target[p];
    },
    set(target, p, value) {
      // call watch
      const oldValue = target[p];

      if (oldValue !== value) {
        // eslint-disable-next-line functional/immutable-data
        target[p] = value;
        
        const propId = [...path, p.toString()].join(".")
        
        listeners.forEach((cbs, key) => {
          if ( listener.deep ) {
            //
            if ( propId.startsWith(`${key}.`) ) {
              listener.cbs.forEach(cb => cb(value, oldValue))
            }
          }
          if ( propId === key ) {
            listener.cbs.forEach(cb => (value, oldValue))
          }
        })
      }

      return true;
    },
    deleteProperty(target, p) {
      try {
        // call watch
        const oldValue = target[p];
        // eslint-disable-next-line functional/immutable-data
        if (delete target[p] === false) {
          throwError(`cant't delete "${p}" because unknown error.`);
        }
        
        const propId = [...path, p.toString()].join(".")
        
        listeners.forEach((listener, key) => {
          if ( listener.deep ) {
            //
            if ( propId.startsWith(`${key}.`) ) {
              listener.cbs.forEach(cb => cb(void 0, oldValue))
            }
          }
          if ( propId === key ) {
            listener.cbs.forEach(cb => cb(void 0, oldValue))
          }
        })

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
  const listeners = new Map()
  const proxy = toProxy(obj, [], listeners)
  
  // save to cache
  if ( listenersCache.has(proxy) ) {
    // merge
    listenersCache.set(proxy, mergeListeners(listenersCache.get(proxy), listeners))
  } else {
    listenersCache.set(proxy, listeners)
  }
  
  return proxy
}

function reactive<T = object|any[]>(value: T): T {
  const listeners = new Map();
  
  return toProxy(value, [], listeners)
}
function watch()

export function createStore<T = any>(obj: T) {
  const emitter = mitt<{
    readonly [path: string]: readonly [readonly string[], unknown, unknown];
  }>();
  return {
    watch<N = any, O = N>(
      path: string,
      cb: (newValue: N, oldValue: O) => void,
      {
        immediate = false,
        deep = false,
      }: {
        readonly immediate?: boolean;
        readonly deep?: boolean;
      } = {}
    ) {
      const handler = ([pathEmit, newValue, oldValue]: readonly [
        readonly string[],
        any,
        any
      ]) => {
        if (
          path === pathEmit.join(".") ||
          (deep ? pathEmit.join(".").startsWith(`${path}.`) : false)
        ) {
          // emit
          cb(newValue, oldValue);
        }
      };

      if (immediate) {
        const val = path.split(".").reduce((obj: any, p) => obj[p], obj);
        cb(val, val);
      }

      emitter.on("*", handler);

      return () => emitter.off("*", handler);
    },
    value: toProxy(obj, [], emitter) as T,
  };    
}
 