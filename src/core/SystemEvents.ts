import mitt from "mitt";

import { bindEvent, noop, requestAnimationFrame } from "../utils/index";

import fCanvas from "./fCanvas";

// eslint-disable-next-line functional/no-let
let initd = false;
const emitter = mitt();

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
    void emitter.on("load", function handler() {
      draw(callback, canvas);
      emitter.off("load", handler);
    });
  }
}
export function keyPressed(
  callback: (ev: KeyboardEvent) => void,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("keydown", callback, element);
}
export function changeSize(
  callback: (ev: Event) => void,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("resize", callback, element);
}
export function mouseWheel(
  callback: (ev: WheelEvent) => void,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("wheel", callback, element);
}
export function mousePressed(
  callback: (ev: MouseEvent) => void,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("mousedown", callback, element);
}
export function mouseClicked(
  callback: (ev: MouseEvent) => void,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("click", callback, element);
}
export function mouseMoved(
  callback: (ev: MouseEvent) => void,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("mousemove", callback, element);
}
export function touchStart(
  callback: (ev: TouchEvent) => void,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("touchstart", callback, element);
}
export function touchMove(
  callback: (ev: TouchEvent) => void,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("touchmove", callback, element);
}
export function touchEnd(
  callback: (ev: TouchEvent) => void,
  element: Window | HTMLElement = window
): noop {
  return bindEvent("touchend", callback, element);
}
