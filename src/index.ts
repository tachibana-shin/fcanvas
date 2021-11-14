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
  isMobile,
  isTouch,
} from "./utils/index";
export * from "./functions/index";
export * from "./core/SystemEvents";
