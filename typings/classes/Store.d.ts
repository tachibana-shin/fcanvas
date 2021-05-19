import { Object } from "../types";
import { CallbackEvent } from "./Emitter";
declare class Store {
    [propName: string]: any;
    private __emitter;
    /**
     * @param {Object} store?
     * @return {any}
     */
    constructor(store?: Object);
    /**
     * @param {Store|Object} object
     * @param {string} key
     * @param {any} value
     * @return {void}
     */
    $set(object: Store | Object, key: string, value: any): void;
    /**
     * @param {string} key
     * @param {CallbackEvent} callback
     * @return {any}
     */
    $watch(key: string, callback: CallbackEvent): () => void;
}
export default Store;
