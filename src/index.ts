import fCanvas from "./core/fCanvas";

export default fCanvas;
export {
  CanvasElement,
  Point3D,
  Point3DCenter,
  createElement,
  getCanvasInstance,
} from "./core/CanvasElement";
export { createStore } from "./classes/Store";
export { default as Vector } from "./classes/Vector";
export { createAnimate } from "./classes/Animate";
export { default as Camera } from "./classes/Camera";
export { createResource } from "./classes/Resource";
export { default as Peers } from "./classes/Peers";
export {
  requestAnimationFrame,
  cancelAnimationFrame,
  isMobile,
  isTouch,
  passive,
} from "./utils/index";
export * from "./functions/index";
export * from "./core/SystemEvents";
export * from "./addons/impact";
