import { CallbackEvent } from "./Emitter";
declare class Stament {
    private __store;
    /**
     * @param {string} name
     * @param {CallbackEvent} callback
     * @return {void}
     */
    on(name: string, callback: CallbackEvent): void;
    /**
     * @param {string} name
     * @return {void}
     */
    emit(name: string): void;
}
export default Stament;
