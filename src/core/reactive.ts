import { throwError } from "../helpers/throw"

type Ref<T = any> = {
  value: T
}

export function readonly<T>(value: T): Readonly<Ref<T>> {
  return new Proxy({}, {
    get(target, prop) {
      if ( prop === "value" ) {
        return value
      }
    },
    set(target, prop) {
      if ( prop === "value" ) {
        throwError(`Can't set value to readonly.`)
      }
    }
  })
}
export function onewrite<T>(): Readonly<Ref<T>> {
  let value: T;
  let writed = false
  return new Proxy({}, {
    get(target, prop) {
      if ( prop === "value" ) {
        return value
      }
    },
    set(target, prop, pvalue) {
      if ( writed === false && prop === "value" ) {
        value = pvalue;
        return true;
      }
      if ( prop === "value" ) {
        throwError(`Can't set value to onewrite.`)
      }
    }
  })
}
