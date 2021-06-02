export declare type AnimateType = "ease" | "quadratic" | "sine-ease-in-out" | "quintic-ease" | "exp-ease-in-out" | "linear";
declare type StoreData = number[] | {
    [propName: string]: number;
};
export default class Animate {
    private __data;
    private set data(value);
    /**
     *
     *
     * @param {string} key
     * @return {*}  {(number | void)}
     * @memberof Animate
     */
    get(key: string): number | void;
    private __fps;
    private __eventsStore;
    private __queue;
    time: number;
    easing: AnimateType;
    get frames(): number;
    private __frame;
    get frame(): number;
    set frame(value: number);
    constructor(...params: number[]);
    constructor(params: StoreData, easing?: AnimateType, duration?: number);
    constructor(params: StoreData, duration?: number, easing?: AnimateType);
    on(name: string, callback: Function): void;
    off(name: string, callback?: Function): void;
    emit(name: string, ...params: any[]): void;
    once(name: string, callback: Function): void;
    setFPS(value: number): void;
    action(): void;
    cancel(key?: string): void;
    private _to;
    to(...params: number[]): void;
    to(params: StoreData, easing?: AnimateType, duration?: number): void;
    to(params: StoreData, duration?: number, easing?: AnimateType): void;
    get running(): boolean;
    add(...params: number[]): void;
    add(params: StoreData, easing?: AnimateType, duration?: number): void;
    add(params: StoreData, duration?: number, easing?: AnimateType): void;
    set(...params: number[]): void;
    set(params: StoreData): void;
}
export {};
