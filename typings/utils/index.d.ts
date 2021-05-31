/// <reference types="node" />
interface InfoFont {
    size: number;
    family: string;
    weight: string;
}
export interface noop {
    (): void;
}
/**
 * @param {any} e
 * @return {any}
 */
export declare const requestAnimationFrame: typeof globalThis.requestAnimationFrame | typeof globalThis.setTimeout;
export declare const cancelAnimationFrame: typeof globalThis.cancelAnimationFrame | typeof globalThis.clearTimeout;
export declare const isTouch: boolean;
export declare const passive: boolean;
/**
 * @param {string} str
 * @return {string}
 */
export declare function camelCase(str: string): string;
export declare const windowSize: {
    windowWidth: {
        get(): number;
    };
    windowHeight: {
        get(): number;
    };
};
/**
 * @param {string|number} string
 * @return {string}
 */
export declare function convertToPx(string: string | number): string;
/**
 * @param {string|null} string
 * @return {string}
 */
export declare function trim(string: string | null): string;
/**
 * @param {string} font
 * @return {InfoFont}
 */
export declare function fontToArray(font: string): InfoFont;
/**
 * @param {string|number} string
 * @param {number} fi
 * @param {number} fontSize?
 * @return {number}
 */
export declare function AutoToPx(string: string | number | undefined, fi: number, fontSize?: number): number;
export interface Offset {
    x: number;
    y: number;
}
export interface InfoTouch extends Offset {
    winX: number;
    winY: number;
    id: any;
}
/**
 * @param {HTMLCanvasElement} element
 * @param {any[]} touches
 * @return {InfoTouch[]}
 */
export declare function getTouchInfo(element: HTMLCanvasElement, touches: any[]): InfoTouch[];
/**
 * @return {boolean}
 */
export declare function isMobile(): boolean;
/**
 * @param {number|string|boolean} value
 * @return {number}
 */
export declare function extractNumber(value: any): number;
export {};
