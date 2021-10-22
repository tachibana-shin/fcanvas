function random(value: number): number;
function random<T>(array: readonly T[]): T;
function random(start: number, stop: number): number;
// eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
function random(...args: readonly any[]): any {
  if (args.length === 1) {
    if (
      args[0] !== null &&
      typeof args[0] === "object" &&
      "length" in args[0]
    ) {
      return args[0][Math.floor(Math.random() * args[0].length)];
    }

    return Math.random() * args[0];
  }
  if (args.length === 2) {
    return args[0] + Math.random() * (args[1] - args[0]);
  }
}

export default random;
