
export type noop = () => void;

export type ReadonlyOffset<T = number> = {
  readonly x: T;
  readonly y: T;
};
export type ReadonlySize = {
   readonly width: number
   readonly height: number
}

export type MouseOffset = ReadonlyOffset & {
  readonly winX: number;
  readonly winY: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly id: any;
};
