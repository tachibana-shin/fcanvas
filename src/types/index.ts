export type noop = () => void;

export type ReadonlyOffset < T = number > = {
  readonly x: T;
  readonly y: T;
};
export type ReadonlySize = {
  readonly width: number
  readonly height: number
}