import { requestAnimationFrame, bindEvent, noop } from "../utils/index";
import Emitter, { CallbackEvent } from "../classes/Emitter";
import fCanvas from "./fCanvas";

let initd: boolean = false;
const emitter: Emitter = new Emitter();

export async function setup(callback: {
  (): Promise<void> | void;
}): Promise<void> {
  if (document.readyState === "complete") {
    //// readyState === "complete"

    await callback();

    initd = true;
    emitter.emit("load");
  } else {
    await new Promise<void>((resolve) => {
      function load() {
        document.removeEventListener("DOMContentLoaded", load);
        window.removeEventListener("load", load);

        callback();
        resolve();
        initd = true;
        emitter.emit("load");
      }

      document.addEventListener("DOMContentLoaded", load);
      window.addEventListener("load", load);
    });
  }
}

function __draw(callback: noop, canvas?: fCanvas): void {
  if (canvas?.allowClear === true) {
    canvas.clear();
  }
  callback();
  if (canvas ? canvas.allowLoop === true : false) {
    const id: number = requestAnimationFrame((): void => {
      __draw(callback, canvas);
    });

    canvas?._setIdFrame(id);
  }
}

export function draw(callback: noop, canvas?: fCanvas): void {
  if (initd) {
    void __draw(callback, canvas);
  } else {
    void emitter.once("load", (): void => {
      draw(callback, canvas);
    });
  }
}
export function keyPressed(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("keydown", callback, element);
}
export function changeSize(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("resize", callback, element);
}
export function mouseWheel(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("wheel", callback, element);
}
export function mousePressed(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("mousedown", callback, element);
}
export function mouseClicked(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("click", callback, element);
}
export function mouseMoved(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("mousemove", callback, element);
}
export function touchStart(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("touchstart", callback, element);
}
export function touchMove(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("touchmove", callback, element);
}
export function touchEnd(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("touchend", callback, element);
}
