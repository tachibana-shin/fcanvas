import MyElement from "../core/MyElement";
import fCanvas from "../core/fCanvas";
interface CallbackAddons<T = void> {
    (element: MyElement, index: number, peers: MyElement[]): T;
}
export default class Peers extends MyElement {
    peers: MyElement[];
    add(element: MyElement): void;
    _run(canvas: fCanvas): void;
    forEach(callback: CallbackAddons): void;
    filter(callback: CallbackAddons<boolean>): void;
    filterOne(callback: CallbackAddons<boolean>): void;
    remove(element: number | MyElement): void;
}
export {};
