import mitt from "mitt";

import type { noop } from "../types/index";
import { requestAnimationFrame } from "../utils/animationFrame";
import bindEvent from "../utils/bindEvent";

import fCanvas, { setCanvasInstance, unsetCanvasInstance } from "./fCanvas";

// eslint-disable-next-line functional/no-let
let initd = false;
const emitter = mitt<{
  readonly load: void;
}>();

export async function setup(
  callback: {
    (): Promise<void> | void;
  },
  canvas?: fCanvas
): Promise<void> {
  if (document.readyState === "complete") {
    //// readyState === "complete"

    setCanvasInstance(canvas ?? null);
    await callback();
    unsetCanvasInstance();

    initd = true;
    emitter.emit("load");
  } else {
    await new Promise<void>((resolve) => {
      async function load() {
        document.removeEventListener("DOMContentLoaded", load);
        window.removeEventListener("load", load);

        setCanvasInstance(canvas ?? null);
        await callback();
        unsetCanvasInstance();

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

  setCanvasInstance(canvas ?? null);
  callback();
  unsetCanvasInstance();

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
