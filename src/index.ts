export { default, getCanvasInstance } from "./core/fCanvas";
export { Block } from "./core/Block";
export { createCanvas } from "./core/createCanvas";
export { defineBlock } from "./core/defineBlock";
export * from "./core/SystemEvents";
export * from "./core/reactive";
// END **core**

export { createAnimate } from "./classes/Animate";
export { createCamera, Camera } from "./classes/Camera";
export { createCanvasList, CanvasList } from "./classes/CanvasList";
export { createOneTimeEvent, OneTimeEvent } from "./classes/OneTimeEvent";
export { loadTiles, Tiles } from "./classes/Tiles";
export { createVector, Vector } from "./classes/Vector";

export {
  requestAnimationFrame,
  cancelAnimationFrame,
} from "./utils/animationFrame";
export { default as isMobile } from "./utils/isMobile";
export { default as isTouch } from "./utils/isTouch";

export * from "./functions/index";
