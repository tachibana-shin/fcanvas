export interface CallbackEvent {
    (...args: any[]): void;
}
export default class Emitter {
    private __events;
    on(name: string, callback: {
        (): void;
    }): {
        (): void;
    };
    off(name: string, callback?: CallbackEvent): void;
    emit(name: string, ...payload: any[]): void;
    once(name: string, callback: CallbackEvent): void;
}
