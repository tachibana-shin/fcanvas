import { Block } from "../core/Block";
import { getCanvasInstance } from "../core/fCanvas";

function existsCbFilter(
  pr: Block & {
    // eslint-disable-next-line functional/prefer-readonly-type
    readonly filter?: (peers: Set<Block>) => boolean | void;
  }
): pr is Block & {
  // eslint-disable-next-line functional/prefer-readonly-type
  readonly filter: (peers: Set<Block>) => boolean | void;
} {
  return typeof pr.filter === "function";
}

export class CanvasList extends Set<Block> {
  render(canvas = getCanvasInstance()): void {
    this.forEach((element: Block) => {
      element.render(canvas);

      if (existsCbFilter(element) && !element.filter(this)) {
        this.delete(element);
      }
    });
  }

  filter(
    callback: (
      element: Block,
      peers: ReadonlySet<Block>
    ) => boolean | void
  ): void {
    this.forEach((element: Block) => {
      if (callback(element, this)) {
        this.delete(element);
      }
    });
  }
}

export function createCanvasList(
  iterable?: Iterable<Block> | null | undefined
): CanvasList {
  return new CanvasList(iterable);
}
