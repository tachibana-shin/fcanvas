import ReadonlyOffset from "./ReadonlyOffset";

type ReadonlyMouseOffset = ReadonlyOffset & {
  readonly winX: number;
  readonly winY: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly id: any;
};

export default ReadonlyMouseOffset;
