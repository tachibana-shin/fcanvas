 const windowSize: {
  readonly windowWidth: {
    // eslint-disable-next-line functional/no-method-signature
    get(): number;
  };
  readonly windowHeight: {
    // eslint-disable-next-line functional/no-method-signature
    get(): number;
  };
} = {
  windowWidth: {
    get: (): number =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
  },
  windowHeight: {
    get: (): number =>
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  },
};

export default windowSize