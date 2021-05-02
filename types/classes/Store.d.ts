import Emitter from "./Emitter";
declare class Store {
  __emitter: Emitter;
  constructor(store?: {});
  $set(object: Store | Array<any> | object, key: string, value: any): void;
  $watch(
    key: string,
    callback: {
      (oldValue: any, newValue: any): void;
    }
  ): () => void;
}
export default Store;
