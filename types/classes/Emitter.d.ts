export default class Emitter {
  __events: {};
  on(
    name: string,
    callback: {
      (...args: any[]): void;
    }
  ): () => void;
  off(name: string, callback?: Function): void;
  emit(name: string, ...payload: any[]): void;
  once(
    name: string,
    callback: {
      (...args: any[]): void;
    }
  ): () => void;
}
