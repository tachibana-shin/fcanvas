import { CanvasElement } from "../core/CanvasElement";
import fCanvas from "../core/fCanvas";

type CallbackAddons<T = void> = {
  (element: CanvasElement, index: number, peers: readonly CanvasElement[]): T;
};
export default class Peers extends CanvasElement {
  // eslint-disable-next-line functional/prefer-readonly-type
  public readonly peers: CanvasElement[] = [];

  add(element: CanvasElement): void {
    // eslint-disable-next-line functional/immutable-data
    this.peers.push(element);
  }

  _run(canvas: fCanvas): void {
    this.peers.forEach((element) => {
      element._run(canvas, this);
    });
  }

  forEach(callback: CallbackAddons): void {
    this.peers.forEach(callback);
  }
  filter(callback: CallbackAddons<boolean>): void {
    // eslint-disable-next-line functional/immutable-data
    this.peers.push(...this.peers.splice(0).filter(callback));
  }
  filterOne(callback: CallbackAddons<boolean>): void {
    // eslint-disable-next-line functional/prefer-readonly-type
    const peers: CanvasElement[] = [];

    // eslint-disable-next-line functional/functional-parameters
    this.peers.some((...params): boolean => {
      if (callback(...params)) {
        // eslint-disable-next-line functional/immutable-data
        peers.push(params[0]);
        return false;
      }

      return true;
    });
  }
  remove(element: number | CanvasElement): void {
    if (element instanceof CanvasElement) {
      this.filterOne((element1) => element !== element1);
    } else {
      this.filterOne(
        (element) => element.id !== (element as unknown as number)
      );
    }
  }
}
