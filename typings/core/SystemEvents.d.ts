import { noop } from "../utils/index";
import { CallbackEvent } from "../classes/Emitter";
import fCanvas from "./fCanvas";
/**
 * @export
 * @param {({
 *   (): Promise<void> | void;
 * })} callback
 * @return {*}  {Promise<void>}
 */
export declare function setup(callback: {
    (): Promise<void> | void;
}): Promise<void>;
/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */
export declare function draw(callback: noop, canvas?: fCanvas): void;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */
export declare function keyPressed(callback: CallbackEvent, element?: Window | HTMLElement): noop;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */
export declare function changeSize(callback: CallbackEvent, element?: Window | HTMLElement): noop;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */
export declare function mouseWheel(callback: CallbackEvent, element?: Window | HTMLElement): noop;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */
export declare function mousePressed(callback: CallbackEvent, element?: Window | HTMLElement): noop;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */
export declare function mouseClicked(callback: CallbackEvent, element?: Window | HTMLElement): noop;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */
export declare function mouseMoved(callback: CallbackEvent, element?: Window | HTMLElement): noop;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */
export declare function touchStart(callback: CallbackEvent, element?: Window | HTMLElement): noop;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */
export declare function touchMove(callback: CallbackEvent, element?: Window | HTMLElement): noop;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */
export declare function touchEnd(callback: CallbackEvent, element?: Window | HTMLElement): noop;
