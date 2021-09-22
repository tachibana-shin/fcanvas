/* eslint-disable @typescript-eslint/no-explicit-any */
import mitt, { Emitter } from "mitt";

// eslint-disable-next-line @typescript-eslint/ban-types
const weakCache = new WeakMap<Object, any>();
function toProxy(
  obj: any,
  path: readonly (string | symbol)[] = [],
  emitter: Emitter<{
    readonly [path: string]: readonly [readonly string[], unknown, unknown];
  }>
): typeof obj {
  if (weakCache.has(obj)) {
    return weakCache.get(obj);
  }

  const proxy = new Proxy(obj, {
    get(target, p) {
      if (typeof target[p] === "object") {
        return toProxy(target[p], [...path, p], emitter);
      }

      return target[p];
    },
    set(target, p, value) {
      // call watch
      const oldValue = target[p];

      if (oldValue !== value) {
        // eslint-disable-next-line functional/immutable-data
        target[p] = value;
        emitter.emit("*", [
          [...path, p].map((e) => e.toString()),
          value,
          oldValue,
        ]);
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
          throw new Error("DELETE_FAILED");
        }
        emitter.emit("*", [
          [...path, p].map((e) => e.toString()),
          void 0,
          oldValue,
        ]);

        return true;
      } catch {
        return false;
      }
    },
  });

  weakCache.set(obj, proxy);

  return proxy;
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
