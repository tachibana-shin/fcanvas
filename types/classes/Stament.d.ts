import Store from "./Store";
declare class Stament {
  __store: Store;
  on(
    name: string,
    callback: {
      (): void;
    }
  ): void;
  emit(name: string): void;
}
export default Stament;
