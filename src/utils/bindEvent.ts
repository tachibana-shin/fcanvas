export type ListEvents = {
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
export default function bindEvent<Name extends keyof ListEvents>(
  name: Name,
  callback: (ev: ListEvents[Name]) => void,
  element: Element | Window | typeof globalThis
): () => void {
  element.addEventListener(
    name as string,
    callback as EventListenerOrEventListenerObject
  );
  return () => {
    element.removeEventListener(
      name as string,
      callback as EventListenerOrEventListenerObject
    );
  };
}
