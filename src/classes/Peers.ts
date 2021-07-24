import MyElement from "../core/MyElement";
import fCanvas from "../core/fCanvas";

interface CallbackAddons<T = void> {
  (element: MyElement, index: number, peers: MyElement[]): T;
}
export default class Peers extends MyElement {
  public peers: MyElement[] = [];

  add(element: MyElement): void {
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
    this.peers = this.peers.filter(callback);
  }
  filterOne(callback: CallbackAddons<boolean>): void {
    const peers: MyElement[] = [];

    this.peers.some((...params): boolean => {
      if (callback(...params)) {
        peers.push(params[0]);
        return false;
      }

      return true;
    });
  }
  remove(element: number | MyElement): void {
    if (element instanceof MyElement) {
      this.filterOne((element1) => element !== element1);
    } else {
      this.filterOne(
        (element) => element.id !== (element as unknown as number)
      );
    }
  }
}
