// eslint-disable-next-line functional/functional-parameters
export function warn(...msg: readonly string[]) {
  console.warn(`[fcanvas]: ${msg.join(" ")}`);
}

export function error(msg: string) {
  console.log(`[fcanvas]: ${msg}`);
}

export function log(msg: string) {
  console.log(`[fcanvas]: ${msg}`);
}
