import { noop } from "../utils/index";
export interface CallbackEvent {
    (...args: any[]): void;
}
export default class Emitter {
    private __events;
    /**
     * @param {any} typeofcallback==="function"
     * @return {any}
     */
    on(name: string, callback: noop): noop;
    /**
     * @param {string} name
     * @param {CallbackEvent} callback?
     * @return {void}
     */
    off(name: string, callback?: CallbackEvent): void;
    /**
     * @param {string} name
     * @param {any[]} ...payload
     * @return {void}
     */
    emit(name: string, ...payload: any[]): void;
    /**
     * @param {string} name
     * @param {CallbackEvent} callback
     * @return {void}
     */
    once(name: string, callback: CallbackEvent): void;
}
