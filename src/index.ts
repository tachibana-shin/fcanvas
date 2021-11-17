export { default, getCanvasInstance } from "./core/fCanvas";
export { CanvasElement } from "./core/CanvasElement";
export { createCanvas } from "./core/createCanvas";
export { createClass } from "./core/createClass";
export * from "./core/SystemEvents";
export * from "./core/reactive";
// END **core**

export { createAnimate } from "./classes/Animate";
export { createCamera, Camera } from "./classes/Camera";
export { createCanvasList, CanvasList } from "./classes/CanvasList";
export { createOneTimeEvent, OneTimeEvent } from "./classes/OneTimeEvent";
export { loadTiles } from "./classes/Tiles";
export { createVector, Vector } from "./classes/Vector";

export {
  requestAnimationFrame,
  cancelAnimationFrame,
} from "./utils/animationFrame";
export { default as isMobile } from "./utils/isMobile";
export { default as isTouch } from "./utils/isTouch";

export * from "./functions/index";
