function range(start: number, stop: number, step: number): number;
function range(start: string, stop: string, step: number): string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function range(start: any, stop: any, step: number): any {
  step = step || 1;
  const arr = [];
  // eslint-disable-next-line functional/no-let
  let isChar = false;

  if (stop === undefined) (stop = start), (start = 1);

  if (typeof start === "string") {
    start = start.charCodeAt(0);
    stop = stop.charCodeAt(0);
    isChar = true;
  }

  if (start !== stop && Math.abs(stop - start) < Math.abs(step))
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error("range(): step exceeds the specified range.");

  if (stop > start) {
    step < 0 && (step *= -1);
    // eslint-disable-next-line functional/no-loop-statement
    while (start <= stop) {
      // eslint-disable-next-line functional/immutable-data
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  } else {
    step > 0 && (step *= -1);
    // eslint-disable-next-line functional/no-loop-statement
    while (start >= stop) {
      // eslint-disable-next-line functional/immutable-data
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  }

  return arr;
}

export default range;
