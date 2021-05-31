import { CallbackEvent } from "../classes/Emitter";
import fCanvas from "./fCanvas";
export declare function bindEvent(name: string, callback: any, element: Element | Window | typeof globalThis): {
    (): void;
};
/**
 * @param {any} document.readyState==="complete"
 * @return {any}
 */
export declare function setup(callback: {
    (): Promise<void> | void;
}): Promise<void>;
/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */
export declare function draw(callback: {
    (): void;
}, canvas?: fCanvas): void;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function keyPressed(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function keyUp(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function changeSize(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function mouseWheel(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function mousePressed(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function mouseClicked(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function mouseMoved(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function touchStart(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function touchMove(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function touchEnd(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
