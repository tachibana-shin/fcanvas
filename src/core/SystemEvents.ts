import { requestAnimationFrame, bindEvent } from "../utils/index";
import Emitter, { CallbackEvent } from "../classes/Emitter";
import fCanvas from "./fCanvas";

let inited: boolean = false;
const emitter: Emitter = new Emitter();

/**
 * @param {any} document.readyState==="complete"
 * @return {any}
 */

export async function setup(callback: {
  (): Promise<void> | void;
}): Promise<void> {
  if (document.readyState === "complete") {
    //// readyState === "complete"

    const ret = callback();

    if (ret && "length" in ret) {
      await ret;
    }

    inited = true;
    emitter.emit("load");
  } else {
    await new Promise<void>((resolve) => {
      function load() {
        document.removeEventListener("DOMContentLoaded", load);
        window.removeEventListener("load", load);

        callback();
        resolve();
        inited = true;
        emitter.emit("load");
      }

      document.addEventListener("DOMContentLoaded", load);
      window.addEventListener("load", load);
    });
  }
}

function __draw(callback: { (): void }, canvas: fCanvas): void {
  if (canvas.acceptClear === true) {
    canvas.clear();
  }
  callback();
  if (canvas.acceptLoop === true) {
    requestAnimationFrame(() => __draw(callback, canvas));
  }
}

/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */
export function draw(callback: { (): void }, canvas?: fCanvas): void {
  if (inited) {
    if (!canvas) {
      void callback();
    } else {
      void __draw(callback, canvas);
    }
  } else {
    emitter.once("load", (): void => {
      draw(callback, canvas);
    });
  }
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function keyPressed(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("keydown", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function keyUp(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("keyup", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function changeSize(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("resize", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mouseWheel(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("wheel", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mousePressed(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("mousedown", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mouseClicked(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("click", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mouseMoved(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("mousemove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function touchStart(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("touchstart", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function touchMove(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("touchmove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function touchEnd(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("touchend", callback, element);
}
