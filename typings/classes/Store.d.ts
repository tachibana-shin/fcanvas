import { CallbackEvent } from "./Emitter";
declare class Store {
    [propName: string]: any;
    private __emitter;
    /**
     * @param {Object} store?
     * @return {any}
     */
    constructor(store?: {
        [propName: string]: any;
    });
    /**
     * @param {Store|Object} object
     * @param {string} key
     * @param {any} value
     * @return {void}
     */
    $set(object: Store | {
        [propName: string]: any;
    }, key: string, value: any): void;
    /**
     * @param {string} key
     * @param {CallbackEvent} callback
     * @return {any}
     */
    $watch(key: string, callback: CallbackEvent): () => void;
}
export default Store;
