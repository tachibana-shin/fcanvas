/* eslint-disable @typescript-eslint/no-explicit-any */
import { throwError } from "../helpers/throw"

// eslint-disable-next-line @typescript-eslint/ban-types
const weakCache = new WeakMap<Object, any>();
function toProxy(
  obj: any,
  path: readonly string[] = [],
  listeners: Map<string, {
    cb: (newVal: any, oldValue: any) => void,
    deep: boolean,
    propId: string
  }>
): typeof obj {
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
        
        listeners.forEach((listener) => {
          if ( listener.deep ) {
            //
            if ( propId.startsWith(`${listener.propId}.`) ) {
              listener.cb(value, oldValue)
            }
          }
          if ( propId === listener.propId ) {
            listener.cb(value, oldValue)
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
        
        listeners.forEach((listener) => {
          if ( listener.deep ) {
            //
            if ( propId.startsWith(`${listener.propId}.`) ) {
              listener.cb(void 0, oldValue)
            }
          }
          if ( propId === listener.propId ) {
            listener.cb(void 0, oldValue)
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

function ref<T = any>(value: T): Ref<T> {
  
}

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
 