export default typeof Math.hypot === "function"
  ? Math.hypot
  : // eslint-disable-next-line functional/functional-parameters
    (...args: readonly number[]): number => {
      // eslint-disable-next-line functional/no-let
      let len = args.length - 1,
        result = 0;
      // eslint-disable-next-line functional/no-loop-statement
      while (len > -1) {
        result += Math.pow(args[len--], 2);
      }
      return Math.sqrt(result);
    };
