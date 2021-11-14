
// eslint-disable-next-line functional/no-let
let supportPassive = false;

try {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-inner-declarations
  function noop() {}

  const opts = Object.defineProperty({}, "passive", {
    get(): boolean {
      supportPassive = true;
      return false;
    },
  });
  window.addEventListener("testPassive", noop, opts);
  window.removeEventListener("testPassive", noop, opts);
} catch {
  supportPassive = false;
}

export default supportPassive;
