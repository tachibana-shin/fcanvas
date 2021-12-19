type ReadonlyListEvents = {
  readonly [name: string]: Event;
} & {
  readonly keydown: KeyboardEvent;
  readonly resize: Event;
  readonly wheel: WheelEvent;
  readonly mousedown: MouseEvent;
  readonly click: MouseEvent;
  readonly mousemove: MouseEvent;
  readonly mouseout: MouseEvent;
  readonly mouseover: MouseEvent;
  readonly touchstart: TouchEvent;
  readonly touchmove: TouchEvent;
  readonly touchend: TouchEvent;
};

export default ReadonlyListEvents;
