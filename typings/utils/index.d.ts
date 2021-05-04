/// <reference types="node" />
export declare const requestAnimationFrame: (((callback: FrameRequestCallback) => number) & typeof globalThis.requestAnimationFrame) | typeof globalThis.setTimeout;
export declare const isTouch: boolean;
export declare const passive: boolean;
export declare function camelCase(str: string): string;
export declare const windowSize: {
    windowWidth: {
        get(): number;
    };
    windowHeight: {
        get(): number;
    };
};
export declare function convertToPx(string: string | number): string;
export declare function trim(string: string | null): string;
interface InfoFont {
    size: number;
    family: string;
    weight: string;
}
export declare function fontToArray(font: string): InfoFont;
export declare function AutoToPx(string: string | number, fi: number, fontSize?: number): number;
export interface InfoTouch {
    x: number;
    y: number;
    winX: number;
    winY: number;
    id: any;
}
export declare function getTouchInfo(element: HTMLCanvasElement, touches: any[]): InfoTouch[];
export declare function isMobile(): boolean;
export {};
