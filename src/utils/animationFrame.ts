export const requestAnimationFrame:
  | typeof globalThis.requestAnimationFrame
  | typeof globalThis.setTimeout =
  window.requestAnimationFrame ||
  ((callback: Parameters<typeof setTimeout>[0]) =>
    setTimeout(callback, 100 / 6));
export const cancelAnimationFrame:
  | typeof globalThis.cancelAnimationFrame
  | typeof globalThis.clearTimeout =
  window.cancelAnimationFrame ||
  ((callback: Parameters<typeof clearTimeout>[0]) => clearTimeout(callback));
