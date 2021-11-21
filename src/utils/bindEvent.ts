import ReadonlyListEvents from "../types/ReadonlyListEvents";

export default function bindEvent<Name extends keyof ReadonlyListEvents>(
  name: Name,
  callback: (ev: ReadonlyListEvents[Name]) => void,
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
