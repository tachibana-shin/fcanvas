/// <reference types="node" />
interface InfoFont {
    size: number;
    family: string;
    weight: string;
}
export interface noop {
    (): void;
}
export interface Offset {
    x: number;
    y: number;
}
export interface InfoTouch extends Offset {
    winX: number;
    winY: number;
    id: any;
}
export declare const requestAnimationFrame: typeof globalThis.requestAnimationFrame | typeof globalThis.setTimeout;
export declare const cancelAnimationFrame: typeof globalThis.cancelAnimationFrame | typeof globalThis.clearTimeout;
export declare const isTouch: boolean;
export declare const passive: boolean;
export declare const windowSize: {
    windowWidth: {
        get(): number;
    };
    windowHeight: {
        get(): number;
    };
};
export declare function fontToArray(font: string): InfoFont;
export declare function AutoToPx(string: string | number, fi: number, fontSize?: number): number;
export declare function getTouchInfo(element: HTMLCanvasElement, touches: any[]): InfoTouch[];
/**
 * @return {boolean}
 */
export declare function isMobile(): boolean;
export declare function extractNumber(value: any): number;
export declare function bindEvent(name: string, callback: any, element: Element | Window | typeof globalThis): noop;
export {};
