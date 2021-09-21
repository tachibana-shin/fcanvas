import { CallbackEvent } from "./Emitter";
declare class Store {
    [propName: string]: any;
    private __emitter;
    constructor(store?: {
        [propName: string]: any;
    });
    $set(object: Store | {
        [propName: string]: any;
    }, key: string, value: any): void;
    $watch(key: string, callback: CallbackEvent): import("../utils").noop;
}
export default Store;
