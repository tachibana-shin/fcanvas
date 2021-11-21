// eslint-disable-next-line functional/no-let
let supportPassive = false;

try {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-inner-declarations
  function Noop() {}

  const opts = Object.defineProperty({}, "passive", {
    get(): boolean {
      supportPassive = true;
      return false;
    },
  });
  window.addEventListener("testPassive", Noop, opts);
  window.removeEventListener("testPassive", Noop, opts);
} catch {
  supportPassive = false;
}

export default supportPassive;
