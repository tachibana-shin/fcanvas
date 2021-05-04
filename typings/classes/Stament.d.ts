import { CallbackEvent } from "./Emitter";
declare class Stament {
    private __store;
    on(name: string, callback: CallbackEvent): void;
    emit(name: string): void;
}
export default Stament;
