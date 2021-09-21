import { noop } from "../utils/index";
export interface CallbackEvent {
    (...args: any[]): void;
}
export default class Emitter {
    private __events;
    on(name: string, callback: noop): noop;
    off(name: string, callback?: CallbackEvent): void;
    emit(name: string, ...payload: any[]): void;
    once(name: string, callback: CallbackEvent): void;
}
