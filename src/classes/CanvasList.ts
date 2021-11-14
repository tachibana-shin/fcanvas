import { CanvasElement } from "../core/CanvasElement";
import { getCanvasInstance } from "../core/fCanvas";

function existsCbFilter(
  pr: CanvasElement & {
    // eslint-disable-next-line functional/prefer-readonly-type
    readonly filter?: (peers: Set<CanvasElement>) => boolean | void;
  }
): pr is CanvasElement & {
  // eslint-disable-next-line functional/prefer-readonly-type
  readonly filter: (peers: Set<CanvasElement>) => boolean | void;
} {
  return typeof pr.filter === "function";
}

export class CanvasList extends Set<CanvasElement> {
  render(canvas = getCanvasInstance()): void {
    this.forEach((element: CanvasElement) => {
      element.render(canvas);

      if (existsCbFilter(element) && !element.filter(this)) {
        this.delete(element);
      }
    });
  }

  filter(
    callback: (
      element: CanvasElement,
      peers: ReadonlySet<CanvasElement>
    ) => boolean | void
  ): void {
    this.forEach((element: CanvasElement) => {
      if (callback(element, this)) {
        this.delete(element);
      }
    });
  }
}

export function createCanvasList(
  iterable?: Iterable<CanvasElement> | null | undefined
): CanvasList {
  return new CanvasList(iterable);
}
