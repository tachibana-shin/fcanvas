import { Object } from "../types.js";
import { CallbackEvent } from "./Emitter.js";
declare class Store {
    [propName: string]: any;
    private __emitter;
    constructor(store?: Object);
    $set(object: Store | Object, key: string, value: any): void;
    $watch(key: string, callback: CallbackEvent): () => void;
}
export default Store;
