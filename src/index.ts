export { default, getCanvasInstance } from "./core/fCanvas";
export { CanvasElement } from "./core/CanvasElement";
export { createClass } from "./core/createClass";

export { createAnimate } from "./classes/Animate";
export { createCamera, Camera } from "./classes/Camera";
export { createCanvasList, CanvasList } from "./classes/CanvasList";
export { createOneTimeEvent, OneTimeEvent } from "./classes/OneTimeEvent";
export { createResource, Resource } from "./classes/Resource";
export { createStore } from "./classes/Store";
export { createVector, Vector } from "./classes/Vector";

export {
  requestAnimationFrame,
  cancelAnimationFrame,
} from "./utils/aimationFrame";
export * from "./functions/index";
export * from "./core/SystemEvents";
export { default as isMobile } from "./utils/isMobile"
export { default as isTouch } from "./utils/isTouch"