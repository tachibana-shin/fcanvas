import fCanvas from "./core/fCanvas";

export default fCanvas;
export { default as Store } from "./classes/Store";
export { default as Vector } from "./classes/Vector";
export { default as Animate } from "./classes/Animate";
export { default as Camera } from "./classes/Camera";
export { default as Resource, loadResourceImage } from "./classes/Resource";
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
export * from "./core/CanvasElement";
export * from "./addons/impact";
